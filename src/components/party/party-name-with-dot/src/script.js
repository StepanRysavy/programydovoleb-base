export default {
	name: 'party-name-with-dot',
	props: ['reg', 'useName', 'useShort', 'alwaysName', 'alwaysShort'],
	computed: {
		color: function () {
			return this.party && this.party.color && this.party.color != '#aaa' ? this.party.color : '#eee'
		},
		name: function () {
			if (this.useName) {
				return this.useName
			} else {
				return this.party ? (this.alwaysShort && this.short ? this.short : this.party.name) : ''
			}
		},
		short: function () {
			if (this.useShort) {
				return this.useShort
			} else {
				return this.party ? (this.alwaysName ? this.name : this.party.short) : undefined
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
		this.$store.dispatch('fetchPartyList');
	}
};