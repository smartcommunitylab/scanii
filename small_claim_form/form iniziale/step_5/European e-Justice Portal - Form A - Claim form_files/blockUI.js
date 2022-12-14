var fileDownloadCheckTimer;
	      
function cacheSessionAjaxCall() {
  
  $.ajax({
    type:    "POST",
    url:     "cache_session_ajax.do",
    async:   false,
    dataType: "text",
    success: function(data) {
      loggerAjaxCall("cacheSessionAjaxCall OK");
    },
    error:   function (jqXHR, textStatus, errorThrown) {
      loggerAjaxCall("cacheSessionAjaxCall ERROR");
      throw "error"; 
    }
  });
  
}

function blockUIForDownloadFlash() {
    $.blockUI();
    loggerAjaxCall("FlashButtonLogger blockUIForDownload start");
    cacheSessionAjaxCall();
    loggerAjaxCall("blockUIForDownload end");
}

function blockUIForDownload() {
    $.blockUI();
}

function blockUIForDownloadOfSignedPdfFlash() {
    window.isSignedPdfXml = true;
    $.blockUI();
    loggerAjaxCall("blockUIForDownloadOfSignedPdf start");
    cacheSessionAjaxCall();
    loggerAjaxCall("blockUIForDownloadOfSignedPdf end");
}

function blockUIForDownloadOfSignedPdf() {
    window.isSignedPdfXml = true;
    $.blockUI();
}

function blockUIForSubmitBtn() {
    var token = new Date().getTime();
    $('#download_token_value_id').val(token);
    //alert($('#download_token_value_id_' + target).val());
    $.blockUI();

    fileDownloadCheckTimer = window.setInterval(function () {
        $.ajax({
            type: "GET",
            url: "getDownloadStatus.do",
            data: { CheckDownloadStatusToken: $("input[name='download_token_value_id']").val()} ,
            async: true,
            dataType: "text",
            success: function (data) {
                var cookieValue = data
                if (cookieValue == "true")
                    finishForSubmitBtn();
            }
        });
    }, 1000);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function finishDownload() {
	$.unblockUI();
	$('div').remove('#please_wait_icon');
}

function finishForSubmitBtn() {
	//alert('finishDownload');
	$.unblockUI();
	$('div').remove('#please_wait_icon');
	window.clearInterval(fileDownloadCheckTimer);
	$.cookie('fileDownloadToken', null); 
}
	      
function existenceDiv(){
	var layoutdiv;
	layoutdiv = document.getElementById("layout");
	var cachediv;
	cachediv = document.getElementById("cache");
		      
	if (layoutdiv && cachediv) {
		return true; 
	}else{
		return false;
	}
}