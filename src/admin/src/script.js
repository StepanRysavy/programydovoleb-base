import axios from "axios";
import ImageUpload from "@/admin/components/image-upload/do"
import ProcessObject from "@/admin/components/process-object/do"
import ProcessArray from "@/admin/components/process-array/do"

export default {
	name: 'admin',
    data: function () {
      return {
				a: {
					f: '-',
					p: null,
					v: false,
					e: null
				},
				d: null,
				json: null
			}
    },
    components: {
			ImageUpload, ProcessObject
    },
    computed: {
			pl: function () {
				return this.$store.getters.getSource('volby/kv/2020/list2');
			},
			f: function () {
				var list = [];

				list.push('-');

				if (this.pl) {
					this.pl.list.forEach(r => {
						r.parties.forEach(p => {
							if (p.data) list.push('kv/2020/data/' + p.data);
						})
					})
				}

				list.push('senat/20201002/kandidati');
				list.push('kv/2020/list2');

				return list;
			}
    },
    methods: {
			e: function (msg) {
				this.a.e = msg;

				setTimeout(() => this.a.e = null, 2500);
			},
			showJSON: function () {
				this.json = JSON.stringify(this.d, null, 2);
				this.a.v = true;
			},
			showApp: function () {
				try {
					this.d = JSON.parse(this.json);
					this.a.v = false;
				} catch (e) {
					this.e('Chyba v zápisu, nutná kontrola');
				}
			},
			fileLoad: function () {
				axios.post("https://data.programydovoleb.cz/api/lib/app/api.php?action=file/get&anticache=" + (new Date().getTime()), {
					file: this.a.f,
					key: this.a.p
				}).then(response => {
					if (response.data.code === 200) {
						this.d = response.data.file;
					}
				})
			},
			fileClose: function () {
				this.d = null
			},
			fileSave: function () {
				axios.post("https://data.programydovoleb.cz/api/lib/app/api.php?action=file/save&anticache=" + (new Date().getTime()), {
					file: this.a.f,
					key: this.a.p,
					content: this.d
				}).then(response => {
					if (response.data.code === 200) {
						this.e('Uloženo')
						this.d = null;
					} else {
						this.e(response.data.message);
					}
				})
			}
    }
};
