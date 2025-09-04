import { Module } from '../../module.js';

export class Breaker extends Module {
    constructor() {
        super('Breaker', 'Misc');
    }

    onTick() {
        if (this.enabled) {
            for (const entity of Object.values(entities)) {
                if (entity.isBed()) {
                    const blockPos = entity.getPosition();
                    if (world.getBlockState(blockPos).isBed()) {
                        playerController.onPlayerDamageBlock(blockPos, 1);
                    }
                }
            }
        }
    }
}