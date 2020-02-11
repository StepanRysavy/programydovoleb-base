export default {
	name: 'logo-item',
	props: ['party', 'size', 'reg', 'color'],
	computed: {
		sizeValue: function () {
			if (this.size < 10) {
				return this.size + 'rem';
			} else {
				return this.size + 'px';
			}
		},
		coalition: function () {
			if (!this.partyData.coalition) return null;

			var list = [];

			this.partyData.coalition.forEach(reg => {
				var party = this.$store.state.dynamic.partyList.find(p => p.reg === reg);

				if (party) list.push(party);
			});

			return list;
		},
		partyData: function () {
			if (this.reg) {
				return this.$store.state.dynamic.partyList.find(p => p.reg === this.reg) || this.$store.state.dynamic.partyList.find(p => p.reg === 9999);
			} else {
				return this.party;
			}
		}
	},
	methods: {
	}
};
