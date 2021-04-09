var Setting = (function() {
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

  return {
    TOKEN: TOKEN,
    CHANNEL_ID: CHANNEL_ID,
    POST_URL: POST_URL,
    SHEET: SHEET,
    COLUMNS: COLUMNS,
    REACTIONS: REACTIONS,
    REACTIONS_ALIAS: REACTIONS_ALIAS
  }
})();
