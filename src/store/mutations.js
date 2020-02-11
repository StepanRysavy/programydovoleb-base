const mutations = {
  demo (state, payload) {}
};

mutations.fetchPartyList = function (state, payload) {
  payload.list.forEach(party => {
    if (!state.dynamic.partyList.find(p => p.reg === party.reg)) {
      state.dynamic.partyList.push(party);
    }
  });
}

mutations.fetchSource = function (state, payload) {
  var lookup = state.dynamic.source.find(s => s.source === payload.source);

  if (lookup) {
    console.log(lookup.source, 'already in store');
  } else {
    state.dynamic.source.push({
      source: payload.source,
      content: payload.content
    });
  }
}

export default mutations;
