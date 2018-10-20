browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'getJSON') {
    $.getJSON(request.url, sendResponse);
  }
  return true;
});

// set default editor
var editor = localStorage.getItem("railspanel.editor")
if (editor == "null" || editor == null) {
  localStorage.setItem("railspanel.editor", "mate");
}

