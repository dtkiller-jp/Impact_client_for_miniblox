import { Module } from '../../module.js';

// This class is now only responsible for defining the module for the GUI.
// The actual game logic is handled entirely by the code injected in hooks.js.
export class Killaura extends Module {
	constructor() {
		super('Killaura', 'combat');
		// These options are automatically sent to the injected script when changed.
		this.addOption('Range', 9);
		this.addOption('Angle', 360);
	}
}
