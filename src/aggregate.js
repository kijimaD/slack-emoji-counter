function loadSheet() {
  var rows = SHEET.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var data = [];
  // exclude a header line
  for (var i = 1; i <= numRows - 1; i++) {
    var row = values[i];
    data.push(row);
  }
  return data;
}

function rankingArray(data) {
  var msg = "";
  for (var i = 0; i <= REACTIONS.length - 1; i++) {
    msg += (":" + REACTIONS[i] + ":" + REACTIONS_ALIAS[i] + "━━━━━━" + "\n")
    data.sort(function(a, b){return(b[COLUMNS.length + i - 1] - a[COLUMNS.length + i - 1])})
    for (var j = 0; j <= 2; j++) {
      msg += (String(j + 1) + "位: " + data[j][COLUMNS.length + i - 1] + "pts " + data[j][2]+ "\n")
    }
    msg += "\n"
  }
  return msg;
}

function notify() {
  data = loadSheet();
  rankings = rankingArray(data);
  Logger.log(msg);
}
