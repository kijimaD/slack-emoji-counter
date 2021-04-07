var Sheet = (function() {
  function getChannelMessage(start_ts) {
    var url = "https://slack.com/api/conversations.history?" +
              "channel=" + CHANNEL_ID + "&" +
              "oldest=" + start_ts + "&" +
              "count=1000&pretty=1";
    var headers = {
      'Authorization': 'Bearer '+ TOKEN
    };
    var options = {
      'method': 'POST',
      'headers': headers
    };
    var response = UrlFetchApp.fetch(url, options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
  }

  function filterMessage(data) {
    // Two-dimensional array.
    var chatHistries = [];
    var messageHistories = [];

    // チャット履歴の巡回
    for (var i = 0; i < data.messages.length; i++) {
      // メッセージフィールドの巡回
      for (var j = 0; j < COLUMNS.length; j++) {
        // フィールドによって対応を変更
        if (!data.messages[i][COLUMNS[j]]) {
          // 対応するフィールドが定義されていない場合、空欄を配列に追加
          if (COLUMNS[j] == 'reactions') {
            for (var k = 0; k < REACTIONS.length; k++) {
              messageHistories.push(0);
            }
          } else {
            messageHistories.push("");
          }
        } else if (COLUMNS[j] == 'ts' || COLUMNS[j] == 'thread_ts') {
          // Timestamp: String type -> Date type
          messageHistories.push(Utils.unixTime2ymd(parseInt(data.messages[i][COLUMNS[j]])));
        } else if (COLUMNS[j] == 'reactions') {
          // Add only property of REACTIONS to the array.
          for (var l = 0; l < REACTIONS.length; l++) {
            messageHistories.push(0);
            for (var m = 0; m < data.messages[i][COLUMNS[j]].length; m++) {
              if (data.messages[i][COLUMNS[j]][m]["name"] == REACTIONS[l]) {
                messageHistories[j + l]++;
              }
            }
          }
        } else {
          // When other fields, push to as it its, unprocessed.
          messageHistories.push(data.messages[i][COLUMNS[j]]);
        }
      }
      chatHistries.push(messageHistories);
      messageHistories = [];
    }
    return chatHistries
  }

  function writeSpreadSheet(chatHistries) {
    SHEET.getRange(SHEET.getLastRow() + 1, 1, chatHistries.length, COLUMNS.length + REACTIONS.length - 1).setValues(chatHistries);
  }

  return {
    getChannelMessage: getChannelMessage,
    filterMessage: filterMessage,
    writeSpreadSheet: writeSpreadSheet
  }
})();
