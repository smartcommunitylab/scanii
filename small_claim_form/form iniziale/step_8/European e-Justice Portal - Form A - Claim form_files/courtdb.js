/**
 * Created by danagnostopoulou on 12/2/2015.
 */

var CourtDbModule = (function () { 
    // section data
    var searchData = {
        sections: [
           // Example
           // { name: "bailiff", page: 3, seed: 4 },
           // { name: "court", page: 2, seed: null }
        ],
        dummy: { test: "" } 
    };

    // Find section by name
    var findSectionByName = function(name){
        if(!searchData.sections || searchData.sections.length===0) return null;
        for(var i = 0; i<searchData.sections.length; i++){
            if(searchData.sections[i] && searchData.sections[i].name === name){
                return searchData.sections[i];
            }
        }
    };

    // Add section section
    var addSection = function(name, page, seed){ 
        if(!findSectionByName(name)){ 
            searchData.sections.push({name: name, page: page, seed: seed});
        }
    };
    // Update section
    var updateSection = function(name, page){ 
        var section = findSectionByName(name);
        if(section){
            section.page = page;
        }
    };

    var clearData = function (){
        searchData.sections = [];
    };
    return {
        searchData: searchData,
        addSection: addSection,
        updateSection: updateSection,
        clearData: clearData
    };

})();

if (document.createStyleSheet)
{
    document.createStyleSheet("css/autoCompleteStyles.css");
}
else
{
    var url = window.location.href;
    $("head").append('<link rel="stylesheet" type="text/css" href="css/autoCompleteStyles.css" />');

}

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

var autoSuggestions = {};

$( document ).ready(function() {
    $(".cmscdblink").each(function(index) {
        var cdbCountry = $(this).data("countryid");
        var cdbCourtId = $(this).data("courtid");
        if(!cdbCountry || !cdbCourtId){
            console.error("No valid cdb link params");
            return;
        }
        var params = "?cdbDataTemplate=0&cdbCountry="+cdbCountry+"&cdbCourtId="+cdbCourtId+"&fromCMS=true";
        var element = $(this);
        $.ajax({
            type:    "POST",
            url:     "courtDBAjaxSearch.do" + params,
            async:   true,
            beforeSend: function() {
                $.blockUI();
            },
            complete: function () {
                $.unblockUI();
                $('div').remove('#please_wait_icon');
            },
            success: function(data) {
                // console.log(data);
                element.removeClass("cmscdblink").addClass("cmscdblink-enabled");
                element.html(data);            
                element.find( "#courtResult" ).css("display", "none");
            },
            error:   function(data) {
                console.log(data);
            }
        });
    });
});

function courtDBClear(entryText, updateJurisdiction) {
    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();

    clearCdbParamsFromToolsAux();

    $(".courtDBReqParams,.courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
    });
    $(".courtDBReqParams").remove();
    $(".courtDBOneOfReqParams").remove();
    $(".courtDBInitialOneOfReqParams").remove();
    //remove any message errors
    $('[class^=cdb]').remove();
    $("#cdbSearchText").val(entryText);
    //when changing jurisdiction, the courtDBClear is called, but country and jurisdiction do not want to be set to default value
    if (updateJurisdiction) {
        $("select[id^=cdb]").not('#cdbCountry').not('#cdbJurisdiction').val(-1);
    }
    else {
        $("select[id=cdbJurisdiction]").parent().remove();
        $("select[id^=cdb]").val(-1);
        $("select[id=cdbCountry]").val("");
    }
    if ($("#cdbMsContent").val() == "0") {
        $("#cdbCountry:hidden").val("");
    }
}

function clearCdbParamsFromToolsAux () {

    setNewHrefWithoutCdb("tl_wprint");
    setNewHrefWithoutCdb("tl_wprint_all");
    setNewHrefWithoutCdb("tl_wmax");
    setNewHrefWithoutCdb("tl_wrestore");
    setNewHrefWithoutCdb("tl_wprint_pdf");
}

function setNewHrefWithoutCdb(idName) {

    if ($("#" + idName ).length > 0) { //exists
        var printHref = $("#" + idName ).prop('href');
        var parameterString = printHref.split(".do?");
        if(parameterString[1]){
            var params = parameterString[1].split("&");
            var finalParams = "";
            for (var i = 0; i < params.length; i++) {
                if (params[i].indexOf("cdb") == -1 && params[i].indexOf("courtResult") == -1) {
                    finalParams = finalParams + params[i] + "&";
                }
            }
            finalParams = finalParams.substring(0, finalParams.length - 1);
            $("#" + idName ).prop('href', parameterString[0] + ".do?" + finalParams);
        } else {
            parameterString = printHref.split("?");
            var params = parameterString[1].split("&");
            var finalParams = "";
            for (var i = 0; i < params.length; i++) {
                if (params[i].indexOf("cdb") == -1 && params[i].indexOf("courtResult") == -1) {
                    finalParams = finalParams + params[i] + "&";
                }
            }
            finalParams = finalParams.substring(0, finalParams.length - 1);
            $("#" + idName ).prop('href', parameterString[0] + "?" + finalParams);
        }

    }
}

