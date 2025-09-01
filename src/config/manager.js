// Configuration management system for Impact Moduled

const CONFIG_KEY = 'impactModuledConfig';

/**
 * Loads the saved configuration from localStorage and applies it to the modules.
 * If no config is found, it initializes a default one.
 * @param {ModuleManager} moduleManager - The module manager instance.
 */
export function setupConfig(moduleManager) {
    console.log('[Config] Setting up configuration...');
    let config = getConfig();

    if (!config || !config.modules) {
        console.log('[Config] No valid config found, creating default.');
        config = {
            version: '1.0.2',
            modules: {}
        };
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    }

    // Apply the loaded config to the modules
    if (moduleManager && moduleManager.modules.length > 0) {
        for (const module of moduleManager.modules) {
            const moduleConfig = config.modules[module.name];
            if (moduleConfig) {
                // Apply enabled state
                if (module.enabled !== moduleConfig.enabled) {
                    module.toggle();
                }
                // Apply options
                if (moduleConfig.options) {
                    for (const optionName in module.options) {
                        if (moduleConfig.options[optionName] !== undefined) {
                            module.options[optionName].value = moduleConfig.options[optionName];
                        }
                    }
                }
                // Apply bind
                if (moduleConfig.bind !== undefined) {
                    module.bind = moduleConfig.bind;
                }
            }
        }
        console.log('[Config] Applied saved configuration to modules.');
    } else {
        console.warn('[Config] Module manager not ready, skipping config application.');
    }
}

/**
 * Saves the current state of all modules to localStorage.
 * @param {ModuleManager} moduleManager - The module manager instance.
 */
export function saveConfig(moduleManager) {
    if (!moduleManager) return;

    const configToSave = {
        version: '1.0.2', // Update version as needed
        modules: {}
    };

    for (const module of moduleManager.modules) {
        const optionsToSave = {};
        for (const optionName in module.options) {
            optionsToSave[optionName] = module.options[optionName].value;
        }

        configToSave.modules[module.name] = {
            enabled: module.enabled,
            bind: module.bind,
            options: optionsToSave
        };
    }

    try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(configToSave));
    } catch (error) {
        console.error('[Config] Error saving config:', error);
    }
}

/**
 * Gets the entire configuration object or a specific key from it.
 * @param {string} [key] - Optional key to retrieve a specific part of the config.
 * @returns {any} The configuration object or the value of the specified key.
 */
export function getConfig(key) {
    try {
        const config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}');
        return key ? config[key] : config;
    } catch (error) {
        console.error('[Config] Error reading config:', error);
        return null;
    }
}

/**
 * Sets a specific key-value pair in the configuration.
 * Note: For saving module states, prefer saveConfig for a structured approach.
 * @param {string} key - The key to set.
 * @param {any} value - The value to set.
 */
export function setConfig(key, value) {
    try {
        const config = getConfig() || {};
        config[key] = value;
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('[Config] Error setting config value:', error);
        return false;
    }
}

/**
 * Resets the configuration to its default state.
 */
export function resetConfig() {
    localStorage.removeItem(CONFIG_KEY);
    console.log('[Config] Configuration reset.');
}