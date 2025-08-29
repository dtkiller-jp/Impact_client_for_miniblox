import { Module } from '../../module.js';

export class NoFall extends Module {
	constructor() {
		super('NoFall', 'movement');
		this.addOption('extraY', 0.41);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			if (p.fallDistance && p.fallDistance > 2.5) {
				p.motion.y = Math.max(p.motion.y, this.options['extraY'].value);
				p.fallDistance = 0;
			}
		} catch {}
	}
}
