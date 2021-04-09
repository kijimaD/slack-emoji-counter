function init() {
  Setting.SPREAD_SHEET.insertSheet('init');
  Setting.SPREAD_SHEET.insertSheet('record');
}

function main(start) {
  Setting.SHEET.clear();

  // Set column names.
  Setting.SHEET.getRange(1, 1, 1, Setting.COLUMNS.length).setValues([Setting.COLUMNS]);
  Setting.SHEET.getRange(1, Setting.COLUMNS.length, 1, Setting.REACTIONS.length).setValues([Setting.REACTIONS]);

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
