var Setting = (function() {
  const TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN')
  const POST_URL = PropertiesService.getScriptProperties().getProperty('POST_URL')

  const SPREAD_BOOK = SpreadsheetApp.getActiveSpreadsheet();
  const STORE_SHEET_NAME = 'store';
  const OPTION_SHEET_NAME = 'option';

  try {
    const STORE_SHEET = SPREAD_BOOK.getSheetByName(STORE_SHEET_NAME);
    const OPTION_SHEET = SPREAD_BOOK.getSheetByName(OPTION_SHEET_NAME);

    // TODO: momorize
    const CHANNEL_ID = OPTION_SHEET.getRange("A2").getValue();
    const REACTIONS = OPTION_SHEET.getRange("B2:B").getValues().filter(function(element) { return (element[0].length); });
    const REACTIONS_ALIAS = OPTION_SHEET.getRange("C2:C").getValues().filter(function(element) { return (element[0].length); });
  } catch(e) {
    Logger.log(e);
  }

  // Output columns
  const COLUMNS = [
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
