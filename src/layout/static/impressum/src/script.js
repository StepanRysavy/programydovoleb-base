export default {
	name: 'layout-impressum',
	data: function () {
		return {}
	},
	computed: {},
	components: {},
	methods: {},
	mounted: function () {
    	this.$store.dispatch("ga", {title: "O projektu Programy do voleb"});
		window.scrollTo(0, 0);
	}
};
