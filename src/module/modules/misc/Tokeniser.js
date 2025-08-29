import { Module } from '../../module.js';

export class Tokeniser extends Module {
	constructor() {
		super('Tokeniser', 'misc');
		this.addOption('intervalMs', 5000);
		this.intervalId = null;
	}
	onEnable() { this.startLoop(); }
	onDisable() { this.stopLoop(); }
	startLoop() {
		const interval = this.options['intervalMs'].value;
		const SESSION_PROVIDER = 'https://session.coolmathblox.ca/';
		const sessionToken = localStorage.getItem('session_v1');
		if (!sessionToken) { console.error('[Tokeniser] No session_v1 token'); return; }
		const headers = { Authorization: sessionToken, 'Content-Type': 'application/json' };
		const getAccountInfo = async () => {
			try {
				const res = await fetch(SESSION_PROVIDER + 'accounts/me', { method: 'POST', headers, body: JSON.stringify({}) });
				if (!res.ok) throw new Error('Failed to fetch account info');
				return await res.json();
			} catch (e) { console.error('[Tokeniser] Account info error:', e); return null; }
		};
		const sendRewardedAd = async () => {
			try {
				const res = await fetch(SESSION_PROVIDER + 'rewarded_ad', { method: 'POST', headers, body: JSON.stringify({}) });
				if (!res.ok) console.error('[Tokeniser] Reward request failed:', res.statusText);
				else {
					const info = await getAccountInfo();
					if (info) console.log('[Tokeniser] Coins:', info.coins);
				}
			} catch (e) { console.error('[Tokeniser] Reward request error:', e); }
		};
		sendRewardedAd();
		this.intervalId = setInterval(sendRewardedAd, interval);
		console.log('[Tokeniser] Reward loop started. Interval:', interval);
	}
	stopLoop() {
		if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
		console.log('[Tokeniser] Reward loop stopped.');
	}
}
