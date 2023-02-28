function getXMLHttpRequest()
{
  var xmlHttpRequest;

  if(window.XMLHttpRequest)
    xmlHttpRequest = new XMLHttpRequest();
  else if(window.ActiveXObject)
    xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");  //xmlHttpRequest = new ActiveXObject("MSXML2.XMLHTTP.3.0");

  return xmlHttpRequest;
}

function getUrl4Ajax(formObj, actionName)
{
  var actionValue = formObj.action;
  var newUrl;

  if(actionName)
  {
    var index1 = actionValue.lastIndexOf("/");
    var index2 = actionValue.indexOf(";");

    var url = actionValue.substring(0, index1);

    var params = "";
    if(index2 != -1)
      params = actionValue.substring(index2);

    newUrl = url + "/" + actionName + params;
  }
  else
    newUrl = actionValue;

  return newUrl;
}

function ajaxGet(ajaxRequest, formObj, actionName, params, callback)
{
  var requestUrl = getUrl4Ajax(formObj, actionName);
  if(requestUrl.indexOf("?") == -1)
    requestUrl += "?";
  else
    requestUrl += "&";

  if(isDebug)
    addDebug("get request url=" + requestUrl);

  requestUrl += params;
  ajaxRequest.open("GET", requestUrl, true);
  ajaxRequest.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  ajaxRequest.onreadystatechange = eval(callback);
  ajaxRequest.send(null);
}

function ajaxGetSync(ajaxRequestSync, formObj, actionName, params)
{
  var requestUrl = getUrl4Ajax(formObj, actionName);
  if(requestUrl.indexOf("?") == -1)
    requestUrl += "?";
  else
    requestUrl += "&";

  if(isDebug)
    addDebug("get request url=" + requestUrl);

  if(params)
	requestUrl += params;

  ajaxRequestSync.open("GET", requestUrl, false);
  ajaxRequestSync.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  ajaxRequestSync.send(null);
  var response;
  if(ajaxRequestSync.readyState == 4 && ajaxRequestSync.status == 200)
  {
    response = ajaxRequestSync.responseText;
  }
  
  return response;
}

function ajaxPost(ajaxRequest, formObj, actionName, params, callback)
{
  var requestUrl = getUrl4Ajax(formObj, actionName);

  if(isDebug)
    addDebug("post request url=" + requestUrl + ", params=" + params + ", callback=" + callback);

  ajaxRequest.open('POST', requestUrl, true);
  ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //ajaxRequest.setRequestHeader("Content-length", params.length);
  //ajaxRequest.setRequestHeader("Connection", "close");
  if (typeof(callback) == "function"){
	  ajaxRequest.onreadystatechange = callback;  
  }else{
	  ajaxRequest.onreadystatechange = eval(callback);
  }
	  
  
  ajaxRequest.send(params);
}

function addDebug(msg)
{
  document.log_form.log.value = document.log_form.log.value + msg + "\n";
  document.log_form.log.scrollTop = document.log_form.log.scrollHeight;
}