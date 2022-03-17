import SimplexNoise from "./SimplexNoise.js";
import Block from "./Block.js";
import Blocks from "./Blocks.js";
export default class TerrainGenerator {
	constructor(seed = 0, settings = {}) {
		this.seed = seed.toString();
		this.noise = new SimplexNoise(this.seed);
		Object.assign(this.settings, settings);
	}
	seed = 0;
	noise = null;
	settings = {
		groundBlock: Blocks.DIRT,
		topBlock: Blocks.GRASS,
		height: 16,
		heightVariation: 8,
		widthDensity: 0.02,
		trees: {
			acceptHeightRadius: 0.05,
			height: 10,
			heightVariation: 5,
			stemBlock: Blocks.WOOD,
			leavesBlock: Blocks.LEAVES
		}
	};
	generateChunk(x, width = 16) {
		var generatedBlocks = [];
		for (var i = 0; i < width; i++) {
			const height = Math.ceil(this.noise.noise2D((x + i) * this.settings.widthDensity, 0) * this.settings.heightVariation) + this.settings.height;
			for (var j = 1; j < height; j++) {
				generatedBlocks.push(new Block(this.settings.groundBlock, x + i, j));
			}
			generatedBlocks.push(new Block(this.settings.topBlock, x + i, height));
			if (this.settings.trees && this.noise.noise2D((x + i) * 2, 5) < this.settings.trees.acceptHeightRadius && this.noise.noise2D((x + i) * 2, 5) > -this.settings.trees.acceptHeightRadius) {
				const treeHeight = Math.ceil(this.noise.noise2D((x + i) * 2, 10) * this.settings.trees.heightVariation) + this.settings.trees.height;
				for (var j = 1; j <= treeHeight; j++) {
					generatedBlocks.push(new Block(this.settings.trees.stemBlock, x + i, height + j));
				}
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i - 2, height + treeHeight));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i - 1, height + treeHeight));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i + 1, height + treeHeight));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i + 2, height + treeHeight));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i - 1, height + treeHeight + 1));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i, height + treeHeight + 1));
				generatedBlocks.push(new Block(this.settings.trees.leavesBlock, x + i + 1, height + treeHeight + 1));
			}
		}
		return generatedBlocks;
	}
}