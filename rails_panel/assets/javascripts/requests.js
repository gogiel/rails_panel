getJSON = function (url, callback) {
  console.log("sending RPC:" + url);
  browser.runtime.sendMessage({ action: 'getJSON', url: url }).then(callback);
};

var requests = {
  bindListener: function (scope) {
    browser.devtools.network.onRequestFinished.addListener(function (request) {
      console.log(request);
      request.getContent().then(function(content) { console.log(content) })
      return;

      request.getContent().then((content) => {
        headers = request.response.headers;
        var requestId = headers.find(function (x) {
          return x.name.toLowerCase() == 'x-request-id'
        });
        var metaRequestVersion = headers.find(function (x) {
          return x.name.toLowerCase() == 'x-meta-request-version'
        });
        debugger;
        if (typeof metaRequestVersion != 'undefined') {
          scope.metaRequestVersion = metaRequestVersion.value;
          var uri = new URI(request.request.url);
          uri.pathname('/__meta_request/' + requestId.value + '.json');
          uri.search("");
          getJSON(uri.toString(), function (data) {
            panel.addData(requestId.value, scope, data);
            $('.data-container').scrollTop(100000000);
          });
        }
      });
    });
  }
};
