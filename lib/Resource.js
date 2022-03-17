export default class Resource {
	constructor(path, type = "text") {
		if (path)
			this.path = path;
		if (type)
			this.type = type;
		switch (this.type) {
			case "text":
			this.data = "";
			break;
			case "image":
			this.data = document.createElement("img");
			break;
			case "binary":
			this.data = "";
			break;
		}
		(async() => {
			switch (this.type) {
				case "text":
				this.data = await fetch(this.path).then(data => data.text());
				break;
				case "image":
				this.data = await createImageBitmap(await fetch(this.path).then(data => data.blob()));
				break;
				case "binary":
				this.data = await new Promise(async(resolve, reject) => {
					var fr = new FileReader;
					fr.onload = () => {
						resolve(fr.result);
					}
					fr.readAsBinaryString(await fetch(this.path).then(data => data.blob()));
				});
				break;
			}
		})();
	}
	path = "";
	type = "text";
	data = null;
}