function changeValue(name, value) {
    var objs = document.getElementsByName(name);
    for (var i = 0; i < objs.length; i++) {
        objs[i].value = value;
    }
}

function changeValueTextArea(name, value) {
    var objs = document.getElementsByName(name);
    for (var i = 0; i < objs.length; i++) {
        objs[i].value = value;
    }
}


function changeValueRadiosByName(name, value) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        radios[i].value = value;
    }
}
function removeError(divId){
    $('#'+divId).find('.error').hide();
}
function clear_form_elements(class_name) {
    jQuery("#"+class_name).find(".df_expanded").each(function(){
        $(this).removeClass('df_expanded').addClass("df_collapsed");

    });
    jQuery("#"+class_name).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                jQuery(this).val('');
                validateFieldOnBlurmo(false,this);

                break;
            case 'checkbox':
                jQuery(this).attr('checked', false);
                jQuery(this).val('0');
                jQuery(this).change();
                validateFieldOnBlurmo(false,this);

                break;
            case 'radio':
                jQuery(this).attr('checked', false);
                jQuery(this).prop('checked', false);
                validateFieldOnBlurmo(false,this);

                break;
        }
    });
}


function noCheckedByName(idCB) {
    var cbs = document.getElementsByName(idCB);
    for (var i = 0; i < cbs.length; i++) {
        iCb = document.getElementById(cb[i]);
        if (iCb.checked)
            return false;
    }
    return true;
}

function disabled(currentObj) {
    jQuery(currentObj).attr("disabled", true);
}

function enable(currentObj) {
    jQuery(currentObj).attr("disabled", false);
}

function blanckStar(currentObj) {
    if (currentObj.src) {
        currentObj.src = "images/dynforms/required_blank.png";
    } else {
    	currentObj.innerHTML = "";
    }
}
function redStar(currentObj) {
    if (currentObj.src) {
        currentObj.src = "images/dynforms/required.png";
    } else {
    	currentObj.innerHTML = "*";
    }
}
function redStar4JS(currentObj) {
    var star = document.getElementById(currentObj);
    if (star) {
        if (star.src) {
            star.src = "images/dynforms/required.png";
        }
    }
    else{
    	var asterisk = document.getElementById(currentObj);
    	asterisk.innerHTML = "*";
    }
}

function getStarElement(name) {
    var star = document.getElementById('requiredStar_required_' + name);
    if (!star) {
        star = document.getElementById('requiredStar_blank_' + name);
    }
    return star;
}
// function to hide/show star on dependent mandatory fields
function toggleStar(checkboxId, name) {
    var star = getStarElement(name);
    if (star) {
        var checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            if (!checkbox.checked) {
                blanckStar(star);
            } else {
                redStar(star);
            }
        }
    }
}


function toggleStarSelect(selectId, name, analysedValue) {
    var select = document.getElementById(selectId);
    if (select) {
        var selectValue = select.options[select.selectedIndex].value;
        var star = getStarElement(name);
        if (star) {
            if (selectValue != analysedValue) {
                blanckStar(star);
            } else {
                redStar(star);
            }
        }
    }
}

//function to hide/show star on dependent mandatory fields
function toggleStarNotRequired(checkboxId, name) {
    var star = document.getElementById('requiredStar_required_' + name);
    if (star) {
        var checkbox = document.getElementById(checkboxId);
        if (checkbox.checked) {
            blanckStar(star);
        } else {
            redStar(star);
        }
    }
}

//function to hide/show the star on a group of checkboxes (params: array with the checkbox names (ids))
function toggleStarGroupOfCheckBoxes(array) {
    var status = "ok";
    var i;
    for (i = 0; i < array.length; i++) {
        var checkbox = document.getElementById(array[i]);
        if (checkbox) {
            if (checkbox.checked) {
                status = "nok";
            }
        }
    }

    for (i = 0; i < array.length; i++) {
        var checkbox = document.getElementById(array[i]);
        if (checkbox) {
            var star = document.getElementById('requiredStar_required_' + array[i]);
            if (checkbox.checked) {
                if (star) {
                    blanckStar(star);
                }
            }
            else {
                if (star) {
                    if (status == "nok") {
                        blanckStar(star);
                    }
                    else {
                        redStar(star);
                    }
                }
            }
        }
    }
}

function toggleStarsForDiv(divId) {
    var divElement = jQuery("#" + divId);
    var inputCheckBoxFields = jQuery(divElement).find("input:checkbox");
    if (inputCheckBoxFields.length > 0) {
        var group = new Array();
        for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
            var currentObj = inputCheckBoxFields[jj];
            group[jj] = currentObj.id;
        }
        toggleStarGroupOfCheckBoxes(group);
    }
    if (inputCheckBoxFields.length > 0 && formObj) {
        for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
            var currentObj = inputCheckBoxFields[jj];
            validateFieldOnBlur(currentObj);
        }
    }
}


// function to expand or collapse a Div based on the checkbox selection
function checkBoxExpandCollapseDiv(checkboxId, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    if (!checkbox.checked) {
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
        checkbox.value = '0';
    } else if (checkbox.checked) {
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
        checkbox.value = '1';
    }
}
function checkBoxExpandCollapseDivYes(checkboxId, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    if (!checkbox.checked) {
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
        checkbox.value = 'no';
    } else if (checkbox.checked) {
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
        checkbox.value = 'yes';
    }
}

// function to expand or collapse a Div based on the checkbox value from the
// session
function initCheckBoxExpandCollapseDiv(checkboxId, checkboxValue, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    // checkbox.style.visibility = "visible";

    if (checkboxValue == '0') {
        checkbox.checked = false;
        checkbox.value = '0';
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
    } else if (checkboxValue == '1') {
        checkbox.checked = true;
        checkbox.value = '1';
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
    }
}
function initCheckBoxExpandCollapseDivYes(checkboxId, checkboxValue, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    // checkbox.style.visibility = "visible";

    if (checkboxValue == '0') {
        checkbox.checked = false;
        checkbox.value = '0';
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
    } else if (checkboxValue == 'yes') {
        checkbox.checked = true;
        checkbox.value = 'yes';
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
    }
}
function initCheckBoxExpandCollapseDivReverse(checkboxId, checkboxValue, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    checkbox.style.visibility = "visible";

    if (checkboxValue == '1') {
        checkbox.checked = true;
        checkbox.value = '1';
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
    } else if (checkboxValue == '0') {
        checkbox.checked = false;
        checkbox.value = '0';
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
    }
}
// function to expand or collapse a Div based on the checkbox value from the
// session
function initCheckBoxExpandCollapseDivNegative(checkboxId, checkboxValue, divId) {
    var checkbox = document.getElementById(checkboxId);
    var divEl = document.getElementById(divId);
    if (checkbox!==null) {
        checkbox.style.visibility = "visible";

        if (checkboxValue == '1') {
            checkbox.checked = true;
            checkbox.value = '1';
            $(divEl).removeClass("df_expanded");
            $(divEl).addClass("df_collapsed");
        } else if (checkboxValue == '0') {
            checkbox.checked = false;
            checkbox.value = '0';
            $(divEl).removeClass("df_collapsed");
            $(divEl).addClass("df_expanded");
        }
    }
}
//function to expand or collapse a div based on the text field content
// hide div for empty text
function textExpandCollapseDiv(textId, divId) {
    var textField = document.getElementById(textId);
    if (textField) {
        var data = trim(textField.value);
        if (data.length > 0)
            showDiv(divId);
        else
            hideDiv(divId);
    }
}


