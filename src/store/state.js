import elections from './data/obecne/info/seznam-voleb.json';
import regions from './data/obecne/info/kv.json';
import senate from './data/obecne/info/senatni-obvody.json';

const state = {
  static: {
    elections: elections,
    regions,
    senate: senate.list
  },
  dynamic: {
    towns: [],
    parties: [],
    elections: []
  },
  tick: 0,
  start: new Date().getTime()
};

export default state;
