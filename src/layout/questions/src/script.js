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
			],
			questionsM: [
				"Co se Vám podařilo za poslední dobu, na co jste hrdý?",
				"Čeho byste chtěl dosáhnout v Senátu a na jaké téma byste se chtěl zaměřit?",
			],
			questionsF: [
				"Co se Vám podařilo za poslední dobu, na co jste hrdá?",
				"Čeho byste chtěla dosáhnout v Senátu a na jaké téma byste se chtěla zaměřit?",
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
		},
		getCandidate: function () {
			return this.senate20_3.list.find(data => this.id === (betterURL(data.name[1]) + '-' + betterURL(data.name[2])))
		},
		getQuestion: function (index) {
			var cand = this.getCandidate();

			if (cand.sex === "f" && index < 2) {
				return this.questionsF[index];
			} else if (cand.sex === "m" && index < 2) {
				return this.questionsM[index];
			} else {
				return this.questions[index];
			}
		},
		ga: function () {
	    window.scrollTo(0, 0);
	    this.$store.dispatch("ga", {title: "Odpovědi kandidátů"});
		}
  },
  mounted: function () {
    this.ga();
		this.$store.dispatch('fetchPartyList', {
			onComplete: () => {
				this.loaded = true;
			}
		});
  },
	watch: {
		id: function () {
			this.ga();
		}
	}
};
