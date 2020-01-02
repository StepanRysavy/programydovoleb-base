import {beautifyNumber} from "@/store/helpers";

export default {
	name: 'results-people-table',
	props: ['data'],
	computed: {
		coef1: function () {
			return this.coef(false);
		},
		coef2: function () {
			if (this.data[0].local) {
				return this.coef(true);
			} else {
				return 1;
			}
		}
	},
	methods: {
		beautifyNumber,
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
