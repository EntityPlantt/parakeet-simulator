import Resource from "./Resource.js";
export default class EntityType {
	constructor(name, options = {}) {
		this.name = name;
		Object.keys(options).forEach(key => {
			if (typeof this[key] === typeof options[key])
				this[key] = options[key];
			else
				throw TypeError(`Expected ${typeof this[key]} for "${key}"; found ${typeof options[key]}`);
		});
		var textures = this.textures;
		this.textures = [];
		while (textures.length) {
			this.textures[textures[0]] =
				new Resource(`assets/entities/${this.name.toLowerCase()}/${textures[0]}.png`, "image");
			textures.shift();
		}
	}
	name = "";
	textures = {};
	health = Infinity;
	canFly = false;
	onInteract = () => {};
	onDeath = () => {};
	onSpawn = () => {};
	onDamage = () => {};
	onTick = () => {};
};