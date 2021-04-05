function load() {
  var data = [];

  var rows = SHEET.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    data.push(row);
  }

  Logger.log("今月のランキング発表のときがやってきました。")

  for (var i = 0; i <= REACTIONS.length - 1; i++) {
    Logger.log(REACTIONS[i] + "部門-+-+-+-+-+-+")
    data.sort(function(a, b){return(b[COLUMNS.length + i - 1] - a[COLUMNS.length + i - 1])})
    for (var j = 1; j <= 3; j++) {
      Logger.log(j + "位:" + data[j][2] + " " + data[j][COLUMNS.length + i - 1] + "pts.");
    }
  }
}

function ranking() {

}

function post() {

}
