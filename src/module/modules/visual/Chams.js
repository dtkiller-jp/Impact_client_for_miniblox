import { Module } from '../../module.js';

export class Chams extends Module {
	constructor() {
		super('Chams', 'visual');
		this.addOption('color', '#00ffea');
	}
	onEnable() {}
	onDisable() { this.restoreAll(); }
	onRender() {
		try {
			const rgb = this.hexToRgb(this.options['color'].value);
			const colorHex = (rgb.r << 16) + (rgb.g << 8) + rgb.b;
			const others = window.getOtherPlayers ? window.getOtherPlayers() : [];
			others.forEach(p => this.apply(p, colorHex));
		} catch {}
	}
	apply(p, colorHex) {
		const meshes = [];
		try { if (p.mesh?.meshes) for (const k in p.mesh.meshes) meshes.push(p.mesh.meshes[k]); } catch {}
		meshes.forEach(m => {
			if (!m?.material) return;
			if (!m.userData.__chams) m.userData.__chams = { depthTest: m.material.depthTest, color: m.material.color?.getHex?.() };
			m.material.depthTest = false;
			m.material.color?.setHex?.(colorHex);
		});
	}
	restoreAll() {
		const others = window.getOtherPlayers ? window.getOtherPlayers() : [];
		others.forEach(p => {
			try {
				if (!p.mesh?.meshes) return;
				for (const k in p.mesh.meshes) {
					const m = p.mesh.meshes[k]; const b = m?.userData?.__chams; if (!b) continue;
					m.material.depthTest = b.depthTest; if (b.color != null) m.material.color?.setHex?.(b.color);
					delete m.userData.__chams;
				}
			} catch {}
		});
	}
	hexToRgb(hex) {
		hex = hex.replace('#','');
		const num = parseInt(hex,16);
		return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 };
	}
}
