import { Module } from '../../module.js';

export class StreamerMode extends Module {
	constructor() {
		super('StreamerMode', 'misc');
		this.addOption('hideConsole', true);
		this.addOption('hideNameUI', true);
		this._origLog = null;
	}
	onEnable() {
		if (this.options['hideConsole'].value && !this._origLog) {
			this._origLog = console.log; console.log = () => {};
		}
		if (this.options['hideNameUI'].value) {
			const els = document.querySelectorAll('[data-username], .player-name');
			els.forEach(el => el.textContent = 'Player');
		}
	}
	onDisable() {
		if (this._origLog) { console.log = this._origLog; this._origLog = null; }
	}
}
