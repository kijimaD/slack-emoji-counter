var Sheet = (function() {
  function main(start_ts, end_ts) {
    resetStoreSheet();
    var data = getChannelMessage(start_ts, end_ts);
    var chatHistories = filterMessage(data);
    writeSpreadSheet(chatHistories);
  }

  function resetStoreSheet() {
    Setting.STORE_SHEET.clear();

    // Set header
    Setting.STORE_SHEET.getRange(1, 1, 1, Setting.COLUMNS.length).setValues([Setting.COLUMNS]);
    Setting.STORE_SHEET.getRange(1, Setting.COLUMNS.length, 1, Setting.REACTIONS.length).setValues([Setting.REACTIONS]);
  }

  function getChannelMessage(start_ts, end_ts) {
    var url = "https://slack.com/api/conversations.history?" +
              "channel=" + Setting.CHANNEL_ID + "&" +
              "count=" + 1000 + "&" +
              "pretty=" + 1 + "&" +
              "oldest=" + start_ts + "&";

    // default newest parameter is today.
    if (end_ts) {
      url += "latest=" + end_ts + "&";
    }

    const headers = {
      'Authorization': 'Bearer '+ Setting.TOKEN
    };
    const options = {
      'method': 'POST',
      'headers': headers
    };
    const response = UrlFetchApp.fetch(url, options);
    const json = response.getContentText();
    const data = JSON.parse(json);
    return data;
  }

  function filterMessage(data) {
    // Two-dimensional array.
    var chatHistries = [];
    var messageHistories = [];

    // チャット履歴の巡回
    for (var i = 0; i < data.messages.length; i++) {
      // メッセージフィールドの巡回
      for (var j = 0; j < Setting.COLUMNS.length; j++) {
        // フィールドによって対応を変更
        if (!data.messages[i][Setting.COLUMNS[j]]) {
          // 対応するフィールドが定義されていない場合、空欄を配列に追加
          if (Setting.COLUMNS[j] == 'reactions') {
            for (var k = 0; k < Setting.REACTIONS.length; k++) {
              messageHistories.push(0);
            }
          } else {
            messageHistories.push("");
          }
        } else if (Setting.COLUMNS[j] == 'ts' || Setting.COLUMNS[j] == 'thread_ts') {
          // Timestamp: String type -> Date type
          messageHistories.push(Utils.unixTime2ymd(parseInt(data.messages[i][Setting.COLUMNS[j]])));
        } else if (Setting.COLUMNS[j] == 'reactions') {
          // Add only property of REACTIONS to the array.
          for (var l = 0; l < Setting.REACTIONS.length; l++) {
            messageHistories.push(0);
            for (var m = 0; m < data.messages[i][Setting.COLUMNS[j]].length; m++) {
              if (data.messages[i][Setting.COLUMNS[j]][m]["name"] == Setting.REACTIONS[l]) {
                messageHistories[j + l]++;
              }
            }
          }
        } else {
          // When other fields, push to as it its, unprocessed.
          messageHistories.push(data.messages[i][Setting.COLUMNS[j]]);
        }
      }
      chatHistries.push(messageHistories);
      messageHistories = [];
    }
    return chatHistries
  }

  function writeSpreadSheet(chatHistries) {
    Setting.STORE_SHEET.getRange(Setting.STORE_SHEET.getLastRow() + 1, 1, chatHistries.length, Setting.COLUMNS.length + Setting.REACTIONS.length - 1).setValues(chatHistries);
  }

  return {
    main: main
  }
})();
