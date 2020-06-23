import {stripURLintoDomain, betterURL} from '@/common/helpers';

export default {
	name: 'candidate-intro',
	props: ['data', 'compact'],
	computed: {
		links: function () {
			var list = [];

			if (this.data.links) {
				this.data.links.forEach(link => {
					var obj = {
						icon: '/static/icon/' + (link.icon || 'link') + '.svg',
						url: link.url,
						name: link.label
					};

					if (!link.icon && !link.label) {
						if (link.url.length > 16) {
							obj.name = 'Webové stránky'
						} else {
							obj.name = stripURLintoDomain(link.url);
						}
					}
					if (link.icon && link.icon === 'fb' && !link.label) {
						var n = link.url.split('facebook.com/')[1];

						if (n.length > 16) {
							obj.name = 'Facebook';
						} else {
							obj.name = n;
						}
					}
					if (link.icon && link.icon === 'ig') obj.name = link.url.split('instagram.com/')[1];
					if (link.icon && link.icon === 'tw') obj.name = link.url.split('twitter.com/')[1];
					if (link.icon && link.icon === 'hs') obj.name = 'Hlídač státu';
					if (link.icon && link.icon === 'wiki') obj.name = 'Wikipedia';

					list.push(obj);
				});
			}

			return list;
		},
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
