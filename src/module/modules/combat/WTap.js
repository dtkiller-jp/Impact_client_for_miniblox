import { Module } from '../../module.js';

export class WTap extends Module {
	constructor() {
		super('WTap', 'combat');
		this.addOption('cooldownMs', 250);
		this.addOption('toggleMs', 90);
		this.lastTap = 0;
		this.toggling = false;
	}
	onEnable() {}
	onDisable() { this.toggling = false; }
	triggerTap() {
		const now = Date.now();
		if (now - this.lastTap < this.options['cooldownMs'].value) return;
		this.lastTap = now;
		this.toggling = true;
		try {
			if (window.player?.setSprinting) window.player.setSprinting(false);
			if (window.player) window.player.isSprinting = false;
			setTimeout(() => {
				if (!this.enabled) return;
				if (window.player?.setSprinting) window.player.setSprinting(true);
				if (window.player) window.player.isSprinting = true;
				this.toggling = false;
			}, this.options['toggleMs'].value);
		} catch {}
	}
}
