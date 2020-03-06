import {betterURL} from '@/store/helpers';
import CandidateDetail from '@/components/candidate/detail/do';

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			loaded: false,
			compact: false
		}
	},
  components: {
		CandidateDetail
  },
	computed: {
		senate20_3: function () {
			if (this.loaded === false) return;

			return this.$store.getters.getSource('volby/senat/20200327/kandidati')
		},
		regions: function () {
			if (this.loaded === false) return;

			return this.$store.getters.getSource('obecne/senatni-volby')
		},
		senate20: function () {
			if (this.loaded === false && !this.regions) return;

			return this.$store.getters.getSource('volby/senat/20201000/kandidati')
		},
		anyAnswers: function () {
			if (this.loaded === false) return false;

			var res = false;

			this.senate20_3.list.forEach(item => {
				if (item.answers) res = true;
			});

			return res;
		}
	},
  methods: {
		getObvod: function (reg) {
			var obv = this.regions.list.find(o => o.id === reg);

			if (obv) {
				return {
					name: reg + ' · ' + obv.name,
					link: 'https://polist.cz/obvod/' + reg + '-' + betterURL(obv.name)
				}
			}

			return;
		}
  },
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {path: "", title: "Programy do voleb"});
		this.$store.dispatch('fetchPartyList', {
			onComplete: () => this.loaded = true
		})
  }
};
