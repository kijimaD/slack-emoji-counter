function init() {
  Setting.SPREAD_SHEET.insertSheet(Setting.OPTION_SHEET_NAME);
  Setting.SPREAD_SHEET.getRange("1:1").setBackground('#808080');
  var range = [
    ["channel_id", "reactions*", "reactions_alias*"],
    ["xxxx-0000...", "tada", "Conglatulations"],
    ["", "thumbsup", "Looks good"]
  ];
  range = Setting.SPREAD_SHEET.getRange("A1:C3").setValues(range);
  Setting.SPREAD_SHEET.insertSheet(Setting.STORE_SHEET_NAME);
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
