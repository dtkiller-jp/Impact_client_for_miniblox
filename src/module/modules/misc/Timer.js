import { Module } from '../../module.js';

export class Timer extends Module {
	constructor() {
		super('Timer', 'misc');
		this.addOption('value', 1.2);
		this.prev = null;
	}
	onEnable() { this.apply(); }
	onDisable() { this.reset(); }
	apply() {
		try {
			if (window.game) { this.prev = window.game.timeScale ?? 1; window.game.timeScale = this.options['value'].value; }
		} catch {}
	}
	reset() { try { if (window.game && this.prev != null) window.game.timeScale = this.prev; } catch {} }
	onOptionsChanged() { if (this.enabled) this.apply(); }
}
