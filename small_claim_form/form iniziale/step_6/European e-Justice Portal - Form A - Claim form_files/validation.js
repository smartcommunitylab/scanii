var fieldsNamesOnBlur = [];
var field2ValidateOnLoad = [];
var alDatefield2ValidateOnLoad = [];
var datefield2ValidateOnLoad = [];
var ajaxRequest;
var formObj;
var validationQue = 0;
var showErrors = true;
function setFormObj() {
    var formsObjs = document.forms;
    var formsObjsLength = formsObjs.length;

    for (var i = 0; i < formsObjsLength; i++) {
        var formName = formsObjs[i].name;
        if (formName.indexOf("dynform_") != -1) {
            formObj = formsObjs[i];
            break;
        }
    }

    addFieldsOnLoad();
    addALDateFieldsOnLoad();
    addDateFieldsOnLoad();
}


function addFields2ValidateOnLoad(fieldName2Add1, fieldName2Add2, fieldName2Add3, fieldName2Add4) {
    field2ValidateOnLoad[field2ValidateOnLoad.length] = [fieldName2Add1, fieldName2Add2, fieldName2Add3, fieldName2Add4];
}

function addALDateFields2ValidateOnLoad(fieldName2Add) {
    alDatefield2ValidateOnLoad.push(fieldName2Add);
}

function addDateFields2ValidateOnLoad(fieldName2Add) {
    //	datefield2ValidateOnLoad.push(fieldName2Add);
}

function addFieldPlaceholder2ValidateOnLoad(fieldName2Add) {
    fieldsNamesOnBlur.push(fieldName2Add);
}

function clearFieldsOnLoad() {
    fieldsNamesOnBlur = [];
    field2ValidateOnLoad = [];
}

function addFieldsOnLoad() {
    for (var i = 0; i < field2ValidateOnLoad.length; i++) {
        var fieldArray = field2ValidateOnLoad[i];
        var fieldName1 = fieldArray[0];
        var fieldName2 = fieldArray[1];
        var fieldName3 = fieldArray[2];
        var fieldName4 = fieldArray[3];

        if (isDebug)
            addDebug("addFieldsOnLoad, checking field=" + fieldName1 + ", related1=" + fieldName2 + ", related2=" + fieldName3 + ", related3=" + fieldName4);

        var fieldObj = getFieldNameObj(fieldName1);

        if (fieldObj && fieldObj.value != "") {
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = fieldObj;
            if (isDebug)
                addDebug("addFieldsOnLoad, field name to add=" + fieldName1 + ", value=" + fieldObj.value);

            if (fieldName2)
                fieldsNamesOnBlur[fieldsNamesOnBlur.length] = getFieldNameObj(fieldName2, 1);
            if (fieldName3)
                fieldsNamesOnBlur[fieldsNamesOnBlur.length] = getFieldNameObj(fieldName3, 1);
            if (fieldName4)
                fieldsNamesOnBlur[fieldsNamesOnBlur.length] = getFieldNameObj(fieldName4, 1);
        } else if (isDebug) {
            if (!fieldObj)
                addDebug("addFieldsOnLoad, error for field name to add=" + fieldName1 + ", has null obj");
            else
                addDebug("addFieldsOnLoad, error for field name to add=" + fieldName1 + ", value is blank");
        }
    }
}

function clearAndAddALDateFields(name) {
    clearALDateFieldsOnLoad();
    var dateName = getDateNamefromFieldName(name);
    //addALDateFields2ValidateOnLoad(dateName);
    addALDateFieldsOnLoad();
}

function getDateNamefromFieldName(fieldName) {
    var patterns = [{
        pattern: /dateDD$|dateDD\d*\[\d+\].value$/i,
        key: "DD"
    }, {
        pattern: /dateMM$|dateMM\d*\[\d+\].value$/i,
        key: "MM"
    }, {
        pattern: /dateYYYY$|dateYYYY\d*\[\d+\].value$/i,
        key: "YYYY"
    }];
    var notFound = true;
    var pattern;
    var index;
    var dateName = fieldName;
    if (fieldName) {
        while ((notFound) && (patterns.length > 0)) {
            pattern = patterns.pop();
            index = dateName.search(pattern.pattern);
            if (index != -1) {
                dateName = dateName.replace(pattern.key, "");
                notFound = false;
            }
        }
    }
    return dateName;
}

function clearALDateFieldsOnLoad() {
    fieldsNamesOnBlur = [];
    alDatefield2ValidateOnLoad = [];
}

function addALDateFieldsOnLoad() {
    for (var i = 0; i < alDatefield2ValidateOnLoad.length; i++) {
        var fieldName2Add = alDatefield2ValidateOnLoad[i];

        if (isDebug)
            addDebug("addALDateFieldsOnLoad, checking field=" + fieldName2Add);

        var charsBetween = "";
        //find chars between Date and [
        if (fieldName2Add.indexOf("Date[") == -1) {
            var index1 = fieldName2Add.indexOf("[");
            var stopSearch = false;
            while (!stopSearch) {
                index1--;
                if (fieldName2Add.charAt(index1) != "e")
                    charsBetween = fieldName2Add.charAt(index1) + charsBetween;
                else
                    stopSearch = true;
            }

            if (isDebug)
                addDebug("addALDateFieldsOnLoad, charsBetween=" + charsBetween);
        }

        var dateStr2Substitute = "Date" + charsBetween + "[";
        var dayFieldObj = getFieldNameObj(fieldName2Add.replace(dateStr2Substitute, "DateDD" + charsBetween + "["));
        var monthFieldObj = getFieldNameObj(fieldName2Add.replace(dateStr2Substitute, "DateMM" + charsBetween + "["));
        var yearFieldObj = getFieldNameObj(fieldName2Add.replace(dateStr2Substitute, "DateYYYY" + charsBetween + "["));

        if (dayFieldObj != null && monthFieldObj != null && yearFieldObj != null) {
            if ((dayFieldObj.value != "") || (monthFieldObj.value != "") || (yearFieldObj.value != "")) {
                if (isDebug)
                    addDebug("addALDateFieldsOnLoad, adding field=" + fieldName2Add);

                fieldsNamesOnBlur.push(fieldName2Add);
            }
        }

    }
}

function clearDateFieldsOnLoad() {
    fieldsNamesOnBlur = [];
    datefield2ValidateOnLoad = [];
}

function addDateFieldsOnLoad() {
    for (var i = 0; i < datefield2ValidateOnLoad.length; i++) {
        var fieldName2Add = datefield2ValidateOnLoad[i];

        if (isDebug)
            addDebug("addDateFieldsOnLoad, checking field=" + fieldName2Add);

        //		var dayFieldObj = eval("document." + formObj.name + "." + fieldName2Add + "DD");
        //		var monthFieldObj = eval("document." + formObj.name + "." + fieldName2Add + "MM");
        //		var yearFieldObj = eval("document." + formObj.name + "." + fieldName2Add + "YYYY");
        var dayFieldObj = document.getElementById(fieldName2Add + "DD");
        var monthFieldObj = document.getElementById(fieldName2Add + "MM");
        var yearFieldObj = document.getElementById(fieldName2Add + "YYYY");

        if (dayFieldObj != null && monthFieldObj != null && yearFieldObj != null) {

            if ((dayFieldObj.value != "") || (monthFieldObj.value != "") || (yearFieldObj.value != "")) {
                if (isDebug)
                    addDebug("addDateFieldsOnLoad, adding field=" + fieldName2Add);

                fieldsNamesOnBlur.push(fieldName2Add);
            }
        }
    }
}

function getFieldName(field) {
    var name = field.name;
    if (!name) {
        name = field;
    }
    return name;
}

