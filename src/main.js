function onOpen() {
  SpreadsheetApp.getUi()
                .createMenu('slack-emoji-counter')
                .addItem('run', 'run')
                .addToUi();
}

function init() {
  Setting.SPREAD_BOOK.insertSheet(Setting.OPTION_SHEET_NAME);
  Setting.SPREAD_BOOK.getRange("1:1").setBackground('#808080');
  Setting.SPREAD_BOOK.getRange("A1:C3").setValues(Setting.INIT_OPTION_SHEET);

  Setting.SPREAD_BOOK.insertSheet(Setting.STORE_SHEET_NAME);
}

function main(start) {
  Setting.STORE_SHEET.clear();

  // Set column names.
  Setting.STORE_SHEET.getRange(1, 1, 1, Setting.COLUMNS.length).setValues([Setting.COLUMNS]);
  Setting.STORE_SHEET.getRange(1, Setting.COLUMNS.length, 1, Setting.REACTIONS.length).setValues([Setting.REACTIONS]);

  var start_ts = Utils.getStartTs(start);
  Sheet.main(start_ts);
  Msg.main();
}

function month() {
  main(Utils.lastMonth());
}

function week() {
  main(Utils.lastWeek());
}
