import { Module } from '../../module.js';

export class ChestSteal extends Module {
	constructor() {
		super('ChestSteal', 'misc');
		this.addOption('blocks', true);
		this.addOption('tools', false);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			if (!window.isChestOpen || !window.isChestOpen()) return;
			const slots = window.getChestSlots?.(); if (!Array.isArray(slots)) return;
			for (let i=0;i<slots.length;i++) {
				const it = slots[i]; if (!it) continue;
				const name = (it.name||'').toLowerCase();
				let take=false;
				if (this.options['blocks'].value && /(stone|wood|brick|plank|wool|glass|block)/.test(name)) take=true;
				if (this.options['tools'].value && /(sword|pickaxe|axe|shovel|bow)/.test(name)) take=true;
				if (take && window.playerController?.shiftClickChestSlot) window.playerController.shiftClickChestSlot(i);
			}
		} catch {}
	}
}
