export var Settings = (function() {
  /* eslint-disable no-undef */
  var TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  var CHANNEL_ID = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID');
  var POST_URL = PropertiesService.getScriptProperties().getProperty('POST_URL');

  var SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  /* eslint-enable no-undef */

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
  ];
})();
