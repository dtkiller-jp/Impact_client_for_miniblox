import { Module } from '../../module.js';

export class NoFall extends Module {
    constructor() {
        super('NoFall', 'Movement');
    }

    onTick() {
        if (this.enabled && player.fallDistance > 2) {
            ClientSocket.sendPacket(new SPacketPlayerPos({
                x: player.posX,
                y: player.posY,
                z: player.posZ,
                onGround: true
            }));
        }
    }
}