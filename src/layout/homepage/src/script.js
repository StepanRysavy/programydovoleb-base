export default {
	name: 'layout-homepage',
	data: function () {
		return {}
	},
  components: {
  },
	computed: {
	},
  methods: {
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {path: "", title: "Programy do voleb"});
  }
};
