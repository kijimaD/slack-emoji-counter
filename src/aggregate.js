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
  // [[['10pt', 'msg'], ['5pt', 'msg'], ['1pt', 'msg']],
  //  [['10pt', 'msg'], ['5pt', 'msg'], ['1pt', 'msg']],
  //  [['10pt', 'msg'], ['5pt', 'msg'], ['1pt', 'msg']],
  //  [['10pt', 'msg'], ['5pt', 'msg'], ['1pt', 'msg']]]

  // initialize 3-dimensional array
  var rankings = new Array(REACTIONS.length)
  for(var y = 0; y < 4; y++) {
    rankings[y] = [,,]
  }

  for (var i = 0; i <= REACTIONS.length - 1; i++) {
    data.sort(function(a, b){return(b[COLUMNS.length + i - 1] - a[COLUMNS.length + i - 1])})
    for (var j = 0; j <= 2; j++) {
      rows = []
      rows.push(String(j + 1))
      rows.push(data[j][2])
      rows.push(data[j][COLUMNS.length + i - 1])
      rankings[i][j] = rows
    }
  }
  Logger.log(rankings);
  return rankings;
}

function notify() {
  Logger.log("今月のランキング発表のときがやってきました。")
  Logger.log(REACTIONS[0] + "部門-+-+-+-+-+-+")
}