// function to expand or collapse a Div based on the drop Down value
function dropDownExpandCollapseDiv(dropDownId, divId, value, reverse) {
    var dropDown = document.getElementById(dropDownId);
    var divEl = document.getElementById(divId);
    if ((!reverse && dropDown.value != value) || (reverse && dropDown.value == value)) {
        if ($(divEl).hasClass("df_expanded")) {
            $(divEl).removeClass("df_expanded");
        }

        $(divEl).addClass("df_collapsed");
    } else if ((!reverse && dropDown.value == value) || (reverse && dropDown.value != value)) {
        if ($(divEl).hasClass("df_collapsed")) {
            $(divEl).removeClass("df_collapsed");
        }

        $(divEl).addClass("df_expanded");
    }
}

//function to expand or collapse a Div based on the drop Down value (multi select)
function dropDownExpandCollapseDivMulti(dropDownId, divId, value, reverse) {
    var dropDown = $("#" + dropDownId);
    var divEl = $("#" + divId);
    var match = false;
    $.each(dropDown.val(), function (i, v) {
        if (value == v) {
            match = true;
            //break
            return false;
        }
    });

    if ((!reverse && !match) || (reverse && match)) {
        if (divEl.hasClass("df_expanded")) {
            divEl.removeClass("df_expanded");
        }
        divEl.addClass("df_collapsed");
    } else if ((!reverse && match) || (reverse && !match)) {
        if (divEl.hasClass("df_collapsed")) {
            divEl.removeClass("df_collapsed");
        }

        divEl.addClass("df_expanded");
    }
}


//function to expand or collapse a Div based on the drop Down value from the
//session (multi select)
function initDropDownExpandCollapseDivMulti(dropDownId, divId,
                                            value, reverse) {

    var dropDown = $("#" + dropDownId);
    var divEl = $("#" + divId);

    if (dropDown.length) {

        var match = false;
        $.each(dropDown.val(), function (i, v) {
            if (value == v) {
                match = true;
                //break
                return false;
            }
        });

        dropDown.css("visibility", "visible");

        if ((!reverse && !match) || (reverse && match)) {
            $(divEl).removeClass("df_expanded");
            $(divEl).addClass("df_collapsed");
        } else if ((!reverse && match) || (reverse && !match)) {
            $(divEl).removeClass("df_collapsed");
            $(divEl).addClass("df_expanded");
        }
    }
}


function dropDownExpandCollapseDivOnValues(dropDownId, divId, value1, value2) {
    var dropDown = document.getElementById(dropDownId);
    var divEl = document.getElementById(divId);
    if (dropDown.value != value1 && dropDown.value != value2) {
        if ($(divEl).hasClass("df_expanded")) {
            $(divEl).removeClass("df_expanded");
        }

        $(divEl).addClass("df_collapsed");
    } else if (dropDown.value == value1 || dropDown.value == value2) {
        if ($(divEl).hasClass("df_collapsed")) {
            $(divEl).removeClass("df_collapsed");
        }

        $(divEl).addClass("df_expanded");
    }
}

// function to expand or collapse a Div based on the drop Down value from the
// session
function initDropDownExpandCollapseDiv(dropDownId, dropDownValue, divId, value, reverse) {
    var dropDown = document.getElementById(dropDownId);
    var divEl = document.getElementById(divId);

    if (dropDown) {
        dropDown.style.visibility = "visible";

        if ((!reverse && dropDown.value != value) || (reverse && dropDown.value == value)) {
            $(divEl).removeClass("df_expanded");
            $(divEl).addClass("df_collapsed");
        } else if ((!reverse && dropDown.value == value) || (reverse && dropDown.value != value)) {
            $(divEl).removeClass("df_collapsed");
            $(divEl).addClass("df_expanded");
        }

    }
}

function initDropDownExpandCollapseDivOnValues(dropDownId, dropDownValue,
                                               divId, value1, value2) {
    var dropDown = document.getElementById(dropDownId);
    var divEl = document.getElementById(divId);
    dropDown.style.visibility = "visible";

    if (dropDownValue != value1 && dropDownValue != value2) {
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
    } else if (dropDownValue == value1 || dropDownValue == value2) {
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
    }
}

function showDiv(divId) {
    var divEl = document.getElementById(divId);
    if ($(divEl).hasClass("df_collapsed")) {
        $(divEl).removeClass("df_collapsed");
    }

    $(divEl).addClass("df_expanded");

}
function hideDiv(divId) {
    var divEl = document.getElementById(divId);
    if ($(divEl).hasClass("df_expanded")) {
        $(divEl).removeClass("df_expanded");
    }

    $(divEl).addClass("df_collapsed");
}

function showDivByElement(divElement) {
    divElement.removeClass("df_collapsed");
    divElement.addClass("df_expanded");
}

function hideDivByElement(divElement) {
    divElement.removeClass("df_expanded");
    divElement.addClass("df_collapsed");
    clearAllInputChildNodes(divElement.attr('id'));
}

function showHideRadioDiv(fieldObj, divId, value2Check1, value2Check2, value2Check3) {
    var fieldValue = fieldObj.value;
    if ((fieldObj.checked) &&
        (fieldValue == value2Check1 || fieldValue == value2Check2 || fieldValue == value2Check3))
        showDiv(divId);
    else
        hideDiv(divId);
}

function initRadioExpandCollapseDiv(dropDownValue, divId, value) {
    var divEl = document.getElementById(divId);
    if (dropDownValue != value) {
        $(divEl).removeClass("df_expanded");
        $(divEl).addClass("df_collapsed");
    } else if (dropDownValue == value) {
        $(divEl).removeClass("df_collapsed");
        $(divEl).addClass("df_expanded");
    }
}

function radioIdChecked(el) {
    var radioID = 0;
    for (var i = 0; i < el.length; i++) {
        if (el[i].checked == true) {
            radioID = i;
            break;
        }
    }
    return radioID;
}

//show-hide fields using pair of radio buttons
function initRadioPairDiv(formName, fieldName, divId, showValue, showValue2, showValue3) {
    if (!showValue2)
        showValue2 = showValue;
    if (!showValue3)
        showValue3 = showValue;

    var divObj = document.getElementById(divId);
    var fieldValue = getCheckedValue(getFieldObjByName(formName, fieldName));

    if ((fieldValue != showValue) &&
        (fieldValue != showValue2) &&
        (fieldValue != showValue3)) {
        $(divObj).removeClass("df_expanded");
        $(divObj).addClass("df_collapsed");
    }
    else if ((fieldValue == showValue) ||
        (fieldValue == showValue2) ||
        (fieldValue == showValue3)) {
        $(divObj).removeClass("df_collapsed");
        $(divObj).addClass("df_expanded");
    }
}

