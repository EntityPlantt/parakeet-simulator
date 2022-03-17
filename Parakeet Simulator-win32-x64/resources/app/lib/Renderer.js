import Canvas2d from "https://entityplantt.github.io/Canvas2d.js/Canvas2d.mod.js";
export default class Renderer {
	constructor(world, scene) {
		this.canvas2d = scene;
		this.world = world;
	}
	x = 0; y = 0;
	followingEntity = null;
	render() {
		if (this.followingEntity) {
			this.x = this.followingEntity.x;
			this.y = this.followingEntity.y;
		}
		this.canvas2d.assets = [];
		var parallax = new Canvas2d.Parallax(this.world.background.data, "height");
		parallax.x = this.x * 20;
		parallax.y = this.y * -2;
		this.canvas2d.add(parallax);
		for (var i = 0; i < this.world.blocks.length; i++) {
			var image = new Canvas2d.ImageAsset(this.world.blocks[i].type.texture.data, 128, 128);
			image.posFromCenter = true;
			image.x = this.canvas2d.width / 2 + (this.world.blocks[i].x - this.x) * 128;
			image.y = this.canvas2d.height / 2 - (this.world.blocks[i].y - this.y) * 128;
			this.canvas2d.add(image);
		}
		for (var i = 0; i < this.world.entities.length; i++) {
			var image = new Canvas2d.ImageAsset(this.world.entities[i].type.textures[this.world.entities[i].currentTexture].data, 128, 128);
			image.posFromCenter = true;
			image.x = this.canvas2d.width / 2 + (this.world.entities[i].x - this.x) * 128;
			image.y = this.canvas2d.height / 2 - (this.world.entities[i].y - this.y) * 128;
			this.canvas2d.add(image);
		}
		this.canvas2d.draw();
	}
};