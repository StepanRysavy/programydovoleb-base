export default {
	name: 'coalition-item',
	props: ['reg', 'nameOnly'],
	computed: {
		party: function () {
			return this.$store.getters.getPartyByReg(Number(this.reg));
		}
	},
	mounted: function () {
		this.$store.dispatch('fetchPartyList');
	}
};