function getFieldNameObj(fieldName, isRelated) {

    var fieldObj;
    if (fieldName.indexOf(".value") == -1)
    //		fieldObj = eval("document." + formObj.name + "." + fieldName);
        fieldObj = document.getElementById(fieldName);

    else {
        var elementsLength = formObj.elements.length;
        for (var j = 0; j < elementsLength; j++) {
            fieldObj = formObj.elements[j];
            if (fieldObj.name == fieldName)
                break;
            else
                fieldObj = null;
        }
    }

    if (!fieldObj && isRelated)
        return fieldName;
    else
        return fieldObj;

}
function validateFieldOnBlurmo(check,obj, relatedObjName1, relatedObjName2, relatedObjName3, relatedObjName4, relatedObjName5, relatedObjName6, relatedObjName7, relatedObjName8, relatedObjName9, relatedObjName10) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        addRelatedField(relatedObjName1, obj);
        addRelatedField(relatedObjName2, obj);
        addRelatedField(relatedObjName3, obj);
        addRelatedField(relatedObjName4, obj);
        addRelatedField(relatedObjName5, obj);
        addRelatedField(relatedObjName6, obj);
        addRelatedField(relatedObjName7, obj);
        addRelatedField(relatedObjName8, obj);
        addRelatedField(relatedObjName9, obj);
        addRelatedField(relatedObjName10, obj);
    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        if(check==true){
            showErrors =true;
        }else{
            showErrors=false;
        }
        doValidation();
    }
}
function validateFieldOnBlur(obj, relatedObjName1, relatedObjName2, relatedObjName3, relatedObjName4, relatedObjName5, relatedObjName6, relatedObjName7, relatedObjName8, relatedObjName9, relatedObjName10) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        addRelatedField(relatedObjName1, obj);
        addRelatedField(relatedObjName2, obj);
        addRelatedField(relatedObjName3, obj);
        addRelatedField(relatedObjName4, obj);
        addRelatedField(relatedObjName5, obj);
        addRelatedField(relatedObjName6, obj);
        addRelatedField(relatedObjName7, obj);
        addRelatedField(relatedObjName8, obj);
        addRelatedField(relatedObjName9, obj);
        addRelatedField(relatedObjName10, obj);
    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        doValidation();
    }
}
function validateFieldOnBlurWithoutErrors(obj, relatedObjName1, relatedObjName2, relatedObjName3, relatedObjName4, relatedObjName5, relatedObjName6, relatedObjName7, relatedObjName8, relatedObjName9, relatedObjName10) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        addRelatedField(relatedObjName1, obj);
        addRelatedField(relatedObjName2, obj);
        addRelatedField(relatedObjName3, obj);
        addRelatedField(relatedObjName4, obj);
        addRelatedField(relatedObjName5, obj);
        addRelatedField(relatedObjName6, obj);
        addRelatedField(relatedObjName7, obj);
        addRelatedField(relatedObjName8, obj);
        addRelatedField(relatedObjName9, obj);
        addRelatedField(relatedObjName10, obj);
    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        doValidationWithoutShowingErrors();
    }
}

function clearValidationError(obj){

    jQuery(obj).parent().parent().parent().find(".error").hide();
    jQuery(obj).parent().parent().parent().removeClass("invalid");
}
function validateFieldOnBlurBr(obj, relatedObjName1, relatedObjName2, relatedObjName3, relatedObjName4, relatedObjName5, relatedObjName6, relatedObjName7, relatedObjName8, relatedObjName9, relatedObjName10) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        addRelatedField(relatedObjName1, obj);
        addRelatedField(relatedObjName2, obj);
        addRelatedField(relatedObjName3, obj);
        addRelatedField(relatedObjName4, obj);
        addRelatedField(relatedObjName5, obj);
        addRelatedField(relatedObjName6, obj);
        addRelatedField(relatedObjName7, obj);
        addRelatedField(relatedObjName8, obj);
        addRelatedField(relatedObjName9, obj);
        addRelatedField(relatedObjName10, obj);
    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        doValidation();

    }

}

function validateFieldOnBlur25(obj, relatedObjName1, relatedObjName2, relatedObjName3, relatedObjName4, relatedObjName5, relatedObjName6, relatedObjName7, relatedObjName8, relatedObjName9, relatedObjName10, relatedObjName11,
                               relatedObjName12,
                               relatedObjName13,
                               relatedObjName14,
                               relatedObjName15,
                               relatedObjName16,
                               relatedObjName17,
                               relatedObjName18,
                               relatedObjName19,
                               relatedObjName20,
                               relatedObjName21,
                               relatedObjName22,
                               relatedObjName23,
                               relatedObjName24,
                               relatedObjName25
) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        addRelatedField(relatedObjName1, obj);
        addRelatedField(relatedObjName2, obj);
        addRelatedField(relatedObjName3, obj);
        addRelatedField(relatedObjName4, obj);
        addRelatedField(relatedObjName5, obj);
        addRelatedField(relatedObjName6, obj);
        addRelatedField(relatedObjName7, obj);
        addRelatedField(relatedObjName8, obj);
        addRelatedField(relatedObjName9, obj);
        addRelatedField(relatedObjName10, obj);
        addRelatedField(relatedObjName11, obj);
        addRelatedField(relatedObjName12, obj);
        addRelatedField(relatedObjName13, obj);
        addRelatedField(relatedObjName14, obj);
        addRelatedField(relatedObjName15, obj);
        addRelatedField(relatedObjName16, obj);
        addRelatedField(relatedObjName17, obj);
        addRelatedField(relatedObjName18, obj);
        addRelatedField(relatedObjName19, obj);
        addRelatedField(relatedObjName20, obj);
        addRelatedField(relatedObjName21, obj);
        addRelatedField(relatedObjName22, obj);
        addRelatedField(relatedObjName23, obj);
        addRelatedField(relatedObjName24, obj);
        addRelatedField(relatedObjName25, obj);


    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        doValidation();
    }
}

function validateFieldOnBlur2(obj) {
    if (obj) {
        if (isDebug)
            addDebug("validateFieldOnBlur, field name to add=" + obj.name);

        var existInFieldsNamesOnBlur = false;
        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            if (fieldsNamesOnBlur[i]) {
                var fieldsNamesOnBlurName;
                if (fieldsNamesOnBlur[i].name)
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i].name;
                else
                    fieldsNamesOnBlurName = fieldsNamesOnBlur[i];

                if (fieldsNamesOnBlurName == obj.name) {
                    existInFieldsNamesOnBlur = true;
                    break;
                }
            }
        }

        //add field to validate list
        if (!existInFieldsNamesOnBlur)
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = obj;

        // loop for all argument after the 1st (as 0 is obj)
        for (var i = 1; i < arguments.length; i++) {
            addRelatedField(arguments[i], obj);
        }
    }

    if (isDebug)
        addDebug("validationQue=" + validationQue);

    if (validationQue < 2) {
        validationQue++;
        doValidation();
    }
}

