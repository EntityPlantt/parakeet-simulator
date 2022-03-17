import EntityType from "./EntityType.js";
export default {
	AIR: new EntityType("AIR", {
		textures: ["../../blocks/air"],
		onSpawn(entity) {
			entity.kill();
		}
	}),
	PLAYER: new EntityType("PLAYER", {
		textures: [
			"default",
			"flying",
			"flying-down",
			"default-rotated",
			"flying-rotated",
			"flying-down-rotated"
		],
		canFly: true,
		health: 10
	})
};