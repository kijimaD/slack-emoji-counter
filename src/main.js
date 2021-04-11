function onOpen() {
  SpreadsheetApp.getUi()
                .createMenu('slack-emoji-counter')
                .addItem('loadToSheet', 'loadToSheet')
                .addToUi();
}

function init() {
  Setting.SPREAD_BOOK.insertSheet(Setting.OPTION_SHEET_NAME);
  Setting.SPREAD_BOOK.getRange("1:1").setBackground('#808080');
  Setting.SPREAD_BOOK.getRange("A1:E3").setValues(Setting.INIT_OPTION_SHEET);

  Setting.SPREAD_BOOK.insertSheet(Setting.STORE_SHEET_NAME);
}

function main(start, end) {
  const start_ts = Utils.getStartTs(start);
  const end_ts = Utils.getEndTs(end);

  Sheet.main(start_ts, end_ts);
}

function loadToSheet() {
  main(Setting.START_DATE, Setting.END_DATE);
}

function latestMonthAndPost() {
  main(Utils.lastMonth());
  Msg.main();
}

function latestWeekAndPost() {
  main(Utils.lastWeek());
  Msg.main();
}
