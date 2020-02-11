const state = {
  static: {},
  dynamic: {
    partyList: [],
    source: []
  },
  server: 'https://data.polist.cz/',
  tick: 0,
  start: new Date().getTime()
};

export default state;
