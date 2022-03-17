import ActionResult from "./ActionResult.js";
import Block from "./Block.js";
import Blocks from "./Blocks.js";
import Entity from "./Entity.js";
import Entities from "./Entities.js";
import TerrainGenerator from "./TerrainGenerator.js";
export default class World {
	constructor(seed = Math.random() * 256, generatorSettings = {}) {
		this.terrainGen = new TerrainGenerator(seed, generatorSettings);
		this.seed = seed;
		this.generatorSettings = generatorSettings;
		this.generateTerrain(false);
		this.generateTerrain(true);
	}
	seed = 0;
	generatorSettings = {};
	background = null;
	terrainGen = null;
	blocks = [];
	entities = [];
	bounds = {
		left: 0,
		right: 0
	};
	addBlock(block) {
		if (block.world) {
			block.world.removeBlock(block.x, block.y);
		}
		block.world = this;
		this.blocks.push(block);
		block.type.onSpawn(block);
		return ActionResult.SUCCESS;
	}
	removeBlock(x, y) {
		x = Math.round(x);
		y = Math.round(y);
		for (var i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i].x == x && this.blocks[i].y == y) {
				this.blocks[i].world = null;
				this.blocks.splice(i, 1);
				return ActionResult.SUCCESS;
			}
		}
		return ActionResult.FAIL;
	}
	getBlock(x, y) {
		x = Math.round(x);
		y = Math.round(y);
		for (var i = this.blocks.length - 1; i >= 0; i--) {
			if (this.blocks[i].x == x && this.blocks[i].y == y) {
				return this.blocks[i];
			}
		}
		return new Block(Blocks.AIR, x, y);
	}
	addEntity(entity) {
		if (entity.world) {
			entity.world.removeEntity(entity);
		}
		entity.world = this;
		this.entities.push(entity);
		entity.type.onSpawn(entity);
		return ActionResult.SUCCESS;
	}
	removeEntity(entity) {
		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].uuid == entity.uuid) {
				this.entities[i].world = null;
				this.entities.splice(i, 1);
				return ActionResult.SUCCESS;
			}
		}
		return ActionResult.FAIL;
	}
	getEntity(uuid) {
		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].uuid == uuid) {
				return this.entities[i];
			}
		}
		var n = new Entity(Entities.AIR);
		n.uuid = uuid;
		return n;
	}
	tick() {
		this.blocks.forEach(block => {
			block.tick();
		});
		this.entities.forEach(entity => {
			if (entity.x < this.bounds.left + 16) {
				this.generateTerrain(false);
			}
			if (entity.x > this.bounds.right - 16) {
				this.generateTerrain(true);
			}
			entity.tick();
		});
	}
	generateTerrain(right) {
		var generatedBlocks;
		if (right) {
			generatedBlocks = this.terrainGen.generateChunk(this.bounds.right, 16);
			this.bounds.right += 16;
		}
		else {
			generatedBlocks = this.terrainGen.generateChunk(this.bounds.left - 16, 16);
			this.bounds.left -= 16;
		}
		generatedBlocks.forEach(block => this.addBlock(block));
	}
}