function setNewHrefWithCdb(idName, cdbParams) {

    var printHref;
    var result;

    if ($("#" + idName ).length > 0) { //exists
        printHref = $("#" + idName ).prop('href');
        if (printHref.indexOf(".do?")>0) {
            result = printHref.slice(0,  printHref.indexOf(".do?") + 4) + cdbParams + printHref.slice(printHref.indexOf(".do?") + 4, printHref.length+1);
        } else {
            result = printHref + "&" + cdbParams ;
            if (idName=="tl_wprint") {
                $("#" + idName ).attr('onclick', "return printMaximizeTaxonomy('" +result+"');");
            }
        }

        $("#" + idName ).prop('href',result);


    }
}

function setNewHrefWithNewValue(idName, elementId, elementVal) {
    var result;

    if ($("#" + idName ).length > 0) { //exists
        result = $("#" + idName ).prop('href');
        if (result.indexOf(elementId) != -1) {
            //result = result.splice( result.indexOf(elementId), result.indexOf("&", result.indexOf(elementId)) - result.indexOf(elementId) + 1, "")
            result = result.slice(0, result.indexOf(elementId)) + "" + result.slice(result.indexOf(elementId), result.indexOf("&", result.indexOf(elementId)) - result.indexOf(elementId) + 1);
        }
        //result = result.splice( result.indexOf(".do?") + 4, 0, elementId + "=" + elementVal + "&");
        result = result.slice(0, result.indexOf(".do?") + 4) + elementId + "=" + elementVal + "&" + result.slice(result.indexOf(".do?") + 4);
        $("#" + idName ).prop('href',result);
    }
}

