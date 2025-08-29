import { Module } from '../../module.js';

export class AntiCheat extends Module {
	constructor() {
		super('AntiCheat', 'misc');
		this.addOption('maxSpeed', 1.2);
		this.addOption('maxVertical', 0.9);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player; if (!p) return;
			const ms = this.options['maxSpeed'].value;
			const mv = this.options['maxVertical'].value;
			p.motion.x = Math.max(Math.min(p.motion.x, ms), -ms);
			p.motion.z = Math.max(Math.min(p.motion.z, ms), -ms);
			p.motion.y = Math.max(Math.min(p.motion.y, mv), -mv);
		} catch {}
	}
}
