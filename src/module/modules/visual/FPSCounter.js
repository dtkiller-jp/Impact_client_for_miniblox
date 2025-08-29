import { Module } from '../../module.js';

export class FPSCounter extends Module {
	constructor() {
		super('FPSCounter', 'visual');
		this.addOption('size', 14);
		this.el = null;
		this.frames = 0; this.last = performance.now(); this.fps = 0;
	}
	onEnable() { this.create(); }
	onDisable() { if (this.el) { this.el.remove(); this.el = null; } }
	create() { if (!this.el) { this.el = document.createElement('div'); Object.assign(this.el.style,{position:'fixed',left:'10px',top:'10px',color:'#0f0',zIndex:1002,fontFamily:'monospace'}); document.body.appendChild(this.el);} }
	onRender() {
		const now = performance.now(); this.frames++;
		if (now - this.last >= 1000) { this.fps = this.frames; this.frames = 0; this.last = now; }
		if (this.el) { this.el.style.fontSize = this.options['size'].value+'px'; this.el.textContent = `FPS: ${this.fps}`; }
	}
}
