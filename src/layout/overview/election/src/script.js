import ElectionTimeline from "@/components/election/election-timeline/do";
import ElectionType from "@/components/election/election-type/do";

export default {
	name: 'layout-overview-election',
	props: ['type', 'id'],
	components: {
		ElectionTimeline,ElectionType
	},
	data: function () {
		return {
			ID: Number(this.id),
			about: null
		}
	},
	computed: {
		elections: function () {
			var list = [];

			var name = this.about.name;
			var hash = this.type;

			var obj = {
				name,
				hash,
				list: []
			};

			if (['snemovni-volby', 'evropske-volby', 'prezidentske-volby'].indexOf(this.type) > -1) {
				var o = {
					id: this.ID,
					label: 'Česká republika',
					global: {
						id: hash + "-" + this.ID,
						data: this.$store.getters.getElectionGlobal(hash, this.ID)
					},
					about: this.$store.getters.getElectionDetails(hash, this.ID)
				}

				obj.list.push(o);
			}

			if (this.type === 'senatni-volby') {
				var el = this.$store.state.static.senate.dates.find(d => d.date === this.ID);

				if (el) {
					el.obvod.forEach(obv => {
						var o = {
							id: this.ID,
							label: 'Obvod ' + obv,
							global: {
								id: hash + "-" + this.ID,
								data: this.$store.getters.getElectionGlobal(hash, this.ID, 'areas', obv)
							},
							about: this.$store.getters.getElectionDetails(hash, this.ID)
						}

						obj.list.push(o);
					});
				}
			}

			if (this.type === 'krajske-volby') {
				var el = this.$store.state.static.regions;

				if (el) {
					el.forEach((obv, index) => {
						var o = {
							id: obv.id,
							label: obv.name,
							global: {
								id: hash + "-" + this.ID,
								data: this.$store.getters.getElectionGlobal(hash, this.ID, undefined, obv.id)
							},
							about: this.$store.getters.getElectionDetails(hash, this.ID)
						}

						obj.list.push(o);
					});
				}
			}

			list.push(obj);

			return list;
		}
	},
	methods: {
		load: function () {
			this.ID = Number(this.id);
			this.about = this.$store.getters.getElectionDetails(this.type, this.ID);

    	this.$store.dispatch("ga", {title: "Výsledky podle typu: " + this.type + ":" + this.id});
		   window.scrollTo(0, 0);
		}
	},
  mounted: function () {
    window.scrollTo(0, 0);
		this.load();
  },
	watch: {
		type: function () {
			this.load();
		},
		id: function () {
			this.load();
		}
	}
};
