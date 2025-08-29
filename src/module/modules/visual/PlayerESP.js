import { Module } from '../../module.js';

export class PlayerESP extends Module {
	constructor() {
		super('Player ESP', 'visual');
		this.modified = new Set();
	}
	onEnable() {}
	onDisable() { this.restoreAll(); }
	restoreAll() {
		try {
			const others = this.getPlayers();
			others.forEach(p => this.restorePlayer(p));
			this.modified.clear();
		} catch {}
	}
	getPlayers() {
		if (window.getOtherPlayers) return window.getOtherPlayers();
		return [];
	}
	onRender() {
		try {
			const time = Date.now() / 5000;
			const hue = time % 1;
			const rgb = this.hslToRgb(hue, 1, 0.5);
			const colorHex = (rgb.r << 16) + (rgb.g << 8) + rgb.b;
			const others = this.getPlayers();
			others.forEach(p => {
				if (!p || p.id === window.player?.id) return;
				this.applyToPlayer(p, colorHex);
			});
		} catch {}
	}
	applyToPlayer(p, colorHex) {
		const meshes = [];
		try {
			if (p.mesh?.meshes) for (const k in p.mesh.meshes) meshes.push(p.mesh.meshes[k]);
			if (p.mesh?.armorMesh) for (const k in p.mesh.armorMesh) meshes.push(p.mesh.armorMesh[k]);
			if (p.mesh?.capeMesh?.children?.length) meshes.push(p.mesh.capeMesh.children[0]);
			if (p.mesh?.hatMesh?.children?.[0]?.children) meshes.push(...p.mesh.hatMesh.children[0].children);
		} catch {}
		meshes.forEach(mesh => {
			if (!mesh?.material) return;
			if (!mesh.userData.__espBackup) {
				mesh.userData.__espBackup = {
					depthTest: mesh.material.depthTest,
					renderOrder: mesh.renderOrder,
					color: mesh.material.color?.getHex?.() ?? 0xffffff,
					emissive: mesh.material.emissive?.getHex?.() ?? 0x000000,
					emissiveIntensity: mesh.material.emissiveIntensity ?? 0
				};
				this.modified.add(mesh);
			}
			mesh.material.depthTest = false;
			mesh.renderOrder = 5;
			if (mesh.material.color?.setHex) mesh.material.color.setHex(colorHex);
			if (mesh.material.emissive?.setHex) mesh.material.emissive.setHex(colorHex);
			mesh.material.emissiveIntensity = 0.8;
		});
	}
	restorePlayer(p) {
		const meshes = [];
		try {
			if (p.mesh?.meshes) for (const k in p.mesh.meshes) meshes.push(p.mesh.meshes[k]);
			if (p.mesh?.armorMesh) for (const k in p.mesh.armorMesh) meshes.push(p.mesh.armorMesh[k]);
			if (p.mesh?.capeMesh?.children?.length) meshes.push(p.mesh.capeMesh.children[0]);
			if (p.mesh?.hatMesh?.children?.[0]?.children) meshes.push(...p.mesh.hatMesh.children[0].children);
		} catch {}
		meshes.forEach(mesh => {
			const b = mesh.userData.__espBackup;
			if (!b) return;
			mesh.material.depthTest = b.depthTest;
			mesh.renderOrder = b.renderOrder;
			if (mesh.material.color?.setHex) mesh.material.color.setHex(b.color);
			if (mesh.material.emissive?.setHex) mesh.material.emissive.setHex(b.emissive);
			mesh.material.emissiveIntensity = b.emissiveIntensity;
			delete mesh.userData.__espBackup;
		});
	}
	hslToRgb(h, s, l) {
		let r, g, b;
		if (s === 0) { r = g = b = l; }
		else {
			const hue2rgb = (p, q, t) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			};
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const pp = 2 * l - q;
			r = hue2rgb(pp, q, h + 1/3);
			g = hue2rgb(pp, q, h);
			b = hue2rgb(pp, q, h - 1/3);
		}
		return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
	}
}
