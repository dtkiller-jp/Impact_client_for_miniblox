import { Module } from '../../module.js';

export class FilterBypass extends Module {
	constructor() {
		super('FilterBypass', 'misc');
		this.addOption('enabledForSlash', false);
	}
	onEnable() { this.patch(); }
	onDisable() { this.unpatch(); }
	patch() {
		if (this._patched) return; this._patched = true;
		this._origSend = window.game?.chat?.sendMessage;
		if (!this._origSend) return;
		const zeroWidth = '\u200B';
		window.game.chat.sendMessage = (msg) => {
			try {
				if (msg && (this.options['enabledForSlash'].value || !msg.startsWith('/'))) {
					msg = msg.split('').join(zeroWidth);
				}
				return this._origSend.call(window.game.chat, msg);
			} catch (e) { return this._origSend.call(window.game.chat, msg); }
		};
	}
	unpatch() {
		if (this._origSend) { window.game.chat.sendMessage = this._origSend; this._origSend = null; }
		this._patched = false;
	}
}
