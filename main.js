var TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN')
var CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID')
// 取り扱うシート
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sh = ss.getActiveSheet();

// メッセージが持つフィールドのうち出力項目を列挙
var message = [
  "type",
  "user",
  "text",
  "client_msg_id",
  "attachments",
  "edited",
  "thread_ts",
  "reply_count",
  "replies",
  "subscribed",
  "unread_count",
  "parent_user_id",
  "ts",
  "subtype",
  "reactions"
];

// カウントしたい絵文字を列挙
var reaction = [
  "eyes",
  "pray"
];

function Main() {
  sh.clear();

  // フィールド名設定
  sh.getRange(1, 1, 1, message.length).setValues([message]);
  sh.getRange(1, message.length, 1, reaction.length).setValues([reaction]);

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

function getChannelMessage(start_ts, end_ts) {
  var url = "https://slack.com/api/conversations.history?channel=" +
    CHANNEL_ID + "&" + "count=1000&pretty=1";

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
    for (var j = 0; j < message.length; j++) {
      // フィールドによって対応を変更
      if (!data.messages[i][message[j]]) {
        // 対応するフィールドが定義されていない場合、空欄を配列に追加
        if (message[j] == 'reactions') {
          for (var k = 0; k < reaction.length; k++) {
            message_ary.push(0);
          }
        } else {
          message_ary.push("");
        }
      } else if (message[j] == 'ts' || message[j] == 'thread_ts') {
        // タイムスタンプは、Date型に変更して配列に
        message_ary.push(unixTime2ymd(parseInt(data.messages[i][message[j]])));
      } else if (message[j] == 'reactions') {
        // リアクションは、カウント対象のみを配列に追加
        for (var l = 0; l < reaction.length; l++) {
          message_ary.push(0);
          for (var k = 0; k < data.messages[i][message[j]].length; k++) {
            if (data.messages[i][message[j]][k]["name"] == reaction[l]) {
              message_ary[j + l]++;
            }
          }
        }
      } else {
        // その他のフィールドは、取得した値のまま配列に追加
        message_ary.push(data.messages[i][message[j]]);
      }
    }
    // チャンネルアレイにメッセージ情報を挿入
    chathistory_ary.push(message_ary);

    // メッセージ配列の初期化
    message_ary = [];
  }

  // スプレッドシートに転記
  sh.getRange(sh.getLastRow() + 1, 1, chathistory_ary.length, message.length + reaction.length - 1).setValues(chathistory_ary);

  //メッセージ件数を確認し、ページネーション
  if (chathistory_ary.length == 1000) {
    getChannelMessage(start_ts, data.messages[999]['ts']);
  }
}
