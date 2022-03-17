import Renderer from "./lib/Renderer.js";
import Resource from "./lib/Resource.js";
import World from "./lib/World.js";
import Entity from "./lib/Entity.js";
import Entities from "./lib/Entities.js";
import Player from "./lib/Player.js";
import Canvas2d from "https://entityplantt.github.io/Canvas2d.js/Canvas2d.mod.js";

addEventListener("keydown", () => {
	if (event.altKey && event.key.toUpperCase() == "F4") {
		event.preventDefault();
		if (confirm("Are you sure you want to exit 'Parakeet Simulator'?")) {
			close();
		}
	}
});
window.scene = new Canvas2d.Scene(document.getElementById("main"));
await new Promise(resolve => document.getElementById("start").addEventListener("click", resolve));

window.world = new World(document.getElementById("seed").value || undefined);
world.background = new Resource("assets/worlds/default.png", "image");
window.gameData = {};
window.player = new Entity(Entities.PLAYER, 0, 0);
player.y = 16;
world.addEntity(player);
window.renderer = new Renderer(world, scene);
renderer.followingEntity = player;
Player.load({
	world: world,
	scene: scene,
	player: player,
	renderer: renderer,
	gameData: gameData
});
function frame() {
	requestAnimationFrame(frame);
	renderer.canvas2d.width = innerWidth;
	renderer.canvas2d.height = innerHeight;
	renderer.render();
	Player.tick({
		world: world,
		scene: scene,
		player: player,
		renderer: renderer,
		gameData: gameData
	});
	world.tick();
}
frame();
onkeydown = event => {
	event.preventDefault();
	(Player.KeyBindings[event.key.toUpperCase()] || {down: new Function}).down({
		event: event,
		world: world,
		scene: scene,
		player: player,
		renderer: renderer,
		gameData: gameData
	});
}
onkeyup = event => {
	event.preventDefault();
	(Player.KeyBindings[event.key.toUpperCase()] || {up: new Function}).up({
		event: event,
		world: world,
		scene: scene,
		player: player,
		renderer: renderer,
		gameData: gameData
	});
}