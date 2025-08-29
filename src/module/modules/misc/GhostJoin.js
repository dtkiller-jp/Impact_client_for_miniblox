import { Module } from '../../module.js';

export class GhostJoin extends Module {
	constructor() {
		super('GhostJoin', 'misc');
		this.timer = null;
		this.lastGhost = null;
		this.names = ['Vector','Tester','KanusMaximus','Qhyun','Notch','Dream','Steve','Herobrine'];
	}
	onEnable() { this.schedule(); }
	onDisable() { if (this.timer) { clearTimeout(this.timer); this.timer = null; } }
	schedule() {
		const delay = (min,max)=>Math.floor(Math.random()*(max-min+1))+min;
		const spawn = () => {
			try {
				const name = this.names[Math.floor(Math.random()*this.names.length)];
				this.lastGhost = name;
				const joinText = `[Ghost] ${name} joined the game`;
				if (window.ClientSocket?.sendPacket && window.SPacketMessage) window.ClientSocket.sendPacket(new window.SPacketMessage({ text: joinText }));
				window.game?.chat?.addChat?.({ text: joinText, color: 'yellow', extra: [] });
				this.timer = setTimeout(() => {
					try {
						if (this.lastGhost) {
							const leaveText = `[Ghost] ${this.lastGhost} left the game`;
							if (window.ClientSocket?.sendPacket && window.SPacketMessage) window.ClientSocket.sendPacket(new window.SPacketMessage({ text: leaveText }));
							window.game?.chat?.addChat?.({ text: leaveText, color: 'yellow', extra: [] });
							this.lastGhost = null;
						}
					} catch {}
					this.timer = setTimeout(spawn, delay(5000,15000));
				}, delay(5000,15000));
			} catch {}
		};
		spawn();
	}
}