function courtDBPresent(courtIdSelected) {
    $("tr[id='"+courtIdSelected+"']").each(function (index) {
        if ($(this).css("display") == "none") {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });

}

function courtDBSearch(courtIdSelected, dynforms, ecodex, dialogFormId, page, section) {

    //remove any message errors
    $('[class^=cdb]').remove();

    if (dialogFormId == undefined) {
        dialogFormId = "";
    }
    else {
        dialogFormId = "#" + dialogFormId + " ";
    }

    var parameters = setCdbParameters(courtIdSelected, dynforms, ecodex, dialogFormId);

    if(page != undefined){
        parameters = parameters + "&page="+page;
    }

    if(section){
        CourtDbModule.updateSection(section, page);
    }else{
        CourtDbModule.clearData();
    }

    var url = "courtDBAjaxSearch.do?" + parameters;
    var toBeFocused = null;

    $.ajax({
        type:    "POST",
        url:     url,
        async:   true,
        data: JSON.stringify(CourtDbModule.searchData),
        contentType: "application/json; charset=utf-8",
        beforeSend: function() {
            $.blockUI();
        },
        complete: function () {
            $.unblockUI();
            $('div').remove('#please_wait_icon');
            if(toBeFocused !== null && $(toBeFocused).size() > 0) {
                if($(toBeFocused).parent().parent().hasClass('hasinfo')) {
                    $(toBeFocused).parent().parent().find('.info .icon').focus();
                } else {
                    $(toBeFocused)[0].focus();
                }
            }

        },
        success: function(data) {
            $(dialogFormId + ".courtDBResults").remove();
            $('#courtDBTextIdNotification').remove();
            clearCdbParamsFromToolsAux();
            if(data.indexOf("<li") != -1 ){
            	
                $(dialogFormId).find('#courtSelectBtn').css('display', 'inline-block');
                                            }
             else {
                  $(dialogFormId).find('#courtSelectBtn').css('display', 'none');
                                      }
            if (data.indexOf("courtDBReqParams") != -1 || data.indexOf("courtDBOneOfReqParams") != -1 || data.indexOf("courtDBInitialOneOfReqParams") != -1) {
                if (dynforms == true) {
                    $(dialogFormId + "#courtDBContainer").append(data);
                }
                else {
                    if ($(".mandatory").length > 0 && $("#courtIdentifyBtn").prev().hasClass("mandatory")) {
                        $("#courtIdentifyBtn").prev().before(data);
                        if($('#cdbCompType').size() > 0) {
                            toBeFocused = '#cdbCompType';
                        }
                        if($('#cdbMunicipality').size() > 0) {
                            toBeFocused = '#cdbMunicipality';
                        }
                        if($('#cdbPostalCode').size() > 0) {
                            toBeFocused = '#cdbPostalCode';
                        }
                        if(data.indexOf("oneOfReqParams") != -1 ) {
                            toBeFocused = 'input:radio[name=oneOfReqParams]';
                        }
                    } else {
                        $("#courtIdentifyBtn").before(data);
                    }
                }
  
                if ($("#cdbSearchText").length > 0) {
                    $("#courtDBContainer").append(data);
                }
                prepareAutoSuggestions(dialogFormId);
                $(dialogFormId).next('div').find('#courtIdentifyBtn').css('display', 'inline-block');
            }
            else if (data.indexOf("cdbMissingParams") != -1) {
                $(data).children('span').each(function () {
                    if ($(this).prop('class') == "cdbCompType" && $(dialogFormId + 'span[class="compTypetipcontainer"]').length > 0) {
                        $(dialogFormId + 'span[class="compTypetipcontainer"]').after(this);
                    }
                    else if($(this).prop('class') == "cdbCompType" && $(dialogFormId + '#' + $(this).prop('class')).parent().hasClass("input-content")){
                        $(dialogFormId + '#' + $(this).prop('class')).parent().after(this);
                    }
                    else {
                        $(dialogFormId + '#' + $(this).prop('class')).after(this);
                    }
                });
                $(dialogFormId).next('div').find('#courtIdentifyBtn').css('display', 'inline-block');
            }
            else if (data.indexOf("courtDBResults") != -1) {
                $(dialogFormId + "#courtDBContainer").after(data);
                if (dynforms == true) {
                    if (data.indexOf("generic_error") != -1) {
                        $(dialogFormId).next('div').find('#courtSelectBtn').css('display', 'none');
                    }
                    else if (data.indexOf("courtDBResultsTable") != -1) {
                        $(dialogFormId).next('div').find('#courtSelectBtn').css('display', 'inline-block');
                    }
                    else {
                        $(dialogFormId).next('div').find('#courtSelectBtn').css('display', 'none');
                        if($('input:radio[name=courtResult]').size() > 0) {
                            $('input:radio[name=courtResult]')[0].checked = true;
                            $('input:radio[name=courtResult]')[0].focus();
                        }
                    }
                    $(dialogFormId).next('div').find('#courtIdentifyBtn').css('display', 'none');
                    $(dialogFormId).next('div').find('#courtSearchAgainBtn').css('display', 'inline-block');

                } else {
                    toBeFocused = '.contentArea .location-list.courtDBResults .nested-expand-list .js-toggle .trigger';
                }
            }

            attachEvents(dialogFormId);

            if (dynforms != true) {
                var cdbParams = "";
                $('[id^=cdb]:enabled').each(function () {
                    cdbParams = cdbParams + $(this).prop('id') + "=" + $(this).prop('value') + "&";
                });

                if (courtIdSelected != 0) {
                    cdbParams = cdbParams + "courtResult=" + courtIdSelected + "&";
                }
                setNewHrefWithCdb("tl_wmax", cdbParams);
                setNewHrefWithCdb("tl_wrestore", cdbParams);

                if (data.indexOf("courtDBResults") != -1) {
                    setNewHrefWithCdb("tl_wprint", cdbParams);
                    setNewHrefWithCdb("tl_wprint_all", cdbParams);
                    setNewHrefWithCdb("tl_wprint_pdf", cdbParams);
                }
            }
            /*EG-2220*/
            if(data.indexOf("courtDBTextIdNotification")!=-1){
                //alert('EG-2220-Test6');
                var InsertBeforeElement = $(".courtDBReqParams");
                var InsertAfterCompetencyElement = false;

                if(InsertBeforeElement.length > 1){ //Fix bug of duplicates in case of multiple objects get the first one
                    $.each( InsertBeforeElement, function( i, val ) {
                        if($('#cdbCompType',val).length == 1  ){  //Does val have competency type
                            InsertAfterCompetencyElement = val;
                        }
                    });

                    InsertBeforeElement = InsertBeforeElement[0];
                }

                //Fix: Insert after the first Required Param unless competency select found
                //if found  competency select,  Insert after
                if(InsertAfterCompetencyElement== false){
                    InsertAfterCompetencyElement = InsertBeforeElement;
                }

                if(InsertBeforeElement != undefined){

                    var emptyParagraphs = $('#courtDBTextId').find("p:empty").remove();

                    //Check whether we are in dialog or not - starts with since multiple IDs for dialog
                    var isWithinDialog = $(InsertBeforeElement).parents('div[id^=dialog-form]').length == 1;
                    var insertResult;

                    if(!isWithinDialog && InsertAfterCompetencyElement!=false){
                        //Competency Select is Found
                        insertResult = $('#courtDBTextIdNotification').detach().removeAttr("style").insertAfter(InsertAfterCompetencyElement);
                    }else{
                        //Competency Select is Not Found
                        insertResult = $('#courtDBTextIdNotification').detach().removeAttr("style").insertBefore(InsertBeforeElement);
                    }

                    if(isWithinDialog){
                        insertResult.prop("class","courtDBTextIdContainer");
                    }else{
                        insertResult.prop("class","courtDBResponseData DataText");
                        $('#courtDBTextId').prop("class","");   //No style is needed for outside dialog
                        $('#courtDBTextId').find("p.courtDBResultsTableData").css("padding","0px"); //No padding is needed for outside dialog
                    }
                }
            }
        },
        error:   function() {

        }
    });
}

function courtDBCountryUpdate() {
    $(".courtDBReqParams").remove();
    $(".courtDBOneOfReqParams").remove();
    $(".courtDBInitialOneOfReqParams").remove();
    autoSuggestions = [];
    $('[id^=AutocompleteContainter]').remove();
    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();
    clearCdbParamsFromToolsAux();
    //remove any message errors
    $('[class^=cdb]').remove();
    if ($("#cdbCountry").val() == "UK") {
        var url = "courtDBAjaxSearch.do?countryChanged=" + $("#cdbCountry").val() + "&clang=" + $("[name='clang']").val() + "&idTaxonomy=" + $("[name='idTaxonomy']").val();

        $.ajax({
            type:    "POST",
            url:     url,
            async:   false,

            success: function(data) {
                $( "#cdbInstrument" ).after(data);
            },
            error:   function() {

            }
        });

    }
    else {
        $(".jurisdiction").remove();
    }
}

function courtDBJurisdictionUpdate() {
    $("#cdbJurisdiction").closest("div").nextAll('.courtDBReqParams,.courtDBOneOfReqParams').find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $("#cdbJurisdiction").closest("div").nextAll('.courtDBReqParams').remove();
    $("#cdbJurisdiction").closest("div").nextAll('.courtDBOneOfReqParams').remove();

    $("#cdbJurisdiction").closest("div").find(".courtDBReqParams").find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $("#cdbJurisdiction").closest("div").find(".courtDBReqParams").remove();

    $("#cdbJurisdiction").closest("div").find(".courtDBOneOfReqParams").find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $("#cdbJurisdiction").closest("div").find(".courtDBOneOfReqParams").remove();

    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();

    $('[class^=cdb]').remove();

    if($('#courtIdentifyBtn').prop('class') == undefined || $('#courtIdentifyBtn').prop('class').indexOf("actions pull-up") == -1){
        $('#courtIdentifyBtn').css('display', 'inline-block');
    }
    $('#courtSearchAgainBtn').css('display', 'none');
    $('#courtSelectBtn').css('display', 'none');
}

function setCdbParameters(courtIdSelected, dynforms, ecodex, dialogFormId) {
    var parameters = "";

    //if radio buttons with OneOfReqParams exists
    if ($(dialogFormId + ".courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").length > 0) {

        if ($(dialogFormId + ".courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").find('[id^=cdb]:enabled').length == 0) {
            //none of oneOfReqParams is selected - so return
            return;
        }
        else {
            $(dialogFormId + ".courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").find('[id^=cdb]:enabled').each(function (index) {
               if($(this).prop("disabled") === false) {
                  
                   var paramName = $(this).prop('id');
                   if (paramName == "cdbStreet" || paramName == "cdbMunicipality") {
                       if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                           parameters = parameters + "&" + $(this).prop('id') + "=";
                       }
                       else {
                           parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                       }
                   }
                   else {
                       if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                           parameters = parameters + "&" + $(this).prop('id') + "=";
                       }
                       else {
                           parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                       }
                   }
               }
            });

        }

        $(dialogFormId + 'div#courtDBContainer').children().not("div.courtDBOneOfReqParams,div.courtDBInitialOneOfReqParams").find('[id^=cdb]').each(function (index) {
            var paramName = $(this).prop('id');
            if($(this).prop("disabled") === false) {
                if (paramName == "cdbStreet" || paramName == "cdbMunicipality") {
                    if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                        parameters = parameters + "&" + $(this).prop('id') + "=";
                    }
                    else {
                        parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                    }
                }
                else if (paramName == "cdbEcodex") {
                    parameters = parameters + "&" + $(this).prop('id') + "=" + ($(this).prop('checked') == "checked" ? $(this).prop('value') : "0");
                }
                else {
                    if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                        parameters = parameters + "&" + $(this).prop('id') + "=";
                    }
                    else {
                        parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                    }
                }
            }
        });
    }
    else {
        $(dialogFormId + '[id^=cdb]').each(function (index) {

            var paramName = $(this).prop('id');
            if($(this).prop("disabled") === false) {
                if (paramName == "cdbStreet" || paramName == "cdbMunicipality") {
                    if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                        parameters = parameters + "&" + $(this).prop('id') + "=";
                    }
                    else {
                        parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                    }
                }
                else if (paramName == "cdbEcodex") {
                    parameters = parameters + "&" + $(this).prop('id') + "=" + ($(this).prop('checked') == "checked" ? $(this).prop('value') : "0");
                }
                else {
                    if (typeof entryText != 'undefined' && $(this).prop('value') === entryText) {
                        parameters = parameters + "&" + $(this).prop('id') + "=";
                    }
                    else {
                        parameters = parameters + "&" + $(this).prop('id') + "=" + encodeURIComponent($(this).prop('value'));
                    }
                }
            }
        });
    }
    if ($(dialogFormId + "[name='clang']").length > 0) {
        parameters = parameters + "&clang=" + $("[name='clang']").val();
    }

    if ($(dialogFormId + "[name='municipalityLevel']").length > 0) {
        parameters = parameters + "&municipalityLevel=" + encodeURIComponent($("[name='municipalityLevel']").val());
    }

    if ($(dialogFormId + "[name='idTaxonomy']").length > 0) {
        parameters = parameters + "&idTaxonomy=" + $("[name='idTaxonomy']").val();
    }

    if ($(dialogFormId + "[name='cdbCountry']").length > 0) {
        parameters = parameters + "&cdbCountry=" + $("[name='cdbCountry']").val();
    }


    if (courtIdSelected != 0) {
        parameters = parameters + "&courtResult=" + courtIdSelected;
    }

    if (dynforms == true) {
        parameters = parameters + "&cdbDataTemplate=0";
    }
    if (ecodex == true) {
        parameters = parameters + "&cdbEcodex=1";
    }
    if(isLegacyUI()) {
        parameters = parameters + "&isLegacyUI=true";
    }
    return parameters;
}