function doValidation(param) {
    if (validationQue == 1) {
        setTimeout("resetValidation()", 2000);

        //create the query string with the fields to validate
        var params = "validate=on_change";

        if (isDebug)
            addDebug("doValidation, fieldsNamesOnBlur.length=" + fieldsNamesOnBlur.length);

        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            var fieldValue;
            var fieldObj;
            var fieldName;
            try {
                fieldObj = fieldsNamesOnBlur[i];

                if (fieldObj) {
                    if (isDebug)
                        addDebug("elaborating field=" + fieldObj + ", field name=" + fieldObj.name + ", field type=" + fieldObj.type);

                    fieldName = fieldObj.name;
                    if (!fieldName) {
                        try {
                            fieldName = fieldObj;
                            //		    		  fieldObj = eval("document." + formObj.name + "." + fieldName);
                            fieldObj = document.getElementById(fieldName);
                            if (!fieldObj) {
                                fieldObj = eval("document." + formObj.name + "." + fieldName);
                            }
                        } catch (e) {
                            if (isDebug)
                                addDebug("adding node " + fieldObj[0].name);

                            if (typeof fieldsNamesOnBlur[i] === "string") {
                                fieldObj = document.getElementsByName(fieldsNamesOnBlur[i])[0];
                                fieldName = fieldObj.name;
                            } else {
                                fieldObj = fieldsNamesOnBlur[i];
                                fieldName = fieldObj[0].name;
                            }
                        }
                    }

                    var fieldType = fieldObj.type;
                    if (isDebug)
                        addDebug("adding req param=" + fieldName + ", type=" + fieldType + ", length=" + fieldObj.length);

                    if ((fieldType == "checkbox") || (fieldType == "radio") ||
                        ((fieldObj.length) && (fieldObj.length > 1) && (fieldType != "select-one" && fieldType != "select-multiple"))) {
                        if (fieldName.indexOf(".value") == -1) {
                            if (isDebug)
                                addDebug("adding req param, type 1.1");

                            //fieldValue = getCheckedValue(eval("document." + formObj.name + "." + fieldName));
                            fieldValue = getCheckedValue(document.getElementsByName(fieldName));
                        } else if (fieldName.indexOf(".value") != -1) {
                            if (isDebug)
                                addDebug("adding req param, type 1.2");

                            fieldValue = getFieldValueByName(formObj.name, fieldName);
                        }
                    } else {
                        if (isDebug)
                            addDebug("adding req param, type 2");

                        if (fieldType == "select-multiple") {
                            var valBuilder = "",
                                brd = "";
                            $.each($(fieldObj).val(), function (i, v) {
                                valBuilder = valBuilder + brd + v;
                                brd = ",465MULTIDIVIDER675,";
                            });
                            fieldValue = valBuilder;
                        } else {
                            fieldValue = fieldObj.value;
                        }

                    }
                }
            } catch (e) {
                fieldValue = null;

                if (isDebug)
                    addDebug("can't get value of " + fieldName + ": " + e);
            }

            if (fieldValue != null) {
                if (isDebug)
                    addDebug("adding value for req param=" + fieldName + ", value=" + fieldValue);

                if (fieldValue.indexOf("selectedLanguages")>-1) {
                    //Params string was returned ready from validation.js
                    params += fieldValue;
                } else {
                    fieldValue = trim(encodeURIComponent(formatNewLine(fieldValue)));
                    params += "&" + fieldName + "=" + fieldValue;
                }
            }
        } //for

        if (isDebug)
            addDebug("fields in submit=" + params);

        //create the request object and submit the data
        ajaxRequest = getXMLHttpRequest();
        ajaxPost(ajaxRequest, formObj, null, params, "elaborateValidationErrors");
    } else {
        if (validationQue <= 0)
            validationQue = 0;
        else if ((validationQue == 2) || (param))
            setTimeout("retryValidation()", 500);
        else if (validationQue > 2)
            validationQue = 2;
    }
}
function doValidationWithoutShowingErrors(param) {
    if (validationQue == 1) {
        setTimeout("resetValidation()", 2000);

        //create the query string with the fields to validate
        var params = "validate=on_change";

        if (isDebug)
            addDebug("doValidationWithout, fieldsNamesOnBlur.length=" + fieldsNamesOnBlur.length);

        for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
            var fieldValue;
            var fieldObj;
            var fieldName;
            try {
                fieldObj = fieldsNamesOnBlur[i];

                if (fieldObj) {
                    if (isDebug)
                        addDebug("elaborating field=" + fieldObj + ", field name=" + fieldObj.name + ", field type=" + fieldObj.type);

                    fieldName = fieldObj.name;
                    if (!fieldName) {
                        try {
                            fieldName = fieldObj;
                            //		    		  fieldObj = eval("document." + formObj.name + "." + fieldName);
                            fieldObj = document.getElementById(fieldName);
                            if (!fieldObj) {
                                fieldObj = eval("document." + formObj.name + "." + fieldName);
                            }
                        } catch (e) {
                            if (isDebug)
                                addDebug("adding node " + fieldObj[0].name);

                            if (typeof fieldsNamesOnBlur[i] === "string") {
                                fieldObj = document.getElementsByName(fieldsNamesOnBlur[i])[0];
                                fieldName = fieldObj.name;
                            } else {
                                fieldObj = fieldsNamesOnBlur[i];
                                fieldName = fieldObj[0].name;
                            }
                        }
                    }

                    var fieldType = fieldObj.type;
                    if (isDebug)
                        addDebug("adding req param=" + fieldName + ", type=" + fieldType + ", length=" + fieldObj.length);

                    if ((fieldType == "checkbox") || (fieldType == "radio") ||
                        ((fieldObj.length) && (fieldObj.length > 1) && (fieldType != "select-one" && fieldType != "select-multiple"))) {
                        if (fieldName.indexOf(".value") == -1) {
                            if (isDebug)
                                addDebug("adding req param, type 1.1");

                            //fieldValue = getCheckedValue(eval("document." + formObj.name + "." + fieldName));
                            fieldValue = getCheckedValue(document.getElementsByName(fieldName));
                        } else if (fieldName.indexOf(".value") != -1) {
                            if (isDebug)
                                addDebug("adding req param, type 1.2");

                            fieldValue = getFieldValueByName(formObj.name, fieldName);
                        }
                    } else {
                        if (isDebug)
                            addDebug("adding req param, type 2");

                        if (fieldType == "select-multiple") {
                            var valBuilder = "",
                                brd = "";
                            $.each($(fieldObj).val(), function (i, v) {
                                valBuilder = valBuilder + brd + v;
                                brd = ",465MULTIDIVIDER675,";
                            });
                            fieldValue = valBuilder;
                        } else {
                            fieldValue = fieldObj.value;
                        }

                    }
                }
            } catch (e) {
                fieldValue = null;

                if (isDebug)
                    addDebug("can't get value of " + fieldName + ": " + e);
            }

            if (fieldValue != null) {
                if (isDebug)
                    addDebug("adding value for req param=" + fieldName + ", value=" + fieldValue);

                if (fieldValue.indexOf("selectedLanguages")>-1) {
                    //Params string was returned ready from validation.js
                    params += fieldValue;
                } else {
                    fieldValue = trim(encodeURIComponent(formatNewLine(fieldValue)));
                    params += "&" + fieldName + "=" + fieldValue;
                }
            }
        } //for

        if (isDebug)
            addDebug("fields in submit=" + params);

        //create the request object and submit the data
        ajaxRequest = getXMLHttpRequest();
        ajaxPost(ajaxRequest, formObj, null, params, "");
    } else {
        if (validationQue <= 0)
            validationQue = 0;
        else if ((validationQue == 2) || (param))
            setTimeout("retryValidationWithout()", 500);
        else if (validationQue > 2)
            validationQue = 2;
    }
}

var retryValidationCount = 0;
var retryValidationCountWithout = 0;
function retryValidation() {
    retryValidationCount++;
    doValidation(1);
}
function retryValidationWithout() {
    retryValidationCountWithout++;
    doValidationWithoutShowingErrors(1);
}
function resetValidation() {
    if (retryValidationCount > 6) {
        validationQue = 1;
        doValidation();
        validationQue = 0;
        retryValidationCount = 0;
    } else if (validationQue > 1) {
        setTimeout("resetValidation()", 2000);
    }
}

// function to calculate sum of fields by the server thru an ajax call
// param: total  the field Id for the result
// arguments[1 to n]: list of field id to compute
function computeSum(total) {
    var numberOfvar = arguments.length;
    var element;
    var fieldToValidate;
    var resultField = document.getElementById(total);
    if (resultField) {
        if (numberOfvar == 1) {
            resultField.value = "0.00";
        } else {
            if (numberOfvar == 2) {
                element = document.getElementById(arguments[1]);
                fieldToValidate = element;
                if (element) {
                    resultField.value = element.value;
                    validateFieldOnBlur(fieldToValidate);
                }
            } else {
                if (numberOfvar > 2) {
                    fieldToValidate = document.getElementById(arguments[1]);
                    var parameters = "compute=sum";
                    for (var i = 1; i < numberOfvar; i++) {
                        element = document.getElementById(arguments[i]);
                        if (element) {
                            paramValue = trim(encodeURIComponent(formatNewLine(element.value)));
                            parameters += "&fieldParam" + i + "=" + paramValue;
                        }
                    }
                    var request = getXMLHttpRequest();
                    ajaxPost(request, formObj, null, parameters, function () {
                        if (request.readyState == 4 && request.status == 200) {
                            var index = request.responseText.indexOf("<result>");
                            if (index != -1) {
                                var indexEnd = request.responseText.indexOf("</result>");
                                var resultTxt = request.responseText.substring(index + 8, indexEnd);
                                resultField.value = resultTxt;
                            }
                            validateFieldOnBlur(fieldToValidate);
                        }
                    });
                }
            }
        }
    }
}

