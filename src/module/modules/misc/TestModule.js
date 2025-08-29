import { Module } from '../../module.js';

export class TestModule extends Module {
	constructor() {
		super('TestModule', 'misc');
		this.addOption('message', 'Hello World');
		this.addOption('counter', 0);
		this.interval = null;
	}

	onEnable() {
		console.log(`[${this.name}] Enabled!`);
		console.log(`[${this.name}] Message: ${this.options['message'].value}`);
		
		// カウンターを開始
		this.interval = setInterval(() => {
			this.options['counter'].value++;
			console.log(`[${this.name}] Counter: ${this.options['counter'].value}`);
		}, 1000);
	}

	onDisable() {
		console.log(`[${this.name}] Disabled!`);
		
		// カウンターを停止
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	onTick() {
		// ゲームティックごとに呼ばれる
		if (this.enabled) {
			// 何もしない（ログが多すぎるため）
		}
	}

	onRender() {
		// レンダリングごとに呼ばれる
		if (this.enabled) {
			// 何もしない（ログが多すぎるため）
		}
	}
}
