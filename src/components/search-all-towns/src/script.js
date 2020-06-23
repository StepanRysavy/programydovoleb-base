export default {
	name: 'search-all-towns',
	props: ['data'],
	data: function () {
		return {
			query: ''
		}
	},
	computed: {
		queryResults: function () {
			var list = [];

			if (this.query != '' && (this.query.length > 2 || this.query.toLowerCase() === 'aš')) {
				var found = this.getList(this.query.toLowerCase());

				found.forEach((item, i) => {
					var obj = {
						name: item[4],
						district: this.data.districts.find(x => x.nuts === item[2]).name,
						data: item
					}

					list.push(obj);
				});

				list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));

			}

			return list;
		}
	},
	mounted: function () {
	},
	methods: {
		select: function (item) {
			this.$emit('select', item);
			this.clear();
		},
		clear: function () {
			this.query = '';
		},
		getList: function (query) {
			var list = [];

			var num = Number(query.split(' ').join(''));

			if (isNaN(num)) {

				list = this.data.towns.filter(x => x[4].toLowerCase().split(query).length > 1);

			} else {

				var det = 1;

				if (num < 1000) {
					det = 100;
				} else if (num < 10000) {
					det = 10;
				}

				list = this.data.towns.filter(x => Math.floor(x[3] / det) === num);

				if (num < 200 || (num > 999 && num < 2000) || (num > 9999 && num < 20000)) {
					list = this.data.towns.filter(x => x[2] === 'CZ0100')
				}

			}

			return list;
		}
	}
};
