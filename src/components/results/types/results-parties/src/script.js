import TableParties from "../../../tables/table-parties/do";
import TablePeople from "../../../tables/table-people/do";

export default {
	name: 'results-parties',
	props: ['global', 'local', 'reg', 'table'],
	components: {
		TableParties, TablePeople
	},
	computed: {
		globalResults: function () {
			return this.global.data.results.content || this.global.data.results;
		},
		globalEnum: function () {
			return this.global.data.global.files.find(f => f.type === "parties").content.list;
		},
		results: function () {
			var data = [];

			this.globalResults.parties.forEach(party => {
				var obj = {
					votes: party.votes,
					pct: (party.ptc || party.pct) || 0,
					id: party.id,
					reg: party.reg,
					name: party.name,
					short: party.short,
					about: this.getAbout(party.reg),
					local: this.getLocal(party.reg)
				}

				if (obj.name === undefined) {
					obj.name = obj.about.name;
					obj.short = obj.about.short;
				}

				data.push(obj);
			});

			data.sort((a, b) => b.pct - a.pct);

			return data;
		}
	},
	methods: {
		getAbout: function (reg) {
			return this.globalEnum.find(party => party.reg === reg);
		},
		getLocal: function (reg) {
			if (this.local && this.local.result) {
				var party = this.local.result.find(res => res.reg === reg);

				if (party) {
					return {
						votes: party.votes,
						pct: party.pct
					}
				} else {
					return {votes: 0, pct: 0}
				}
			} else {
				return undefined;
			}
		}
	}
};
