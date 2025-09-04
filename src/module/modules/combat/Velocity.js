import { Module } from '../../module.js';

export class Velocity extends Module {
    constructor() {
        super('Velocity', 'Combat');
        this.addOption('horizontal', 0);
        this.addOption('vertical', 0);
    }

    onTick() {
        if (this.enabled) {
            window.impactVars.velocityhori = this.options.horizontal.value;
            window.impactVars.velocityvert = this.options.vertical.value;
        } else {
            window.impactVars.velocityhori = 100;
            window.impactVars.velocityvert = 100;
        }
    }

    onDisable() {
        window.impactVars.velocityhori = 100;
        window.impactVars.velocityvert = 100;
    }
}