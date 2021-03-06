import axios from 'axios';
import state from './state';

const server = state.server;

const antiCache = 'c=' + Math.round(new Date().getTime() / 1000000);

const actions = {};

actions.ga = function (context, payload) {

  document.title = payload.title;

  payload.path = payload.path || context.state.route.fullPath.slice(1, context.state.route.fullPath.length);
  payload.path = payload.path.split('?')[0];

  if (window.gtag) {
    window.gtag('config', 'UA-4347750-19', {'page_path': payload.path, 'page_title': payload.title});
  } else {
    console.log('GA:', '/' + payload.path, ' : ', payload.title);
  }
};

actions.ge = function (context, payload) {
  if (window.gtag) {
    window.gtag('event', payload.action, {
      'event_category': payload.category || 'general',
      'event_label': payload.label || '(not set)',
      'value': payload.value || 1
    });
  } else {
    console.log('GA Event:', payload);
  }
};

var fetchPartyListLoadInitiated = false;

actions.fetchPartyList = function (context, payload) {
  if (fetchPartyListLoadInitiated === true) {
    if (payload && payload.onComplete) payload.onComplete();
  } else {
    fetchPartyListLoadInitiated = true;
    axios.get(server + 'obecne/strany.json').then(response => {
      context.commit('fetchPartyList', response.data);
      if (payload && payload.onComplete) payload.onComplete();
    });
  }
}

actions.fetchSource = function (context, payload) {
  var lookup = context.state.dynamic.source.find(item => item.source === payload.source);

  if (lookup) {
    // console.log('Town', lookup.name, 'is known');
    if (payload && payload.onComplete) payload.onComplete();
  } else {
    try {
      axios.get(server + payload.source + '.json?' + antiCache).then(response => {
        context.commit('fetchSource', {
          source: payload.source,
          content: response.data
        });

        if (payload && payload.onComplete) payload.onComplete();
      });
    } catch (e) {
      if (payload && payload.onError) payload.onError();
    }
  }
}

export default actions;
