import { Module } from '../../module.js';

export class Speed extends Module {
    constructor() {
        super('Speed', 'Movement');
        this.addOption('multiplier', 1.2);
    }

    onTick() {
        if (this.enabled && (player.moveForward || player.moveStrafing)) {
            player.motionX *= this.options.multiplier.value;
            player.motionZ *= this.options.multiplier.value;
        }
    }
}