function addRelatedField(relatedObjName, obj) {
    if (relatedObjName) {
        if (relatedObjName == "dateField") {
            var objName = obj.name;
            var index1 = objName.indexOf("YYYY");
            var index2 = objName.indexOf("MM");
            var index3 = objName.indexOf("DD");
            if (index1 != -1)
                relatedObjName = objName.substring(0, index1) + objName.substring(index1 + 4);
            else if (index2 != -1)
                relatedObjName = objName.substring(0, index2) + objName.substring(index2 + 2);
            else if (index3 != -1)
                relatedObjName = objName.substring(0, index3) + objName.substring(index3 + 2);

            if (isDebug)
                addDebug("adding dateField related=" + relatedObjName);
        }

        var existRelatedObjName = false;
        var fieldsNamesOnBlurLength = fieldsNamesOnBlur.length;
        for (var i = 0; i < fieldsNamesOnBlurLength; i++) {
            if (fieldsNamesOnBlur[i]) {
                var relatedFieldsNames = fieldsNamesOnBlur[i].name;
                if (!relatedFieldsNames)
                    relatedFieldsNames = fieldsNamesOnBlur[i];

                if (relatedFieldsNames == relatedObjName) {
                    existRelatedObjName = true;
                    break;
                }
            }
        }

        if (!existRelatedObjName) {
            fieldsNamesOnBlur[fieldsNamesOnBlur.length] = relatedObjName;
        } //if(!existRelatedObjName)
    } //if(relatedObjName)
}


function elaborateValidationErrors() {
    if (isDebug)
        addDebug("in elaborateValidationErrors(), ajaxRequest.readyState=" + ajaxRequest.readyState + ", ajaxRequest.status=" + ajaxRequest.status);

    if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
        try {
            //get response from server
            var responseText = ajaxRequest.responseText;

            //get errors and create the arrays of field names and relative errors
            var validationsResult = new Array(2);
            createValidationErrorsArray(responseText, validationsResult);
            var validationFields = validationsResult[0];
            var validationErros = validationsResult[1];

            //show the validation errors and hide previous validation errors
            showValidationErrors(validationFields, validationErros);
        } catch (ex) {
            if (isDebug) {
                addDebug("exception: " + ex);
            }
        }

        try {
            //call after validation function
            dynformAfterValidation();
        } catch (ex) {}

        validationQue--;
    }
}

function createValidationErrorsArray(validationErrorSrc, validationsResult) {
    //get errors and create the arrays of field names and relative errors
    if (isDebug)
        addDebug("string with validation errors=" + validationErrorSrc);

    var indexLI = 0,
        indexFieldName1 = 0,
        indexFieldName2 = 0,
        indexError = 0,
        indexEndLI = 0;
    var errorsIndex = 0;
    var validationFields = [];
    var validationErros = [];
    while ((indexLI = validationErrorSrc.indexOf("<LI>", indexEndLI)) != -1) {
        indexFieldName1 = validationErrorSrc.indexOf(">", indexLI + 5);
        indexFieldName2 = validationErrorSrc.indexOf("<", indexFieldName1);
        indexError = validationErrorSrc.indexOf(">", indexFieldName2);
        indexEndLI = validationErrorSrc.indexOf("LI>", indexFieldName2);

        if (indexEndLI == -1) {
            if (isDebug)
                addDebug("probably is missing the span from the error message");

            break;
        }

        substring2CheckAjaxError = validationErrorSrc.substring(indexLI, indexEndLI);

        if (substring2CheckAjaxError.indexOf("NotAjax") == -1) {
            fieldName = validationErrorSrc.substring(indexFieldName1 + 1, indexFieldName2);
            fieldError = validationErrorSrc.substring(indexError + 1, indexEndLI - 2);

            validationFields[errorsIndex] = fieldName;
            validationErros[errorsIndex] = fieldError;
            errorsIndex++;
        }
    }

    if (isDebug) {
        addDebug("validationFields=" + validationFields);
        addDebug("validationErros=" + validationErros);
    }

    validationsResult[0] = validationFields;
    validationsResult[1] = validationErros;
}

function showValidationErrors(validationFields, validationErros) {
    //show the validation errors and hide previous validation errors
    for (var i = 0; i < fieldsNamesOnBlur.length; i++) {
        var fieldName;
        var fieldObj = fieldsNamesOnBlur[i];
        var foundError = false;

        if (fieldObj) {
            if (!fieldObj[0]) {
                if (fieldObj.name)
                    fieldName = fieldObj.name;
                else
                    fieldName = fieldObj;
            } else {
                if (fieldObj.name)
                    fieldName = fieldObj.name;
                else if (typeof fieldObj == "string")
                    fieldName = fieldObj;
                else
                    fieldName = "";
            }

            if (isDebug)
                addDebug("checking error for " + fieldName + ", fieldObj=" + fieldObj);

            if (fieldName && fieldName != "") {
                var removeOldError = true;

                //show the validation error
                var validationFieldsLength = validationFields.length;

                var parentElement;
                if (typeof fieldObj == "string") {
                    if (document.getElementsByName(fieldObj)[0]) {
                        parentElement = document.getElementsByName(fieldObj)[0].parentElement.parentElement;
                    } else {
                        parentElement = document.getElementById(fieldObj).parentElement.parentElement;
                    }
                } else {
                    parentElement = fieldObj.parentElement.parentElement;
                }

                for (var j = 0; j < validationFieldsLength; j++) {
                    if (validationFields[j] == fieldName) {
                        if (isDebug)
                            addDebug("found error for field=" + fieldName);

                        checkAmount(fieldObj, fieldName, false);

                        if (typeof parentElement != 'undefined' && parentElement != null) {
                            if (parentElement.className.indexOf("input-wrapper") > -1 &&
                                parentElement.className.indexOf("invalid") == -1) {
                                parentElement.className = parentElement.className.replace("valid", "");
                                parentElement.className += " invalid";
                            }
                        }

                        var divObjErrorText = document.getElementById("validation_error_text_" + fieldName);
                        if (divObjErrorText) {
                            divObjErrorText.innerHTML = validationErros[j];
                            divObjErrorText.className = "error";

                        }

                        // hide the server error text, if it is there, to avoid to display duplicate errors
                        var divObjServerErrorText = document.getElementById("validation_server_error_text_" + fieldName);
                        if (divObjServerErrorText)
                            divObjServerErrorText.className = "df_validation_invisible";

                        removeOldError = false;

                        changeBackgroundRequired(fieldName, fieldObj, "df_mandatory_filled", "df_mandatory", true);

                        foundError = true;
                        break;
                    } //if(validationFields[j] == fieldName)
                } //for j

                //show ok if there are no validations errors; only for the fields that are under validation
                if (removeOldError) {
                    if (isDebug)
                        addDebug("to remove old validation error for field=" + fieldName);

                    removeValidation(fieldName, fieldsNamesOnBlur[i]);
                    if (typeof parentElement != 'undefined' && parentElement != null) {
                        if (parentElement.className.indexOf("input-wrapper") > -1 &&
                            parentElement.className.indexOf("invalid") > -1) {
                            parentElement.className = parentElement.className.replace("invalid", "");
                        }
                    }
                    checkAmount(fieldObj, fieldName, true);
                } //if(removeOldError)

                //change background for required fields
                if (!foundError) {
                    var isEmpty = false;
                    if (fieldObj) {
                        var fieldType = fieldObj.type;
                        switch (fieldType) {
                            case "checkbox":
                            case "radio":
                            case "text":
                            case "textarea": {
                                if (fieldObj.value.length == 0) {
                                    isEmpty = true;
                                }
                            }
                        }
                    }
                    if (isEmpty) {
                        changeBackgroundRequired(fieldName, fieldObj, "df_mandatory_filled", "df_mandatory", true);
                    } else {
                        changeBackgroundRequired(fieldName, fieldObj, "df_mandatory", "df_mandatory_filled", false);
                    }

                } //if(!foundError)
            } //if(fieldName && fieldName != "")
        } //(fieldObj)
        if (!showErrors){
            removeValidation(fieldName, fieldsNamesOnBlur[i]);

    }
    } //for i

}

