import { Module } from '../../module.js';

export class ChatDisabler extends Module {
    constructor() {
        super('ChatDisabler', 'Misc');
        this.addOption('message', 'get rekt');
    }

    // The core logic is handled by a patch in main.js
    // This module only exists for the enable/disable toggle and options.
}