function initRadioPair4Hide(formName, fieldName, divId, showValue, showValue2, showValue3) {
    if (!showValue2)
        showValue2 = showValue;
    if (!showValue3)
        showValue3 = showValue;
    var divObj = document.getElementById(divId);
    var fieldValue = getCheckedValue(getFieldObjByName(formName, fieldName));
    if ((fieldValue == showValue) ||
        (fieldValue == showValue2) ||
        (fieldValue == showValue3)) {
        $(divObj).removeClass("df_expanded");
        $(divObj).addClass("df_collapsed");
    }
    else if ((fieldValue != showValue) &&
        (fieldValue != showValue2) &&
        (fieldValue != showValue3)) {
        $(divObj).removeClass("df_collapsed");
        $(divObj).addClass("df_expanded");
    }
}

function initRadioPairDivWithoutField(actualValue, divId, showValue, showValue2, showValue3) {
    if (!showValue2)
        showValue2 = showValue;
    if (!showValue3)
        showValue3 = showValue;

    if ((actualValue != showValue) &&
        (actualValue != showValue2) &&
        (actualValue != showValue3)) {
        hideDiv(divId);
    }
    else if ((actualValue == showValue) ||
        (actualValue == showValue2) ||
        (actualValue == showValue3)) {
        showDiv(divId);
    }
}

function checkClickOnRadio(fieldObj) {
    var initValue = fieldObj.checked;
    if (initValue)
        fieldObj.checked = false;

    return !initValue;
}

function existRadioSelection(fieldObj) {
    var isChecked = getCheckedValue(fieldObj);
    // In case of validationQue>1, this should not remove a selected radio from fieldsNamesOnBlur
    if (isChecked == null || isChecked == '0') {
        removeFieldFromValidation(fieldObj.name);
    }
}

// functions for active links show/hide block
function showBlock(blockIndex) {
	var divObj = document.getElementById("al_block_" + blockIndex);
	
	if (divObj!=null && !divObj.classList.contains('open')){
		divObj.classList.add('open');
	}
}

function hideBlock(blockIndex) {
	var divObj = document.getElementById("al_block_" + blockIndex);
	
	if ( divObj!=null && divObj.classList.contains('open')){
		divObj.classList.remove('open');
	}
}

// populate the section with the date, if invalid clear the label
function dynformSetDateLabel(dynformDateField, dynformDateLabel) {

    var errors = document
        .getElementById('validation_error_text_' + dynformDateField).innerHTML;
    if (errors == '') {
        var dd = document.getElementById(dynformDateField + 'DD').value;
        var mm = document.getElementById(dynformDateField + 'MM').value;
        var yyyy = document.getElementById(dynformDateField + 'YYYY').value;
        if (dd == '')
            dd = "__";
        if (mm == '')
            mm = "__";
        if (yyyy == '')
            yyyy = "__";
        document.getElementById(dynformDateLabel).innerHTML = dd + "/" + mm
            + "/" + yyyy;
    } else
        document.getElementById(dynformDateLabel).innerHTML = "__/__/__";

}

