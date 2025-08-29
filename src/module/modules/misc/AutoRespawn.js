import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class AutoRespawn extends Module {
	constructor() {
		super('AutoRespawn', 'misc');
		this.unsub = null;
	}
	onEnable() {
		// 予備: メッセージで死亡判定が流れる場合に対応
		this.unsub = packets.onPacket('CPacketMessage', (h) => {
			try {
				if (!h?.text) return;
				if (/you died/i.test(h.text)) this.tryRespawn();
			} catch {}
		});
	}
	onDisable() { if (this.unsub) { try { this.unsub(); } catch {} this.unsub = null; } }
	tryRespawn() {
		try {
			if (window.game?.requestRespawn) {
				window.game.requestRespawn();
				return;
			}
			if (window.ClientSocket?.sendPacket && window.SPacketRespawn) {
				window.ClientSocket.sendPacket(new window.SPacketRespawn({}));
			}
		} catch {}
	}
	onTick() {
		try {
			const p = window.player;
			if (p && (p.isDead || p.health <= 0)) this.tryRespawn();
		} catch {}
	}
}
