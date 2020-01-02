import {betterURL} from "@/store/helpers";
import ElectionType from "@/components/election/election-type/do";

export default {
	name: 'layout-overview',
	data: function () {
		return {
			towns: {
				capital: [
					{num: 554782, name: 'Hlavní město Praha'}
				],
				regional: [
					{num: 582786, name: 'Brno'},
					{num: 544256, name: 'České Budějovice'},
					{num: 569810, name: 'Hradec Králové'},
					{num: 586846, name: 'Jihlava'},
					{num: 554961, name: 'Karlovy Vary'},
					{num: 563889, name: 'Liberec'},
					{num: 500496, name: 'Olomouc'},
					{num: 554821, name: 'Ostrava'},
					{num: 555134, name: 'Pardubice'},
					{num: 554791, name: 'Plzeň'},
					{num: 554804, name: 'Ústí nad Labem'},
					{num: 585068, name: 'Zlín'}
				],
				other: [
					{num: 561380, name: 'Česká Lípa'},
					{num: 562335, name: 'Děčín'},
					{num: 598003, name: 'Frýdek-Místek'},
					{num: 555088, name: 'Havířov'},
					{num: 562971, name: 'Chomutov'},
					{num: 563510, name: 'Jablonec nad Nisou'},
					{num: 598917, name: 'Karviná'},
					{num: 532053, name: 'Kladno'},
					{num: 535419, name: 'Mladá Boleslav'},
					{num: 567027, name: 'Most'},
					{num: 505927, name: 'Opava'},
					{num: 589250, name: 'Prostějov'},
					{num: 511382, name: 'Přerov'},
					{num: 552046, name: 'Tábor'},
					{num: 567442, name: 'Teplice'},
					{num: 590266, name: 'Třebíč'},
					{num: 598810, name: 'Třinec'}
				]
			},
			query: ''
		}
	},
	components: {
		ElectionType
	},
	methods: {
		betterURL
	},
	computed: {
		districts: function () {

			var response = [];

			this.$store.state.dynamic.towns.forEach(area => {
				area.list.forEach(region => {
					region.list.forEach(i => response.push(i));
				});
			});

			return response;
		},
		numsFlatList: function () {
			var list = [];

			this.districts.forEach(d => {
				d.list.forEach(t => {
					list.push({
						num: t.num,
						nuts: d.nuts,
						tName: t.name,
						dName: d.name,
						pName: null
					});

					if (t.list) {
						t.list.forEach(p => {
							list.push({
								num: p.num,
								nuts: d.nuts,
								tName: t.name,
								dName: d.name,
								pName: p.name
							});
						});
					}
				});
			})

			return list;
		},
		queryResults: function () {
			var list = [];

			if (this.numsFlatList.length > 0 && this.query != '' && this.query.length > 2) {
				var found = this.numsFlatList.filter(item => item.tName.toLowerCase().split(this.query.toLowerCase()).length > 1 || (item.pName != null ? item.pName.toLowerCase().split(this.query.toLowerCase()).length > 1 : false));

				found.forEach(f => list.push(f));
			}

			list.sort((a, b) => a.tName.localeCompare(b.tName, 'cs'));

			return list;
		}
	},
  mounted: function () {
    window.scrollTo(0, 0);
		this.$store.dispatch('fetchTowns');
    this.$store.dispatch("ga", {title: "Výsledky voleb"});
  }
};