function competenceTypeUpdate() {
    $("#cdbCompType").closest("div.courtDBReqParams").nextAll('.courtDBReqParams,.courtDBOneOfReqParams').find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $("#cdbCompType").closest("div.courtDBReqParams").nextAll('.courtDBReqParams').remove();
    $("#cdbCompType").closest("div.courtDBReqParams").nextAll('.courtDBOneOfReqParams').remove();

    var url = "courtDBAjaxSearch.do?competenceChanged=" + $("#cdbCompType").val() + "&cdbInstrument=" + $("#cdbInstrument").val();
    if(isLegacyUI()) {
        url = url + "&isLegacyUI=true";
    }
    $.ajax({
        type:    "POST",
        url:     url,
        async:   false,

        success: function(data) {
            if ($('span[class="compTypetip"]').length > 0) {
                $('span[class="compTypetip"]')[0].innerHTML = data;
                if($('span[class="compTypetip"]')[1]){
                    $('span[class="compTypetip"]')[1].innerHTML = data;
                }
            }
        },
        error:   function() {

        }
    });
    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();
    if($('#courtIdentifyBtn').prop('class') == undefined || $('#courtIdentifyBtn').prop('class').indexOf("actions pull-up") == -1){
        $('#courtIdentifyBtn').css('display', 'inline-block');
    }
    $('#courtSearchAgainBtn').css('display', 'none');
    $('#courtSelectBtn').css('display', 'none');
}

