import { Module } from '../../module.js';

export class TextGUI extends Module {
	constructor() {
		super('TextGUI', 'visual');
		this.addOption('font', 'Arial, sans-serif');
		this.addOption('textSize', 15);
		this.addOption('shadow', true);
		this.el = null;
	}
	onEnable() {
		this.create();
	}
	onDisable() {
		if (this.el) { document.body.removeChild(this.el); this.el = null; }
	}
	onOptionsChanged() { this.updateStyle(); }
	create() {
		if (this.el) return;
		this.el = document.createElement('div');
		this.el.style.position = 'fixed';
		this.el.style.top = '8px';
		this.el.style.right = '8px';
		this.el.style.zIndex = '1002';
		this.el.style.pointerEvents = 'none';
		document.body.appendChild(this.el);
		this.updateStyle();
	}
	updateStyle() {
		if (!this.el) return;
		this.el.style.fontFamily = this.options['font'].value;
		this.el.style.fontSize = `${this.options['textSize'].value}px`;
		this.el.style.color = '#fff';
		this.el.style.textShadow = this.options['shadow'].value ? '0 0 3px rgba(0,0,0,0.8)' : 'none';
	}
	onRender() {
		if (!this.el) return;
		const list = (window.moduleManager?.modules || []).filter(m => m.enabled && m.name !== 'ClickGUI').map(m => m.name);
		this.el.innerHTML = list.map(n => `<div>${n}</div>`).join('');
	}
}
