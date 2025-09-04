import { Module } from '../../module.js';

export class Scaffold extends Module {
    constructor() {
        super('Scaffold', 'Movement');
    }

    onTick() {
        if (this.enabled && !player.onGround) {
            const blockPos = new BlockPos(player.posX, player.posY - 1, player.posZ);
            const block = world.getBlockState(blockPos);
            if (block.isAir()) {
                const inventory = player.inventory.mainInventory;
                for (let i = 0; i < inventory.length; i++) {
                    const itemStack = inventory[i];
                    if (itemStack && itemStack.item.isBlock()) {
                        player.inventory.currentItem = i;
                        playerController.placeBlock(blockPos, 1, itemStack);
                        break;
                    }
                }
            }
        }
    }
}