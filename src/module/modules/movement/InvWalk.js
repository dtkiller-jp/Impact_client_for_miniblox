import { Module } from '../../module.js';

export class InvWalk extends Module {
	constructor() {
		super('InvWalk', 'movement');
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			if (window.isInventoryOpen && window.isInventoryOpen()) {
				// forward inputs to player controls if available
				const p = window.player; if (!p || !p.controls) return;
				p.controls.allowWhileInventory = true;
			}
		} catch {}
	}
}
