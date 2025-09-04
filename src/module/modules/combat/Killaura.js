import { Module } from '../../module.js';

export class Killaura extends Module {
    constructor() {
        super('Killaura', 'Combat');
        this.addOption('cps', 12);
        this.addOption('range', 4);
    }

    onTick() {
        if (this.enabled && Date.now() > window.impactVars.attackTime) {
            for (const entity of Object.values(entities)) {
                if (entity != player && entity.isEntityPlayer() && entity.health > 0 && entity.getDistanceToEntity(player) < this.options.range.value) {
                    const angle = getAngles(entity);
                    window.impactVars.sendYaw = angle.yaw;
                    player.attack(entity);
                    window.impactVars.attackTime = Date.now() + (1000 / this.options.cps.value);
                    break;
                }
            }
        }
    }
}