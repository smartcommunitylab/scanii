var uploadResultDebug;
var isHtmlVersion=false;

function loggerAjaxCall(logText) {
  
  $.ajax({
    type:    "POST",
    url:     "log_js_session_ajax.do?message="+logText,
    async:   false,
    dataType: "text",
    success: function(data) {
    },
    error:   function (jqXHR, textStatus, errorThrown) {
      throw "error"; 
    }
  });
  
}

function uploadShowHtmlVersion()
{
  isHtmlVersion=true;
  // Store user selected html version
  if(window.sessionStorage){
    sessionStorage.setItem('isHtmlVersion', isHtmlVersion);
  }
  var uploadDivObj = document.getElementById("uploadDiv");
  var uploadDivErrorMsgObj = document.getElementById("upload_error_msg");
  var uploadDivErrorMsgPdfObj = document.getElementById("upload_error_msg_pdf");
  var uploadDivFallbackObj = document.getElementById("uploadDivFallback");
  var uploadDivMsgHtmlVersionObj = document.getElementById("upload_div_show_html_version");
  var uploadDivMsgFlashVersionObj = document.getElementById("upload_div_show_flash_version");
  var flashUploadObj = document.getElementById("load_draft_flash_obj");
  var htmlUploadObj = document.getElementById("load_draft_html_obj");
  
  if(uploadDivObj)
    uploadDivObj.className = "my_hidden_abs";
  if(uploadDivErrorMsgObj)
    uploadDivErrorMsgObj.className = "my_hidden_abs";
  if(uploadDivErrorMsgPdfObj)
	  uploadDivErrorMsgPdfObj.className = "my_hidden_abs";
  if(uploadDivFallbackObj)
    uploadDivFallbackObj.className = "inline_display";
  if(uploadDivMsgHtmlVersionObj)
    uploadDivMsgHtmlVersionObj.className = "my_hidden_abs";
  if(uploadDivMsgFlashVersionObj)
    uploadDivMsgFlashVersionObj.className = "my_show_rel";
  if(htmlUploadObj)
    htmlUploadObj.className = "inline_display";
  if(flashUploadObj)
    flashUploadObj.className = "my_hidden_abs";
}
function uploadShowHtmlVersionPdf()
{
    isHtmlVersion=true;
    // Store user selected html version
    if(window.sessionStorage){
        sessionStorage.setItem('isHtmlVersion', isHtmlVersion);
    }
    var uploadDivObjPdf = document.getElementById("uploadDivPdf");
    var fileupload = document.getElementById("fileuploadversion");
     var showhtml = document.getElementById("showhtmlversion");
    var uploadDivErrorMsgObjPdf = document.getElementById("upload_error_msg");
    var uploadDivErrorMsgPdfObjPdf = document.getElementById("upload_error_msg_pdf");
    var uploadDivFallbackObjPdf = document.getElementById("uploadDivFallbackPdf");
    var uploadDivMsgHtmlVersionObjPdf = document.getElementById("upload_div_show_html_versionPdf");
    var uploadDivMsgFlashVersionObjPdf = document.getElementById("upload_div_show_flash_versionPdf");
    var flashUploadObjPdf = document.getElementById("load_pdf_flash_obj");
    var htmlUploadObjPdf = document.getElementById("load_pdf_html_obj");

    // if(uploadDivObjPdf)
    //     uploadDivObjPdf.className = "my_hidden_abs";

    if(fileupload) {
        fileupload.classList.remove("my_hidden_abs");
        fileupload.classList.add("df_description_normal");
    }
    if(showhtml) {
        showhtml.classList.add("my_hidden_abs");
    }
    if(uploadDivErrorMsgObjPdf)
        uploadDivErrorMsgObjPdf.className = "my_hidden_abs";
    if(uploadDivErrorMsgPdfObjPdf)
        uploadDivErrorMsgPdfObjPdf.className = "my_hidden_abs";
    if(uploadDivFallbackObjPdf)
        uploadDivFallbackObjPdf.className = "inline_display";
    if(uploadDivMsgHtmlVersionObjPdf)
        uploadDivMsgHtmlVersionObjPdf.className = "my_hidden_abs";
    if(uploadDivMsgFlashVersionObjPdf)
        uploadDivMsgFlashVersionObjPdf.className = "my_show_rel";
    if(htmlUploadObjPdf)
        htmlUploadObjPdf.className = "inline_display";
    if(flashUploadObjPdf)
        flashUploadObjPdf.className = "my_hidden_abs";
}


