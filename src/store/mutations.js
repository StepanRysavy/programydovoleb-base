const mutations = {
  demo (state, payload) {}
};

mutations.fetchHierarchy = function (state, payload) {
  payload.hierarchy.list.forEach(item => state.dynamic.hierarchy.push(item));
}

mutations.fetchResultFiles = function (state, payload) {
  state.dynamic.elections.push(payload);
}

mutations.fetchTown = function (state, payload) {
  var lookup = state.dynamic.towns.find(town => town.num === payload.id);

  if (lookup) {
    console.log(lookup.name, 'already in store');
  } else {
    state.dynamic.towns.push(payload);
  }
}

mutations.fetchParty = function (state, payload) {
  var lookup = state.dynamic.parties.find(party => party.reg === payload.reg);

  if (lookup) {
    console.log(lookup.name, 'already in store');
  } else {
    state.dynamic.parties.push(payload);
  }
}

mutations.fetchPartyList = function (state, payload) {
  payload.list.forEach(party => {
    if (!state.dynamic.partyList.find(p => p.reg === party.reg)) {
      state.dynamic.partyList.push(party);
    }
  });
}

export default mutations;
