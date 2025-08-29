import { Module } from '../../module.js';

export class Jesus extends Module {
	constructor() {
		super('Jesus', 'movement');
		this.addOption('lift', 0.12);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player; const world = window.game?.world; if (!p || !world) return;
			if (world.isLiquid?.(p.pos.x, p.pos.y - 0.1, p.pos.z)) {
				p.motion.y = Math.max(p.motion.y, this.options['lift'].value);
				if (p.motion.y < 0) p.motion.y = 0;
			}
		} catch {}
	}
}
