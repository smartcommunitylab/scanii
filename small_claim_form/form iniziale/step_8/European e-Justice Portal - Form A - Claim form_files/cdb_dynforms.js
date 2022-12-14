if (document.createStyleSheet)
{
    document.createStyleSheet("css/autoCompleteStyles.css");
}
else
{
    $("head")
        .append('<link rel="stylesheet" type="text/css" href="css/autoCompleteStyles.css" />');
}
 
var entryText;
 
function prepareCourtSuggestions(nameEntryText, instrument, element, country, street, place,
                                 postalCode, telephone, fax, email,
                                 placeAndPostal, delimiter, dialogObject, dialogName, courtSection) {
 
        var cdbOptionsCourtName = {
            serviceUrl: 'cdbDynFormSuggestions.do',
            width: 330,
            maxHeight : 220,
            noCache: true,
            minChars: 1,
            onSearchError: function(q, jqXHR, textStatus, errorThrown) {
                var errorElement = 'validation_error_text_' + this.attr('name');
                $('[id="' + errorElement + '"]').text(jqXHR.responseText);
                $('[id="' + errorElement + '"]').removeClass("df_validation_invisible");
                $('[id="' + errorElement + '"]').addClass("df_validation_error");
                $('[id="' + errorElement + '"]').addClass("df_validation_visible");
            },
            params: {
                    "countryId": function () {
                        return document.getElementsByName(country)[0].value;
                    },
                    "index": "courtName",
                    "action": "indexCourtName"
            }
        };
 
        cdbOptionsCourtName.onInvalidateSelection = function() {
 
            if (street != null && street.length > 0) {
                clearCourtDataFields(street);
            }
            if (place != null && place.length > 0) {
                clearCourtDataFields(place);
            }
            if (postalCode != null && postalCode.length > 0) {
                clearCourtDataFields(postalCode);
            }
            if (telephone != null && telephone.length > 0) {
                clearCourtDataFields(telephone);
            }
            if (fax != null && fax.length > 0) {
                clearCourtDataFields(fax);
            }
            if (email != null && email.length > 0) {
                clearCourtDataFields(email);
            }
            if (placeAndPostal != null && placeAndPostal.length > 0) {
                clearCourtDataFields(placeAndPostal);
            }
 
            $.ajax({
                url : 'cdbDynFormSuggestions.do',
                type : 'POST',
                data : {
                    "action" : "clearCdbSearchData",
                    "courtSection" : courtSection
                },
                async : false,
                success : function(data) {
                }
            });
        };
 
 
        cdbOptionsCourtName.onSelect = function (suggestions, data) {
            element.value = suggestions.trim();
            validateFieldOnBlur(element[0]);
            var self = this;
            initRequest (self, 'cdbDynFormSuggestions.do', function() {
                if (self.xmlHttpReq.readyState==4 && self.xmlHttpReq.status==200){
                    var ct = self.xmlHttpReq.getResponseHeader("content-type") || "";
                    if (ct.indexOf('json') > -1) {
                        var responseObj = JSON.parse(self.xmlHttpReq.responseText);
 
                        var responseAddress, responseMunicipality, responsePostalCode;
                        if (street != null && ((place != null && postalCode != null) || placeAndPostal != null)) {
                            if (responseObj.address == undefined || responseObj.municipality == undefined || responseObj.postalCode == undefined) {
                                responseAddress = responseObj.postalAddress;
                                responseMunicipality = responseObj.postalAddressMunicipality;
                                responsePostalCode = responseObj.postalAddressPostalCode;
                            }
                            else {
                                responseAddress = responseObj.address;
                                responseMunicipality = responseObj.municipality;
                                responsePostalCode = responseObj.postalCode;
                            }
                        }
                        else {
                            if (street != null) {
                                if (responseObj.address == undefined) {
                                    responseAddress = responseObj.postalAddress;
                                }
                                else {
                                    responseAddress = responseObj.address;
                                }
                            }
                        }
 
                        if (street != null && street.length > 0) {
                            if (responseAddress != undefined) {
                                var streetResponse;
                                if (responseAddress.indexOf("<br>") === -1){
                                    streetResponse = responseAddress.trim().replace(/<BR>/g, '');
                                }
                                else {
                                    streetResponse = responseAddress.trim();
                                }
                                document.getElementsByName(street)[0].value = streetResponse;
                                validateFieldOnBlur(document.getElementsByName(street)[0]);
                            }
                        }
                        if (place != null && place.length > 0) {
                            if (responseMunicipality != undefined) {
                                document.getElementsByName(place)[0].value = responseMunicipality.trim();
                                validateFieldOnBlur(document.getElementsByName(place)[0]);
                            }
                        }
                        if (postalCode != null && postalCode.length > 0) {
                            if (responsePostalCode != undefined) {
                                document.getElementsByName(postalCode)[0].value = responsePostalCode.trim();
                                validateFieldOnBlur(document.getElementsByName(postalCode)[0]);
                            }
                        }
                        if (telephone != null && telephone.length > 0) {
                            if (responseObj.tel != undefined) {
                                document.getElementsByName(telephone)[0].value = responseObj.tel.trim();
                                validateFieldOnBlur(document.getElementsByName(telephone)[0]);
                            }
                        }
                        if (fax != null && fax.length > 0) {
                            if (responseObj.fax != undefined) {
                                document.getElementsByName(fax)[0].value = responseObj.fax.trim();
                                validateFieldOnBlur(document.getElementsByName(fax)[0]);
                            }
                        }
                        if (email != null && email.length > 0) {
                            if (responseObj.email != undefined) {
                                document.getElementsByName(email)[0].value = responseObj.email.trim();
                                validateFieldOnBlur(document.getElementsByName(email)[0]);
                            }
                        }
                        if (placeAndPostal != null && placeAndPostal.length > 0) {
                            if (responseMunicipality != undefined || responsePostalCode != undefined) {
                                document.getElementsByName(placeAndPostal)[0].value =
                                    ((responseMunicipality != undefined) ? responseMunicipality.trim() + delimiter : "")
                                        .concat((responsePostalCode != undefined) ? responsePostalCode.trim() : "");
                                validateFieldOnBlur(document.getElementsByName(placeAndPostal)[0]);
                            }
                        }
                    }
                    else if (self.xmlHttpReq.responseText != "") {
                        var dialogFormId = "#" + dialogName + " ";
                        $(dialogFormId + "#courtDBContainer").after(self.xmlHttpReq.responseText);
                        if (self.xmlHttpReq.responseText.indexOf("courtDBResultsTable") != -1) {
                            $(dialogFormId).next('div').find('#courtSelectBtn').css('display', 'inline-block');
                        }
                        else {
                            $(dialogFormId).next('div').find('#courtSelectBtn').css('display', 'none');
                        }
                        $(dialogFormId + "#cdbCountry").val(document.getElementsByName(country)[0].value);
                        window[dialogObject].parent().find(".ui-dialog-titlebar").addClass('blockhead');
                        window[dialogObject].dialog( "open" );
                    }
                }
            });
            self.xmlHttpReq.send ('action=getCourtData' +
                '&amp;courtName=' + encodeURIComponent(suggestions) +
                '&amp;instrument=' + instrument +
                '&amp;courtSection=' + courtSection +
                '&amp;countryId=' + document.getElementsByName(country)[0].value);
        };
        entryText = nameEntryText;
        var autocompleteObject = element.autocomplete(cdbOptionsCourtName);
        autocompleteObject.selection = element.val();
        return autocompleteObject;
}
 
