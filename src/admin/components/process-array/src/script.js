export default {
	name: 'process-array',
	props: ['data', 'expand', 'adjustable'],
	data: function () {
		return {
			show: false,
			autoExpand: true,
			add: {
				list: [
					{value: 0, label: 'text'},
					{value: 1, label: 'číslo'},
					{value: 2, label: 'objekt'},
					{value: 3, label: 'seznam'},
					{value: 4, label: 'část programu'},
					{value: 5, label: 'část programu: text'},
					{value: 6, label: 'část programu: text a seznam'},
					{value: 7, label: 'část programu: nadpis a text'},
					{value: 8, label: 'část programu: nadpis, text a seznam'},
					{value: 9, label: 'neregistrovanou stranu'},
					{value: 10, label: 'osobu'}
				],
				selected: -1,
				key: undefined
			}
		}
	},
	computed: {
		modifiable: function () {
			return this.adjustable || true
		}
	},
	methods: {
		remove: function (index) {
			this.data.splice(index, 1);
		},
		moveUp: function (index) {
			this.data.splice(index - 1, 0, this.data.splice(index, 1)[0]);
		},
		addItem: function () {
			if (this.add.selected === 0) this.data.push(this.add.key || "");
			if (this.add.selected === 1) this.data.push(this.add.key || 0);
			if (this.add.selected === 2) this.data.push({});
			if (this.add.selected === 3) this.data.push([]);
			if (this.add.selected === 4) this.data.push({headline: this.add.key || '', parts: []});
			if (this.add.selected === 5) this.data.push({copy: ''});
			if (this.add.selected === 6) this.data.push({copy: '', list: []});
			if (this.add.selected === 7) this.data.push({headline: this.add.key || '', copy: ''});
			if (this.add.selected === 8) this.data.push({headline: this.add.key || '', copy: '', list: []});
			if (this.add.selected === 9) this.data.push({name: this.add.key || '', logo: ''});
			if (this.add.selected === 10) this.data.push({name: this.add.key || '', about: '', quote: ''});

			this.add.selected = -1;
			this.add.key = undefined;
		}
	},
	mounted: function () {
		this.show = this.data.length > 2 ? (this.expand || false) : true;
	}
};
