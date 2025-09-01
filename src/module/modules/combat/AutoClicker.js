import { Module } from '../../module.js';

export class AutoClicker extends Module {
	constructor() {
		super('AutoClicker', 'combat');
		this.addOption('cps', 16);
		this.addOption('onlyWeapon', true);
		this.clickInterval = null;
		this.clicking = false;
	}

	onEnable() {
		this.startClicking();
	}

	onDisable() {
		this.stopClicking();
	}

	startClicking() {
		if (this.clickInterval) return;

		const click = () => {
			if (this.clicking) {
				this.doClick('left');
			}
		};

		this.clickInterval = setInterval(click, 1000 / this.options.cps.value);

		document.addEventListener('mousedown', this.handleMouseDown);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	stopClicking() {
		if (this.clickInterval) {
			clearInterval(this.clickInterval);
			this.clickInterval = null;
		}
		document.removeEventListener('mousedown', this.handleMouseDown);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	handleMouseDown = (e) => {
		if (e.button === 0) { // Left click
			this.clicking = true;
		}
	};

	handleMouseUp = (e) => {
		if (e.button === 0) {
			this.clicking = false;
		}
	};

	doClick(button) {
		try {
			const event = new MouseEvent('mousedown', {
				button: button === 'left' ? 0 : 2,
				bubbles: true,
				cancelable: true,
				view: window
			});
			dispatchEvent(event);
		} catch (e) {
			console.error("Failed to dispatch click event", e);
		}
	}
}