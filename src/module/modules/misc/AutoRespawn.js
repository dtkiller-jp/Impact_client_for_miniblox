import { Module } from '../../module.js';
import packets from '../../../utils/packets.js';

export class AutoRespawn extends Module {
	constructor() {
		super('AutoRespawn', 'misc');
		this.unsub = null;
	}

	onEnable() {
		this.unsub = packets.subscribe('chat', (h) => {
			try {
				if (/you died/i.test(h.text)) this.tryRespawn();
			} catch {}
		});
	}

	onDisable() {
        if (this.unsub) {
            try {
                this.unsub();
            } catch (e) {
                console.error('Error unsubscribing from chat packet', e);
            }
            this.unsub = null;
        }
    }

	tryRespawn() {
		setTimeout(() => {
			packets.send('respawn', {});
		}, 300);
	}
}