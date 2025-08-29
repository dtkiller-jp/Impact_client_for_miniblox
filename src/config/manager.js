// Configuration management system
export function setupConfig() {
    // Configuration initialization
    console.log('[Config] Initializing configuration system...');
    
    // Set default configuration
    if (!localStorage.getItem('impactModuledConfig')) {
        const defaultConfig = {
            version: '1.0.0',
            modules: {},
            settings: {
                clickguiKey: 'ArrowRight',
                streamerMode: false
            }
        };
        localStorage.setItem('impactModuledConfig', JSON.stringify(defaultConfig));
    }
    
    console.log('[Config] Configuration system initialized');
}

export function getConfig(key) {
    // Get configuration
    try {
        const config = JSON.parse(localStorage.getItem('impactModuledConfig') || '{}');
        return key ? config[key] : config;
    } catch (error) {
        console.error('[Config] Error reading config:', error);
        return null;
    }
}

export function setConfig(key, value) {
    // Save configuration
    try {
        const config = getConfig();
        if (key) {
            config[key] = value;
        } else {
            Object.assign(config, value);
        }
        localStorage.setItem('impactModuledConfig', JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('[Config] Error saving config:', error);
        return false;
    }
}

export function resetConfig() {
    // Reset configuration
    localStorage.removeItem('impactModuledConfig');
    setupConfig();
}
