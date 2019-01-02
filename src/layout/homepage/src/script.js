export default {
	name: 'layout-homepage',
  components: {
  },
	computed: {
    listPriority1: function () {
      var list = this.$store.state.komunal18.filter(item => Number(item.LIST) === 1);

      return list[0];
    },
    listPriority2: function () {
      var list = this.$store.state.komunal18.filter(item => Number(item.LIST) === 2);

      return this.sort(list, "NAZEVZAST");
    },
    listPriority3: function () {
      var list = this.$store.state.komunal18.filter(item => Number(item.LIST) === 3);

      return this.sort(list, "NAZEVZAST");
    }
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

