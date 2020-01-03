import {betterURL} from "@/store/helpers";
import ElectionType from "@/components/election/election-type/do";
import ListMainTowns from "@/components/towns/list-main-towns/do";
import SearchAllTowns from "@/components/towns/search-all-towns/do";
import ListSenate from "@/components/towns/list-senate/do";

export default {
	name: 'layout-overview',
	components: {
		ElectionType, ListMainTowns, SearchAllTowns, ListSenate
	},
	methods: {
		betterURL
	},
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {title: "Výsledky voleb"});
  }
};
