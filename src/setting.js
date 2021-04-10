var Setting = (function() {
  var TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN')
  var CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID')
  var POST_URL = PropertiesService.getScriptProperties().getProperty('POST_URL')

  var SPREAD_BOOK = SpreadsheetApp.getActiveSpreadsheet();
  var STORE_SHEET_NAME = 'store';
  var STORE_SHEET = SPREAD_BOOK.getSheetByName(STORE_SHEET_NAME);

  var OPTION_SHEET_NAME = "option";
  var OPTION_SHEET = SPREAD_BOOK.getSheetByName(OPTION_SHEET_NAME);

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

  return {
    TOKEN: TOKEN,
    CHANNEL_ID: CHANNEL_ID,
    POST_URL: POST_URL,
    SPREAD_BOOK: SPREAD_BOOK,
    STORE_SHEET: STORE_SHEET,
    STORE_SHEET_NAME: STORE_SHEET_NAME,
    OPTION_SHEET: OPTION_SHEET,
    OPTION_SHEET_NAME: OPTION_SHEET_NAME,
    COLUMNS: COLUMNS,
    REACTIONS: REACTIONS,
    REACTIONS_ALIAS: REACTIONS_ALIAS
  }
})();
