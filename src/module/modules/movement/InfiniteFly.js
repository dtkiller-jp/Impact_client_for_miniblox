import { Module } from '../../module.js';

export class InfiniteFly extends Module {
	constructor() {
		super('InfiniteFly', 'movement');
		this.addOption('vertical', 0.6);
	}
	onEnable() { this.prevGravity = window.player?.gravity ?? null; if (window.player) window.player.gravity = 0; }
	onDisable() { if (window.player && this.prevGravity != null) window.player.gravity = this.prevGravity; }
	onTick() {
		try {
			const p = window.player; if (!p) return;
			if (p.controls?.jump) p.motion.y = this.options['vertical'].value;
			else if (p.controls?.sneak) p.motion.y = -this.options['vertical'].value;
			else p.motion.y = 0;
		} catch {}
	}
}
