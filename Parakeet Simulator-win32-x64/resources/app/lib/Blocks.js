import BlockType from "./BlockType.js";
export default {
	AIR: new BlockType("AIR", {
		texture: "air",
		canPassThrough: true,
		onSpawn(block) {
			block.break();
		}
	}),
	GRASS: new BlockType("GRASS", {
		texture: "grass"
	}),
	DIRT: new BlockType("DIRT", {
		texture: "dirt"
	}),
	WOOD: new BlockType("WOOD", {
		texture: "wood",
		canPassThrough: true
	}),
	LEAVES: new BlockType("LEAVES", {
		texture: "leaves"
	})
};