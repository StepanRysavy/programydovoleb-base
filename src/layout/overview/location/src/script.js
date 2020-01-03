import axios from "axios";
import ElectionTimeline from "@/components/election/election-timeline/do";
import SearchAllTowns from "@/components/towns/search-all-towns/do";
import {betterURL} from "@/store/helpers";

export default {
	name: 'layout-overview-location',
	props: ['location'],
	data: function () {
		return {
			num: null,
			hierarchy: null
		}
	},
	components: {
		ElectionTimeline,
		SearchAllTowns
	},
	methods: {
		betterURL,
		loadTownComplete: function () {
	    window.scrollTo(0, 0);

		},
		loadTown: function () {
			this.num = Number(this.location.split("-")[0]);

			this.hierarchy = this.$store.getters.getHierarchyByNum(this.num);

			this.$store.dispatch("fetchTown", {
				num: this.num,
				nuts: this.hierarchy.nuts,
				onComplete: () => this.loadTownComplete()
			});
		}
	},
	computed: {
		town: function () {
			return this.$store.getters.getTownByNum(this.num)
		},
		elections: function () {
			var list = [];

			function addToList (self, label, name, hash, id, areaName, areaID) {
				if (self.town.volby[label].length > 0) {

					var obj = {
						name,
						hash,
						list: []
					};

					self.town.volby[label].forEach(v => {

						var data = {
							id: v[id],
							local: v,
							global: {
								id: hash + "-" + v[id],
								data: self.$store.getters.getElectionGlobal(hash, v[id], areaName, areaID)
							},
							about: self.$store.getters.getElectionDetails(hash, v[id])
						}

						if (data.about) obj.list.push(data);
					});

					list.push(obj);
				}
			}

			function addToListCommunal (self, label, name, hash, id) {
				if (self.town.volby[label].length > 0) {

					var obj = {
						name,
						hash,
						list: []
					};

					self.town.volby[label].forEach(v => {

						var data = {
							id: v[id],
							global: {
								id: hash + "-" + v[id],
								data: {
									global: {
										files: [
											{
												content: {
													parties: v.parts[0].results
												},
												type: "results"
											},
											{
												content: {
													list: []
												},
												type: "parties"
											}
										],
									},
									results: {
										content: {
											parties: v.parts[0].results
										}
									},
									id: v[id]
								}
							},
							about: self.$store.getters.getElectionDetails(hash, v[id])
						}

						if (data.about) obj.list.push(data);
					});

					list.push(obj);
				}
			}

			if (this.town) {
				try {
					addToList(this, "prezident", "Prezidentské volby", "prezidentske-volby", "year");

					addToList(this, "snemovna", "Sněmovní volby", "snemovni-volby", "year");
					addToListCommunal(this, "obce", "Komunální volby", "komunalni-volby", "year");
					addToList(this, "eu", "Evropské volby", "evropske-volby", "year");
					if (this.hierarchy.tree[2].index && this.hierarchy.tree[2].index.id > 0) {
						addToList(this, "kraje", "Krajské volby", "krajske-volby", "year", undefined, this.hierarchy.tree[2].index.id);
					}
					if (this.town.obvod) {
						addToList(this, "senat", "Senátní volby", "senatni-volby", "date", "areas", this.town.obvod.id);
					}
				} catch (e) {
					console.log(e);
				}
			}

			return list;
		}
	},
  mounted: function () {
    window.scrollTo(0, 0);
		this.$store.dispatch('fetchHierarchy', {onComplete: () => this.loadTown()});
  },
	watch: {
		location: function () {
			this.loadTown();
		},
		town: function () {
			if (this.town) {
				this.$store.dispatch("ga", {title: "Výsledky podle místa: " + this.town.name});
			}
		}
	}
};
