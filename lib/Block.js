import BlockType from "./BlockType.js";
import Blocks from "./Blocks.js";
import ActionResult from "./ActionResult.js";
export default class Block {
	constructor(type, x = 0, y = 0) {
		if (!(type instanceof BlockType))
			throw TypeError("Argument 'type' is not of type 'BlockType'");
		this.type = type;
		if (typeof x !== "number")
			throw TypeError("Argument 'x' is not of type 'Number'");
		this.x = x;
		if (typeof y !== "number")
			throw TypeError("Argument 'y' is not of type 'Number'");
		this.y = y;
	}
	type = Blocks.AIR;
	x = 0; y = 0;
	world = null;
	tick() {
		this.type.onTick(this);
	}
	break() {
		if (this.type.onBreak(this) === ActionResult.DENY) {
			return ActionResult.FAIL;
		}
		this.world.removeBlock(this.x, this.y);
		return ActionResult.SUCCESS;
	}
}