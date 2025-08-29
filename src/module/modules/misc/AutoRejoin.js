import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class AutoRejoin extends Module {
	constructor() {
		super('AutoRejoin', 'misc');
		this.unsub = null;
		this.lastJoined = null;
	}
	onEnable() {
		this.lastJoined = window.lastJoinedServer || null;
		this.unsub = packets.onPacket('CPacketMessage', (h) => {
			try {
				if (!h?.text) return;
				if (/won the game|game over/i.test(h.text)) this.rejoin();
			} catch {}
		});
	}
	onDisable() { if (this.unsub) { try { this.unsub(); } catch {} this.unsub = null; } }
	rejoin() {
		try {
			const target = this.lastJoined || window.lastJoinedServer;
			if (window.j && target) {
				setTimeout(() => { try { window.j.connect(target); } catch {} }, 400);
			}
		} catch {}
	}
}
