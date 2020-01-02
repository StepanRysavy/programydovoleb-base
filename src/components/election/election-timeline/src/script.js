import ElectionItem from "../../election-item/do";
import {beautifyDate} from "@/store/helpers";

export default {
	name: 'election-timeline',
	props: ['elections'],
	components: {
		ElectionItem
	},
	data: function () {
		return {
			timeline: []
		}
	},
	methods: {
		createTimeline: function () {
			var tl = [];

			this.elections.forEach(type => {
				type.list.forEach(election => {
					var obj = {
						id: election.global.id,
						name: type.name + (election.about.type === "extra" ? " doplňovací" : "") + " · " + election.about.label, // beautifyDate(election.about.date[0]),
						type: type.hash,
						date: election.about.date[0],
						data: election
					};

					tl.push(obj);
				});
			});

			tl.sort((a, b) => b.date - a.date);

			this.timeline = tl;
		}
	},
	mounted: function () {
		this.createTimeline();
	},
	watch: {
		elections: function () {
			this.createTimeline();
		}
	}
};
