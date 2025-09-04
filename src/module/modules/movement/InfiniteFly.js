import { Module } from '../../module.js';

export class InfiniteFly extends Module {
    constructor() {
        super('InfiniteFly', 'Movement');
    }

    onTick() {
        if (this.enabled && player.onGround) {
            player.motionY = 0.42;
        }
    }
}