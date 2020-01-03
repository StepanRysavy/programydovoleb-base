import axios from 'axios';

const actions = {};
const server = 'https://data.programydovoleb.cz/';

actions.demo = function (context, payload) {
  axios.post('/foobar', {
    foo: payload.foo,
    bar: payload.bar
  })
  .then(function (response) {
    context.commit('demo', response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
};

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

actions.fetchHierarchy = function (context, payload) {

  if (context.state.dynamic.hierarchy.length > 0) {
    // console.log('Hierarchy already loaded');
    if (payload && payload.onComplete) payload.onComplete();
    return;
  }

  axios.get(server + 'obecne/obce-struktura.json').then((response) => {
    context.commit('fetchHierarchy', response.data);
    if (payload && payload.onComplete) payload.onComplete();
  }).catch(e => {
    console.log('File not loaded', e);
  });
}

actions.fetchTown = function (context, payload) {
  var lookup = context.state.dynamic.towns.find(item => item.id === payload.num);

  if (lookup) {
    // console.log('Town', lookup.name, 'is known');
    if (payload && payload.onComplete) payload.onComplete();
  } else {
    axios.get(server + 'souhrny/obce/' + payload.nuts + '/' + payload.num + '.json').then(response => {
      context.commit('fetchTown', response.data);
      if (payload && payload.onComplete) payload.onComplete();
    });
  }
}

actions.fetchParty = function (context, payload) {
  var lookup = context.state.dynamic.parties.find(item => item.reg === payload.reg);

  if (lookup) {
    // console.log('Party', lookup.name, 'already loaded');
    if (payload && payload.onComplete) payload.onComplete();
  } else {
    axios.get(server + 'api/getParty?reg=' + payload.reg).then(response => {
      context.commit('fetchParty', response.data);
      if (payload && payload.onComplete) payload.onComplete();
    });
  }
}

function getFile (file) {
  return axios.get(server + file);
}

actions.fetchResultFiles = function (context, payload) {
  var lookup = context.state.dynamic.elections.find(el => el.id === payload.id);

  if (lookup) {

    // console.log('Result', lookup.id, 'already loaded');
    if (payload && payload.onComplete) payload.onComplete();

  } else {

    var files = [];

    payload.files.forEach(file => {
      files.push(getFile(payload.path + file.path));
    });

    axios.all(files).then((response) => {

      var result = {
        id: payload.id,
        files: []
      }

      payload.files.forEach((file, index) => {
        var obj = {
          type: file.type,
          content: response[index].data
        }

        result.files.push(obj);
      });

      context.commit('fetchResultFiles', result);
      if (payload && payload.onComplete) payload.onComplete();
    }).catch(e => {
      console.log('File not loaded', e);
    });

  }
}

export default actions;
