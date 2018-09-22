export default {
	name: 'layout-homepage',
  components: {
  },
	computed: {
	},
  methods: {
    sort: function (list, by) {
      return list.sort((a,b) => a[by].localeCompare(b[by], 'cs', {sensitivity: 'base'}));
    },
    outbound: function (typ, hash) {
      this.$store.dispatch("ga", {path: "link/" + typ + "/" + hash, title: "Outbound: (" + typ + "): " + hash});
    }
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {path: "", title: "Programy do voleb"});
  }
};

