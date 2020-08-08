import axios from "axios";

export default {
	name: 'image-upload',
    data: function () {
      return {
				e: null,
				src: null,
				srcData: null,
				uploading: false,
				name: null,
				person: true
			}
    },
    components: {
		},
    computed: {
    },
    methods: {
			ev: function (msg) {
				this.e = msg;

				setTimeout(() => this.e = null, 2500);
			},
			copy: function () {
			  const el = document.createElement('textarea');
			  el.value = document.querySelector('.upload_result_src').innerText;
			  document.body.appendChild(el);
			  el.select();
			  document.execCommand('copy');
			  document.body.removeChild(el);
			},
			uploadFile: function () {
				axios.post("https://data.programydovoleb.cz/api/lib/app/api.php?action=file/upload", {
					data: this.srcData,
					name: this.name,
					person: this.person ? 1 : 0
				}).then(response => {
					if (response.data.code === 200) {
						this.src = response.data.src;
					} else {
						this.ev('Chyba');
					}

					this.uploading = false;
				})
			},
			upload: function () {
				if (this.uploading === true) return;
				// from an input element

				var filesToUpload = this.$refs['myInput'].files;
				var file = filesToUpload[0];

				var img = document.createElement("img");
				var reader = new FileReader();
				reader.onload = (e) => {
					img.src = e.target.result

					var canvas = this.$refs['myCanvas'];

					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);

					var MAX_WIDTH = 300;
					var MAX_HEIGHT = 400;
					var width = img.width;
					var height = img.height;

					if (width > height) {
					  if (width > MAX_WIDTH) {
					    height *= MAX_WIDTH / width;
					    width = MAX_WIDTH;
					  }
					} else {
					  if (height > MAX_HEIGHT) {
					    width *= MAX_HEIGHT / height;
					    height = MAX_HEIGHT;
					  }
					}
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, width, height);

					var dataurl = canvas.toDataURL("image/jpeg", .5);

					this.name = file.name;

					if (dataurl.length > 10) {
						this.srcData = dataurl;
						this.uploading = true;
						this.uploadFile();
					}
				}
				reader.readAsDataURL(file);
			}
    },
    mounted: function () {
    },
};
