import axios from "axios";
import {betterURL} from "@/common/helpers";

export default {
	name: 'admin',
	props: ['id'],
  data: function () {
    return {
			json: null,
			em: null
		}
  },
  components: {},
  computed: {
		questions: function () {
			if (!this.json) return undefined;

			var link;

			if (this.json.type === 'kv') {
				link = 'volby/kv/2020/odpovedi/otazky';
			} else {
				link = 'volby/senat/20201002/odpovedi/otazky';
			}

			return this.$store.getters.getSource(link);
		}
	},
  methods: {
		r: function (id) {
			var l = {
				stk: "Středočeský kraj",
				jck: "Jihočeský kraj",
				plk: "Plzeňský kraj",
				kvk: "Karlovarský kraj",
				ulk: "Ústecký kraj",
				lbk: "Liberecký kraj",
				khk: "Královéhradecký kraj",
				pak: "Pardubický kraj",
				vys: "Kraj Vysočina",
				jmk: "Jihomoravský kraj",
				olk: "Olomoucký kraj",
				zlk: "Zlínský kraj",
				msk: "Moravskoslezský kraj"
			}

			return l[id] || id.toUpperCase();
		},
		e: function (msg) {
			this.em = msg;

			setTimeout(() => this.em = null, 2500);
		},
		fileLoad: function () {
			axios.post("https://data.programydovoleb.cz/api/lib/app/api.php?action=ans/get&anticache=" + (new Date().getTime()), {
				hash: this.id
			}).then(response => {
				if (response.data.code === 200) {
					this.json = response.data.file;
				}
			})
		},
		fileClose: function () {
			this.d = null
		},
		fileSave: function () {
			axios.post("https://data.programydovoleb.cz/api/lib/app/api.php?action=ans/save&anticache=" + (new Date().getTime()), {
				hash: this.id,
				content: this.json
			}).then(response => {
				if (response.data.code === 200) {
					this.e('Uloženo')
				} else {
					this.e(response.data.message);
				}
			})
		}
  },
  mounted: function () {
    window.scrollTo(0, 0);
		this.fileLoad();
    this.$store.dispatch("ga", {title: "Formulář"});
  }
};
