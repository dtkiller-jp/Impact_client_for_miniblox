import { Module } from '../../module.js';

export class AntiFall extends Module {
    constructor() {
        super('AntiFall', 'Movement');
    }

    onTick() {
        if (this.enabled && player.fallDistance > 2) {
            ClientSocket.sendPacket(new SPacketPlayerPos({
                x: player.posX,
                y: player.posY + 5,
                z: player.posZ,
                onGround: true
            }));
        }
    }
}