import { Module } from '../../module.js';

export class Speed extends Module {
	constructor() {
		super('Speed', 'movement');
		this.addOption('speed', 1.0);
		this.addOption('jumpBoost', 0.0);
		this.addOption('autoJump', true);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			const spd = this.options['speed'].value;
			if (spd !== 1.0) {
				p.motion.x *= spd;
				p.motion.z *= spd;
			}
			if (this.options['autoJump'].value && p.onGround && (Math.abs(p.motion.x) + Math.abs(p.motion.z)) > 0.01) {
				p.motion.y = Math.max(p.motion.y, 0.42 + this.options['jumpBoost'].value);
			}
		} catch {}
	}
}