function fillCourtData(courtDetail, street, place, postalCode, telephone, fax, email, placeAndPostal, delimiter) {
 
    var responseAddress, responseMunicipality, responsePostalCode;
    if (street != null && ((place != null && postalCode != null) || placeAndPostal != null)) {
        if (courtDetail.address == undefined ) {
            responseAddress = courtDetail.postalAddress;
        } else {
            responseAddress = courtDetail.address;
        }
        if (courtDetail.municipality == undefined) {
            responseMunicipality = courtDetail.postalAddressMunicipality;
        } else {
            responseMunicipality = courtDetail.municipality;
        }
        if (courtDetail.postalCode == undefined) {
            responsePostalCode = courtDetail.postalAddressPostalCode;
        } else {
            responsePostalCode = courtDetail.postalCode;
        }
    }
    else {
        if (street != null) {
            if (courtDetail.address == undefined) {
                responseAddress = courtDetail.postalAddress;
            }
            else {
                responseAddress = courtDetail.address;
            }
        }
    }
 
    if (street != null && street.length > 0) {
        if (responseAddress != undefined) {
            document.getElementsByName(street)[0].value = responseAddress.trim();
            removeValidation(street, null, true);
            validateFieldOnBlur(document.getElementsByName(street)[0]);
        }
    }
    if (place != null && place.length > 0) {
        if (responseMunicipality != undefined) {
            document.getElementsByName(place)[0].value = responseMunicipality.trim();
            removeValidation(place, null, true);
            validateFieldOnBlur(document.getElementsByName(place)[0]);
        }
    }
    if (postalCode != null && postalCode.length > 0) {
        if (responsePostalCode != undefined) {
            document.getElementsByName(postalCode)[0].value = responsePostalCode.trim();
            removeValidation(postalCode, null, true);
            validateFieldOnBlur(document.getElementsByName(postalCode)[0]);
        }
    }
    if (telephone != null && telephone.length > 0) {
        if (courtDetail.tel != undefined) {
            document.getElementsByName(telephone)[0].value = courtDetail.tel.trim();
            removeValidation(telephone, null, true);
            validateFieldOnBlur(document.getElementsByName(telephone)[0]);
        }
    }
    if (fax != null && fax.length > 0) {
        if (courtDetail.fax != undefined) {
            document.getElementsByName(fax)[0].value = courtDetail.fax.trim();
            removeValidation(fax, null, true);
            validateFieldOnBlur(document.getElementsByName(fax)[0]);
        }
    }
    if (email != null && email.length > 0) {
        if (courtDetail.email != undefined) {
            document.getElementsByName(email)[0].value = courtDetail.email.trim();
            removeValidation(email, null, true);
            validateFieldOnBlur(document.getElementsByName(email)[0]);
        }
    }
    if (placeAndPostal != null && placeAndPostal.length > 0) {
        if (responseMunicipality != undefined || responsePostalCode != undefined) {
            document.getElementsByName(placeAndPostal)[0].value =
                ((responseMunicipality != undefined) ? responseMunicipality.trim() + delimiter : "")
                    .concat((responsePostalCode != undefined) ? responsePostalCode.trim() : "");
            removeValidation(placeAndPostal, null, true);
            validateFieldOnBlur(document.getElementsByName(placeAndPostal)[0]);
        }
    }
}
 
