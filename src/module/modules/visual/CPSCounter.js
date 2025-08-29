import { Module } from '../../module.js';

export class CPSCounter extends Module {
	constructor() {
		super('CPSCounter', 'visual');
		this.addOption('size', 14);
		this.el = null;
		this.times = [];
		this.onMouse = this.onMouse.bind(this);
	}
	onEnable() { this.create(); document.addEventListener('mousedown', this.onMouse, true); }
	onDisable() { if (this.el) { this.el.remove(); this.el=null; } document.removeEventListener('mousedown', this.onMouse, true); }
	create() { if (!this.el) { this.el = document.createElement('div'); Object.assign(this.el.style,{position:'fixed',left:'10px',top:'30px',color:'#0ff',zIndex:1002,fontFamily:'monospace'}); document.body.appendChild(this.el);} }
	onMouse(e) { if (e.button===0) { const t = performance.now(); this.times.push(t); const cutoff = t-1000; while (this.times.length && this.times[0] < cutoff) this.times.shift(); } }
	onRender() { if (this.el) { this.el.style.fontSize = this.options['size'].value+'px'; this.el.textContent = `CPS: ${this.times.length}`; } }
}
