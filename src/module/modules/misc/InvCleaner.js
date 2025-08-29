import { Module } from '../../module.js';

export class InvCleaner extends Module {
	constructor() {
		super('InvCleaner', 'misc');
		this.addOption('dropBlocks', false);
		this.addOption('dropSticks', true);
		this.addOption('dropSeeds', true);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const inv = window.player?.inventory?.main; if (!inv) return;
			for (let i=0;i<inv.length;i++) {
				const it = inv[i]; if (!it) continue;
				const name = (it.name||it.item?.name||'').toLowerCase();
				let drop=false;
				if (this.options['dropSticks'].value && name.includes('stick')) drop=true;
				if (this.options['dropSeeds'].value && name.includes('seed')) drop=true;
				if (this.options['dropBlocks'].value && /dirt|sand|gravel/.test(name)) drop=true;
				if (drop && window.playerController?.dropSlot) window.playerController.dropSlot(i);
			}
		} catch {}
	}
}