function uploadShowFileUploadVersion()
{
  isHtmlVersion=false;  
  // Store user selected html version
  if(window.sessionStorage){
    sessionStorage.setItem('isHtmlVersion', isHtmlVersion);
  }
  var uploadDivObj = document.getElementById("uploadDiv");
  var uploadDivFallbackObj = document.getElementById("uploadDivFallback");
  var uploadDivErrorMsgHtmlObj = document.getElementById("upload_error_msg_html");
  var uploadDivMsgHtmlVersionObj = document.getElementById("upload_div_show_html_version");
  var uploadDivMsgFlashVersionObj = document.getElementById("upload_div_show_flash_version");
  var flashUploadObj = document.getElementById("load_draft_flash_obj");
  var htmlUploadObj = document.getElementById("load_draft_html_obj");

  if(uploadDivObj)
    uploadDivObj.className = "my_show_rel";
  if(uploadDivFallbackObj)
    uploadDivFallbackObj.className = "no_display";
  if(uploadDivErrorMsgHtmlObj)
    uploadDivErrorMsgHtmlObj.className = "my_hidden_abs";
  if(uploadDivMsgHtmlVersionObj)
    uploadDivMsgHtmlVersionObj.className = "my_show_rel";
  if(uploadDivMsgFlashVersionObj)
    uploadDivMsgFlashVersionObj.className = "my_hidden_abs";
  if(flashUploadObj)
    flashUploadObj.className = "my_show_rel";
  if(htmlUploadObj)
    htmlUploadObj.className = "no_display";
}
function uploadShowFileUploadVersionPdf()
{
    isHtmlVersion=false;
    // Store user selected html version
    if(window.sessionStorage){
        sessionStorage.setItem('isHtmlVersion', isHtmlVersion);
    }
    var fileUploadVersion=document.getElementById("fileuploadversion");
    var showhtml=document.getElementById("showhtmlversion");
    var uploadDivObjPdf = document.getElementById("uploadDivPdf");
    var uploadDivFallbackObjPdf = document.getElementById("uploadDivFallbackPdf");
    var uploadDivErrorMsgHtmlObjPdf = document.getElementById("upload_error_msg_htmlPdf");
    var uploadDivMsgHtmlVersionObjPdf = document.getElementById("upload_div_show_html_versionPdf");
    var uploadDivMsgFlashVersionObjPdf = document.getElementById("upload_div_show_flash_versionPdf");
    var flashUploadObjPdf = document.getElementById("load_pdf_flash_obj");
    var htmlUploadObjPdf = document.getElementById("load_pdf_html_obj");
    if(fileUploadVersion){
        fileUploadVersion.classList.add("my_hidden_abs");
        showhtml.classList.remove("my_hidden_abs");
    }
    if(uploadDivObjPdf)
        uploadDivObjPdf.className = "my_show_rel";
    if(uploadDivFallbackObjPdf)
        uploadDivFallbackObjPdf.className = "no_display";
    if(uploadDivErrorMsgHtmlObjPdf)
        uploadDivErrorMsgHtmlObjPdf.className = "my_hidden_abs";
    if(uploadDivMsgHtmlVersionObjPdf)
        uploadDivMsgHtmlVersionObPdfj.className = "my_show_rel";
    if(uploadDivMsgFlashVersionObjPdf)
        uploadDivMsgFlashVersionObjPdf.className = "my_hidden_abs";
    if(flashUploadObjPdf)
        flashUploadObjPdf.className = "my_show_rel";
    if(htmlUploadObjPdf)
        htmlUploadObjPdf.className = "no_display";
}

function submitUpload(){
  if(!isHtmlVersion){
    $("#fileupload").submit();
  }
}
function submitUpload2(){
  if(!isHtmlVersion){
    $("#fileupload2").submit();
  }
}

function uploadShowFlashVersion()
{
    var uploadDivObj = document.getElementById("uploadDiv");
    var uploadDivFallbackObj = document.getElementById("uploadDivFallback");
    var uploadDivErrorMsgHtmlObj = document.getElementById("upload_error_msg_html");
    var uploadDivMsgHtmlVersionObj = document.getElementById("upload_div_show_html_version");
    var uploadDivMsgFlashVersionObj = document.getElementById("upload_div_show_flash_version");
    var flashUploadObj = document.getElementById("load_draft_flash_obj");
    var htmlUploadObj = document.getElementById("load_draft_html_obj");

    if(uploadDivObj)
        uploadDivObj.className = "my_show_rel";
    if(uploadDivFallbackObj)
        uploadDivFallbackObj.className = "no_display";
    if(uploadDivErrorMsgHtmlObj)
        uploadDivErrorMsgHtmlObj.className = "my_hidden_abs";
    if(uploadDivMsgHtmlVersionObj)
        uploadDivMsgHtmlVersionObj.className = "my_show_rel";
    if(uploadDivMsgFlashVersionObj)
        uploadDivMsgFlashVersionObj.className = "my_hidden_abs";
    if(flashUploadObj)
        flashUploadObj.className = "my_show_rel";
    if(htmlUploadObj)
        htmlUploadObj.className = "no_display";
}
