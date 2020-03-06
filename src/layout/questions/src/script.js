import {betterURL} from '@/store/helpers';
import CandidateAnswer from '@/components/candidate/answer/do';
import CandidateFake from '@/components/candidate/fake/do';
import CandidateDetail from '@/components/candidate/detail/do';

export default {
	name: 'layout-questions',
	props: ['id'],
	data: function () {
		return {
			loaded: false,
			compact: false,
			questions: [
				"Co se Vám podařilo za poslední dobu, na co jste hrdí?",
				"Čeho byste chtěli dosáhnout v Senátu a na jaké téma byste se chtěli zaměřit?",
				"Jak chcete zastavit \"odliv mozků\" z Teplicka?",
				"Podporujete výstavbu sociálního bydlení jako jednoho z nástrojů řešení sociálního vyloučení?"
			]
		}
	},
  components: {
		CandidateAnswer,
		CandidateFake,
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
		}
	},
  methods: {
		betterURL,
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
    this.$store.dispatch("ga", {title: "Odpovědi kandidátů"});
		this.$store.dispatch('fetchPartyList', {
			onComplete: () => {
				this.loaded = true;
			}
		});
  }
};
