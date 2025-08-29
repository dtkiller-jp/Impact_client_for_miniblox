import { Module } from '../../module.js';

export class TestMusicPlayer extends Module {
	constructor() {
		super('TestMusicPlayer', 'visual');
		this.addOption('playlistUrl', 'https://www.youtube.com/embed/videoseries?list=PLDN9cM3mgdchOJapJ8k3smJG64icIVMGr&autoplay=1');
		this.el = null;
	}
	onEnable() { this.create(); }
	onDisable() { this.destroy(); }
	create() {
		if (this.el) return;
		const style = document.createElement('style');
		style.textContent = `#musicBar{position:fixed;bottom:15px;right:15px;width:380px;height:240px;z-index:9999;background:linear-gradient(135deg,red,orange,yellow,green,cyan,blue,violet);border-radius:12px;box-shadow:0 0 12px rgba(0,0,0,0.4);overflow:hidden;cursor:move}#musicBar iframe{width:100%;height:100%;border:none}`;
		document.head.appendChild(style);
		this.el = document.createElement('div');
		this.el.id = 'musicBar';
		this.el.innerHTML = `<iframe src="${this.options['playlistUrl'].value}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
		document.body.appendChild(this.el);
		let isDragging=false,offsetX=0,offsetY=0;
		this.el.addEventListener('mousedown',e=>{isDragging=true;offsetX=e.clientX-this.el.offsetLeft;offsetY=e.clientY-this.el.offsetTop;});
		document.addEventListener('mousemove',e=>{if(isDragging){this.el.style.left=`${e.clientX-offsetX}px`;this.el.style.top=`${e.clientY-offsetY}px`;}});
		document.addEventListener('mouseup',()=>isDragging=false);
	}
	destroy() { if (this.el) { this.el.remove(); this.el = null; } }
}
