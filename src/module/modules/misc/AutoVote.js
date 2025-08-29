import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class AutoVote extends Module {
	constructor() {
		super('AutoVote', 'misc');
		this.unsub = null;
	}
	onEnable() {
		this.unsub = packets.onPacket('CPacketMessage', (h) => {
			try {
				if (!h?.text) return;
				if (/Poll started/i.test(h.text) && h.id === undefined) {
					if (window.ClientSocket?.sendPacket && window.SPacketMessage) {
						window.ClientSocket.sendPacket(new window.SPacketMessage({ text: '/vote 2' }));
					}
				}
			} catch {}
		});
	}
	onDisable() { if (this.unsub) { try { this.unsub(); } catch {} this.unsub = null; } }
}
