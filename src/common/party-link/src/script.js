import {betterURL, gradient} from '@/common/helpers';

export default {
	name: 'party-name-with-dot',
	props: ['reg', 'breakpoint', 'data', 'path'],
	computed: {
		link: function () {
			var segments = [];

			segments.push(this.path || '/rejstrik');
			segments.push(betterURL(this.party.name));

			return segments.join('/');
		},
		color: function () {
			return this.party && this.party.color ? this.gradient(this.party) : '#eeeeeeaa'
		},
		party: function () {
			var party = this.data || this.$store.getters.getPartyByReg(Number(this.reg));

			if (!party) {
				party = {
					name: 'nezávislý',
					short: 'nezávislý',
					color: '#ccc'
				}
			}

			return party;
		}
	}
};
