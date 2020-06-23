import {betterURL, color} from '@/common/helpers';
import CandidateIntro from '@/components/candidate/intro/do';
import CandidateDetail from '@/components/candidate/detail/do';
import ListOfCandidates from '@/components/list-of-candidates/do';
import ResultsPeople from '@/components/results/types/results-people/do';

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			loaded: false,
			compact: false,
			towns: [{"num":546909,"name":"Lukov"},{"num":567442,"name":"Teplice"},{"num":567451,"name":"Bílina"},{"num":567469,"name":"Bořislav"},{"num":567477,"name":"Bystřany"},{"num":567485,"name":"Bžany"},{"num":567507,"name":"Dubí"},{"num":567515,"name":"Duchcov"},{"num":567523,"name":"Háj u Duchcova"},{"num":567531,"name":"Hostomice"},{"num":567558,"name":"Hrob"},{"num":567566,"name":"Hrobčice"},{"num":567582,"name":"Jeníkov"},{"num":567604,"name":"Kladruby"},{"num":567612,"name":"Kostomlaty pod Milešovkou"},{"num":567621,"name":"Košťany"},{"num":567639,"name":"Krupka"},{"num":567647,"name":"Lahošť"},{"num":567655,"name":"Ledvice"},{"num":567698,"name":"Měrunice"},{"num":567701,"name":"Mikulov"},{"num":567710,"name":"Modlany"},{"num":567728,"name":"Moldava"},{"num":567752,"name":"Novosedlice"},{"num":567761,"name":"Ohníč"},{"num":567779,"name":"Osek"},{"num":567787,"name":"Proboštov"},{"num":567809,"name":"Rtyně nad Bílinou"},{"num":567833,"name":"Srbice"},{"num":567841,"name":"Světec"},{"num":567850,"name":"Újezdeček"},{"num":567868,"name":"Zabrušany"},{"num":567876,"name":"Žalany"},{"num":567884,"name":"Žim"}]
		}
	},
  components: {
		CandidateIntro, CandidateDetail, ListOfCandidates, ResultsPeople
  },
	computed: {
		towns_sorted: function () {
			return this.towns.sort((a, b) => a.name.localeCompare(b.name, 'cs'))
		},
		senate20_3: function () {
			if (this.loaded === false) return;

			return this.$store.getters.getSource('volby/senat/20200605/kandidati')
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
		},
		resultsFetch: function () {
			return this.$store.getters.getSource('volby/senat/20200605/vysledky');
		},
		results: function () {
			if (!this.resultsFetch || !this.senate20_3) return;

			var obj = {
				data: {
					global: {
						files: [
							{
								type: 'all-results',
								content: this.resultsFetch
							},
							{
								type: 'candidates',
								content: this.senate20_3
							},
							{
								type: 'results',
								id: 32,
								content: this.resultsFetch.areas[0]
							}
						],
						id: "senatni-volby-20200606"
					},
					results: this.resultsFetch.areas[0]
				},
				id: "senatni-volby-20200606"
			}

			return obj;
		},
		resultsByTown: function () {
			return this.$store.getters.getSource('volby/senat/20200605/summary');
		}
	},
  methods: {
		betterURL, color,
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
