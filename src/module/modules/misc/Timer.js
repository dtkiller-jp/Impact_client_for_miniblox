import { Module } from '../../module.js';

export class Timer extends Module {
    constructor() {
        super('Timer', 'Misc');
        this.addOption('speed', 1.0);
    }

    onTick() {
        if (this.enabled) {
            game.timer.timerSpeed = this.options.speed.value;
        } else {
            game.timer.timerSpeed = 1;
        }
    }

    onDisable() {
        game.timer.timerSpeed = 1;
    }
}