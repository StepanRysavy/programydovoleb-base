import {beautifyNumber} from "@/store/helpers";

export default {
	name: 'results-parties-table',
	props: ['data', 'local'],
	data: function () {
		return {
			showAll: false
		}
	},
	computed: {
		coef1: function () {
			return this.coef(false);
		},
		coef2: function () {
			if (this.local === true) {
				return this.coef(true);
			} else {
				return 1;
			}
		},
		rest: function () {
			var obj = {
				votes: 0,
				pct: 0,
				local: {
					votes: 0,
					pct: 0
				}
			}

			this.data.forEach(party => {
				if (party.pct < 5) {
					obj.votes += party.votes;
					obj.pct += party.pct;

					if (this.coef2 != 1) {
						obj.local.votes += party.local.votes;
						obj.local.pct += party.local.pct;
					}
				}
			});

			obj.pct = Math.round(obj.pct * 100) / 100;
			obj.local.pct = Math.round(obj.local.pct * 100) / 100;

			return obj;
		}
	},
	methods: {
		beautifyNumber,
		showAllToggle: function () {
			this.showAll = !this.showAll;
		},
		coef: function (local) {
			var max = 0;

			this.data.forEach(result => {
				if (local === true) {
					if (result.local.pct > max) max = result.local.pct;
				} else {
					if (result.pct > max) max = result.pct;
				}
			})

			return 100 / max * .75;
		}
	}
};