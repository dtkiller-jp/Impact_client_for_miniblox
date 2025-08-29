import { Module } from '../../module.js';

export class NoSlowdown extends Module {
	constructor() {
		super('NoSlowdown', 'movement');
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			// Reset slowdown flags if present
			if (p.slowdownMultiplier) {
				p.slowdownMultiplier.x = 1;
				p.slowdownMultiplier.z = 1;
			}
			if (p.isUsingItem) {
				// compensate item-use slowdown
				p.motion.x *= 1.2;
				p.motion.z *= 1.2;
			}
		} catch {}
	}
}
