import { Module } from '../../module.js';

export class AntiBan extends Module {
	constructor() {
		super('AntiBan', 'misc');
		this.addOption('limitPacketsPerSec', 50);
		this.addOption('disableDangerous', true);
		this.counter = 0; this.last = performance.now();
	}
	onEnable() { this.patch(); }
	onDisable() { this.unpatch(); }
	patch() {
		this._origSend = window.ClientSocket?.sendPacket;
		if (this._origSend) {
			window.ClientSocket.sendPacket = (pkt) => {
				try {
					const now = performance.now();
					if (now - this.last >= 1000) { this.counter = 0; this.last = now; }
					this.counter++;
					if (this.counter > this.options['limitPacketsPerSec'].value) return; // drop excessive
					return this._origSend.call(window.ClientSocket, pkt);
				} catch (e) { return this._origSend.call(window.ClientSocket, pkt); }
			};
		}
		if (this.options['disableDangerous'].value) {
			window.gameUtils && (window.gameUtils.magicPacket = () => {});
		}
	}
	unpatch() { if (this._origSend) { window.ClientSocket.sendPacket = this._origSend; this._origSend = null; } }
}
