import { Module } from '../../module.js';

export class Phase extends Module {
	constructor() {
		super('Phase', 'movement');
	}
	onEnable() { try { if (window.player) window.player.noClip = true; } catch {} }
	onDisable() { try { if (window.player) window.player.noClip = false; } catch {} }
}
