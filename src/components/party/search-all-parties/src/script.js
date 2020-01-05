import {betterURL} from "@/store/helpers";
import PartyNameWithDot from "@/components/party/party-name-with-dot/do";

export default {
	name: 'search-all-parties',
	data: function () {
		return {
			query: ''
		}
	},
	components: {
		PartyNameWithDot
	},
	computed: {
		parties: function () {
			return this.$store.getters.getPartyList();
		},
		queryResults: function () {
			var list = [];

			if (this.query.length > 2) {
				var query = this.query.toLowerCase();

				this.parties.forEach(party => {
					if (!party.coalition) {
						var name = party.name.toLowerCase();
						var short = (party.short || '').toLowerCase();

						if (name.split(query).length > 1 || short.split(query).length > 1) list.push(party);
					}
				})
			}

			return list;
		},
		prominent: function () {
			var list = [];

			this.queryResults.forEach(party => {
				if (this.$store.state.static.prominent.parties.indexOf(party.reg) > -1) {
					list.push(party);
				}
			});

			list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));

			return list;
		},
		others: function () {
			var list = [];

			this.queryResults.forEach(party => {
				if (this.$store.state.static.prominent.parties.indexOf(party.reg) === -1) {
					list.push(party);
				}
			});

			list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));

			return list;
		},
		coalitionResult: function () {
			var list = [];

			this.queryResults.forEach(result => {
				this.parties.forEach(party => {
					if (party.coalition && party.coalition.indexOf(result.reg) > -1) {
						if (!list.find(p => p.reg === party.reg)) {
							list.push(party);
						}
					}
				});
			});

			return list;
		}
	},
	mounted: function () {
		this.$store.dispatch('fetchPartyList');
	},
	methods: {
		betterURL,
		clear: function () {
			this.query = '';
		}
	}
};
