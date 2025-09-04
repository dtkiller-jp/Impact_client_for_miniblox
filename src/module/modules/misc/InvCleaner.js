import { Module } from '../../module.js';

export class InvCleaner extends Module {
    constructor() {
        super('InvCleaner', 'Misc');
        this.addOption('items', 'dirt,cobblestone');
    }

    onTick() {
        if (this.enabled && player.openContainer) {
            for (let i = 0; i < player.openContainer.inventorySlots.length; i++) {
                const itemStack = player.openContainer.inventorySlots[i].getStack();
                if (itemStack && this.options.items.value.includes(itemStack.item.name)) {
                    playerController.windowClick(player.openContainer.windowId, i, 1, 4, player);
                }
            }
        }
    }
}