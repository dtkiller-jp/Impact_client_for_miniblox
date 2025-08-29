import { Module } from '../../module.js';

export class Fly extends Module {
	constructor() {
		super('Fly', 'movement');
		this.addOption('speed', 0.6);
		this.addOption('vertical', 0.6);
	}
	onEnable() {
		this.prevGravity = window.player?.gravity ?? null;
		if (window.player) window.player.gravity = 0;
	}
	onDisable() {
		if (window.player && this.prevGravity != null) window.player.gravity = this.prevGravity;
	}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			const spd = this.options['speed'].value;
			// simple WASD-like force: normalize horizontal motion and apply speed
			const vx = p.motion.x;
			const vz = p.motion.z;
			const mag = Math.hypot(vx, vz) || 1;
			p.motion.x = (vx / mag) * spd;
			p.motion.z = (vz / mag) * spd;
			// vertical hover control with arrows/PageUp/PageDown if available
			if (p.controls?.jump) p.motion.y = this.options['vertical'].value;
			else if (p.controls?.sneak) p.motion.y = -this.options['vertical'].value;
			else p.motion.y = 0;
		} catch {}
	}
}
