const mutations = {
  demo (state, payload) {}
};

mutations.fetchTowns = function (state, payload) {
  payload.hierarchy.list.forEach(item => state.dynamic.towns.push(item));
}

mutations.fetchResultFiles = function (state, payload) {
  state.dynamic.elections.push(payload);
}

export default mutations;
