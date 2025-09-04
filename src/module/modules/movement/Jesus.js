import { Module } from '../../module.js';

export class Jesus extends Module {
    constructor() {
        super('Jesus', 'Movement');
    }

    onTick() {
        if (this.enabled && player.isInWater()) {
            player.motionY = 0.1;
        }
    }
}