function getCourtDataUponSelection(courtIdSelected, dynforms, ecodex, dialogFormId, courtName, courtSection) {
 
    if (dialogFormId == undefined) {
        dialogFormId = "";
    }
    else {
        dialogFormId = "#" + dialogFormId + " ";
    }
 
    var parameters = setCdbParameters(0, dynforms, ecodex, dialogFormId);
    var url = "cdbDynFormSuggestions.do?" + parameters;
    var returnedData;
    $.ajax({
        url : url,
        type : 'POST',
        data : {
            "action" : "selectCourt",
            "courtResult" : courtIdSelected,
            "cdbCourtName" : courtName,
            "courtSection" : courtSection
        },
        async : false,
        success : function(data) {
            returnedData = data;
        }
    });
    return returnedData;
}
 
function clearCourtDataFields() {
    for (var i = 0; i < arguments.length; i++) {
        if (document.getElementsByName(arguments[i]).length > 0) {
            document.getElementsByName(arguments[i])[0].value = "";
            removeValidation(arguments[i], null, true);
            validateFieldOnBlur(document.getElementsByName(arguments[i])[0]);
        }
    }
}
 
function searchText_onblur(element, escapeValidation) {
    if ( jQuery.trim(element.value) == '' ) {
        element.value = entryText;
        if (escapeValidation == undefined) {
            validateFieldOnBlur(element);
        }
    }
}
 
//this method is required on court names when the country above it
//offers the "Other" option
function searchText_onblur2(element, countryField) {
    if ( jQuery.trim(element.value) == '' && document.getElementsByName(countryField)[0].value != 'other') {
        element.value = entryText;
        validateFieldOnBlur(element);
    }
}
 
function searchText_onfocus(element) {
    if ( jQuery.trim(element.value) == entryText) {
        element.value = '';
        element.style.color="#000";
    }
}
 
function searchText_onMSChange() {
    if ($('[name="' + arguments[0] + '"]').attr('disabled') == 'disabled') {
        $('[name="' + arguments[0] + '"]').attr('disabled', false);
    }
    else {
        document.getElementsByName(arguments[0])[0].value = entryText;
        for (var i = 0; i < arguments.length; i++) {
            clearCourtDataFields(arguments[i]);
        }
    }
}
 
function clearCdbSearchData(courtSection) {
    $.ajax({
        url : 'cdbDynFormSuggestions.do',
        type : 'POST',
        data : {
            "action" : "clearCdbSearchData",
            "courtSection" : courtSection == undefined ? 1 : courtSection
        },
        async : false,
        success : function(data) {
        }
    });
}
 
function competentSearch_onMSChange() {
    //when the courtDBbutton is disabled (the first time entering the form) and the user changes the MS, we do not
    //want any validation, just make the button enable
    if ($("#" + arguments[0]).attr('disabled') == 'disabled') {
        $("#" + arguments[0]).attr('disabled', false);
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            clearCourtDataFields(arguments[i]);
        }
    }
}
 
function hidePopupButtons(dialogFormId) {
    $('#' + dialogFormId).next('div').find('#courtSelectBtn').css('display', 'none');
    $('#' + dialogFormId).next('div').find('#courtSearchAgainBtn').css('display', 'none');
    $('#' + dialogFormId).next('div').find('#courtIdentifyBtn').css('display', 'none');
}
 
function cdb_beforeSubmit() {
    for (var i = 0; i < arguments.length; i++) {
        if (document.getElementsByName(arguments[i])[0].value == entryText) {
            document.getElementsByName(arguments[i])[0].value = "";
            removeValidation(arguments[i], null, true);
        }
    }
    return beforeSubmit();
}
 
function cdb_submitForm(formName) {
    setTimeout(function(){ isMyUnload=true; document.getElementsByName(formName)[0].submit(); $.blockUI(); }, 10);
}
 
function initRequest (context, action, theFunction){
    if (window.XMLHttpRequest) {
        context.xmlHttpReq = new XMLHttpRequest();}
    else if (window.ActiveXObject) {
        context.xmlHttpReq = new ActiveXObject ("Microsoft.XMLHTTP");}
 
    context.xmlHttpReq.open ('POST', action, false);
    context.xmlHttpReq.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    context.xmlHttpReq.onreadystatechange = theFunction;
}
