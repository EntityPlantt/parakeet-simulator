import Entities from "./Entities.js";
import EntityType from "./EntityType.js";
import ActionResult from "./ActionResult.js";
export default class Entity {
	constructor(type, x = 0, y = 0) {
		if (!(type instanceof EntityType))
			throw TypeError("Argument 'type' is not of type 'EntityType'");
		this.type = type;
		if (typeof x !== "number")
			throw TypeError("Argument 'x' is not of type 'Number'");
		this.x = x;
		if (typeof y !== "number")
			throw TypeError("Argument 'y' is not of type 'Number'");
		this.y = y;
		this.health = this.type.health;
		this.currentTexture = Object.keys(this.type.textures)[0];
		this.uuid = crypto.randomUUID();
		this.type.onSpawn(this);
	}
	x = 0; y = 0;
	type = Entities.AIR;
	health = Infinity;
	motion = {
		x: 0,
		y: 0
	};
	data = {};
	tick() {
		this.data.lastTickTouchedGround = false;
		if (this.onGround() && this.motion.y <= 0) {
			this.motion.y = 0;
		}
		else {
			this.motion.y -= 0.01;
			this.motion.y = Math.max(this.motion.y, -0.1);
		}
		if (!((this.groundOnRight() && this.motion.x) || (this.groundOnLeft() && !this.motion.x)))
			this.x += this.motion.x;
		if (this.groundOnRight() && !this.groundOnLeft())
			this.x += 0.1;
		else if (this.groundOnLeft())
			this.x -= 0.1;
		if (!((this.belowGround() && this.motion.y) || (this.onGround() && !this.motion.y)))
			this.y += this.motion.y;
		if (this.belowGround() && !this.onGround())
			this.y -= 0.1;
		else if (this.onGround()) {
			this.data.lastTickTouchedGround = true;
			this.y += 0.1;
		}
		this.type.onTick(this);
	}
	damage(health) {
		if (this.health <= health) {
			return this.kill();
		}
		else {
			this.health -= health;
			if (this.type.onDamage(this) === ActionResult.DENY) {
				this.health += health;
				return ActionResult.FAIL;
			}
			return ActionResult.SUCCESS;
		}
	}
	kill() {
		if (this.type.onDeath(this) === ActionResult.DENY) {
			return ActionResult.FAIL;
		}
		this.world.removeEntity(this);
		return ActionResult.SUCCESS;
	}
	onGround() {
		return !(this.world.getBlock(this.x - 0.41, this.y - 0.41).type.canPassThrough
			&& this.world.getBlock(this.x + 0.41, this.y - 0.41).type.canPassThrough);
	}
	belowGround() {
		return !(this.world.getBlock(this.x - 0.41, this.y + 0.41).type.canPassThrough
			&& this.world.getBlock(this.x + 0.41, this.y + 0.41).type.canPassThrough);
	}
	groundOnRight() {
		return !(this.world.getBlock(this.x - 0.41, this.y - 0.4).type.canPassThrough
			&& this.world.getBlock(this.x - 0.41, this.y + 0.4).type.canPassThrough);
	}
	groundOnLeft() {
		return !(this.world.getBlock(this.x + 0.41, this.y - 0.4).type.canPassThrough
			&& this.world.getBlock(this.x + 0.41, this.y + 0.4).type.canPassThrough);
	}
};