import { Module } from '../../module.js';

export class AutoFunnyChat extends Module {
    constructor() {
        super('AutoFunnyChat', 'Misc');
        this.addOption('message', 'im the best');
        this.addOption('delay', 5);
    }

    onTick() {
        if (this.enabled && Date.now() > window.impactVars.chatDelay) {
            ClientSocket.sendPacket(new SPacketMessage({
                text: this.options.message.value
            }));
            window.impactVars.chatDelay = Date.now() + (this.options.delay.value * 1000);
        }
    }
}