function getStartTs(val) {
  var start_date = new Date(val);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  start_date.setMilliseconds(0);
  var start_ts = start_date.getTime() / 1000;
  return start_ts;
}

function getEndTs(val) {
  var end_date = new Date(val);
  end_date.setHours(23);
  end_date.setMinutes(59);
  end_date.setSeconds(59);
  end_date.setMilliseconds(0);
  var end_ts = end_date.getTime() / 1000;
  return end_ts;
}

function lastMonth() {
  var date = new Date();
  var last_month = new Date(date.getFullYear(), date.getMonth()- 1, date.getDate());
  return last_month.getFullYear()+ "/" +last_month.getMonth()+ "/" + last_month.getDate();
}

function unixTime2ymd(intTime) {
  var d = new Date(intTime * 1000);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = ('0' + d.getHours()).slice(-2);
  var min = ('0' + d.getMinutes()).slice(-2);
  var sec = ('0' + d.getSeconds()).slice(-2);

  return (year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec);
}
