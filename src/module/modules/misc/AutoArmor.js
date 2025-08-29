import { Module } from '../../module.js';

export class AutoArmor extends Module {
	constructor() {
		super('AutoArmor', 'misc');
		this.addOption('onlyBetter', true);
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			const inv = window.player?.inventory; if (!inv) return;
			const better = (a,b)=> (a?.armor || 0) > (b?.armor || 0);
			const slots = { head:0, chest:1, legs:2, feet:3 };
			for (const [part,slot] of Object.entries(slots)) {
				const equipped = inv.armor?.[slot];
				for (let i=0;i<inv.main.length;i++) {
					const it = inv.main[i]; if (!it || !/helmet|chestplate|leggings|boots/i.test(it.name||'')) continue;
					if (!this.options['onlyBetter'].value || better(it,equipped)) {
						window.playerController?.equipArmor?.(i, slot);
						break;
					}
				}
			}
		} catch {}
	}
}
