import ElectionTimeline from "@/components/election/election-timeline/do";
import ListSenate from "@/components/towns/list-senate/do";

export default {
	name: 'layout-overview-senate',
	props: ['location'],
	components: {
		ElectionTimeline,
		ListSenate
	},
  mounted: function () {
    window.scrollTo(0, 0);
		this.loadObvod();
  },
	data: function () {
		return {
			obvod: null,
			dates: []
		}
	},
	watch: {
		location: function () {
			this.loadObvod();
		}
	},
	methods: {
		loadObvod: function () {

			var id = Number(this.location.split("-")[0]);

			this.obvod = this.$store.state.static.senate.list.find(s => s.id === id);
			this.dates = [];

			this.$store.state.static.senate.dates.forEach(date => {
				var o = date.obvod.find(d => d === this.obvod.id);

				if (o) this.dates.push(date.date);
			});

    	this.$store.dispatch("ga", {title: "Výsledky pro obvod: " + this.obvod.id + " - " + this.obvod.name});
		}
	},
	computed: {
		elections: function () {
			var list = [];

			var name = 'Senátní volby';
			var hash = 'senatni-volby';

			var obj = {
				name,
				hash,
				list: []
			};

			function addToList (self, id) {
				var data = {
					id: id,
					global: {
						id: hash + "-" + id,
						data: self.$store.getters.getElectionGlobal(hash, id, 'areas', self.obvod.id)
					},
					about: self.$store.getters.getElectionDetails(hash, id)
				}

				if (data.about) obj.list.push(data);
			}

			if (this.obvod) {
				this.dates.forEach(date => addToList(this, date));
			}

			list.push(obj);

			return list;
		}
	}
};