function visibleErrorIcon(fieldName2Use) {
    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk)
        divObjOk.className = "df_validation_invisible";

    var divObjError = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjError)
        divObjError.className = "df_validation_visible";
}

function visibleOkIcon(fieldName2Use) {
    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk)
        divObjOk.className = "df_validation_visible";

    var divObjError = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjError)
        divObjError.className = "df_validation_invisible";
}

function visibleOkIcon2(fieldName2Use) {
    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk) {
        divObjOk.className = "df_validation_visible";
        divObjOk.src = "images/dynforms/ok-validation.png";
    }


    var divObjError = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjError)
        divObjError.className = "df_validation_invisible";
}

function removeOkIcon(fieldName2Use) {
    //	if(isDebug)
    //        addDebug("removing ok icon for fieldName=" + fieldName2Use);

    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk) {
        divObjOk.className = "df_validation_invisible";
    }
}

function removeValidationIcons(fieldName2Use) {
    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk)
        divObjOk.className = "df_validation_invisible";

    var divObjError = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjError)
        divObjError.className = "df_validation_invisible";
}

function removeOkIcon2(fieldName2Use) {
    //	if(isDebug)
    //        addDebug("removing ok icon for fieldName=" + fieldName2Use);

    var divObjOk = document.getElementById("validation_ok_" + fieldName2Use);
    if (divObjOk) {
        divObjOk.className = "df_validation_invisible";
        divObjOk.src = "images/dynforms/required_blank.png";
    }
}

function restoreOkIcon2(field1) {
    var divObjOk = document.getElementById("validation_ok_" + field1);
    if (divObjOk) {
        var tf = document.getElementById(field1);
        if (tf) {
            var fieldType = tf.type;
            switch (fieldType) {
                case "checkbox":
                    if (tf.checked) {
                        divObjOk.className = "df_validation_visible";
                        divObjOk.src = "images/dynforms/ok-validation.png";
                    }
                case "text":
                    if (tf.value.length > 0) {
                        divObjOk.className = "df_validation_visible";
                        divObjOk.src = "images/dynforms/ok-validation.png";
                    }
                case "select-one":
                    if (tf.value != '') {
                        divObjOk.className = "df_validation_visible";
                        divObjOk.src = "images/dynforms/ok-validation.png";
                    }


            }
        }
    }
}


function toggleOkIcon(fieldNameWoOkIcon, fieldNameWOkIcon) {
    var divObjOk1 = document.getElementById("validation_ok_" + fieldNameWoOkIcon);
    if (divObjOk1) {
        divObjOk1.className = "df_validation_invisible";
        divObjOk1.src = "images/dynforms/required_blank.png";

    }

    var divObjOk = document.getElementById("validation_ok_" + fieldNameWOkIcon);
    if (divObjOk) {
        divObjOk.className = "df_validation_visible";
        divObjOk.src = "images/dynforms/ok-validation.png";
    }

}

function removeErrorIconAndMessage(fieldName2Use) {
    fieldName2Use = getFieldName(fieldName2Use);
    var divObjOk = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjOk && divObjOk!=null)
        divObjOk.className = "df_validation_invisible";

    var divObjErrorText = document.getElementById("validation_error_text_" + fieldName2Use);
    if (divObjErrorText && divObjErrorText!=null) {
        divObjErrorText.className = "df_validation_invisible";
        divObjErrorText.style.display = 'none';
    }

    var divObjServerErrorText = document.getElementById("validation_server_error_text_" + fieldName2Use);
    if (divObjServerErrorText && divObjServerErrorText !=null) {
        divObjServerErrorText.className = "df_validation_invisible";
    }
    var divObjWrapper = document.getElementById("input-wrapper_"+fieldName2Use);
    if(divObjWrapper !=null) {
        divObjWrapper.classList.remove("invalid");
    }

}

function removeErrorMsg4Amount(fieldName2Use) {
    var divObjServerErrorText = document.getElementById("validation_error_text_" + fieldName2Use + "Value");
    if (divObjServerErrorText)
        divObjServerErrorText.className = "df_validation_invisible";

    divObjServerErrorText = document.getElementById("validation_error_text_" + fieldName2Use + "Currency");
    if (divObjServerErrorText)
        divObjServerErrorText.className = "df_validation_invisible";
}

function changeBackgroundRequired(fieldName2Use, fieldObj2Use, oldClass, newClass, addError) {
    if (fieldObj2Use.name) {

        //		if(fieldName2Use.indexOf("DD") == -1 &&
        //		   fieldName2Use.indexOf("MM") == -1 &&
        //		   fieldName2Use.indexOf("YYYY") == -1)
        var dateReg = new RegExp("(DD$|MM$|YYYY$)");
        if (!dateReg.test(fieldName2Use)) {
            if ((addError && jQuery(fieldObj2Use).hasClass("df_mandatory_filled")) ||
                (!addError && jQuery(fieldObj2Use).hasClass("df_mandatory"))) {
                changeClass(fieldObj2Use, oldClass, newClass);
                //fix for autocomplete fields
                if (fieldObj2Use.id && document.getElementById(fieldObj2Use.id.replace(/[\[\]\.]/g, '_') + '_chosen')) {
                    changeClass(document.getElementById(fieldObj2Use.id.replace(/[\[\]\.]/g, '_') + '_chosen'), oldClass, newClass);
                }
            }
        }
    } else if (isDatePlaceHolder(fieldName2Use, fieldObj2Use)) {
        if (isDebug)
            addDebug("elaborating date field=" + fieldName2Use);

        var formName = formObj.name;
        var dateFieldsObjs2Use = isDatePlaceHolder(fieldName2Use, fieldObj2Use);
        var fieldDDObj = dateFieldsObjs2Use.dd;
        var fieldMMObj = dateFieldsObjs2Use.mm;
        var fieldYYYYObj = dateFieldsObjs2Use.yyyy;

        if (fieldDDObj && fieldMMObj && fieldYYYYObj) {
            if (isDebug)
                addDebug("found fields objects for date field=" + fieldName2Use);

            if ((addError && jQuery(fieldDDObj).hasClass("df_mandatory_filled")) ||
                (!addError && jQuery(fieldDDObj).hasClass("df_mandatory"))) {
                changeClass(fieldDDObj, oldClass, newClass);
                changeClass(fieldMMObj, oldClass, newClass);
                changeClass(fieldYYYYObj, oldClass, newClass);
            }

            if ((addError && jQuery(fieldMMObj).hasClass("df_mandatory_filled")) ||
                (!addError && jQuery(fieldMMObj).hasClass("df_mandatory"))) {
                changeClass(fieldMMObj, oldClass, newClass);
            }

            if ((addError && jQuery(fieldYYYYObj).hasClass("df_mandatory_filled")) ||
                (!addError && jQuery(fieldYYYYObj).hasClass("df_mandatory"))) {
                changeClass(fieldYYYYObj, oldClass, newClass);
            }
        }
    }
}

function isDatePlaceHolder(fieldName2Use, fieldObj2Use) {
    if (!fieldObj2Use.name) {
        var indexDate = -1;
        var pattern = /date$|date\d*\[\d+\].value$/i;

        indexDate = fieldName2Use.search(pattern);

        if (indexDate != -1) {
            if (isDebug)
                addDebug("found date placeholder=" + fieldName2Use);

            var string2Replace = fieldName2Use.substring(indexDate, indexDate + 4);

            var formName = formObj.name;
            var dateFieldsObjs = {};

            var subDate1 = fieldName2Use.substring(0, indexDate);
            var subDate2 = fieldName2Use.substring(indexDate + 4);

            var fieldName4DD = subDate1 + string2Replace + "DD" + subDate2;
            dateFieldsObjs.dd = getFieldObjByName(formName, fieldName4DD);

            var fieldName4MM = subDate1 + string2Replace + "MM" + subDate2;
            dateFieldsObjs.mm = getFieldObjByName(formName, fieldName4MM);

            var fieldName4YYYY = subDate1 + string2Replace + "YYYY" + subDate2;
            dateFieldsObjs.yyyy = getFieldObjByName(formName, fieldName4YYYY);

            if (isDebug) {
                addDebug("names for date field " + fieldName2Use + ", dd=" + fieldName4DD + ", mm=" + fieldName4MM + ", yyyy=" + fieldName4YYYY);
                addDebug("names for date field " + fieldName2Use + " by .name, dd=" + dateFieldsObjs.dd.name + ", mm=" + dateFieldsObjs.mm.name + ", yyyy=" + dateFieldsObjs.yyyy.name);
                addDebug("values for date field " + fieldName2Use + ", dd=" + dateFieldsObjs.dd.value + ", mm=" + dateFieldsObjs.mm.value + ", yyyy=" + dateFieldsObjs.yyyy.value);
            }

            return dateFieldsObjs;
        }
    }

    return null;
}

