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

String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function toColor (num) {
  num >>>= 0;
  var b = num & 0xFF;
  var g = (num & 0xFF00) >>> 8;
  var r = (num & 0xFF0000) >>> 16;
  return 'rgb(' + [r, g, b].join(',') + ')';
}

export function createColorByName (name) {
  return toColor(name.hashCode());
}

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  if (s === '') return '';

  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function checkCandidateName (name) {
  var dash = name.split(' - ');
  var coma = dash[0].split(',');
  var parts = coma[0].split(' ');
  var family;

  if (parts.length > 2) {
    var second = parts.splice(1);
    if (second[0].length === 1) {
      family = second.join('');
    } else {
      family = second.join(' ');
    }

  } else {
    family = parts[1];
  }

  var case1 = parts[0].toLowerCase();
  var case2 = family ? family.toLowerCase() : '';

  return capitalize(case1) + ' ' + capitalize(case2);
}

export function createTimelineContent (data, list, el, hash) {
  var obj = {
    name: 'volby',
    list: [],
    parties: [],
    dates: []
  }

  if (data[el].length > 1) {

    data[el].sort((a, b) => (a.date || a.year) - (b.date || b.year))

    data[el].forEach(date => {
      var e = this.$store.getters.getElectionDetails(hash, date.date || date.year);

      obj.name = e.name;
      obj.dates.push(e.date[0]);

      (date.result || (date.parties || date.parts[0].results)).forEach((party, index) => {
        try {
          if (party.reg === 90 || party.reg === 80) {
            if ((party.pct || party.ptc) > 5 && !obj.parties.find(p => p.name === party.name)) {
              obj.parties.push({
                reg: party.reg * 1000 + index + e.date[0],
                name: party.reg === 80 ? checkCandidateName(party.name) : party.name,
                color: createColorByName(party.name),
                short: party.name
              })
            }
          } else {
            if ((party.pct || party.ptc) > 5 && !obj.parties.find(p => p.reg === party.reg)) {
              obj.parties.push(this.$store.getters.getPartyByReg(party.reg) || {reg: party.reg, name: party.name, short: party.name});
            }
          }
        } catch (e) {
          console.log(e, party, party.reg, obj.parties);
        }
      });
    });

    data[el].forEach(date => {

      var parties = [];
      var sum = 0;

      (date.result || (date.parties || date.parts[0].results)).forEach((party, index) => {
        if (party.reg === 90 || party.reg === 80) {
          var op = obj.parties.find(p => p.name === (party.reg === 80 ? checkCandidateName(party.name) : party.name))
          if (op) {
            parties.push({
              reg: op.reg,
              name: op.name,
              color: op.color,
              pct: party.pct || party.ptc
            });

            sum += party.pct || party.ptc;
          }
        } else {
          if (obj.parties.find(p => p.reg === party.reg)) {
            parties.push({
              reg: party.reg,
              pct: party.pct || party.ptc
            });

            sum += party.pct || party.ptc;
          }
        }
      });

      obj.list.push({
        rest: sum <= 100 ? 100 - sum : 0,
        parties
      });
    })

    list.push(obj);
  }

  return obj;
}

export function createTimelineSeatsContent (data, list, el, hash) {
  var obj = {
    name: 'volby',
    list: [],
    parties: [],
    dates: []
  }

  if (data[el].length > 1) {

    data[el].sort((a, b) => (a.date || a.year) - (b.date || b.year))

    data[el].forEach(date => {
      var e = this.$store.getters.getElectionDetails(hash, date.date || date.year);

      obj.name = e.name;
      obj.dates.push(e.date[0]);

      (date.result || (date.parties || date.parts[0].results)).forEach((party, index) => {
        try {
          if (party.reg === 90 || party.reg === 80) {
            if ((party.pct || party.ptc) > 5 && !obj.parties.find(p => p.name === party.name)) {
              obj.parties.push({
                reg: party.reg * 1000 + index + e.date[0],
                name: party.reg === 80 ? checkCandidateName(party.name) : party.name,
                color: createColorByName(party.name),
                short: party.name
              })
            }
          } else {
            if ((party.pct || party.ptc) > 5 && !obj.parties.find(p => p.reg === party.reg)) {
              obj.parties.push(this.$store.getters.getPartyByReg(party.reg) || {reg: party.reg, name: party.name, short: party.name});
            }
          }
        } catch (e) {
          console.log(e, party, party.reg, obj.parties);
        }
      });
    });

    data[el].forEach(date => {

      var parties = [];

      (date.result || (date.parties || date.parts[0].results)).forEach((party, index) => {

        var label = (party.elected || party.list) ? ((party.elected || party.list).length) : 0;
        var pct = label / 2;

        if (party.reg === 90 || party.reg === 80) {
          var op = obj.parties.find(p => p.name === (party.reg === 80 ? checkCandidateName(party.name) : party.name))
          if (op) {
            parties.push({
              reg: op.reg,
              name: op.name,
              color: op.color,
              pct: pct,
              label: label
            });
          }
        } else {
          if (obj.parties.find(p => p.reg === party.reg)) {
            parties.push({
              reg: party.reg,
              pct: pct,
              label: label
            });
          }
        }
      });

      obj.list.push({
        rest: 0,
        parties
      });
    })

    list.push(obj);
  }

  return obj;
}

export function createTinyAttendanceContent (json, list, el, hash) {
  var data = {
    values: [],
    addLabel: ' %'
  };

  json[el].forEach(y => {
    var e = this.$store.getters.getElectionDetails(hash, y.date || y.year);

    data.title = e.name;
    data.color = e.color;

    var field = {};
    field.label = e.timestamps[0];
    if (y.stats && y.stats.pct) {
      field.value = y.stats.pct;
    }
    if (y.stats && !y.stats.pct && y.stats.voters && y.stats.votes) {
      field.value = Math.round(y.stats.votes / y.stats.voters * 10000) / 100;
    }
    if (y.parts) {
      field.value = y.parts[0].stats.pct;
    }
    if (y.voters && y.attended) {
      field.value = Math.round(y.attended / y.voters * 10000) / 100;
    }

    field.title = e.name + ', ' + dateFromUnix(field.label) + ': ' + field.value + data.addLabel;

    data.values.push(field);
  })

  if (data.values.length > 1 && list) list.push(data);

  data.values.sort((a, b) => a.label - b.label);

  return data;
}

const dateFromUnix = function (date) {
  var d = new Date(date * 100000);
  var s = d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();

  return s
}

export {dateFromUnix}
