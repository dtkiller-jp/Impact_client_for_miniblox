import { Module } from '../../module.js';

export class FastBreak extends Module {
	constructor() {
		super('FastBreak', 'misc');
		this.addOption('multiplier', 3.0);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player; if (!p) return;
			if (p.breakDelay != null) p.breakDelay = Math.max(1, Math.floor(p.breakDelay / this.options['multiplier'].value));
			if (window.game?.world?.blockHardnessMultiplier != null) {
				window.game.world.blockHardnessMultiplier = 1 / this.options['multiplier'].value;
			}
		} catch {}
	}
}
