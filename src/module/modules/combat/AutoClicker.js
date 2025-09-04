import { Module } from '../../module.js';

export class AutoClicker extends Module {
    constructor() {
        super('AutoClicker', 'Combat');
        this.addOption('cps', 12);
    }

    onTick() {
        if (this.enabled && mouse.leftDown && !player.openContainer && Date.now() > window.impactVars.attackTime) {
            player.swingArm();
            player.moveStrafing = player.moveStrafing; // Force update
            window.impactVars.attackTime = Date.now() + (1000 / this.options.cps.value);
        }
    }
}