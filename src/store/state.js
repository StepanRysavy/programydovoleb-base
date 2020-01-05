import elections from './data/obecne/info/seznam-voleb.json';
import regions from './data/obecne/info/kv.json';
import senate from './data/obecne/info/senatni-volby.json';

const state = {
  static: {
    elections: elections,
    regions,
    senate: senate,
    prominent: {
      towns: [],
      parties: [768, 53, 720, 1114, 47, 7, 1, 721, 166, 714, 5, 724]
    }
  },
  dynamic: {
    hierarchy: [],
    parties: [],
    partyList: [],
    towns: [],
    elections: []
  },
  server: 'https://data.programydovoleb.cz/',
  tick: 0,
  start: new Date().getTime()
};

export default state;
