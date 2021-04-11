var Msg = (function() {
  function loadSheet() {
    var rows = Setting.STORE_SHEET.getDataRange();
    var numRows = rows.getNumRows();
    var values = rows.getValues();

    var data = [];
    // exclude a header line
    for (var i = 1; i <= numRows - 1; i++) {
      var row = values[i];
      data.push(row);
    }
    return data;
  }

  function makeMessage(data) {
    var contents = []
    for (var i = 0; i <= Setting.REACTIONS.length - 1; i++) {
      var msg = "";
      msg += (":" + Setting.REACTIONS[i] + ":" + Setting.REACTIONS_ALIAS[i] + "━━━━━━" + "\n")
      data.sort(function(a, b){return(b[Setting.COLUMNS.length + i - 1] - a[Setting.COLUMNS.length + i - 1])})
      for (var j = 0; j <= 2; j++) {
        // pts > 0
        if (data[j][Setting.COLUMNS.length + i - 1] > 0) {
          msg += (String(j + 1) + "位: " + data[j][Setting.COLUMNS.length + i - 1] + "pts " + data[j][2] + " \n")
        }
      }
      msg += "\n"
      contents.push(msg)
    }
    return contents;
  }

  function notify(message) {
    var jsonData =
      {
        "text" : message,
        "unfurl_links" : true
      };
    var payload = JSON.stringify(jsonData);

    var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
      };

    UrlFetchApp.fetch(Setting.POST_URL, options);
  }

  return {
    loadSheet: loadSheet,
    makeMessage: makeMessage,
    notify: notify
  }
})();
