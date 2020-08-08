import SpecialName from "@/admin/components/special-name/do"

export default {
	name: 'process-object',
	props: ['data', 'closed'],
	data: function () {
		return {
			show: true,
			add: {
				list: [
					{value: 0, label: 'text'},
					{value: 1, label: 'číslo'},
					{value: 2, label: 'objekt'},
					{value: 3, label: 'seznam'},
					{value: 4, label: 'jméno'},
					{value: 5, label: 'program'},
					{value: 6, label: 'odpovědi'}
				],
				selected: -1,
				key: '',
				val: undefined
			}
		}
	},
	components: {
		SpecialName
	},
	computed: {
		canAdd: function () {
			return !(this.data[this.add.key] && this.data[this.add.key] != null) && this.add.key != "";
		}
	},
	methods: {
		remove: function (key) {
			this.data[key] = null;
		},
		addItem: function () {
			if (this.data[this.add.key] && this.data[this.add.key] != null) return;

			if (this.add.selected === 0) this.data[this.add.key] = this.add.val || "";
			if (this.add.selected === 1) this.data[this.add.key] = this.add.val || 0;
			if (this.add.selected === 2) this.data[this.add.key] = {};
			if (this.add.selected === 3) this.data[this.add.key] = [];
			if (this.add.selected === 4) this.data['nameFull'] = ['', '', '', ''];
			if (this.add.selected === 5) this.data['program'] = {motto: '', source: '', 'parts': []};
			if (this.add.selected === 6) this.data['answers'] = ['', '', '', ''];

			this.add.key = "";
			this.add.selected = -1;
			this.add.val = undefined;
		}
	},
	mounted: function () {
		this.show = this.closed ? (Object.keys(this.data).length > 2 ? !this.closed : true) : true;
	}
};
