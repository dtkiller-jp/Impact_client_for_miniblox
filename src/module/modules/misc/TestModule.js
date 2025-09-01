import { Module } from '../../module.js';

export class TestModule extends Module {
	constructor() {
		super('TestModule', 'misc');
		this.addOption('message', 'Hello World');
		this.addOption('counter', 0);
		this.timer = null;
	}

	onEnable() {
		console.log(`[${this.name}] Enabled! Message: ${this.options.message.value}`);
		this.timer = setInterval(() => {
			this.options.counter.value++;
			console.log(`[${this.name}] Counter: ${this.options.counter.value}`);
		}, 1000);
	}

	onDisable() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		console.log(`[${this.name}] Disabled! Final counter: ${this.options.counter.value}`);
	}
}