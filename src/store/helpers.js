export function PDV (url) {
  return 'https://data.programydovoleb.cz/' + url.split('data/')[1];
}

export function stripURLintoDomain (url) {
  url = url.replace('https://', '');
  url = url.replace('http://', '');
  url = url.replace('www.', '');

  if (url.charAt(url.length - 1) === '/') url = url.slice(0, -1); // '12345.0'

  return url;
};

/* eslint-disable no-extend-native */
Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

export function beautifyNumber (num) {
  var str = num.toString().split('');

  if (str.length > 6) {
    str.splice(str.length - 3, 0, ' ');
    str.splice(str.length - 7, 0, ' ');
  } else if (str.length > 3) {
    str.splice(str.length - 3, 0, ' ');
  }

  return str.join('');
}

export function beautifyDate (date) {
  var day = date % 100;
  var month = Math.floor(date / 100) % 100;
  var year = Math.floor(date / 10000);

  return day + '. ' + month + '. ' + year;
}

export function betterURL (url) {
  var newURL = url;

  newURL = newURL.toLowerCase();
  newURL = newURL.replaceAll(' ', '-');
  newURL = newURL.replaceAll('.', '');
  newURL = newURL.replaceAll('(', '');
  newURL = newURL.replaceAll(')', '');
  newURL = newURL.replaceAll('á', 'a');
  newURL = newURL.replaceAll('č', 'c');
  newURL = newURL.replaceAll('ď', 'd');
  newURL = newURL.replaceAll('é', 'e');
  newURL = newURL.replaceAll('ě', 'e');
  newURL = newURL.replaceAll('í', 'i');
  newURL = newURL.replaceAll('ľ', 'l');
  newURL = newURL.replaceAll('ň', 'n');
  newURL = newURL.replaceAll('ó', 'o');
  newURL = newURL.replaceAll('ř', 'r');
  newURL = newURL.replaceAll('š', 's');
  newURL = newURL.replaceAll('ť', 't');
  newURL = newURL.replaceAll('ú', 'u');
  newURL = newURL.replaceAll('ů', 'u');
  newURL = newURL.replaceAll('ý', 'y');
  newURL = newURL.replaceAll('ž', 'z');

  return newURL;
}