function instrumentCodeUpdate() {
    $("#cdbCompType").closest("div").nextAll('.courtDBReqParams,.courtDBOneOfReqParams').find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $("#cdbInstrument").parent().nextAll('.courtDBReqParams').remove();
    $("#cdbInstrument").parent().nextAll('.courtDBOneOfReqParams').remove();
    $("#cdbCompType").parent().remove();
    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();
}

function selectOneReqParam(element) {
    var classes = $(element).parent().closest('div').prop('class').split(" ");
    var className="";
    classes.forEach(function(element) {
        className = className +"."+element;
    });
    //var className = "." + $(element).parent().closest('div').attr('class');
    $(element).parents(className).each(function(){
        $(this).find("[id^='cdb']").prop("disabled", true);
    });
    $(element).parent().nextAll().prop("disabled", false);

    $(className).nextAll(".courtDBReqParams,.courtDBOneOfReqParams").find('[id^=cdb]').each(function() {
        var id = $(this).prop("id");
        if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
            var containerId = autoSuggestions[id].mainContainerId;
            autoSuggestions[id] = null;
            $('#' + containerId).remove();
        }
        setNewHrefWithNewValue("tl_wmax", id, "");
        setNewHrefWithNewValue("tl_wrestore", id, "");
    });
    $(className).nextAll(".courtDBReqParams,.courtDBOneOfReqParams").remove();
    $(".courtDBResults").remove();
    $('#courtDBTextIdNotification').remove();
    $('#courtSelectBtn').css('display', 'none');
    if($('#courtIdentifyBtn').prop('class') == undefined || $('#courtIdentifyBtn').prop('class').indexOf("actions pull-up") == -1){
        $('#courtIdentifyBtn').css('display', 'inline-block');
    }
    $('#courtSearchAgainBtn').css('display', 'none');
}

