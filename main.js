var TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN')
var CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID')

var SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

// Output columns
var columns = [
  "type",
  "user",
  "text",
  "client_msg_id",
  "attachments",
  "edited",
  "reply_count",
  "ts",
  "subtype",
  "reactions"
];

// Count emojis
var REACTIONS = [
  "notes",
  "footprints",
  "handshake",
  "gift"
];

function Main() {
  SHEET.clear();

  // フィールド名設定
  SHEET.getRange(1, 1, 1, columns.length).setValues([columns]);
  SHEET.getRange(1, columns.length, 1, REACTIONS.length).setValues([REACTIONS]);

  // 取得対象期間設定
  var startdate = '2017/4/1';
  var enddate = '2021/4/14';
  start_ts = getStartTs(startdate);
  end_ts = getEndTs(enddate);

  // データ取得
  data = getChannelMessage(start_ts, end_ts)
  filterMessage(data)
}

function getStartTs(val) {
  var start_date = new Date(val);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  start_date.setMilliseconds(0);
  var start_ts = start_date.getTime() / 1000;
  return start_ts;
}

function getEndTs(val) {
  var end_date = new Date(val);
  end_date.setHours(23);
  end_date.setMinutes(59);
  end_date.setSeconds(59);
  end_date.setMilliseconds(0);
  var end_ts = end_date.getTime() / 1000;
  return end_ts;
}

function unixTime2ymd(intTime) {
  var d = new Date(intTime * 1000);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = ('0' + d.getHours()).slice(-2);
  var min = ('0' + d.getMinutes()).slice(-2);
  var sec = ('0' + d.getSeconds()).slice(-2);

  return (year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec);
}

function getChannelMessage(start_ts) {
  var url = "https://slack.com/api/conversations.history?" +
            "channel=" + CHANNEL_ID + "&" +
            "oldest=" + start_ts + "&"
            "count=1000&pretty=1";

  // 日付をもとにチャンネル内のメッセージを取得
  var headers = {
    'Authorization': 'Bearer '+ TOKEN
  };
  var options = {
    'method': 'POST',
    'headers': headers,
  };
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data
}

function filterMessage(data) {
  // 2次元配列
  var chathistory_ary = [];
  var message_ary = [];

  // チャット履歴の巡回
  for (var i = 0; i < data.messages.length; i++) {
    // メッセージフィールドの巡回
    for (var j = 0; j < columns.length; j++) {
      // フィールドによって対応を変更
      if (!data.messages[i][columns[j]]) {
        // 対応するフィールドが定義されていない場合、空欄を配列に追加
        if (columns[j] == 'reactions') {
          for (var k = 0; k < REACTIONS.length; k++) {
            message_ary.push(0);
          }
        } else {
          message_ary.push("");
        }
      } else if (columns[j] == 'ts' || columns[j] == 'thread_ts') {
        // タイムスタンプは、Date型に変更して配列に
        message_ary.push(unixTime2ymd(parseInt(data.messages[i][columns[j]])));
      } else if (columns[j] == 'reactions') {
        // リアクションは、カウント対象のみを配列に追加
        for (var l = 0; l < REACTIONS.length; l++) {
          message_ary.push(0);
          for (var k = 0; k < data.messages[i][columns[j]].length; k++) {
            if (data.messages[i][columns[j]][k]["name"] == REACTIONS[l]) {
              message_ary[j + l]++;
            }
          }
        }
      } else {
        // その他のフィールドは、取得した値のまま配列に追加
        message_ary.push(data.messages[i][columns[j]]);
      }
    }
    // チャンネルアレイにメッセージ情報を挿入
    chathistory_ary.push(message_ary);

    // メッセージ配列の初期化
    message_ary = [];
  }

  // スプレッドシートに転記
  SHEET.getRange(SHEET.getLastRow() + 1, 1, chathistory_ary.length, columns.length + REACTIONS.length - 1).setValues(chathistory_ary);

  //メッセージ件数を確認し、ページネーション
  if (chathistory_ary.length == 1000) {
    getChannelMessage(start_ts, data.messages[999]['ts']);
  }
}