function isEmptyDate(fieldName2Use, fieldObj2Use) {
    var resultIsEmptyDate = false;

    var dateFieldsObjs2Use = isDatePlaceHolder(fieldName2Use, fieldObj2Use);
    if (dateFieldsObjs2Use) {
        var dateFieldsObjs2UseDayValue = dateFieldsObjs2Use.dd.value;
        if (!dateFieldsObjs2UseDayValue) {
            dateFieldsObjs2UseDayValue = dateFieldsObjs2Use.dd[0].value;
        }

        var dateFieldsObjs2UseMonthValue = dateFieldsObjs2Use.mm.value;
        if (!dateFieldsObjs2UseMonthValue) {
            dateFieldsObjs2UseMonthValue = dateFieldsObjs2Use.mm[0].value;
        }

        var dateFieldsObjs2UseYearValue = dateFieldsObjs2Use.yyyy.value;
        if (!dateFieldsObjs2UseYearValue) {
            dateFieldsObjs2UseYearValue = dateFieldsObjs2Use.yyyy[0].value;
        }

        if ((dateFieldsObjs2UseDayValue == "") && (dateFieldsObjs2UseMonthValue == "") && (dateFieldsObjs2UseYearValue == "")) {
            resultIsEmptyDate = true;
        }
    }

    return resultIsEmptyDate;
}

function checkAmount(fieldObj2Use, fieldName2Use, isOk) {
    var indexAmountValue = fieldName2Use.indexOf("AmountValue");
    var indexAmountCurrency = fieldName2Use.indexOf("AmountCurrency");
    var indexValCur = -1;

    if (fieldName2Use.indexOf("dynformEAPO") == 0) {

        var fieldObjRetrieve = document.getElementsByName(fieldName2Use)[0];
        if (fieldObjRetrieve && fieldObjRetrieve.className && fieldObjRetrieve.className.indexOf("df_mutual_exclusive") != -1) {

            if (fieldObjRetrieve.value.length != 0) {
                visibleOkIcon(fieldName2Use);
            } else {
                removeOkIcon(fieldName2Use);
            }

        }
        return;
    }

    if (indexAmountValue != -1)
        indexValCur = indexAmountValue;
    else if (indexAmountCurrency != -1)
        indexValCur = indexAmountCurrency;

    if (indexValCur != -1) {
        var amountFieldName = fieldName2Use.substring(0, indexValCur) + "Amount";
        if (isDebug)
            addDebug("adding icon for amount, fieldName=" + amountFieldName);

        if (!isOk)
            visibleErrorIcon(amountFieldName);
        else {
            var objAmount = eval("document." + formObj.name + "." + amountFieldName + "Value");
            var objCurrency = eval("document." + formObj.name + "." + amountFieldName + "Currency");
            var objAmountValue = objAmount.value;
            var objCurrencyValue = objCurrency.value;
            if (isDebug)
                addDebug("objAmount.value=" + objAmountValue + ", objCurrency.value=" + objCurrencyValue);

            if (objAmountValue != "" && objCurrencyValue != "") {
                visibleOkIcon(amountFieldName);
                removeErrorMsg4Amount(amountFieldName);
            } else {
                removeOkIcon(amountFieldName);
            }

            //set the background based on the paired field
            setAmountBackground(objAmount, objAmountValue, objCurrency, objCurrencyValue);
        }
    } else if (isAmountPlaceHolder(fieldObj2Use, fieldName2Use)) {
        if (isDebug)
            addDebug("is amount placeholder, fieldName=" + fieldName2Use);

        var objAmount = eval("document." + formObj.name + "." + fieldName2Use + "Value");
        var objCurrency = eval("document." + formObj.name + "." + fieldName2Use + "Currency");
        var objAmountValue = objAmount.value;
        var objCurrencyValue = objCurrency.value;

        if (objAmountValue != "" && objCurrencyValue != "")
            visibleOkIcon(fieldName2Use);
        else
            removeOkIcon(fieldName2Use);
        //set the background based on the paired field
        setAmountBackground(objAmount, objAmountValue, objCurrency, objCurrencyValue);
    }
}

function setAmountBackground(objAmount2Use, objAmount2UseValue, objCurrency2Use, objCurrency2UseValue) {
    if (objAmount2UseValue == "" && objCurrency2UseValue == "") {
        changeClass(objAmount2Use, "df_mandatory_when", null);
        changeClass(objAmount2Use, "df_mandatory_filled", null);
        changeClass(objAmount2Use, "df_mandatory", null);
        changeClass(objCurrency2Use, "df_mandatory_when", null);
        changeClass(objCurrency2Use, "df_mandatory_filled", null);
        changeClass(objCurrency2Use, "df_mandatory", null);
        // if (isExplorer7) {
        //     changeClass(objAmount2Use, "fieldfocusmandatory", null);
        //     changeClass(objCurrency2Use, "fieldfocusmandatory", null);
        //     objCurrency2Use.onfocusin = function () {};
        //     objCurrency2Use.onfocusout = function () {};
        // }
    } else if (objAmount2UseValue != "" && objCurrency2UseValue != "") {
        changeClass(objAmount2Use, "df_mandatory_when", "df_mandatory_filled");
        changeClass(objAmount2Use, 'fieldfocusmandatory', null);
        changeClass(objCurrency2Use, "df_mandatory_when", "df_mandatory_filled");
        changeClass(objCurrency2Use, 'fieldfocusmandatory', null);
        // if (isExplorer7) {
        //     objCurrency2Use.onfocusin = function () {
        //         changeClass(this, null, 'fieldfocusmandatory');
        //     };
        //     objCurrency2Use.onfocusout = function () {
        //         changeClass(this, 'fieldfocusmandatory', null);
        //     };
        // }
    } else if (objAmount2UseValue == "" && objCurrency2UseValue != "") {
        changeClass(objAmount2Use, null, "df_mandatory_when");
        changeClass(objAmount2Use, "df_mandatory", null);
        changeClass(objCurrency2Use, "df_mandatory_when", null);
        // if (isExplorer7) {
        //     changeClass(objCurrency2Use, "fieldfocusmandatory", null);
        //     objCurrency2Use.onfocusin = function () {};
        //     objCurrency2Use.onfocusout = function () {};
        // }
    } else if (objAmount2UseValue != "" && objCurrency2UseValue == "") {
        changeClass(objAmount2Use, "df_mandatory_when", null);
        changeClass(objCurrency2Use, null, "df_mandatory_when");
        changeClass(objCurrency2Use, "df_mandatory", null);
        if (isExplorer7) {
            objCurrency2Use.onfocusin = function () {
                changeClass(this, null, 'fieldfocusmandatory');
            };
            objCurrency2Use.onfocusout = function () {
                changeClass(this, 'fieldfocusmandatory', null);
            };
        }
    }
}

function isAmountPlaceHolder(fieldObj2Use, fieldName2Use) {
    var resultIsAmountPlaceHolder = false;

    if (!fieldObj2Use.name) {
        var indexAmount = fieldName2Use.lastIndexOf("Amount");
        if ((indexAmount != -1) && ((indexAmount + 6) == fieldName2Use.length)) {
            if (isDebug)
                addDebug("found amount placeholder=" + fieldName2Use);

            resultIsAmountPlaceHolder = true;
        }
    }

    return resultIsAmountPlaceHolder;
}

