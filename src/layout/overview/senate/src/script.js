export default {
	name: 'layout-overview-location',
	props: ['location'],
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {title: "Výsledky pro obvod: " + this.location});
  }
};
