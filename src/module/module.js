// Base Module class for Impact Moduled
export class Module {
	constructor(name, category) {
		this.name = name;
		this.category = category; // e.g., 'combat', 'movement', 'visual', 'misc'
		this.enabled = false;
		this.bind = "";
		this.waitingForBind = false;
		this.options = {};
		// Modules are registered in moduleManager.js
	}

	toggle() {
		this.enabled = !this.enabled;
		if (this.enabled) {
			this.onEnable();
		} else {
			this.onDisable();
		}
        // The communication to the injected script is now handled exclusively
        // by the postMessage wrapper in main.js for stability and clarity.
	}

	setbind(key) {
		this.bind = key;
	}

	addOption(name, typeOrDefault, maybeDefault, range = null) {
		let optionType;
		let defaultValue;
		if (maybeDefault === undefined) {
			defaultValue = typeOrDefault;
			optionType = typeof defaultValue;
			if (name.toLowerCase().includes('color')) optionType = 'color';
		} else {
			optionType = typeOrDefault;
			defaultValue = maybeDefault;
		}
		this.options[name] = { type: optionType, value: defaultValue, label: name, defaultValue, range };
		return this.options[name];
	}

	// Placeholder methods to be overridden by specific modules
	onEnable() {}
	onDisable() {}
	onTick() {}
	onRender() {}
}