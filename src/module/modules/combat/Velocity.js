import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class Velocity extends Module {
	constructor() {
		super('Velocity', 'combat');
		this.addOption('horizontal', 0);
		this.addOption('vertical', 0);
		this.unsubs = [];
	}
	onEnable() {
		// hook velocity packets similar to original v4
		const unsub1 = packets.onPacket('CPacketEntityVelocity', (h) => {
			try {
				if (!window.player || h.id !== window.player.id) return;
				const hori = this.options['horizontal'].value;
				const vert = this.options['vertical'].value;
				if (hori === 0 && vert === 0) return; // original: skip if both are 0
				// scale motion
				h.motion.x = (h.motion.x ?? 0) * hori;
				h.motion.z = (h.motion.z ?? 0) * hori;
				h.motion.y = (h.motion.y ?? 0) * vert;
			} catch (e) { console.error('[Velocity] CPacketEntityVelocity error', e); }
		});
		const unsub2 = packets.onPacket('CPacketExplosion', (h) => {
			try {
				const hori = this.options['horizontal'].value;
				const vert = this.options['vertical'].value;
				if (hori === 0 && vert === 0) return;
				h.playerMotion.x = (h.playerMotion.x ?? 0) * hori;
				h.playerMotion.z = (h.playerMotion.z ?? 0) * hori;
				h.playerMotion.y = (h.playerMotion.y ?? 0) * vert;
			} catch (e) { console.error('[Velocity] CPacketExplosion error', e); }
		});
		this.unsubs.push(unsub1, unsub2);
	}
	onDisable() {
		this.unsubs.forEach(fn => { try { fn(); } catch {} });
		this.unsubs = [];
	}
}
