import { Module } from '../../module.js';

export class Breaker extends Module {
	constructor() {
		super('Breaker', 'misc');
		this.addOption('range', 4);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const game = window.game; const p = window.player; if (!game || !p) return;
			const r = this.options['range'].value;
			const px = Math.floor(p.pos.x), py = Math.floor(p.pos.y), pz = Math.floor(p.pos.z);
			for (let x=-r;x<=r;x++) for (let y=-1;y<=1;y++) for (let z=-r;z<=r;z++) {
				const bx = px+x, by = py+y, bz = pz+z;
				if (!game.world?.isBreakable?.(bx,by,bz)) continue;
				window.playerController?.breakBlock?.(bx,by,bz);
				return; // 一度に1ブロック
			}
		} catch {}
	}
}
