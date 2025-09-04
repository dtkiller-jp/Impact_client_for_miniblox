import { Module } from '../../module.js';

export class WTap extends Module {
    constructor() {
        super('WTap', 'Combat');
    }

    onTick() {
        if (this.enabled && window.impactVars.attackedEntity && window.impactVars.attackedEntity.hurtTime > 0) {
            player.moveForward = -1;
            setTimeout(function() {
                player.moveForward = 0;
            }, 100);
            window.impactVars.attackedEntity = null;
        }
    }
}