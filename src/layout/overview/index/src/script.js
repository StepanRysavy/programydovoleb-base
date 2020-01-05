import {betterURL} from "@/store/helpers";
import SearchAllParties from "@/components/party/search-all-parties/do";
import PartyNameWithLogo from "@/components/party/party-name-with-logo/do";

export default {
	name: 'layout-index',
	components: {
		SearchAllParties,
		PartyNameWithLogo
	},
	methods: {
		betterURL
	},
  mounted: function () {
    window.scrollTo(0, 0);
    this.$store.dispatch("ga", {title: "Vyhledávání stran a koalic"});
  }
};
