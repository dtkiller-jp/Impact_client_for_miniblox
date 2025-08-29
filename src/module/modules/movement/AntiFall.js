import { Module } from '../../module.js';

export class AntiFall extends Module {
	constructor() {
		super('AntiFall', 'movement');
		this.addOption('yThreshold', -10);
		this.addOption('boostY', 0.8);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player; if (!p) return;
			if (p.pos?.y < this.options['yThreshold'].value) {
				p.motion.y = Math.max(p.motion.y, this.options['boostY'].value);
			}
		} catch {}
	}
}
