import { Module } from '../../module.js';

export class NametagsPlus extends Module {
	constructor() {
		super('NameTags+', 'visual');
		this.tags = new Map();
	}
	onEnable() {}
	onDisable() { this.clearAll(); }
	clearAll() { this.tags.forEach(el => el.remove()); this.tags.clear(); }
	onRender() {
		try {
			const worldPlayers = window.getOtherPlayers ? window.getOtherPlayers() : [];
			for (const [id, el] of this.tags) {
				if (!worldPlayers.find(p => p.id === id)) { el.remove(); this.tags.delete(id); }
			}
			const me = window.player;
			worldPlayers.forEach(p => {
				if (!p || p.id === me?.id) return;
				let el = this.tags.get(p.id);
				if (!el) {
					el = document.createElement('div');
					el.style.position = 'fixed';
					el.style.color = '#fff';
					el.style.fontSize = '12px';
					el.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
					document.body.appendChild(el);
					this.tags.set(p.id, el);
				}
				const username = p.profile?.username || p.name || 'Player';
				const hp = (p.getHealth?.() || p.health || 0);
				const rank = p.profile?.stats?.rank || '';
				let distStr = '';
				if (me?.pos && p.pos) {
					const dx = me.pos.x - p.pos.x, dy = me.pos.y - p.pos.y, dz = me.pos.z - p.pos.z;
					distStr = `${Math.sqrt(dx*dx+dy*dy+dz*dz).toFixed(1)}m`;
				}
				const color = hp > 15 ? '#00ff00' : hp > 7 ? '#ffaa00' : '#ff4444';
				el.innerHTML = `${username} ${rank ? '('+rank+') ' : ''}<span style="color:${color}">❤ ${hp.toFixed ? hp.toFixed(1) : hp}</span> [${distStr}]`;
				if (window.worldToScreen) {
					const s = window.worldToScreen(p.pos.x, p.pos.y + 2.2, p.pos.z);
					if (s?.visible) { el.style.left = `${s.x}px`; el.style.top = `${s.y}px`; el.style.display = 'block'; }
					else { el.style.display = 'none'; }
				}
			});
		} catch {}
	}
}
