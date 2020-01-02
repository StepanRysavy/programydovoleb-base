const getters = {
  vuexState: state => state,
  demo: (state, getters) => (id) => {
    return state.structure.find(item => item.id === id)
  }
};

getters.getRegionByNuts = (state, getters) => (nuts) => {
  return state.static.regions.find(r => r.nuts === nuts);
}

getters.getHierarchyByNum = (state, getters) => (num) => {
  if (state.dynamic.towns.length > 0) {
    var obj = {
      num: num,
      nuts: null,
      tree: []
    };

    state.dynamic.towns.forEach(area => {
      area.list.forEach((region, index) => {
        region.list.forEach(district => {
          district.list.forEach(town => {
            if (town.num === Number(num)) {
              obj.nuts = district.nuts;

              obj.tree.push({type: 'země', nuts: 'CZ', name: 'Česká republika'});
              obj.tree.push({type: 'celek', nuts: area.nuts, name: area.name});
              obj.tree.push({type: 'kraj', nuts: region.nuts, name: region.name, index: getters.getRegionByNuts(region.nuts), list: region.list});
              obj.tree.push({type: 'okres', nuts: district.nuts, name: district.name, list: district.list});
              obj.tree.push({type: 'obec', num, name: town.name, list: town.list});
            }

            if (town.list) {
              town.list.forEach(part => {
                if (part.num === Number(num)) {
                  obj.nuts = district.nuts;

                  obj.tree.push({type: 'země', nuts: 'CZ', name: 'Česká republika'});
                  obj.tree.push({type: 'celek', nuts: area.nuts, name: area.name});
                  obj.tree.push({type: 'kraj', nuts: region.nuts, name: region.name, index: getters.getRegionByNuts(region.nuts), list: region.list});
                  obj.tree.push({type: 'okres', nuts: district.nuts, name: district.name, list: district.list});
                  obj.tree.push({type: 'město', num: town.num, name: town.name, list: town.list});
                  obj.tree.push({type: 'část', num, name: part.name});
                }
              });
            }
          });
        });
      });
    });

    obj.tree[2].list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
    obj.tree[3].list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
    if (obj.tree[4].list) {
      obj.tree[4].list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
    }

    return obj;
  } else {
    return undefined;
  }
}

getters.getElectionDetails = (state, getters) => (type, id) => {
  var typeData = state.static.elections.list.find(el => el.hash === type);

  if (typeData) {

    var election = typeData.list.find(el => el.id === id);

    if (election) {
      return election;
    } else {
      return null;
    }

  } else {
    return null;
  }
}

getters.getElectionGlobal = (state, getters) => (type, id, areaName, areaID) => {
  var dyn = state.dynamic.elections.find(el => el.id === type + '-' + id);

  if (areaID && dyn && dyn.files && !dyn.files.find(f => f.type === 'results')) {
    var all = dyn.files.find(f => f.type === 'all-results');
    var results;

    if (areaName) {
      results = all.content[areaName].find(a => a.id === areaID);
    } else {
      results = all.content.find(a => a.id === areaID);
    }

    var obj = {
      type: 'results',
      reg: areaID,
      content: results
    }

    dyn.files.push(obj);
  }

  return dyn;
}

export default getters;