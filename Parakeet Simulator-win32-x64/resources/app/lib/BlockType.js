import Resource from "./Resource.js";
export default class BlockType {
	constructor(name, options = {}) {
		this.name = name;
		Object.keys(options).forEach(key => {
			if (typeof this[key] === typeof options[key])
				this[key] = options[key];
			else
				throw TypeError(`Expected ${typeof this[key]} for "${key}"; found ${typeof options[key]}`);
		});
		this.texture = new Resource(`assets/blocks/${this.texture}.png`, "image");
	}
	name = "";
	texture = "";
	canPassThrough = false;
	breakTime = Infinity;
	onBreak = () => {};
	onInteract = () => {};
	onSpawn = () => {};
	onTick = () => {};
};