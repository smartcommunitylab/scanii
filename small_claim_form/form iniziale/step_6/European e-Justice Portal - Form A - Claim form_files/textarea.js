var isCtrl = false;
var isV = false;
var isMouseClicked = false;
var timeoutObj;
var isSetOnPaste = false;

function checkPaste(event)
{
	if(isDebug)
		addDebug("checkPaste, event=" + event);
	
	if(timeoutObj)
		clearTimeout(timeoutObj);

	if(event.keyCode == 86)
		isV = true;

	if(event.ctrlKey)
		isCtrl = true;
}

function resetCheckPaste()
{
	if(isDebug)
		addDebug("resetCheckPaste");
	
	timeoutObj = null;
	isCtrl = false;
	isV = false;
}


function checkMousePaste(event)
{
	if(isDebug)
		addDebug("checkMousePaste, event.button=" + event.button + ", event.which=" + event.which);
	
	if(event.button != 0) 
	{
		if(isDebug)
			addDebug("checkMousePaste, right click");
		
		isMouseClicked = true;
	}
}

function setOnPaste()
{
	if(isDebug)
		addDebug("setOnPaste");
	
	isSetOnPaste = true;
}

function maxlengthTextarea(event, fieldObj, maxlengthValue)
{

  /* This works only with the modern browsers, keep the old way for backup*/
  document.getElementsByName(fieldObj.name)[0].setAttribute('maxlength', maxlengthValue);

	var fieldValue = fieldObj.value;
	var fieldValueSize = fieldValue.length;
	if(isDebug)
		addDebug("maxlengthTextarea, fieldValueSize=" + fieldValueSize + ", maxlengthValue=" + maxlengthValue);
	
	if(fieldValueSize > maxlengthValue)
	{
		if(isDebug)
			addDebug("maxlengthTextarea, fieldValueSize > maxlengthValue, isPaste, isCtrl=" + isCtrl + ", isV=" + isV + ", isMouseClicked=" + isMouseClicked + ", isSetOnPaste=" + isSetOnPaste);
		
		if(isSetOnPaste)
		{
			if(isDebug)
				addDebug("maxlengthTextarea, isSetOnPaste");
			
			if(isMouseClicked)
			{
				if(isDebug)
					addDebug("maxlengthTextarea, isSetOnPaste, isMouseClicked");
				
				if(fieldValueSize==eval(maxlengthValue)+1)
				{
					if(isDebug)
						addDebug("maxlengthTextarea, isSetOnPaste, fieldValueSize==eval(maxlengthValue)+1");
					
					removeExtChars(fieldObj, fieldValue, maxlengthValue);
				}
				else
				{
					if(isDebug)
						addDebug("maxlengthTextarea, isSetOnPaste, else");
					
					removeJSEvents(fieldObj);
				}
			}
			else
			{
				if(isDebug)
					addDebug("maxlengthTextarea, isSetOnPaste, !isMouseClicked");
				
				if(fieldValueSize > eval(maxlengthValue))
				{
					if(isDebug)
						addDebug("maxlengthTextarea, isSetOnPaste, fieldValueSize > eval(maxlengthValue)");
					
					removeJSEvents(fieldObj);
          removeExtChars(fieldObj, fieldValue, maxlengthValue);

        }
			}
		}//if(isSetOnPaste)
		else
		{
			if(isDebug)
				addDebug("maxlengthTextarea, !isSetOnPaste");
			
			if(isMouseClicked)
			{
				if(isDebug)
					addDebug("maxlengthTextarea, isMouseClicked");
				
				if(fieldValueSize==eval(maxlengthValue)+1)
				{
					if(isDebug)
						addDebug("maxlengthTextarea, isMouseClicked, fieldValueSize==eval(maxlengthValue)+1");
					
					removeExtChars(fieldObj, fieldValue, maxlengthValue);
				}
				else
				{
					if(isDebug)
						addDebug("maxlengthTextarea, isMouseClicked, else");
					
					removeJSEvents(fieldObj);
				}
			}
			else if(isPaste())
			{
				if(isDebug)
					addDebug("maxlengthTextarea, isPaste()");
				
				removeJSEvents(fieldObj);
        removeExtChars(fieldObj, fieldValue, maxlengthValue);


      }
			else
			{
				if(isDebug)
					addDebug("maxlengthTextarea, !isMouseClicked and !isPaste()");
				
				removeExtChars(fieldObj, fieldValue, maxlengthValue);
			}
		}//else for if(isSetOnPaste)
	}//if(fieldValueSize > maxlengthValue)
	
	isSetOnPaste = false;
	isMouseClicked = false;
	timeoutObj = setTimeout("resetCheckPaste()", 300);
}

function removeExtChars(fieldObj, fieldValue, maxlengthValue)
{
	if(isDebug)
		addDebug("removeExtChars");
	
	fieldObj.value = fieldValue.substring(0, maxlengthValue);
}

function removeJSEvents(fieldObj)
{
	if(isDebug)
		addDebug("removeJSEvents");
	
	fieldObj.onpaste = "";
	fieldObj.onmouseup = "";
	fieldObj.onkeydown = "";
	fieldObj.onkeyup = "";
}

function isPaste()
{
	if(isDebug)
		addDebug("isPaste, isCtrl=" + isCtrl + ", isV=" + isV);
	
	if(isCtrl && isV)
		return true;
	else
		return false;
}
