export default {
	name: 'layout-overview-election',
	props: ['type', 'id'],
  mounted: function () {
    window.scrollTo(0, 0);
		this.$store.dispatch('fetchTowns');
    this.$store.dispatch("ga", {title: "Výsledky podle typu: " + this.type + ":" + this.id});
  }
};
