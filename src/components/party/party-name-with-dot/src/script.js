export default {
	name: 'party-name-with-dot',
	props: ['reg', 'useName', 'useShort'],
	computed: {
		color: function () {
			return this.party && this.party.color ? this.party.color : '#ccc'
		},
		name: function () {
			if (this.useName) {
				return this.useName
			} else {
				return this.party ? this.party.name : ''
			}
		},
		short: function () {
			if (this.useShort) {
				return this.useShort
			} else {
				return this.party ? this.party.short : undefined
			}
		},
		link: function () {
			return this.party ? this.party.reg + '-' + this.party.hash : '';
		},
		party: function () {
			return this.$store.getters.getPartyByReg(Number(this.reg));
		}
	},
	mounted: function () {
		this.$store.dispatch('fetchParty', {
			reg: Number(this.reg)
		});
	}
};
