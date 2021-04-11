function onOpen() {
  SpreadsheetApp.getUi()
                .createMenu('slack-emoji-counter')
                .addItem('run', 'run')
                .addToUi();
}

function init() {
  Setting.SPREAD_BOOK.insertSheet(Setting.OPTION_SHEET_NAME);
  Setting.SPREAD_BOOK.getRange("1:1").setBackground('#808080');
  Setting.SPREAD_BOOK.getRange("A1:E3").setValues(Setting.INIT_OPTION_SHEET);

  Setting.SPREAD_BOOK.insertSheet(Setting.STORE_SHEET_NAME);
}

function main(start, end) {
  Setting.STORE_SHEET.clear();

  // Set column names.
  Setting.STORE_SHEET.getRange(1, 1, 1, Setting.COLUMNS.length).setValues([Setting.COLUMNS]);
  Setting.STORE_SHEET.getRange(1, Setting.COLUMNS.length, 1, Setting.REACTIONS.length).setValues([Setting.REACTIONS]);

  var start_ts = Utils.getStartTs(start);
  var end_ts = Utils.getEndTs(end);

  Sheet.main(start_ts, end_ts);
  Msg.main();
}

function run() {
  main(Setting.START_DATE, Setting.END_DATE);
}

function month() {
  main(Utils.lastMonth());
}

function week() {
  main(Utils.lastWeek());
}
