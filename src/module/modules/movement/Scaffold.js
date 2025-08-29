import { Module } from '../../module.js';

export class Scaffold extends Module {
	constructor() {
		super('Scaffold', 'movement');
		this.addOption('tower', true);
		this.addOption('extend', 1);
	}
	onEnable() { this.oldSlot = null; }
	onDisable() { this.restoreSlot(); }
	restoreSlot() {
		try { if (window.player && this.oldSlot != null) { window.player.inventory.currentItem = this.oldSlot; } } catch {}
	}
	onTick() {
		try {
			const game = window.game; const player = window.player;
			if (!game || !player || !player.inventory) return;
			if (this.oldSlot == null) this.oldSlot = player.inventory.currentItem;
			// find block slot
			for (let i = 0; i < 9; i++) {
				const item = player.inventory.main?.[i];
				if (item && item.item?.isPlaceable && item.item?.name !== 'tnt') { player.inventory.currentItem = i; break; }
			}
			const item = player.inventory.getCurrentItem?.();
			if (!item || !item.getItem || !item.getItem()?.isPlaceable) return;
			const posY = Math.floor(player.pos.y) - 1;
			const baseX = Math.floor(player.pos.x);
			const baseZ = Math.floor(player.pos.z);
			const futureX = Math.floor(player.pos.x + player.motion.x);
			const futureZ = Math.floor(player.pos.z + player.motion.z);
			const positions = [ {x: baseX, y: posY, z: baseZ}, {x: futureX, y: posY, z: futureZ} ];
			for (const pos of positions) {
				if (game.world?.isAir?.(pos.x, pos.y, pos.z)) {
					const extend = this.options['extend'].value;
					const placePos = { x: pos.x, y: pos.y, z: pos.z };
					// simple tower
					if (this.options['tower'].value && player.controls?.jump && Math.abs(player.pos.x - (baseX+0.5)) < 0.3 && Math.abs(player.pos.z - (baseZ+0.5)) < 0.3) {
						player.motion.y = Math.max(player.motion.y, 0.42);
					}
					// place block via controller if available
					if (window.playerController?.placeBlock) {
						const face = {x:0,y:1,z:0};
						const hit = {x: placePos.x + 0.5, y: placePos.y + 0.99, z: placePos.z + 0.5};
						window.playerController.placeBlock(player, game.world, item, placePos, face, hit, extend);
					}
					break;
				}
			}
		} catch {}
	}
}