function paramSearchText_onblur(element, entryText) {
    if ( jQuery.trim(element.value) == '' ) {
        element.value = entryText;
    }
}

function paramSearchText_onfocus(element, entryText) {
    if ( jQuery.trim(element.value) == entryText) {
        element.value = '';
    }
    element.from_auto = null;
}

function attachEvents(dialogFormId) {
    var se = document.getElementById('cdbCompType');
    if (se) {
        se.onchange = function () {
            competenceTypeUpdate();
        };
    }

    var se = document.getElementById('cdbInstrument');
    if (se) {
        se.onchange = function () {
            instrumentCodeUpdate();
        };
    }


    $(dialogFormId + '[name="courtResult"]').each(function() {
        this.onclick = function() {
            var id= $(this).prop('id');
            courtDBPresent(id);
        };
    });

    $(dialogFormId + '[name="oneOfReqParams"]').each(function() {
        this.onclick = function() {
            selectOneReqParam(this);
        };
    });

    $(dialogFormId + '[name="initialOneOfReqParams"]').each(function() {
        this.onclick = function() {
            selectOneReqParam(this);
        };
    });
}

function prepareAutoSuggestions(dialogFormId) {


    if(!dialogFormId){
        dialogFormId ="";
    }

    var searchOptions = {
        serviceUrl: "cdbSearchSuggestions.do",
        width: '52rem',
        maxHeight : '26rem',
        delimiter : /(,|;)\s*/,
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "searchText": function () {
                if ($("#cdbSearchText").length > 0) { //exists
                    return $('#cdbSearchText').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "cdbMsContent": function () {
                if ($("#cdbMsContent").length > 0) { //exists
                    return $('#cdbMsContent').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "municipalityLevel": function () {
                if ($("#municipalityLevel").length > 0) { //exists
                    return $('#municipalityLevel').val();
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    var geoOptions = {
        serviceUrl: 'cdbGeoSuggestions.do',
        width: '52rem',
        maxHeight : '26rem',
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "municipalityLevel": function () {
                if ($("#municipalityLevel").length > 0) { //exists
                    return $('#municipalityLevel').val();
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    var cdbOptionsPostalCode = {
        serviceUrl: 'cdbSuggestions.do',
        width: '52rem',
        maxHeight : '26rem',
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "index": function () {
                if ($("#cdbPostalCode").length > 0) { //exists
                    return "postalCode";
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    var cdbOptionsMunicipality = {
        serviceUrl: 'cdbSuggestions.do',
        width: '52rem',
        maxHeight : '26rem',
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "index": function () {
                if ($("#cdbMunicipality").length > 0) { //exists
                    return "municipality";
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    var cdbOptionsStreet = {
        serviceUrl: 'cdbSuggestions.do',
        width: '52rem',
        maxHeight : '26rem',
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "index": function () {
                if ($("#cdbStreet").length > 0) { //exists
                    return "street";
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    var cdbOptionsCourtName = {
        serviceUrl: 'cdbSuggestions.do',
        width: '52rem',
        maxHeight : '26rem',
        noCache: true,
        params: { "country": function () {
                if ($(dialogFormId + "#cdbCountry").length > 0) { //exists
                    return $(dialogFormId + '#cdbCountry').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "jurisdiction": function () {
                if ($("#cdbJurisdiction").length > 0) { //exists
                    return $('#cdbJurisdiction').val();
                } else { // doesn't exist
                    return "";
                }
            },
            "index": function () {
                if ($("#cdbCourtName").length > 0) { //exists
                    return "courtName";
                } else { // doesn't exist
                    return "";
                }
            }
        }
    };

    geoOptions.onSelect = function (suggestions, data) {
        if ($("#cdbMunicipality").length > 0) {
            $('#cdbMunicipality').val(suggestions);
            $('#cdbToponymId').remove();

            reqParamInputChanged(document.getElementById("cdbMunicipality"));
            $('<input>').prop({
                type: 'hidden',
                id: 'cdbToponymId',
                name: 'cdbToponymId',
                value: data
            }).insertAfter('#cdbMunicipality');
        }
        else if ($("#cdbGeoId").length > 0) {
            $('#cdbGeoId')[0].from_auto = true;
            $('#cdbGeoId').val(suggestions);
            $('#cdbToponymId').remove();

            reqParamInputChanged(document.getElementById("cdbGeoId"));
            $('<input>').prop({
                type: 'hidden',
                id: 'cdbToponymId',
                name: 'cdbToponymId',
                textValue: suggestions,
                value: data
            }).insertAfter('#cdbGeoId');
        }
    };

    cdbOptionsPostalCode.onSelect = function (suggestions, data) {
        $('#cdbPostalCode').val(suggestions);
        reqParamInputChanged(document.getElementById("cdbPostalCode"));
    };

    cdbOptionsStreet.onSelect = function (suggestions, data) {
        $('#cdbStreet').val(suggestions);
        reqParamInputChanged(document.getElementById("cdbStreet"));
    };

    cdbOptionsCourtName.onSelect = function (suggestions, data) {
        $('#cdbCourtName').val(suggestions);
        reqParamInputChanged(document.getElementById("cdbCourtName"));
    };

    searchOptions.onSelect = function (suggestions, data, uuid) {
        if (uuid == "country") {
            $(dialogFormId + '#cdbCountry').val(data);
        }
        reqParamInputChanged(document.getElementById("cdbSearchText"));
    };

    if ($("#cdbSearchText").length > 0 && (typeof autoSuggestions["cdbSearchText"] == 'undefined' || autoSuggestions["cdbSearchText"] == null)) {
        autoSuggestions["cdbSearchText"] = $('#cdbSearchText').autocomplete(searchOptions);
    }
    if ($("#cdbMunicipality").length > 0
        && (typeof autoSuggestions["cdbMunicipality"] == 'undefined' || autoSuggestions["cdbMunicipality"] == null)) {
        if ($("#municipalityLevel").length > 0)
        {
            autoSuggestions["cdbMunicipality"] = $('#cdbMunicipality').autocomplete(geoOptions);
        }
        else {
            autoSuggestions["cdbMunicipality"] = $('#cdbMunicipality').autocomplete(cdbOptionsMunicipality);
        }
        entryText = $("#cdbMunicipality").val();
    }
    if ($("#cdbGeoId").length > 0 && (typeof autoSuggestions["cdbGeoId"] == 'undefined' || autoSuggestions["cdbGeoId"] == null)) {
        autoSuggestions["cdbGeoId"] = $('#cdbGeoId').autocomplete(geoOptions);
        entryText = $("#cdbGeoId").val();
    }
    if ($("#cdbPostalCode").length > 0 && (typeof autoSuggestions["cdbPostalCode"] == 'undefined' || autoSuggestions["cdbPostalCode"] == null)) {
        autoSuggestions["cdbPostalCode"] = $('#cdbPostalCode').autocomplete(cdbOptionsPostalCode);
        entryText = $("#cdbPostalCode").val();
    }
    if ($("#cdbStreet").length > 0 && (typeof autoSuggestions["cdbStreet"] == 'undefined' || autoSuggestions["cdbStreet"] == null)) {
        autoSuggestions["cdbStreet"] = $('#cdbStreet').autocomplete(cdbOptionsStreet);
        entryText = $("#cdbStreet").val();
    }
    if ($("#cdbCourtName").length > 0 && (typeof autoSuggestions["cdbCourtName"] == 'undefined' || autoSuggestions["cdbCourtName"] == null)) {
        autoSuggestions["cdbCourtName"] = $('#cdbCourtName').autocomplete(cdbOptionsCourtName);
        entryText = $("#cdbCourtName").val();
    }

    /* jQuery(function () {
     });*/
}

function reqParamInputChanged(o) {
    var jO = $(o);
    if (jO.prop("id") == "cdbSearchText") {
        $(".courtDBReqParams,.courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").find('[id^=cdb]').each(function() {
            var id = $(this).prop("id");
            if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
                var containerId = autoSuggestions[id].mainContainerId;
                autoSuggestions[id] = null;
                $('#' + containerId).remove();
            }
        });
        $(".courtDBReqParams,.courtDBOneOfReqParams,.courtDBInitialOneOfReqParams").remove();
    }
    else {
        jO.closest("div").nextAll(".courtDBReqParams,.courtDBOneOfReqParams").find('[id^=cdb]').each(function () {
            var id = $(this).prop("id");
            if (typeof autoSuggestions[id] !== 'undefined' && autoSuggestions[id] !== null) {
                var containerId = autoSuggestions[id].mainContainerId;
                autoSuggestions[id] = null;
                $('#' + containerId).remove();
            }
            setNewHrefWithNewValue("tl_wmax", id, "");
            setNewHrefWithNewValue("tl_wrestore", id, "");
        });
        jO.closest("div").nextAll(".courtDBReqParams,.courtDBOneOfReqParams").remove();

        if (jO.prop("id") == "cdbGeoId") {
            var storedText = $('#cdbToponymId').prop('textValue');
            if (o.from_auto == null ||
                (storedText!=null && storedText!=o.value)) {
                o.value = "";
                $('#cdbToponymId').remove();
            }
            o.from_auto = false;
        }
        else if (jO.prop("id") == "cdbMunicipality") {
            $('#cdbToponymId').remove();
        }
    }
    // $('.courtDBResults').remove();

    if($('#courtIdentifyBtn').prop('class') == undefined || $('#courtIdentifyBtn').prop('class').indexOf("actions pull-up") == -1){
        $('#courtIdentifyBtn').css('display', 'inline-block');
    }
    $('#courtSearchAgainBtn').css('display', 'none');
    // $('#courtSelectBtn').css('display', 'none');

    setNewHrefWithNewValue("tl_wmax", jO.prop("id"), jO.val());
    setNewHrefWithNewValue("tl_wrestore", jO.prop("id"), jO.val());
}
function isLegacyUI() {
    var submitButtonName = $('#courtIdentifyBtn input').attr('name');
    if(submitButtonName === 'testit_cdbSubmit') {
        return true;
    } else {
        return false;
    }
}

function openBetaResults(element){
    $(element).parent().toggleClass('open');
}
var jsToggleIdKeyPress = -1;
$(document).on("keydown", '#js-toggle-id', function(e){
    if(e.keyCode==9 && e.shiftKey==false){
       jsToggleIdKeyPress = 9;
    } else {
        jsToggleIdKeyPress = -1;
    }
})
$(document).on("focusout", "#js-toggle-id", function(e){
    if (jsToggleIdKeyPress == 9){
        if ($('.js-toggle.open').find('input#courtResult')[0]!=null
            && ($('#cdbPostalCode')[0] == null || $('#cdbPostalCode').prop('disabled') || $('#cdbPostalCode').is(':hidden'))
            && ($('#cdbMunicipality')[0] == null || $('#cdbMunicipality').prop('disabled') || $('#cdbMunicipality').is(':hidden'))
            && ($('#cdbStreet')[0] == null || $('#cdbStreet').prop('disabled') || $('#cdbStreet').is(':hidden'))
            && ($('#cdbCompType')[0] == null || $('#cdbCompType').prop('disabled') || $('#cdbCompType').is(':hidden'))) {
            $('.js-toggle.open').find('input#courtResult')[0].focus();
        }
    }
});
$(document).on('keyup', '#courtSelectBtn', function (e) {
    if(e.keyCode==13){
        try {
            fillInTheForm();
        } catch (err) {
            try {
                fillInTheForm1();
            } catch (err) {
                fillInTheForm2();
            }
        }
    }
});
var cdbPostalCodeKeyPress = -1;
$(document).on('keydown', "#cdbPostalCode", function (e) {
    if(e.keyCode==9 && e.shiftKey==false) {
        cdbPostalCodeKeyPress = 9;
    } else {
        cdbPostalCodeKeyPress = -1;
    }
});
$(document).on('focusout', "#cdbPostalCode", function (e) {
    if (cdbPostalCodeKeyPress == 9){
        if ($('.js-toggle.open').find('input#courtResult')[0]){
            $('.js-toggle.open').find('input#courtResult')[0].focus();
        }
    }
});
var cdbMunicipalityKeyPress = -1;
$(document).on('keydown', "#cdbMunicipality", function (e) {
    if(e.keyCode==9 && e.shiftKey==false) {
        cdbMunicipalityKeyPress = 9;
    } else {
        cdbMunicipalityKeyPress = -1;
    }
});
$(document).on('focusout', "#cdbMunicipality", function (e) {
    if(cdbMunicipalityKeyPress==9) {
        if ($('.js-toggle.open').find('input#courtResult')[0]) {
            $('.js-toggle.open').find('input#courtResult')[0].focus();
        }
    }
});
var cdbStreetKeyPress = -1;
$(document).on('keydown', "#cdbStreet", function (e) {
    if(e.keyCode==9 && e.shiftKey==false) {
        cdbStreetKeyPress = 9;
    } else {
        cdbStreetKeyPress = -1;
    }
});
$(document).on('focusout', "#cdbStreet", function (e) {
    if (cdbStreetKeyPress == 9){
        if ($('.js-toggle.open').find('input#courtResult')[0]){
            $('.js-toggle.open').find('input#courtResult')[0].focus();
        }
    }
});
var cdbCompTypeKeyPress = -1;
$(document).on('keydown', "#cdbCompType", function (e) {
    if(e.keyCode==9 && e.shiftKey==false) {
        cdbCompTypeKeyPress = 9;
    } else {
        cdbCompTypeKeyPress = -1;
    }
});
$(document).on('focusout', "#cdbCompType", function (e) {
    if (cdbCompTypeKeyPress == 9){
        if ($('.js-toggle.open').find('input#courtResult')[0]){
            $('.js-toggle.open').find('input#courtResult')[0].focus();
        }
    }
});