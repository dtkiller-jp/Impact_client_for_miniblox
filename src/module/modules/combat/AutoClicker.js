import { Module } from '../../module.js';

export class AutoClicker extends Module {
	constructor() {
		super('AutoClicker', 'combat');
		this.addOption('cps', 16);
		this.addOption('leftClick', true);
		this.addOption('rightClick', false);
		this.addOption('randomize', true);
		this.interval = null;
		this.lastClickTime = 0;
	}

	onEnable() {
		console.log(`[${this.name}] AutoClicker enabled with ${this.options['cps'].value} CPS`);
		this.startClicking();
	}

	onDisable() {
		console.log(`[${this.name}] AutoClicker disabled`);
		this.stopClicking();
	}

	startClicking() {
		const cps = this.options['cps'].value;
		const interval = 1000 / cps;
		
		this.interval = setInterval(() => {
			if (this.options['leftClick'].value) {
				this.simulateClick('left');
			}
			if (this.options['rightClick'].value) {
				this.simulateClick('right');
			}
		}, interval);
	}

	stopClicking() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	simulateClick(button) {
		const now = Date.now();
		if (now - this.lastClickTime < 50) return; // 最小間隔

		try {
			// マウスクリックイベントをシミュレート
			const event = new MouseEvent('mousedown', {
				button: button === 'left' ? 0 : 2,
				bubbles: true,
				cancelable: true,
				view: window
			});
			
			document.dispatchEvent(event);
			this.lastClickTime = now;
		} catch (error) {
			console.error(`[${this.name}] Error simulating click:`, error);
		}
	}

	onTick() {
		// ゲームティックでの処理
	}
}
