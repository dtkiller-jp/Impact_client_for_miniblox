import { Module } from '../../module.js';

export class ChestSteal extends Module {
    constructor() {
        super('ChestSteal', 'Misc');
    }

    onTick() {
        if (this.enabled && player.openContainer && player.openContainer.getLowerChestInventory()) {
            for (let i = 0; i < player.openContainer.getLowerChestInventory().getSizeInventory(); i++) {
                if (player.openContainer.getLowerChestInventory().getStackInSlot(i)) {
                    playerController.windowClick(player.openContainer.windowId, i, 0, 1, player);
                }
            }
        }
    }
}