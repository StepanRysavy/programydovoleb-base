import axios from "axios";

axios.defaults.baseURL = 'https://komunal18.programydovoleb.cz/lib/app/api.php';
axios.interceptors.request.use(function (config) {

    if (config.url.indexOf("login.php") > -1) return config;

    var link = config.url.split(axios.defaults.baseURL);

    if (!config.params) config.params = {};

    config.params.url = link[1] || "";
    config.params.noCache = new Date().getTime();
    config.url = axios.defaults.baseURL;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default {
	name: 'app',
    data: function () {
      return {}
    },
    components: {
    },
    computed: {
    },
    methods: {
    },
    mounted: function () {
    },
};

