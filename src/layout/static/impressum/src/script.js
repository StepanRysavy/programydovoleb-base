export default {
	name: 'layout-impressum',
	data: function () {
		return {}
	},
	computed: {
		enhanced: function () {
			return this.$store.getters.getSource('volby/settings');
		}
	},
	components: {},
	methods: {},
	mounted: function () {
    	this.$store.dispatch("ga", {title: "O projektu Programy do voleb"});
		window.scrollTo(0, 0);
	}
};
