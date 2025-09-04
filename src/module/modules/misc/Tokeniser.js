import { Module } from '../../module.js';

export class Tokeniser extends Module {
    constructor() {
        super('Tokeniser', 'Misc');
    }

    onEnable() {
        const token = localStorage.getItem("token");
        if (token) {
            game.chat.addChat({
                text: `Your token is: ${token}`
            });
        }
        this.toggle(); // Disable itself after running once
    }
}