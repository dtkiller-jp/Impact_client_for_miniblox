import { Module } from '../../module.js';

export class JumpFly extends Module {
	constructor() {
		super('JumpFly', 'movement');
		this.addOption('speed', 0.6);
		this.addOption('glideValue', 0.02);
		this.addOption('upMotion', 0.42);
		this.addOption('vertical', 0.4);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player; if (!p) return;
			if (p.onGround && (Math.abs(p.motion.x)+Math.abs(p.motion.z))>0.01) {
				p.motion.y = this.options['upMotion'].value;
			}
			p.motion.x *= this.options['speed'].value;
			p.motion.z *= this.options['speed'].value;
			if (!p.onGround) p.motion.y = Math.max(p.motion.y - this.options['glideValue'].value, -this.options['vertical'].value);
		} catch {}
	}
}
