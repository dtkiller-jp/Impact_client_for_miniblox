import { Module } from '../../module.js';

export class Step extends Module {
	constructor() {
		super('Step', 'movement');
		this.addOption('height', 1.0);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const p = window.player;
			if (!p) return;
			p.stepHeight = this.options['height'].value;
		} catch {}
	}
}