function slideDynamicForm() {
    var slidingDiv = document.getElementById("df_wizard");
    var speed = 40; // increase for faster
    var ua = navigator.userAgent.toLowerCase();
    // browser name
    var isGecko = (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
    var isMozilla = (this.isGecko && ua.indexOf('gecko/') + 14 == ua.length);
    var isIE = ((ua.indexOf('msie') != -1) && (ua.indexOf('opera') == -1) && (ua
        .indexOf('webtv') == -1));
    var isSafari = (ua.indexOf('safari') != -1);
    var isOpera = (ua.indexOf('opera') != -1);
    if (isIE)
        speed = 70;

    if (parseInt(slidingDiv.style.left) > 0) {
        slidingDiv.style.left = parseInt(slidingDiv.style.left) - speed + "px";
        setTimeout(slideDynamicForm, 1);
    } else
        slidingDiv.style.left = "0px";
}

function toggleDisabled(checkingElement, parentElement) {
    var checkbox = document.getElementById(checkingElement);
    if (checkbox) {
        if (checkbox.checked) {
            enabledAllInputChildNodes(parentElement);
        } else {
            disabledAllInputChildNodes(parentElement);
        }
    }
}

function disableElementAndRemoveErrorIconAndMessage(currentObj) {
    if (currentObj) {
        disableElement(currentObj);
        var name = getFieldName(currentObj);
        removeErrorIconAndMessage(name);
        if (name.search(/dateDD$|dateDD\d*\[\d+\].value$/i) != -1) {
            removeErrorIconAndMessage(getDateNamefromFieldName(name));
            removeOkIcon2(getDateNamefromFieldName(name));
        }
    }
}
function disableElementWithout(currentObj) {
    disableElement(currentObj, false);
}
function disableElement(currentObj, forceEnable) {
    forceEnable = (typeof forceEnable === "undefined") ? true : forceEnable;
    if (currentObj) {
        var fieldType = currentObj.type;
        switch (fieldType) {
            case "checkbox":
            case "radio":
                currentObj.checked = false;
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_mandatory_filled") != -1) {
                    var star = getStarElement(currentObj.id);
                    if (!star) {
                        star = getStarElement(currentObj.name);
                    }
                    if (star) {
                        blanckStar(star);
                    }
                    currentObj.className = objClassName.replace("df_mandatory_filled", "df_disabled_mandatory");
                } else {
                    if (objClassName.indexOf("df_mandatory") != -1) {
                        var star = getStarElement(currentObj.id);
                        if (!star) {
                            star = getStarElement(currentObj.name);
                        }
                        if (star) {
                            blanckStar(star);
                        }
                        currentObj.className = objClassName.replace("df_mandatory", "df_disabled_mandatory");
                        currentObj.parentElement.parentElement.classList.remove('invalid');                        
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", true);
                }
                break;
            case "text":
            case "date":
            case "textarea":
                if (forceEnable) {
                    currentObj.value = "";
                }
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_mandatory_filled") != -1) {
                    var star = getStarElement(currentObj.name);
                    if (star) {
                        blanckStar(star);
                    }
                    currentObj.className = objClassName.replace("df_mandatory_filled", "df_disabled_mandatory");
                } else {
                    if (objClassName.indexOf("df_mandatory") != -1) {
                        var star = getStarElement(currentObj.name);
                        if (star) {
                            blanckStar(star);
                        }
                        currentObj.className = objClassName.replace("df_mandatory", "df_disabled_mandatory");  
                        currentObj.parentElement.parentElement.classList.remove('invalid');
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", true);
                }
                break;
            case "select-one":
            case "select":
                currentObj.selectedIndex = 0;
                var pattern = /dateDD$|dateDD\d*\[\d+\].value$/i;
                var name = currentObj.name;
                var dateObjName = currentObj.name;
                var indexDate = name.search(pattern);
                if (indexDate != -1) {
                    dateObjName = name.substring(0, indexDate + 4);
                    pattern = /DD\d*\[\d+\].value$/i;
                    indexDate = name.search(pattern);
                    if (indexDate != -1) {
                        dateObjName = dateObjName + name.substring(indexDate + 2);
                    }
                }
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_mandatory_filled") != -1) {
                    var star = getStarElement(dateObjName);
                    if (star) {
                        blanckStar(star);
                    }
                    currentObj.className = objClassName.replace("df_mandatory_filled", "df_disabled_mandatory");
                } else {
                    if (objClassName.indexOf("df_mandatory") != -1) {
                        var star = getStarElement(dateObjName);
                        if (star) {
                            blanckStar(star);
                        }
                        currentObj.className = objClassName.replace("df_mandatory", "df_disabled_mandatory");
                        currentObj.parentElement.parentElement.classList.remove('invalid');
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", true);
                }
                break;
            default:
                break;

        }
        clearValidationMark(currentObj.name);
    }
}
function clearValidationMark(name) {
    var okMark = document.getElementById('validation_ok_' + name);
    if (okMark) {
        okMark.className = "df_validation_invisible";
    }
    okMark = document.getElementById('validation_error_text_' + name);

    if (okMark) {
        okMark.className = "df_validation_invisible";
        document.getElementById('validation_error_text_' + name).innerHTML = "";
    }
}
function voidElement(currentObj) {
}
function enableElementWithout(currentObj) {
    enableElement(currentObj, false);
}
function enableElement(currentObj, forceEnable) {
    forceEnable = (typeof forceEnable === "undefined") ? true : forceEnable;
    if (currentObj) {
        var fieldType = currentObj.type;
        switch (fieldType) {
            case "date":
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(currentObj.name);
                    if (star) {
                        redStar(star);
                    }

                    if (currentObj.value != "") {
                        objClassName = currentObj.className;
                        currentObj.className = objClassName.replace("df_mandatory", "df_mandatory_filled");
                    }

                    if (currentObj.className.indexOf("df_mandatory_filled") == -1) {
                        //ED:enable the element and display red border
                        jQuery(jq_escape("#input-wrapper_" + currentObj.name)).addClass("invalid");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
            case "checkbox":
            case "radio":
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(currentObj.id);
                    if (!star) {
                        star = getStarElement(currentObj.name);
                    }
                    if (star) {
                        redStar(star);
                    }
                    if (currentObj.className.indexOf("df_mandatory_filled") == -1) {
                        //ED:enable the element and display red border
                        jQuery(jq_escape("#input-wrapper_" + currentObj.name)).addClass("invalid");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            case "text":
            case "textarea":
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(currentObj.name);
                    if (star) {
                        redStar(star);
                    }

                    if (currentObj.value != "") {
                        objClassName = currentObj.className;
                        currentObj.className = objClassName.replace("df_mandatory", "df_mandatory_filled");
                    }
                    if (currentObj.className.indexOf("df_mandatory_filled") == -1) {
                        //ED:enable the element and display red border
                        jQuery(jq_escape("#input-wrapper_" + currentObj.name)).addClass("invalid");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            case "select-one":
            case "select":
                var pattern = /dateDD$|dateDD\d*\[\d+\].value$/i;
                var name = currentObj.name;
                var dateObjName = currentObj.name;
                var indexDate = name.search(pattern);
                if (indexDate != -1) {
                    dateObjName = name.substring(0, indexDate + 4);
                    pattern = /DD\d*\[\d+\].value$/i;
                    indexDate = name.search(pattern);
                    if (indexDate != -1) {
                        dateObjName = dateObjName + name.substring(indexDate + 2);
                    }
                }
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(dateObjName);
                    if (star) {
                        redStar(star);
                    }
                    if (currentObj.selectedIndex != 0) {
                        objClassName = currentObj.className;
                        currentObj.className = objClassName.replace("df_mandatory", "df_mandatory_filled");
                    }
                    if (currentObj.className.indexOf("df_mandatory_filled") == -1) {
                        //ED:enable the element and display red border
                        jQuery(jq_escape("#input-wrapper_" + currentObj.name)).addClass("invalid");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            default:
                break;

        }
    }
}

function enableElement2(currentObj, forceEnable) {
    forceEnable = (typeof forceEnable === "undefined") ? true : forceEnable;
    if (currentObj) {
        var fieldType = currentObj.type;
        switch (fieldType) {
            case "checkbox":
            case "radio":
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(currentObj.id);
                    if (!star) {
                        star = getStarElement(currentObj.name);
                    }
                    if (star) {
                        redStar(star);
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            case "text":
            case "textarea":
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(currentObj.name);
                    if (star) {
                        redStar(star);
                    }

                    if (currentObj.value != "") {
                        objClassName = currentObj.className;
                        currentObj.className = objClassName.replace("df_mandatory", "df_mandatory");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            case "select-one":
            case "select":
                var pattern = /dateDD$|dateDD\d*\[\d+\].value$/i;
                var name = currentObj.name;
                var dateObjName = currentObj.name;
                var indexDate = name.search(pattern);
                if (indexDate != -1) {
                    dateObjName = name.substring(0, indexDate + 4);
                    pattern = /DD\d*\[\d+\].value$/i;
                    indexDate = name.search(pattern);
                    if (indexDate != -1) {
                        dateObjName = dateObjName + name.substring(indexDate + 2);
                    }
                }
                var objClassName = currentObj.className;
                if (objClassName.indexOf("df_disabled_mandatory") != -1) {
                    currentObj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
                }
                if (currentObj.className.indexOf("df_mandatory") != -1) {
                    var star = getStarElement(dateObjName);
                    if (star) {
                        redStar(star);
                    }
                    if (currentObj.selectedIndex != 0) {
                        objClassName = currentObj.className;
                        currentObj.className = objClassName.replace("df_mandatory", "df_mandatory");
                    }
                }
                if (forceEnable) {
                    jQuery(currentObj).attr("disabled", false);
                }
                break;
            default:
                break;

        }
    }
}
function initSelect(objName) {
    initBackground4Select(objName, 0);
    var select = document.getElementById(objName);
    if (select) {
        switch (select.type) {
            case "select-one":
            case "select":
                if (select.value != "" && select.value != null) {
                    visibleOkIcon(objName, objName);
                }
                break;
            default:
                break;
        }
    }
}

function initBackground4Select(selectId, idx) {
    var select = document.getElementById(selectId);
    if (select) {
        switch (select.type) {
            case "select-one":
            case "select":
                if (select.selectedIndex != idx) {
                    var objClassName = select.className;
                    if (objClassName.indexOf("df_mandatory") != -1) {
                        select.className = objClassName.replace("df_mandatory", "df_mandatory_filled");
                    }
                }
                break;
            default:
                break;
        }
    }
}
function selectIsIdx(selectId, idx) {
    var check = false;
    var sel = document.getElementById(selectId);
    if (sel) {
        switch (sel.type) {
            case "select-one":
                if (sel.selectedIndex == idx) {
                    check = true;
                }
                break;
        }
    }
    return check;
}

function processAllinputChildNodes(parentElement, processMethod) {
    if (processMethod) {
        var pattern = '#' + parentElement + ' :input';
        $(pattern).each(function (index) {
            processMethod(this);
        });
    }
}
function processAllIndexChildNodes(parentElement, processMethod) {
    if (processMethod) {
        var pattern = 'div[id^=' + parentElement + ']';
        $(pattern).each(function (index) {
            processAllinputChildNodes(this.id, processMethod);
        });
    }
}

function atLeastOnIs(checkListIds, trueValue) {
    var returnValue = false;
    if ($.isArray(checkListIds)) {
        var enableValue;
        var elem;
        var checkObj;
        if (trueValue) {
            enableValue = trueValue;
        } else {
            enableValue = true;
        }
        while ((checkListIds.length > 0) && (!returnValue)) {
            elem = checkListIds.pop();
            checkObj = document.getElementById(elem);
            if (checkObj) {
                switch (checkObj.type) {
                    case "checkbox":
                    case "radio":
                        if (checkObj.checked == enableValue) {
                            returnValue = true;
                        }
                        break;
                    default:
                }
            }
        }
    }
    return returnValue;
}
function initProcessAllInputChildNodes(divId, trueMethod, falseMethod, checkId, trueValue) {
    var enableValue;
    var checkObj;
    var methodToRun = trueMethod;
    if (trueValue) {
        enableValue = trueValue;
    } else {
        enableValue = true;
    }
    checkObj = document.getElementById(checkId);
    if (checkObj) {
        switch (checkObj.type) {
            case "checkbox":
            case "radio":
                if (checkObj.checked != enableValue) {
                    methodToRun = falseMethod;
                }
                break;
            case "select":
            case "select-one":
                if (checkObj.value != enableValue) {
                    methodToRun = falseMethod;
                }
                break;
            case "text":
                if (checkObj.value.length == 0) {
                    methodToRun = falseMethod;
                }
            default:
                break;
        }
        processAllinputChildNodes(divId, methodToRun);
    }

}
function enabledAllInputChildNodes(parentElement) {
    var divElement = jQuery("#" + parentElement);

    var inputTextAreaFields = jQuery(divElement).find("textarea");
    var inputTextFields = jQuery(divElement).find("input:text");
    var inputRadioFields = jQuery(divElement).find("input:radio");
    var inputCheckBoxFields = jQuery(divElement).find("input:checkbox");
    var inputSelectFields = jQuery(divElement).find("select");
    var imgElements = jQuery(divElement).find("img");
    var paragraphElements = jQuery(divElement).find("p");

    if (inputTextAreaFields.length > 0) {
        for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
            var currentObj = inputTextAreaFields[jj];

            jQuery(currentObj).attr("disabled", false);
            //	currentObj.value = "";
            changeClassName(currentObj);
            //	removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputTextFields.length > 0) {
        for (var jj = 0; jj < inputTextFields.length; jj++) {
            var currentObj = inputTextFields[jj];
            jQuery(currentObj).attr("disabled", false);
            //	currentObj.value = "";
            changeClassName(currentObj);
            var currentObjName = currentObj.name;
            //	removeFieldFromValidation(currentObjName);
        }
    }

    if (inputRadioFields.length > 0) {
        for (var jj = 0; jj < inputRadioFields.length; jj++) {
            var currentObj = inputRadioFields[jj];
            jQuery(currentObj).attr("disabled", false);
            //	currentObj.checked = false;
            //	removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputCheckBoxFields.length > 0) {
        for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
            var currentObj = inputCheckBoxFields[jj];
            jQuery(currentObj).attr("disabled", false);
            //	currentObj.checked = false;
            //	removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputSelectFields.length > 0) {
        for (var jj = 0; jj < inputSelectFields.length; jj++) {
            var currentObj = inputSelectFields[jj];
            //jQuery(inputSelectFields[jj]).find('option:first').attr('selected','selected').parent('select');
            changeClassName(currentObj);
            jQuery(currentObj).attr("disabled", false);

            /*
             var currentObjName = currentObj.name;
             removeFieldFromValidation(currentObjName);

             var currentObjNameIndex1 = currentObjName.indexOf("DateDD");
             if(currentObjNameIndex1 != -1)
             {
             var currentObjNameIndex2 = currentObjName.indexOf("[");
             var dateObjName;
             if(currentObjNameIndex2 == -1)
             {
             dateObjName = currentObjName.substring(0, currentObjNameIndex1) + "Date";
             }
             else
             {
             var dateObjName1 = currentObjName.substring(0, currentObjNameIndex1);
             var dateObjName2 = currentObjName.substring(currentObjNameIndex2);
             dateObjName = dateObjName1 + "Date" + dateObjName2;
             }
             removeFieldFromValidation(dateObjName);
             if(isDebug)
             addDebug("date field to remove from validation=" + dateObjName);
             }
             */

        }
    }

    /*	if (imgElements.length > 0) {
     for (jj = 0; jj < imgElements.length; jj++) {
     if (jQuery(imgElements[jj]).hasClass('df_validation_invisible')) {
     jQuery(imgElements[jj]).removeClass('df_validation_invisible').addClass('df_validation_visible');
     }
     }
     }

     if (paragraphElements.length > 0) {
     for (jj = 0; jj < paragraphElements.length; jj++) {
     if (jQuery(paragraphElements[jj]).hasClass('df_validation_error_visible') ||
     jQuery(paragraphElements[jj]).hasClass('df_validation_error'))
     {
     jQuery(paragraphElements[jj]).html('');
     }
     }
     }*/
}


function disabledAllInputChildNodes(parentElement) {
    var divElement = jQuery("#" + parentElement);

    var inputTextAreaFields = jQuery(divElement).find("textarea");
    var inputTextFields = jQuery(divElement).find("input:text");
    var inputRadioFields = jQuery(divElement).find("input:radio");
    var inputCheckBoxFields = jQuery(divElement).find("input:checkbox");
    var inputSelectFields = jQuery(divElement).find("select");
    var imgElements = jQuery(divElement).find("img");
    var paragraphElements = jQuery(divElement).find("p");

    if (inputTextAreaFields.length > 0) {
        for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
            var currentObj = inputTextAreaFields[jj];
            currentObj.value = "";
            changeClassName(currentObj);
            removeFieldFromValidation(currentObj.name);
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (inputTextFields.length > 0) {
        for (var jj = 0; jj < inputTextFields.length; jj++) {
            var currentObj = inputTextFields[jj];
            currentObj.value = "";
            changeClassName(currentObj);
            var currentObjName = currentObj.name;
            removeFieldFromValidation(currentObjName);
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (inputRadioFields.length > 0) {
        for (var jj = 0; jj < inputRadioFields.length; jj++) {
            var currentObj = inputRadioFields[jj];
            currentObj.checked = false;
            removeFieldFromValidation(currentObj.name);
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (inputCheckBoxFields.length > 0) {
        for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
            var currentObj = inputCheckBoxFields[jj];
            currentObj.checked = false;
            removeFieldFromValidation(currentObj.name);
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (inputSelectFields.length > 0) {
        for (var jj = 0; jj < inputSelectFields.length; jj++) {
            var currentObj = inputSelectFields[jj];
            jQuery(inputSelectFields[jj]).find('option:first').attr('selected', 'selected').parent('select');
            changeClassName(currentObj);
            var currentObjName = currentObj.name;
            removeFieldFromValidation(currentObjName);

            var currentObjNameIndex1 = currentObjName.indexOf("DateDD");
            if (currentObjNameIndex1 != -1) {
                var currentObjNameIndex2 = currentObjName.indexOf("[");
                var dateObjName;
                if (currentObjNameIndex2 == -1) {
                    dateObjName = currentObjName.substring(0, currentObjNameIndex1) + "Date";
                }
                else {
                    var dateObjName1 = currentObjName.substring(0, currentObjNameIndex1);
                    var dateObjName2 = currentObjName.substring(currentObjNameIndex2);
                    dateObjName = dateObjName1 + "Date" + dateObjName2;
                }
                removeFieldFromValidation(dateObjName);
                if (isDebug)
                    addDebug("date field to remove from validation=" + dateObjName);
            }
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (imgElements.length > 0) {
        for (var jj = 0; jj < imgElements.length; jj++) {
            if (jQuery(imgElements[jj]).hasClass('df_validation_visible')) {
                jQuery(imgElements[jj]).removeClass('df_validation_visible').addClass('df_validation_invisible');
            }
        }
    }

    if (paragraphElements.length > 0) {
        for (var jj = 0; jj < paragraphElements.length; jj++) {
            if (jQuery(paragraphElements[jj]).hasClass('df_validation_error_visible') ||
                jQuery(paragraphElements[jj]).hasClass('df_validation_error')) {
                jQuery(paragraphElements[jj]).html('');
            }
        }
    }
}


/*
 * Clear all input child nodes below the given parent div element
 */
function clearAllInputChildNodes(parentElement) {
    var divElement = jQuery("#" + parentElement);
    if(divElement !== undefined) {
        var inputTextAreaFields = jQuery(divElement).find("textarea");
        var inputTextFields = jQuery(divElement).find("input:text");
        var inputRadioFields = jQuery(divElement).find("input:radio");
        var inputCheckBoxFields = jQuery(divElement).find("input:checkbox");
        var inputSelectFields = jQuery(divElement).find("select");
        var imgElements = jQuery(divElement).find("img");
        var paragraphElements = jQuery(divElement).find("p");
        var inputHiddenFields = jQuery(divElement).find("input[type=hidden]");
        var inputDateFields = jQuery(divElement).find("input[type=date]");

        if (inputDateFields.length > 0) {
            for (var jj = 0; jj < inputDateFields.length; jj++) {
                var currentObj = inputDateFields[jj];
                currentObj.value = "";
                changeClassName(currentObj);
                removeFieldFromValidation(currentObj.name);
            }
        }

        if (inputTextAreaFields.length > 0) {
            for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
                var currentObj = inputTextAreaFields[jj];
                currentObj.value = "";
                changeClassName(currentObj);
                removeFieldFromValidation(currentObj.name);
            }
        }

        if (inputTextFields.length > 0) {
            for (var jj = 0; jj < inputTextFields.length; jj++) {
                var currentObj = inputTextFields[jj];
                currentObj.value = "";
                changeClassName(currentObj);
                var currentObjName = currentObj.name;
                removeFieldFromValidation(currentObjName);
            }
        }

        if (inputRadioFields.length > 0) {
            for (var jj = 0; jj < inputRadioFields.length; jj++) {
                var currentObj = inputRadioFields[jj];
                currentObj.checked = false;
                jQuery(currentObj).prop("checked", false);
                removeFieldFromValidation(currentObj.name);
            }
        }

        if (inputCheckBoxFields.length > 0) {
            for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
                var currentObj = inputCheckBoxFields[jj];
                currentObj.checked = false;
                jQuery(currentObj).prop("checked", false);

                currentObj.value = "0";

                removeFieldFromValidation(currentObj.name);
            }
        }

        if (inputSelectFields.length > 0) {
            for (var jj = 0; jj < inputSelectFields.length; jj++) {
                var currentObj = inputSelectFields[jj];
                jQuery(inputSelectFields[jj]).find('option:first').attr('selected', 'selected').parent('select');
                changeClassName(currentObj);
                var currentObjName = currentObj.name;
                removeFieldFromValidation(currentObjName);

                var currentObjNameIndex1 = currentObjName.indexOf("DateDD");
                if (currentObjNameIndex1 != -1) {
                    var currentObjNameIndex2 = currentObjName.indexOf("[");
                    var dateObjName;
                    if (currentObjNameIndex2 == -1) {
                        dateObjName = currentObjName.substring(0, currentObjNameIndex1) + "Date";
                    }
                    else {
                        var dateObjName1 = currentObjName.substring(0, currentObjNameIndex1);
                        var dateObjName2 = currentObjName.substring(currentObjNameIndex2);
                        dateObjName = dateObjName1 + "Date" + dateObjName2;
                    }
                    removeFieldFromValidation(dateObjName);
                    if (isDebug)
                        addDebug("date field to remove from validation=" + dateObjName);
                }
            }
        }

        if (imgElements.length > 0) {
            for (var jj = 0; jj < imgElements.length; jj++) {
                if (jQuery(imgElements[jj]).hasClass('df_validation_visible')) {
                    jQuery(imgElements[jj]).removeClass('df_validation_visible').addClass('df_validation_invisible');
                }
            }
        }

        if (paragraphElements.length > 0) {
            for (var jj = 0; jj < paragraphElements.length; jj++) {
                if (jQuery(paragraphElements[jj]).hasClass('df_validation_error_visible') ||
                    jQuery(paragraphElements[jj]).hasClass('df_validation_error')) {
                    jQuery(paragraphElements[jj]).html('');
                }
            }
        }

        if (inputHiddenFields.length > 0) {
            for (var jj = 0; jj < inputHiddenFields.length; jj++) {
                var currentObj = inputHiddenFields[jj];
                currentObj.value = "";
                var currentObjName = currentObj.name;
                removeFieldFromValidation(currentObjName);
            }
        }
    }
}
function clear_form_elements(class_name) {
    jQuery("#"+class_name).find(".df_expanded").each(function(){
        $(this).removeClass('df_expanded').addClass("df_collapsed");

    });
    jQuery("#"+class_name).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                jQuery(this).val('');


                break;
            case 'checkbox':
                jQuery(this).attr('checked', false);
                jQuery(this).val('0');
                jQuery(this).change();


                break;
            case 'radio':
                jQuery(this).attr('checked', false);
                jQuery(this).prop('checked', false);
                validateFieldOnBlurmo(false,this);

                break;
        }
    });
}
function clearAllInputChildNodesSDF1(parentElement) {
    var divElement = jQuery("#" + parentElement);

    var inputTextAreaFields = jQuery(divElement).find("textarea");
    var inputTextFields = jQuery(divElement).find("input:text");
    var inputRadioFields = jQuery(divElement).find("input:radio");
    var inputCheckBoxFields = jQuery(divElement).find("input:checkbox");
    var inputSelectFields = jQuery(divElement).find("select");
    var imgElements = jQuery(divElement).find("img");
    var paragraphElements = jQuery(divElement).find("p");
    var inputHiddenFields = jQuery(divElement).find("input[type=hidden]");
    var inputDateFields = jQuery(divElement).find("input[type=date]");
	
    if (inputDateFields.length > 0) {
        for (var jj = 0; jj < inputDateFields.length; jj++) {
            var currentObj = inputDateFields[jj];
            currentObj.value = "";
            changeClassName(currentObj);
            removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputTextAreaFields.length > 0) {
        for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
            var currentObj = inputTextAreaFields[jj];
            currentObj.value = "";
            changeClassName(currentObj);
            removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputTextFields.length > 0) {
        for (var jj = 0; jj < inputTextFields.length; jj++) {
            var currentObj = inputTextFields[jj];
            currentObj.value = "";
            changeClassName(currentObj);
            var currentObjName = currentObj.name;
            removeFieldFromValidation(currentObjName);
        }
    }

    if (inputRadioFields.length > 0) {
        for (var jj = 0; jj < inputRadioFields.length; jj++) {
            var currentObj = inputRadioFields[jj];
			currentObj.checked = false;
            removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputCheckBoxFields.length > 0) {
        for (var jj = 0; jj < inputCheckBoxFields.length; jj++) {
            var currentObj = inputCheckBoxFields[jj];
            currentObj.checked = false;
            jQuery(currentObj).prop("checked",false);
            jQuery(currentObj).attr('checked', false);
			jQuery(currentObj).change();
            removeFieldFromValidation(currentObj.name);
        }
    }

    if (inputSelectFields.length > 0) {
        for (var jj = 0; jj < inputSelectFields.length; jj++) {
            var currentObj = inputSelectFields[jj];
            jQuery(inputSelectFields[jj]).find('option:first').attr('selected', 'selected').parent('select');
            changeClassName(currentObj);
            var currentObjName = currentObj.name;
            removeFieldFromValidation(currentObjName);

            var currentObjNameIndex1 = currentObjName.indexOf("DateDD");
            if (currentObjNameIndex1 != -1) {
                var currentObjNameIndex2 = currentObjName.indexOf("[");
                var dateObjName;
                if (currentObjNameIndex2 == -1) {
                    dateObjName = currentObjName.substring(0, currentObjNameIndex1) + "Date";
                }
                else {
                    var dateObjName1 = currentObjName.substring(0, currentObjNameIndex1);
                    var dateObjName2 = currentObjName.substring(currentObjNameIndex2);
                    dateObjName = dateObjName1 + "Date" + dateObjName2;
                }
                removeFieldFromValidation(dateObjName);
                if (isDebug)
                    addDebug("date field to remove from validation=" + dateObjName);
            }
        }
    }

    if (imgElements.length > 0) {
        for (var jj = 0; jj < imgElements.length; jj++) {
            if (jQuery(imgElements[jj]).hasClass('df_validation_visible')) {
                jQuery(imgElements[jj]).removeClass('df_validation_visible').addClass('df_validation_invisible');
            }
        }
    }

    if (paragraphElements.length > 0) {
        for (var jj = 0; jj < paragraphElements.length; jj++) {
            if (jQuery(paragraphElements[jj]).hasClass('df_validation_error_visible') ||
                jQuery(paragraphElements[jj]).hasClass('df_validation_error')) {
                jQuery(paragraphElements[jj]).html('');
            }
        }
    }

    if (inputHiddenFields.length > 0) {
        for (var jj = 0; jj < inputHiddenFields.length; jj++) {
            var currentObj = inputHiddenFields[jj];
            currentObj.value = "";
            var currentObjName = currentObj.name;
            removeFieldFromValidation(currentObjName);
        }
    }
}
function switchClassName(obj) {
    var objClassName = obj.className;
    if (objClassName.indexOf("df_mandatory") != -1) {
        obj.className = objClassName.replace("df_mandatory", "df_disabled_mandatory");
        obj.parentElement.parentElement.classList.remove('invalid');
    } else {
        if (objClassName.indexOf("df_disabled_mandatory") != -1) {
            obj.className = objClassName.replace("df_disabled_mandatory", "df_mandatory");
        }
    }

}
function changeClassName(obj) {
    var objClassName = obj.className;
    if (objClassName.indexOf("df_mandatory_filled")) {
        obj.className = objClassName.replace("df_mandatory_filled", "df_mandatory");
        //ED beta provide mandatory indication with invalid class until an ajax request
        jQuery(jq_escape("#input-wrapper_" + obj.name)).removeClass("invalid").removeClass("valid");
    }

}

/*
 * Hide the given div and all subdivs below that contain css class name
 * df_expanded
 */
function hideAllDivBelow(divId) {
    var divElement = jQuery("#" + divId);
    if (jQuery(divElement).hasClass('df_expanded')) {
        jQuery(divElement).removeClass('df_expanded').addClass('df_collapsed');
    }

    var subDivElements = jQuery(divElement).find("div");
    if (subDivElements.length > 0) {
        for (var i = 0; i < subDivElements.length; i++) {
            if (jQuery(subDivElements[i]).hasClass('df_expanded')) {
                jQuery(subDivElements[i]).removeClass('df_expanded').addClass(
                    'df_collapsed');
            }
        }
    }
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function formatNewLine(text) {
    var doublenewlinesRE = /([^\n])\n([^\n])/g;
    text = text.replace(/(\r\n|\r|\n)/g, '\n');
    return text.replace(doublenewlinesRE, "$1\n\n$2");
}

function recalculateHour(element) {
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

    var str = jQuery(element).val();
    if (numberRegex.test(str)) {
        if (str.length == 1 && str >= 0 && str <= 9) {
            jQuery(element).val('0' + str);
        }
    }

}
//The setRadio(radioName, value) function sets the 
//active radio button that matches the value.
function setRadio(radioName, value) {
    // Parameters:
    // "radio" is a radio button name object, 
    // "value" is the radio button to activate
    var radio = document.getElementsByName(radioName);
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].value == value) {
            radio[i].checked = true;
        } else {
            radio[i].checked = false;
        }
    }
}
function addClassOnFocus(element) {
    if (jQuery(element).hasClass('df_mandatory') ||
        jQuery(element).hasClass('df_mandatory_filled') ||
        jQuery(element).hasClass('df_mandatory_when')) {
        jQuery(element).addClass('fieldfocusmandatory');
    } else
        jQuery(element).addClass('fieldfocus');
    if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/)
        || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
            if(!$( "#ui-datepicker-div" ).hasClass( "jqui-datepicker-show" )){
                document.getElementById('ui-datepicker-div').style.display='none';
            }           
    }
}

function removeClassOnBlur(element) {
    jQuery(element).removeClass('fieldfocusmandatory');
    jQuery(element).removeClass('fieldfocus');
}

function changeClass(fieldObj, oldClass, newClass) {
    if (oldClass)
        jQuery(fieldObj).removeClass(oldClass);

    if (newClass)
        jQuery(fieldObj).addClass(newClass);
}

function disabledOnly(parentElement) {
    var divElement = jQuery("#" + parentElement);

    var inputTextAreaFields = jQuery(divElement).find("textarea");
    var inputTextFields = jQuery(divElement).find("input:text");

    if (inputTextAreaFields.length > 0) {
        for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
            var currentObj = inputTextAreaFields[jj];
            jQuery(currentObj).attr("disabled", true);
        }
    }

    if (inputTextFields.length > 0) {
        for (var jj = 0; jj < inputTextFields.length; jj++) {
            var currentObj = inputTextFields[jj];
            jQuery(currentObj).attr("disabled", true);
        }
    }
}

function changeMandatoryFields() {
    var divElement = jQuery("form");
    var inputTextAreaFields = jQuery(divElement).find("textarea");
    var inputTextFields = jQuery(divElement).find("input:text");
    var inputSelectFields = jQuery(divElement).find("select");

    if (inputTextAreaFields.length > 0) {
        for (var jj = 0; jj < inputTextAreaFields.length; jj++) {
            var currentObj = inputTextAreaFields[jj];
            changeMandatoryClassName(currentObj);
        }
    }

    if (inputTextFields.length > 0) {
        for (var jj = 0; jj < inputTextFields.length; jj++) {
            var currentObj = inputTextFields[jj];
            changeMandatoryClassName(currentObj);
        }
    }

    if (inputSelectFields.length > 0) {
        for (var jj = 0; jj < inputSelectFields.length; jj++) {
            var currentObj = inputSelectFields[jj];
            changeMandatoryClassName(currentObj);
        }
    }
}
function toogleCheckbox(checkbox){
	if(checkbox.checked){
		checkbox.value="1";
	}else{
		checkbox.value="0";
	}
}
function toggleCheckboxRadioValues(checkbox){
    if(checkbox.checked){
        checkbox.value="yes";
    }else{
        checkbox.value="no";
    }
}
function toggleCheckboxesValueYes(obj){
    if(obj.checked){
        if (obj.value!=="on") {
            obj.value = "1";
        }
        obj.checked = true;
        jQuery(obj).prop("checked",true);
        jQuery(obj).attr('checked', true);

    }else{
        obj.value="no";
        obj.checked = false;
        jQuery(obj).prop("checked",false);
        jQuery(obj).attr('checked', false);


    }
}
function changeMandatoryClassName(obj) {
    var objClassName = obj.className;
    if (objClassName.indexOf("df_mandatory_nojs") != -1) {
        obj.className = objClassName.replace("df_mandatory_nojs", "df_mandatory");
    }
    if (objClassName.indexOf("df_mandatory_filled_nojs") != -1) {
        obj.className = objClassName.replace("df_mandatory_filled_nojs", "df_mandatory_filled");
    }
}

function removeErrorRadio(divId) {
    $("#" + divId).find(".error").hide();
}

function jq_escape(myid) {
    return myid.replace(/(:|\.|\[|\]|,)/g, "\\$1");

}


// Trigger onChangeFunction on last selected radio
function radiosChange(form, radioName, onChangeFunction){

    var rad = document[form][radioName];
    var prev = null;
    for(var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function() {
            // (prev)? console.log(prev.value) : null;
            if (prev && typeof prev[onChangeFunction] === "function") { 
                prev[onChangeFunction]();
            } 
            if(this !== prev) {
                prev = this;
            }
            // console.log(this.value);

        });
    }
}

function scrollIntoFirstError( timeout, scrollToParent ){

    var scrollOptions = {block : "center"};
	setTimeout(function(){
		$("form .error").each(function() {
			if ($(this).html().trim().length > 0) {
                if(scrollToParent){
                    // Scroll to parent element
                    $(this).parent().get(0).scrollIntoView(scrollOptions);
                } else{
                    // Scroll to element
                    this.scrollIntoView(scrollOptions);
                }
                return false; // exit each
			}   
		});
	}, timeout);
}

function disableSelectSameValue(form, sourceSelect, targetSelect){     
    document[form][sourceSelect].addEventListener('change', function() { 
        setSelectOptionDisabled(targetSelect, $(this).val() )
    });
    document[form][targetSelect].addEventListener('change', function() { 
        setSelectOptionDisabled(sourceSelect, $(this).val() )
    });
}
function setSelectOptionDisabled(targetSelect, value){
    $('select[name='+targetSelect+']').children().removeAttr('disabled');
    $('select[name='+targetSelect+']').children('option[value="' + value + '"]').attr('disabled', true); 
}
 
$(document).ready(function(){
    $(".invalid").parents(".js-toggle").addClass("open");
    $(".error").each(function(){
        if($(this).html().trim() !== "") {
            $(this).parents(".js-toggle").addClass("open");
        }
    });

    $('.sticky-sidebar').find(':focusable').keyup(function(e){
        if(e.keyCode === 9) {

            var $stickySidebarOffsetTop = parseInt($('.sidebar .sticky-wrapper .sticky-sidebar').css('top'));
            if(!$stickySidebarOffsetTop) {
                $stickySidebarOffsetTop = 0;
            }

            var $isElementInViewport = isElementInViewport($(this)[0], $stickySidebarOffsetTop);

            var $contentbarFocusableElements = $('.content-bar').find(':focusable');

            if($isElementInViewport === "top") {
                $contentbarFocusableElements[0].scrollIntoView();
            } else if($isElementInViewport === "bottom") {
                $contentbarFocusableElements[$contentbarFocusableElements.length-1].scrollIntoView(false);
            }
        }
    });
});

function isElementInViewport (el, stickySidebarOffsetTop) {

    var rect = el.getBoundingClientRect();

    if (rect.top < 0) {
        return "top";
    }

    if (rect.bottom - stickySidebarOffsetTop > (window.innerHeight || document.documentElement.clientHeight)) {
        return "bottom";
    }

    return "okay";
}
function showHideNameField(obj) {
    if(obj) {
        var divEl = document.getElementById('input-wrapper_dynformSCA8DateSignatureName');
        if ($('#dynformSCA1sender option:selected').attr('class') == "legal") {
            $(divEl).parent().parent().show();
        } else {
            clearAllInputChildNodes(divEl.id);
            $(divEl).parent().parent().hide();
        }
    }
}