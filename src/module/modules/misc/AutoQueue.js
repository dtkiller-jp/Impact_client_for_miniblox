import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class AutoQueue extends Module {
	constructor() {
		super('AutoQueue', 'misc');
		this.unsub = null;
	}
	onEnable() {
		this.unsub = packets.onPacket('CPacketMessage', (h) => {
			try {
				if (!h?.text) return;
				if (/won the game/i.test(h.text)) {
					window.game?.requestQueue?.();
				}
			} catch {}
		});
	}
	onDisable() { if (this.unsub) { try { this.unsub(); } catch {} this.unsub = null; } }
}
