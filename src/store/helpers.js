const dateFromUnix = function (date) {
  var d = new Date(date * 100000);
  var s = d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();

  return s
}

export {dateFromUnix}
