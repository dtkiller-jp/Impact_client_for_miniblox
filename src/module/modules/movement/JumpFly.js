import { Module } from '../../module.js';

export class JumpFly extends Module {
    constructor() {
        super('JumpFly', 'Movement');
    }

    onTick() {
        if (this.enabled && player.onGround) {
            player.jump();
        }
    }
}