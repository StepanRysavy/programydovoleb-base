import {beautifyDate} from "@/store/helpers";

export default {
	name: 'election-type',
	props: ['election'],
	data: function () {
		return {
			opened: false
		}
	},
	methods: {
	  beautifyDate,
		toggleVisible: function () {
			this.opened = !this.opened;
		}
	}
};
