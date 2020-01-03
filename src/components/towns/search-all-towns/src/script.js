import {betterURL} from "@/store/helpers";

export default {
	name: 'search-all-towns',
	data: function () {
		return {
			query: ''
		}
	},
	computed: {
		districts: function () {

			var response = [];

			this.$store.state.dynamic.hierarchy.forEach(area => {
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
		this.$store.dispatch('fetchHierarchy');
	},
	methods: {
		betterURL,
		clear: function () {
			this.query = '';
		}
	}
};
