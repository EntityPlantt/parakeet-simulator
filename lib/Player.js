export default {
	KeyBindings: {
		D: {
			down(args) {
				args.player.motion.x = 0.1;
				args.player.data.textureRotated = false;
			},
			up(args) {
				if (args.player.motion.x == 0.1)
					args.player.motion.x = 0;
			}
		},
		A: {
			down(args) {
				args.player.motion.x = -0.1;
				args.player.data.textureRotated = true;
			},
			up(args) {
				if (args.player.motion.x == -0.1)
					args.player.motion.x = 0;
			}
		},
		W: {
			down(args) {
				args.player.data.inFlyingState = true;
			},
			up(args) {
				args.player.data.inFlyingState = false;
			}
		}
	},
	load(args) {
		args.player.data.inFlyingState = false;
		args.player.data.textureRotated = false;
	},
	tick(args) {
		if (args.player.data.inFlyingState) {
			args.player.motion.y = 0.15;
		}
		args.player.currentTexture
		= (
			args.player.data.inFlyingState
			? "flying"
			: (
				args.player.data.lastTickTouchedGround
				? "default"
				: "flying-down"
			)
		)
		+ (args.player.data.textureRotated ? "-rotated" : "");
	}
};