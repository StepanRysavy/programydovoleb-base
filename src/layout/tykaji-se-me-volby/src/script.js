import {betterURL} from '@/common/helpers';
import SearchAllTowns from '@/components/search-all-towns/do';

export default {
	name: 'layout-tykajisemevolby',
	data: function () {
		return {
			query: '',
			results: [],
			selected: undefined,
			count: 0
		}
	},
  components: {
		SearchAllTowns
  },
	computed: {
		json: function () {
			return this.$store.getters.getSource('volby/plan-2020')
		},
		region: function () {
			if (!this.selected) return '';

			return this.json.regions.find(x => x.nuts === this.selected[2].substring(0, 5));
		},
		any: function () {
			if (!this.selected) return false;

			return !(this.selected[2] === 'CZ0100' && this.json.elections[0].sen10.indexOf(this.selected[1]) === -1);
		}
	},
  methods: {
		betterURL,
		result: function (item) {
			this.count++;
			this.selected = item.data;
			this.$store.dispatch("ge", {
				action: "selected",
				category: "town_search",
				label: item.data[4]
			});
	    window.scrollTo(0, 0);
		},
		reset: function () {
			this.selected = undefined;
			this.$store.dispatch("ge", {
				action: "reset",
				category: "town_search",
				label: 'Nové hledání'
			});
	    window.scrollTo(0, 0);
		}
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {title: "Týkají se mě volby"});
  }
};
