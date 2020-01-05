import {betterURL, beautifyDate, stripURLintoDomain} from "@/store/helpers";
import PartyNameWithDot from "@/components/party/party-name-with-dot/do";

export default {
	name: 'layout-party',
	props: ['id'],
	data: function () {
		return {
			reg: null
		}
	},
	components: {
		PartyNameWithDot
	},
	methods: {
		betterURL,
		beautifyDate,
		loadPartyComplete: function () {
	    window.scrollTo(0, 0);
		},
		loadParty: function () {
			this.reg = Number(this.id.split("-")[0]);

			this.$store.dispatch("fetchParty", {
				reg: this.reg,
				onComplete: () => this.loadPartyComplete()
			});
		}
	},
	computed: {
		party: function () {
			return this.$store.getters.getPartyByReg(Number(this.reg))
		},
		lastElection: function () {
			var obj = {
				date: 0,
				link: '',
				name: ''
			}

			if (this.party && this.party.activity && this.party.activity.list && this.party.activity.list.length > 0) {

				var el = this.party.activity.list[0];

				obj.link = '/vysledky/volby/' + el.type + "/" + el.id;
				obj.date = el.date;

				var about = this.$store.state.static.elections.list.find(e => e.hash === el.type);

				obj.name = about.name;
			}

			return obj;
		},
		links: function () {
			var list = [];

			if (this.party) {
				if (this.party.links && this.party.links.global) {
					this.party.links.global.forEach(link => {
						var o = {
							content: stripURLintoDomain(link.url),
							link: link.url,
							icon: {
								src: '/static/icon/link.svg',
								name: 'odkaz'
							}
						}

						if (link.icon) {
							o.icon.name = link.icon;
							o.icon.src = '/static/icon/' + link.icon + '.svg';
						}

						if (link.icon === 'wiki') {
							o.content = 'Wikipedia';
						}

						['facebook.com', 'youtube.com', 'instagram.com', 'twitter.com'].forEach(s => {
								if (o.content.split(s).length > 1) {
									o.content = o.content.split(s)[1]
								}
						});

						list.push(o);
					});
				}
			}

			return list;
		},
		memberOf: function () {
			var list = [];

			if (this.party && this.party.memberOf) {
				this.party.memberOf.forEach(reg => {
					var px = this.$store.state.dynamic.partyList.find(p => p.reg === reg);

					if (px) list.push(px);
				})
			}

			list.sort((a, b) => b.activity.last - a.activity.last);

			return list;
		}
	},
  mounted: function () {
    window.scrollTo(0, 0);
		this.$store.dispatch('fetchPartyList', {
			onComplete: () => this.loadParty()
		});
  },
	watch: {
		id: function () {
			this.loadParty();
		},
		party: function () {
			if (this.party) {
				this.$store.dispatch("ga", {title: "Detail: " + this.party.name});
			}
		}
	}
};
