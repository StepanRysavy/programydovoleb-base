import {beautifyDate} from "@/store/helpers";

export default {
	name: 'election-item',
	props: ['election', 'prefetch'],
	data: function () {
		return {
			loading: false,
			loaded: false,
			opened: false
		}
	},
	methods: {
	  beautifyDate,
		toggleVisible: function () {
			if (this.opened === true) {
				this.opened = false;
			} else {
				if (this.loaded === true) {
					this.opened = true;
				} else {
					this.loading = true;
					this.load();
				}
			}
		},
		toggleVisibleAfterLoad: function () {
			this.loading = false;
			this.loaded = true;
			this.opened = true;
		},
		load: function () {
			var payload = {
				id: this.election.id,
				path: this.election.data.about.path,
				files: this.election.data.about.files,
				onComplete: () => {
					this.toggleVisibleAfterLoad();
				}
			}

			this.$store.dispatch('fetchResultFiles', payload);
		}
	},
	computed: {
		reg: function () {
			if (this.election.data.global.data) {
				if (this.election.data.global.data.files && this.election.data.global.data.files.length > 0) {
					var res = this.election.data.global.data.files.find(f => f.type === "results");

					if (res && res.reg) return res.reg;
				}
			}

			return undefined;
		}
	},
	mounted: function () {
		if (this.prefetch && this.prefetch === true) {
			this.toggleVisible();
		}
	},
	watch: {
		election: function () {
			if (this.opened === true) {
				this.loading = true;
				this.loaded = false;
				this.opened = false;

				this.load();
			}
		}
	}
};
