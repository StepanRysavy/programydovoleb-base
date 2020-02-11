export default {
	name: 'layout-homepage',
	data: function () {
		return {
			loaded: false
		}
	},
  components: {
  },
	computed: {
		senate20_3: function () {
			if (this.loaded === false) return;

			return this.$store.getters.getSource('volby/senat/20200327/kandidati')
		}
	},
  methods: {
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {path: "", title: "Programy do voleb"});
		this.$store.dispatch('fetchPartyList', {
			onComplete: () => this.loaded = true
		})
  }
};