function removeValidation(fieldName2Use, fieldsObj2Use, forceRemove) {
    var divObjError = document.getElementById("validation_error_" + fieldName2Use);
    if (divObjError)
        divObjError.className = "df_validation_invisible";

    var divObjErrorText = document.getElementById("validation_error_text_" + fieldName2Use);
    if (divObjErrorText) {
        divObjErrorText.innerHTML = "";
        divObjErrorText.className = "df_validation_invisible";
    }


    // hide also the server error text, if it is there
    var divObjServerErrorText = document.getElementById("validation_server_error_text_" + fieldName2Use);
    if (divObjServerErrorText) {
        divObjServerErrorText.innerHTML = "";
        divObjServerErrorText.className = "df_validation_invisible";
        parentElement.removeClass("invalid");
    }

    /*
    ED switch to new OK icon
    }*/
    var divObjOk = document.getElementById("input-wrapper_" + fieldName2Use);
    //check for invalidated from submit elements
    if (!divObjOk) {
        divObjOk = document.getElementById("input-wrapper_invalid_" + fieldName2Use);

    }

    if (divObjOk) {
        //add valid / remove invalid
        if (divObjOk.className.indexOf("invalid") != -1 || divObjOk.className.indexOf("valid") == -1) {
            divObjOk.className = divObjOk.className.replace("invalid", "");
            divObjOk.className += " valid";
        }

        //remove valid mark from non mandatory empty fields
        if (document.getElementsByName(fieldName2Use)[0]) {
            if (document.getElementsByName(fieldName2Use)[0].value === "") {
                divObjOk.className = divObjOk.className.replace("valid", "");
            }
        }
    }
}

function removeFieldFromValidation(fieldName2Remove1, fieldName2Remove2, fieldName2Remove3, fieldName2Remove4, fieldName2Remove5, fieldName2Remove6) {
    var fieldsNamesOnBlurLength = fieldsNamesOnBlur.length;
    for (var i = 0; i < fieldsNamesOnBlurLength; i++) {
        var fieldObj = fieldsNamesOnBlur[i];

        if (fieldObj) {
            var fielObjName;
            if (fieldObj.name)
                fielObjName = fieldObj.name;
            else
                fielObjName = fieldObj;

            if ((fieldName2Remove1 && fieldName2Remove1 == fielObjName) ||
                (fieldName2Remove2 && fieldName2Remove2 == fielObjName) ||
                (fieldName2Remove3 && fieldName2Remove3 == fielObjName) ||
                (fieldName2Remove4 && fieldName2Remove4 == fielObjName) ||
                (fieldName2Remove5 && fieldName2Remove5 == fielObjName) ||
                (fieldName2Remove6 && fieldName2Remove6 == fielObjName)) {
                fieldsNamesOnBlur[i] = null;
                if (isDebug)
                    addDebug("removed from validation " + fieldName);
            }
        } //if(fieldObj)
    } //for

    if (fieldName2Remove1)
        removeValidation(fieldName2Remove1, null, true);
    if (fieldName2Remove2)
        removeValidation(fieldName2Remove2, null, true);
    if (fieldName2Remove3)
        removeValidation(fieldName2Remove3, null, true);
    if (fieldName2Remove4)
        removeValidation(fieldName2Remove4, null, true);
    if (fieldName2Remove5)
        removeValidation(fieldName2Remove5, null, true);
    if (fieldName2Remove6)
        removeValidation(fieldName2Remove6, null, true);
}

function getElemAL(name) {
    var elem = document.getElementsByName(name);
    if (elem.length) {
        return elem[0];
    }
    return elem;
}

function getElemALById(id) {
    var elem = document.getElementById(id);
    if (elem != null && elem.length) {
        return elem[0];
    }
    return elem;
}

function showErrorValid(item, errorLabel) {
    document.getElementById('validation_error_text_' + item.name).innerHTML = errorLabel;
    document.getElementById('validation_error_text_' + item.name).className = 'df_validation_visible df_validation_error';
}

function hideErrorValid(item) {
    if (document.getElementById('validation_error_text_' + item.name)) {
        document.getElementById('validation_error_text_' + item.name).innerHTML = '';
        document.getElementById('validation_error_text_' + item.name).className = 'df_validation_error';
    }
}

function isEmailValid(input) {
    var base64 = new Base64();
    var action = "validateEmail.do";
    var param = {
        email: base64.encodeBase64(encodeURIComponent(input))
    };

    var valid = false;
    $.ajax({
        url: action,
        data: jsonUtils.jsonParam(param),
        dataType: "json",
        type: "POST",
        async: false,
        success: function (data) {
            var err = data.error;
            if (!err) {
                valid = data.valid && data.valid == "true";
            }
        },
        error: function (xhr, err) {
            valid = false;
        }
    });

    return valid;
}

function validateSpreadWordFormFunction(item, msgTextVar1, msgTextVar2, msgTextVar3, msgTextVar4, msgTextVar5, msgTextVar6, msgTextVar7, msgTextVar8) {
    if (item.name == 'nameTo') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textbox df_mandatory';
            showErrorValid(item, msgTextVar1);
            return false;
        }

    } else if (item.name == 'emailsTo') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {

            if (!isEmailValid(item.value)) {
                visibleErrorIcon(item.name);
                item.className = 'df_textbox df_mandatory';
                showErrorValid(item, msgTextVar3);
                return false;
            }

            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textbox df_mandatory';
            showErrorValid(item, msgTextVar4);
            return false;
        }

    } else if (item.name == 'subject') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            if (getValue2Check(item).length <= 100) {
                visibleOkIcon(item.name);
                item.className = 'df_textbox';
                hideErrorValid(item);
                return true;
            } else {
                visibleErrorIcon(item.name);
                item.className = 'df_textbox df_mandatory';
                showErrorValid(item, msgTextVar5);
                return false;
            }
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textbox df_mandatory';
            showErrorValid(item, msgTextVar6);
            return false;
        }


    } else if (item.name == 'message') {
        if (getValue2Check(item).length <= 600) {
            if (item.value.replace(/^\s+|\s+$/g, '') != '') {
                visibleOkIcon(item.name);
                item.className = 'df_textarea';
                hideErrorValid(item);
            } else {
                removeValidationIcons(item.name);
            }
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textarea';
            showErrorValid(item, msgTextVar7);
            return false;
        }
    } else if (item.name == 'securityCode') {

        var isErrorCaptcha = window.errKeysStr &&
            (window.errKeysStr.indexOf("error.code") != -1 || window.errKeysStr
                .indexOf("errors.captcha") != -1);

        if (getValue2Check(item).length == 0) {
            if (!isErrorCaptcha) {
                visibleErrorIcon(item.name);
                showErrorValid(item, msgTextVar8);
            }
            return false;
        } else {
            hideErrorValid(item);
            removeValidationIcons(item.name);
            return true;
        }
    }


}

function getValue2Check(obj) {
    // count newlines as two characters
    return $(obj).val().replace(/(\r\n|\n|\r)/g, '  ');
}

