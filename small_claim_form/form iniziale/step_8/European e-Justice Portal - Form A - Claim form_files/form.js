var isMyUnload = false;
var newPageOnSubmit = true;
var isDebug = false;

function beforeSubmit() {
    if (!newPageOnSubmit) {
        newPageOnSubmit = true;
        isMyUnload = true;
        setTimeout("resetOnDownload()", 4000);
    } else
        isMyUnload = true;

    return true;
}

function resetOnDownload() {
    isMyUnload = false;
}

function languageChange(params) {
    var formsObj = document.forms;
    var formsObjLength = formsObj.length;
    var dynformObj;

    for (i = 0; i < formsObjLength; i++) {
        var formName = formsObj[i].name;
        if (formName.indexOf("dynform") != -1) {
            if (formName.indexOf("dynform_load_xml_action.do") == -1) {
                isMyUnload = true;
                dynformObj = formsObj[i];
                break;
            }
        }
    }

    if (dynformObj) {
        dynformObj.action = dynformObj.action + params;
        dynformObj.onsubmit();
        dynformObj.submit();
    }
}

//when user leave the page using a link
function checkOnunload() {
    if (!isMyUnload &&
        (window.bypassDynUnload == true ? /* ignore */ false :
            /* show confirm popup */ true)) {
        var currentUrl = window.location.href;

        if (currentUrl.indexOf("dynform_intro_") == -1 && typeof onUnloadMessage !== 'undefined') {
            var unload = confirm(onUnloadMessage);
            if (unload) {
                var formObj = document.dynform_remove_session_data;
                var ajaxRequestSync = getXMLHttpRequest();
                var response = ajaxGetSync(ajaxRequestSync, formObj, "dynform_remove_data_action.do");
            }

            isMyUnload = unload;
            return unload;
        }
    }

    isMyUnload = true;
    return true;
}

function getClosingWindow() {
    if ($.browser.msie) {
        return (document.readyState == "complete");
    } else {
        return (window.innerHeight == 0);
    }
}

//when user leave the page using the browser navigation buttons
// IE version is call by onunload event
// WEBKIT & GECKO prevent dialog box in onUnload event.
function navigationOnunload(event) {
    event = event || window.event;
    messageOnUnload(event);
}

//when user leave the page using the browser navigation buttons
//WEBKIT and GECKO version is call by beforeonunload event
//IE do not detect correctly closing windows in beforeOnUnload Event
function navigationBeforeOnunload(event) {
    event = event || window.event;
    messageOnUnload(event);
}

function messageOnUnload(event) {
    if (!isMyUnload) {
        var currentUrl = window.location.href;
        if (currentUrl.indexOf("dynform_intro_") == -1 && !getClosingWindow() && typeof onUnloadNavigationMessage!=='undefined') {
            if ($.browser.mozilla || $.browser.msie) {
                alert(onUnloadNavigationMessage);
            } else {
                event.returnValue = onUnloadNavigationMessage;
                return onUnloadNavigationMessage;
            }
        }
    }
}

function getCheckedValue(multiObj) {
    if (!multiObj) {
        if (isDebug)
            addDebug("getCheckedValue, parameter is null");

        return null;
    }

    var multiObjLength = multiObj.length;

    if (isDebug)
        addDebug("getCheckedValue, length=" + multiObjLength);

    if (!multiObjLength) {
        if (multiObj.checked)
            return multiObj.value;
        else
            return null;
    }

    var tmpObj = "";

    for (var i = 0; i < multiObjLength; i++) {
        if (multiObj[i].type == "checkbox") {
            if (multiObj[i].id.indexOf("selectedLanguages")>-1) {
                if (multiObj[i].checked) {
                    tmpObj += "&" + multiObj[i].name + "=" + multiObj[i].value;
                } else {
                    tmpObj += "&" + multiObj[i].name + "=" + "0";
                }
            } else {
                if (multiObj[i].checked) {
                    return multiObj[i].value;
                } else if (!multiObj[i].checked) {
                    return multiObj[i].value = "0";
                }
            }
        }
        else {
            if(multiObj[i].checked)
                return multiObj[i].value;
        }
    }
    if (tmpObj != "") {
        return tmpObj;
    }
    return null;
}

function addActiveLink(alName) {
    var actionValue = formObj.action;
    var index1 = actionValue.indexOf("?");
    var paramChar = "?";
    if (index1 != -1)
        paramChar = "&";

    isMyUnload = true;
    formObj.action = actionValue + paramChar + alName;
    formObj.submit();
}
function addActiveLinks(alNames) {
    var actionValue = formObj.action;
    var index1 = actionValue.indexOf("?");
    var paramChar = "?";
    if (index1 !== -1)
        paramChar = "&";

    isMyUnload = true;
    formObj.action = actionValue;
    for (var i=0; i<alNames.length; i++){
        formObj.action += paramChar + alNames[i];
    }
    formObj.submit();
}

function clearSubfields(fieldObj, subfieldsDiv, value4Clear, value4NotClear, field2RemoveFromValidation) {
    var found2Clear = false;

    if (value4Clear && fieldObj.value == value4Clear) {
        clearAllInputChildNodes(subfieldsDiv);
        found2Clear = true;
    } else if (value4NotClear && fieldObj.value != value4NotClear) {
        clearAllInputChildNodes(subfieldsDiv);
        found2Clear = true;
    }

    if (found2Clear && field2RemoveFromValidation) {
        removeFieldFromValidation(field2RemoveFromValidation);
    }
}


