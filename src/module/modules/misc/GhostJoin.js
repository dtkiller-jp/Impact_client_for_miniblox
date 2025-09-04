import { Module } from '../../module.js';

export class GhostJoin extends Module {
    constructor() {
        super('GhostJoin', 'Misc');
    }

    onEnable() {
        ClientSocket.disconnect();
        this.toggle(); // Disable itself after running once
    }
}