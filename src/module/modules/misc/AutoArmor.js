import { Module } from '../../module.js';

export class AutoArmor extends Module {
    constructor() {
        super('AutoArmor', 'Misc');
    }

    onTick() {
        if (this.enabled && player.openContainer) {
            const inventory = player.inventory.mainInventory;
            let bestArmor = [null, null, null, null];
            for (let i = 0; i < inventory.length; i++) {
                const itemStack = inventory[i];
                if (itemStack && itemStack.item.isArmor()) {
                    const armorType = itemStack.item.armorType;
                    if (!bestArmor[armorType] || itemStack.item.damageReduceAmount > bestArmor[armorType].item.damageReduceAmount) {
                        bestArmor[armorType] = itemStack;
                    }
                }
            }
            for (let i = 0; i < 4; i++) {
                if (bestArmor[i]) {
                    const armorSlot = 5 + i;
                    if (!player.inventory.armorInventory[i] || bestArmor[i].item.damageReduceAmount > player.inventory.armorInventory[i].item.damageReduceAmount) {
                        playerController.windowClick(player.openContainer.windowId, inventory.indexOf(bestArmor[i]), 0, 1, player);
                    }
                }
            }
        }
    }
}