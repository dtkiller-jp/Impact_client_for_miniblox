import { Module } from '../../module.js';

export class AutoCraft extends Module {
	constructor() {
		super('AutoCraft', 'misc');
		this.addOption('recipe', 'planks');
	}
	onEnable() {}
	onDisable() {}
	onTick() {
		try {
			if (!window.isCraftOpen || !window.isCraftOpen()) return;
			const r = this.options['recipe'].value;
			if (window.playerController?.craftRecipe) window.playerController.craftRecipe(r);
		} catch {}
	}
}