function getFieldObjByName(formName, fieldName) {
    var fieldObj;
    if (fieldName.indexOf(".value") == -1)
    //		fieldObj = eval("document." + formName + "." + fieldName);
        fieldObj = document.getElementsByName(fieldName);

    else {
        var myFormObj = eval("document." + formName);
        var elementsLength = myFormObj.elements.length;
        for (j = 0; j < elementsLength; j++) {
            fieldObj = myFormObj.elements[j];
            if (fieldObj.name == fieldName)
                break;
            else
                fieldObj = null;
        }
    }

    return fieldObj;
}

function getFieldValueByName(formName, fieldName) {
    var fieldObj;
    if (fieldName.indexOf(".value") == -1) {
        if (isDebug)
            addDebug("getFieldValueByName, is not AL field");

        //		fieldObj = eval("document." + formName + "." + fieldName);
        fieldObj = document.getElementById(fieldName);
        return fieldObj.value;
    } else {
        if (isDebug)
            addDebug("getFieldValueByName, is AL field");

        var myFormObj;
        var formList = eval("document." + formName);

        if(HTMLCollection.prototype.isPrototypeOf(formList)){
            for (var i = 0; i < formList.length; i++) {
                if(formList[i].id==="myStyle"){
                    myFormObj = formList[i];
                    break;
                }
            }
        }
        else {
            myFormObj = formList;
        }
        var elementsLength = myFormObj.elements? myFormObj.elements.length : 0;
        var objArray = new Array();
        for (j = 0; j < elementsLength; j++) {
            fieldObj = myFormObj.elements[j];
            if (fieldObj.name == fieldName) {
                if (isDebug)
                    addDebug("adding field in array");

                objArray.push(fieldObj);
            }
        }

        if (objArray.length == 1) {
            if (isDebug)
                addDebug("exist only one field in array");

            return objArray[0].value;
        } else if (objArray.length > 1) {
            for (j = 0; j < objArray.length; j++) {
                if (objArray[j].checked) {
                    if (isDebug)
                        addDebug("founded matched field in array");

                    return objArray[j].value;
                }
            }

            if (isDebug)
                addDebug("not founded matched field in array");
        } else if (isDebug)
            addDebug("obj array is empty");
    }
}

function keyPress(e, selectOption) {
    var keyID = (window.event) ? event.keyCode : e.keyCode;

    if (keyID == 13) {
        popUp(selectOption);
    }
}

function CreateBookmarkLink() {
    var titlePage;
    var urlPage;
    titlePage = document.title;
    urlPage = window.location.href;
    if (window.sidebar) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(titlePage, urlPage, "");
    } else if (window.external) { // IE Favorite
        window.external.AddFavorite(urlPage, titlePage);
    } else if (window.opera && window.print) { // Opera Hotlist
        return true;
    } else {
        alert("Sorry! Your browser doesn't support this feature.");
    }
}

//Populate the hidden Steps div with the inputs from the Progress Bar. This is necessary in order to put them inside the form
function populateHiddenSteps() {
    var inputArray = $('.step-menu input');
    var inputsHTML;
    $.each(inputArray, function (key, value) {
        inputsHTML = inputsHTML + value.outerHTML
    });
    $('#hidden_steps').html(inputsHTML);
}

//Click the progress bar link, submit the form
function executeHiddenStepSubmit(clickedStep) {
    var submitName = $(clickedStep).find('input').attr('name');
    $('#hidden_steps input[name=' + submitName + ']').trigger('click');
}

//Change the default (nojs) input type from text to date
function textToDate() {

    // Use jquery ui datepicker on dynforms date fields
    var dateFieldsJQUI = $(".textDate-jqui, .textDate");
    $.each(dateFieldsJQUI, function (key, input) {
        $(this).datepicker( { 
            dateFormat:"dd/mm/yy", 
            changeMonth: true,
            changeYear: true, 
            yearRange: "1900:2060",
            beforeShow: function(input, inst) { 
                // fix conflict util.js addClassOnFocus() on ie11
                inst.dpDiv.addClass("jqui-datepicker-show");
            },
            onClose: function (){
                this.focus();
            }
        } ); 
    });

    // Clear datepicker if not valid
    dateFieldsJQUI.blur(function(){
        var el = $(this);
        setTimeout(function () { /* validation here */
            val = el.val();
            var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/g;
            var found = val.match(regex);
            if (!found){
                el.val('');
            }  
        }, 100);
    });

    // Set datepicker language
    if($.datepicker){
        
        var lang;

        if(document.documentElement.lang){
            lang = document.documentElement.lang;
        } else{
            lang = getNavigatorLanguage();
        } 

        if(lang && $.datepicker.regional[lang]){
            $.datepicker.setDefaults( $.datepicker.regional[lang] );
        } else{
            // Fix edge
            $.datepicker.setDefaults( $.datepicker.regional[""] );
        }
    }

    // Disable autocomplete suggestions
    dateFieldsJQUI.attr("autocomplete","off"); 
}

function getNavigatorLanguage() {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
  }