function validateContactUsFormFunction_new(item, msgTextVar2, msgTextVar3,msgTextVar4,msgTextVar5,msgTextVar6) {
    if (item.name == 'nameContact') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
        }
        return true;


    } else if (item.name == 'emailFrom') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            if (!isEmailValid(item.value)) {
                visibleErrorIcon(item.name);
                item.className = 'df_textbox';
                showErrorValid(item, msgTextVar4);
                return false;
            }

            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
        } else {
            removeValidationIcons(item.name);
            hideErrorValid(item);
        }

        return true;


    } else if (item.name == 'personalConutry') {
        if (item.value != 'Other') {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            hideErrorValid(item);
        }
        return true;


    } else if (item.name == 'language') {
        if (item.value != 'Other') {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            hideErrorValid(item);
        }
        return true;


    } else if (item.name == 'subject') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
        }
        return true;


    } else if (item.name == 'message') {
        if (getValue2Check(item).length <= 600) {
            if (item.value.replace(/^\s+|\s+$/g, '') != '') {
                visibleOkIcon(item.name);
                item.className = 'df_textarea';
                hideErrorValid(item);
            }
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textarea';
            showErrorValid(item, msgTextVar2);
            return false;
        }
    } else if (item.name == 'securityCode') {
        var isErrorCaptcha = window.errKeysStr &&
            (window.errKeysStr.indexOf("error.code") != -1 || window.errKeysStr.indexOf("errors.captcha") != -1);

        if (getValue2Check(item).length == 0) {
            if (!isErrorCaptcha) {
                visibleErrorIcon(item.name);
                showErrorValid(item, msgTextVar3);
            }
            return false;
        } else {
            hideErrorValid(item);
            removeValidationIcons(item.name);
            return true;
        }
    } else if (item.name == 'declarationOfConsent') {
        var isError = $(item).prop("checked") === true;

        if (!isError) {
            // visibleErrorIcon(item.name);
            showErrorValid(item, msgTextVar6);
            return false;
        }

        else {
            hideErrorValid(item);
            removeValidationIcons(item.name);
            return true;
        }
    }


}


function validateContactPointFormFunction(item, msgTextVar1, msgTextVar2,
                                          msgTextVar3, msgTextVar4, msgTextVar5, msgTextVar6, msgTextVar7) {

    if (item.name == 'nameTo') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            hideErrorValid(item);
        }
        return true;

    } else if (item.name == 'emailsTo') {
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {

            if (!isEmailValid(item.value)) {
                visibleErrorIcon(item.name);
                item.className = 'df_textbox df_mandatory';
                showErrorValid(item, msgTextVar2);
                return false;
            }

            visibleOkIcon(item.name);
            item.className = 'df_textbox';
            //hideErrorValid(item);
            removeErrorIconAndMessage(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_textbox df_mandatory';
            showErrorValid(item, msgTextVar3);
            return false;
        }

    } else if (item.name == 'contactpoint') {
        if (item.value != '') {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            //hideErrorValid(item);
            removeErrorIconAndMessage(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_select df_mandatory';
            showErrorValid(item, msgTextVar4);
            return false;
        }
    } else if (item.name == 'region') {
        if (item.value != '') {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            //hideErrorValid(item);
            removeErrorIconAndMessage(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_select df_mandatory';
            showErrorValid(item, msgTextVar5);
            return false;
        }
    } else if (item.name == 'securityCode') {

        var isErrorCaptcha = window.errKeysStr &&
            (window.errKeysStr.indexOf("error.code") != -1 || window.errKeysStr
                .indexOf("errors.captcha") != -1);

        if (getValue2Check(item).length == 0) {
            if (!isErrorCaptcha) {
                visibleErrorIcon(item.name);
                showErrorValid(item, msgTextVar6);
            }
            return false;
        } else {
            hideErrorValid(item);
            removeValidationIcons(item.name);
            return true;
        }
    } else if (item.name == 'territories') {
        if (item.value != '') {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            //hideErrorValid(item);
            removeErrorIconAndMessage(item);
            return true;
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_select df_mandatory';
            showErrorValid(item, msgTextVar7);
            return false;
        }

    }

}

function validateLangPersonalFormFunction(item, msgTextVar1, msgTextVar2) {
    if (item.name == 'intPrimaryLanguageId') {
        var item2 = document.getElementsByName('intSecondaryLanguageId')[0];
        if (item.value.replace(/^\s+|\s+$/g, '') != '') {
            if (item.value == document.getElementsByName('intSecondaryLanguageId')[0].value) {
                visibleErrorIcon(item.name);
                item.className = 'df_select df_mandatory';
                showErrorValid(item, msgTextVar2);
                return false;
            } else {
                visibleOkIcon(item.name);
                item.className = 'df_select';
                hideErrorValid(item);
                visibleOkIcon(item2.name);
                item2.className = 'df_select';
                hideErrorValid(item2);
                return true;
            }
        } else {
            visibleErrorIcon(item.name);
            item.className = 'df_select df_mandatory';
            showErrorValid(item, msgTextVar1);
            return false;
        }


    } else if (item.name == 'intSecondaryLanguageId') {
        var item2 = document.getElementsByName('intPrimaryLanguageId')[0];
        if (item.value == document.getElementsByName('intPrimaryLanguageId')[0].value) {
            visibleErrorIcon(item.name);
            item.className = 'df_select';
            showErrorValid(item, msgTextVar2);
            return false;
        } else {
            visibleOkIcon(item.name);
            item.className = 'df_select';
            hideErrorValid(item);
            visibleOkIcon(item2.name);
            item2.className = 'df_select';
            hideErrorValid(item2);
            return true;
        }
    }
}

//for SC A B D
function activateGreenTick(company, name, surname) {
    var elemCompany = document.getElementById(company);
    var elemName = document.getElementById(name);
    var elemSurname = document.getElementById(surname);

    if (elemCompany && elemName && elemSurname) {
        if (elemCompany.value.length > 0) {
            removeOkIcon2(name);
            removeOkIcon2(surname);
            restoreOkIcon2(company);
        }

        if (elemName.value.length > 0 && elemSurname.value.length > 0) {
            removeOkIcon2(company);
            restoreOkIcon2(name);
            restoreOkIcon2(surname);
        }
    }
}

//Currencies and countries autocomplete proposals validation
function initChosenCountriesList(fieldId, noResultsLabel, placeholderText) {

    var chosenFieldId = fieldId.replace(/[\[\]\.]/g, '_') + '_chosen';

    if (placeholderText == null) {
        $(fieldId).chosen({
            width: "51.3%",
            inherit_select_classes: true,
            search_contains: true,
            no_results_text: noResultsLabel,
            display_disabled_options: false
        });
    } else {
        $(fieldId).chosen({
            width: "51.3%",
            inherit_select_classes: true,
            search_contains: true,
            no_results_text: noResultsLabel,
            placeholder_text_single: placeholderText
        });
    }
    $(chosenFieldId).removeClass('df_select');
    $(fieldId).on('change', function (evt, params) {
        validateFieldOnBlur($(fieldId)[0]);
    });
    $(fieldId).on('chosen:showing_dropdown', function (evt, params) {
        addClassOnFocus(chosenFieldId);
    });
    $(fieldId).on('chosen:hiding_dropdown', function (evt, params) {
        removeClassOnBlur(chosenFieldId);
    });
}

function initChosenCurrenciesList(fieldId, checkBoxId, noResultsLabel, placeholderText) {

    $(checkBoxId).change(function () {
        var validateFlag = $(fieldId).val() != '' || $(fieldId + '_2').val() != '';
        var holdValue = $(fieldId).val();
        if ($(checkBoxId).is(':checked')) {
            $(fieldId).html($(fieldId + '_2').html());
        } else {
            $(fieldId).html($(fieldId + '_1').html());
        }
        $(fieldId).val(holdValue);
        $(fieldId).trigger("chosen:updated");
        if (validateFlag) {
            validateFieldOnBlur($(fieldId)[0]);
        }
    });

    initChosenCountriesList(fieldId, noResultsLabel, placeholderText);

    //When a historic value is selected enable checkbox
    if ($(fieldId + '_2').val() != '' && $(fieldId).val() == '') {
        $(checkBoxId).attr('checked', true);
        $(fieldId).html($(fieldId + '_2').html());
        $(fieldId).trigger("chosen:updated");
    }

}
//<script[^>]*?>[\s\S]*?<\/script>
function getValuesDeleteScripts(form){
    var elems = form.elements;
    for(var j = 0; j < elems.length; j++){
        var type=elems[j].type;
        if(type && type.indexOf("text")>=0){
            elems[j].value= deleteScript(elems[j]);
        }
    }
}

function deleteScript(text)
{ //quita todos los tag
    var texto="";
    texto=text.value.toString();
    var textReturn = "";
    if(texto.indexOf("<")>=0 || texto.indexOf("</")>=0){
        var txtTemp = texto.replace(/<[^>]+>/gi, ' ');
        textReturn = txtTemp.replace(/<s?.+/gi, ' ');
        return textReturn.toString();
    }
    else{
        return texto;
    }
}