function load() {
  var data = [];

  var rows = SHEET.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  for (var i = 1; i <= numRows - 1; i++) {
    var row = values[i];
    data.push(row);
  }

  Logger.log("今月のランキング発表のときがやってきました。")

  var rankings = new Array(REACTIONS.length)
  for(var y = 0; y < 4; y++) {
    rankings[y] = [,,]
  }

  for (var i = 0; i <= REACTIONS.length - 1; i++) {
    Logger.log(REACTIONS[i] + "部門-+-+-+-+-+-+")
    data.sort(function(a, b){return(b[COLUMNS.length + i - 1] - a[COLUMNS.length + i - 1])})
    for (var j = 0; j <= 2; j++) {
      Logger.log((j + 1) + "位:" + data[j][2] + " " + data[j][COLUMNS.length + i - 1] + "pts.");
      rankings[i][j] = data[j][2]
    }
  }
  Logger.log(rankings)
}

function ranking() {
  [[['2pt', 'msg'], ['1pt', 'msg'], ['0pt', 'msg']],
   [['2pt', 'msg'], ['1pt', 'msg'], ['0pt', 'msg']],
   [['2pt', 'msg'], ['1pt', 'msg'], ['0pt', 'msg']],
   [['2pt', 'msg'], ['1pt', 'msg'], ['0pt', 'msg']]]
}

function post() {

}
