import { Module } from '../../module.js';

export class Keystrokes extends Module {
	constructor() {
		super('Keystrokes', 'visual');
		this.addOption('size', 14);
		this.el = null;
	}
	onEnable() { this.create(); }
	onDisable() { if (this.el) { this.el.remove(); this.el=null; } }
	create() {
		if (this.el) return;
		this.el = document.createElement('div');
		Object.assign(this.el.style,{position:'fixed',left:'10px',bottom:'10px',color:'#fff',zIndex:1002,fontFamily:'monospace'});
		document.body.appendChild(this.el);
	}
	onRender() {
		if (!this.el) return;
		const c = window.inputState || {};
		const keys = [
			`W:${c.W?'■':'□'}`,
			`A:${c.A?'■':'□'}`,
			`S:${c.S?'■':'□'}`,
			`D:${c.D?'■':'□'}`,
			`LMB:${c.LMB?'■':'□'}`,
			`RMB:${c.RMB?'■':'□'}`
		];
		this.el.style.fontSize = this.options['size'].value+'px';
		this.el.innerHTML = keys.join(' ');
	}
}
