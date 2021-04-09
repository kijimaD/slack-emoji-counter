var TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN')
var CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID')
var POST_URL = PropertiesService.getScriptProperties().getProperty('POST_URL')

// Output sheet
var SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

// Output columns
var COLUMNS = [
  "type",
  "user",
  "text",
  "client_msg_id",
  "attachments",
  "edited",
  "thread_ts",
  "replies",
  "subscribed",
  "parent_user_id",
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

// Emoji alias
var REACTIONS_ALIAS = [
  "Fun",
  "Autonomous",
  "Team",
  "Impress"
]

function main(start) {
  SHEET.clear();

  // Set column names.
  SHEET.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
  SHEET.getRange(1, COLUMNS.length, 1, REACTIONS.length).setValues([REACTIONS]);

  var start_ts = Utils.getStartTs(start);
  var data = Sheet.getChannelMessage(start_ts);
  var chatHistories = Sheet.filterMessage(data);
  Sheet.writeSpreadSheet(chatHistories);

  var sheetData = Msg.loadSheet();
  var contents = Msg.makeMessage(sheetData);
  contents.forEach(function(content) {
    Msg.notify(content);
  })
}

function month() {
  main(Utils.lastMonth());
}

function week() {
  main(Utils.lastWeek());
}
