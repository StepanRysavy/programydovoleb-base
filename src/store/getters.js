import {createColorByName} from '@/common/helpers';
import store from '@/store/store';

const getters = {
  vuexState: state => state,
  demo: (state, getters) => (id) => {
    return state.structure.find(item => item.id === id)
  }
};

getters.getPartyByReg = (state, getters) => (reg) => {
  return state.dynamic.partyList.find(party => party.reg === reg);
}

getters.getGradientForCoalition = (state, getters) => (party, name) => {
  var color;

  if (typeof party === 'object' && party.color === '#aaa' && party.coalition) {
    var arr = [];
    var clr = [];

    party.coalition.forEach(reg => {
      arr.push(getters.getPartyByReg(reg).color);
    });

    arr.forEach((a, i) => {
      clr.push(a + ' ' + i / (arr.length - 1) * 100 + '%');
    });

    color = 'linear-gradient(20deg, ' + clr.join(', ') + ')';
  }

  if (typeof party === 'object' && party.color === '#aaa' && !party.coalition) {
    color = party.color;
  }

  if (typeof party === 'object' && party.color !== '#aaa') {
    color = party.color;
  }

  if (typeof party === 'number' && party === 90) {
    color = createColorByName(name)
  }

  if (typeof party === 'number' && party === 80) {
    color = createColorByName(name)
  }

  return color;
}

getters.getSource = (state, getters) => (source) => {
  var lookup = state.dynamic.source.find(s => s.source === source);

  if (lookup) {
    return lookup.content;
  } else {
    new Promise((resolve, reject) => {
      store.dispatch('fetchSource', {
        source: source,
        onComplete: () => resolve(),
        onError: () => reject(new Error('load fail'))
      });
    }).then((resolver, rejected) => {
      if (rejected) {
        return undefined;
      } else {
        lookup = state.dynamic.source.find(s => s.source === source);
        return lookup.content;
      }
    });
  }
}

getters.getPromise = (state, getters) => (source) => {
  return new Promise((resolve, reject) => {
    var lookup = state.dynamic.source.find(s => s.source === source);

    if (lookup) {
      resolve(lookup.content);
    } else {
      new Promise((resolve, reject) => {
        store.dispatch('fetchSource', {
          source: source,
          onComplete: () => resolve(),
          onError: () => reject(new Error('load fail'))
        });
      }).then(() => {
        lookup = state.dynamic.source.find(s => s.source === source);
        resolve(lookup.content);
      });
    }
  })
}

export default getters;
