import {betterURL} from "@/store/helpers";

export default {
	name: 'list-senate',
	methods: {
		betterURL
	},
	computed: {
		sorted: function () {
			var list = [];

			this.$store.state.static.senate.list.forEach(s => list.push(s));

			list.sort((a, b) => a.id - b.id);

			return list;
		}
	}
};
