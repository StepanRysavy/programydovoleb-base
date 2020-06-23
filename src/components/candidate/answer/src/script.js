import {stripURLintoDomain, betterURL} from '@/common/helpers';

export default {
	name: 'candidate-answer',
	props: ['data', 'answer'],
	computed: {
		color: function () {
			var s = [];

			var party;

			if (this.data.member) {
				if (typeof this.data.member === 'number') {
					party = this.$store.getters.getPartyByReg(this.data.member);
				}
			}

			if (((party && party.reg === 99) || !party) && this.data.nominee) {
				if (typeof this.data.nominee === 'number') {
					party = this.$store.getters.getPartyByReg(this.data.nominee);
				}
			}

			if (party) {
				return party.color;
			} else {
				return '#aaa';
			}
		}
	},
	methods: {
		betterURL
	}
};
