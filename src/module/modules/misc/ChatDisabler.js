import { Module } from '../../module.js';

export class ChatDisabler extends Module {
	constructor() {
		super('ChatDisabler', 'misc');
		this.addOption('message', 'youtube.com/c/7GrandDadVape');
		this.addOption('intervalMs', 1000);
		this.timer = null;
	}
	onEnable() {
		this.start();
	}
	onDisable() { this.stop(); }
	start() {
		if (this.timer) return;
		this.timer = setInterval(() => {
			try {
				const text = Math.random() + ('\n' + this.options['message'].value).repeat(20);
				if (window.ClientSocket?.sendPacket && window.SPacketMessage) {
					window.ClientSocket.sendPacket(new window.SPacketMessage({ text }));
				}
			} catch {}
		}, this.options['intervalMs'].value);
	}
	stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
}
