import {betterURL} from '@/common/helpers'

export default {
	name: 'layout-homepage',
	data: function () {
		return {}
	},
  components: {
  },
	computed: {
		senat: function () {
			return this.$store.getters.getSource('volby/senat/20201002/kandidati')
		},
		regional: function () {
			return this.$store.getters.getSource('volby/kv/2020/list2')
		},
		senatArea: function () {
			return this.$store.getters.getSource('obecne/senatni-volby')
		},
		regions: function () {
			return this.$store.getters.getSource('obecne/info/kv')
		}
	},
  methods: {
		betterURL
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {path: "", title: "Programy do voleb"});
  }
};
