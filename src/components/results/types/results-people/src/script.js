import TablePeople from "../../../tables/table-people/do";
import TableDuel from "../../../tables/table-duel/do";

export default {
	name: 'results-people',
	props: ['global', 'local', 'reg', 'table'],
	components: {
		TablePeople, TableDuel
	},
	computed: {
		hasSecondRound: function () {
			return !!this.globalResults.round2;
		},
		globalResults: function () {
			return this.global.data.files.find(f => f.type === "results").content;
		},
		globalEnum: function () {
			return this.global.data.files.find(f => f.type === "candidates").content.list;
		},
		round1: function () {
			var data = [];

			this.globalResults.round1.candidates.forEach(candidate => {
				var obj = {
					votes: candidate.votes,
					pct: candidate.pct,
					id: candidate.id,
					name: candidate.name,
					progress: candidate.progress,
					about: this.getAbout(candidate.id, this.reg),
					local: this.getLocal(candidate.id, 'round1')
				}

				data.push(obj);
			});

			data.sort((a, b) => b.pct - a.pct);


			return data;
		},
		round2: function () {
			var data = [];

			if (this.hasSecondRound === true) {

				this.globalResults.round2.candidates.forEach(candidate => {
					var obj = {
						votes: candidate.votes,
						pct: candidate.pct,
						id: candidate.id,
						name: candidate.name,
						progress: candidate.progress,
						about: this.getAbout(candidate.id, this.reg),
						local: this.getLocal(candidate.id, 'round2')
					}

					data.push(obj);
				});
			}

			data.sort((a, b) => b.pct - a.pct);

			return data;
		}
	},
	methods: {
		getAbout: function (id, reg) {
			if (reg) {
				return this.globalEnum.find(person => person.id === id && person.reg === reg);
			} else {
				return this.globalEnum.find(person => person.id === id);
			}
		},
		getLocal: function (id, round) {
			if (this.local && this.local.round1) {
				var person = this.local[round].candidates.find(person => person.id === id);

				if (person) {
					return {
						votes: person.votes,
						pct: person.pct
					}
				} else {
					return undefined;
				}
			} else {
				return undefined;
			}
		}
	}
};
