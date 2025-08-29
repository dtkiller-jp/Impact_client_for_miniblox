import { Module } from '../../module.js';

export class KeepSprint extends Module {
	constructor() {
		super('KeepSprint', 'movement');
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			// If moving forward or sideways, keep sprinting
			const vx = Math.abs(p.motion?.x ?? 0);
			const vz = Math.abs(p.motion?.z ?? 0);
			if ((vx + vz) > 0.01) {
				if (typeof p.setSprinting === 'function') p.setSprinting(true);
				p.isSprinting = true;
			}
		} catch {}
	}
}
