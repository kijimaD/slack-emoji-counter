var Utils = (function() {
  function getStartTs(val) {
    var start_date = new Date(val);
    start_date.setHours(0);
    start_date.setMinutes(0);
    start_date.setSeconds(0);
    start_date.setMilliseconds(0);
    const start_ts = start_date.getTime() / 1000;
    return start_ts;
  }

  function getEndTs(val) {
    var end_date = new Date(val);
    end_date.setHours(23);
    end_date.setMinutes(59);
    end_date.setSeconds(59);
    end_date.setMilliseconds(0);
    const end_ts = end_date.getTime() / 1000;
    return end_ts;
  }

  function lastMonth() {
    var date = new Date();
    var last_month = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    return last_month.getFullYear()+ "/" +last_month.getMonth()+ "/" + last_month.getDate();
  }

  function lastWeek() {
    var date = new Date();
    var last_week = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    return last_week.getFullYear()+ "/" +last_week.getMonth()+ "/" + last_week.getDate();
  }

  function unixTime2ymd(intTime) {
    var d = new Date(intTime * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = ('0' + d.getHours()).slice(-2);
    const min = ('0' + d.getMinutes()).slice(-2);
    const sec = ('0' + d.getSeconds()).slice(-2);

    return (year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec);
  }

  return {
    getStartTs: getStartTs,
    getEndTs: getEndTs,
    lastMonth: lastMonth,
    lastWeek: lastWeek,
    unixTime2ymd: unixTime2ymd
  }
})();
