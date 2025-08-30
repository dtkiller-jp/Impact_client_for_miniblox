// Impact Moduled for MiniBlox
// Entry point

import { ModuleManager } from './module/moduleManager.js';
import { setupConfig } from './config/manager.js';
import { registerEvents } from './events.js';
import { hook } from './hooks.js';




hook();
// --- 2. CLIENT INITIALIZATION LOGIC ---
// This function will be called by the hook once the game is ready.
function startImpactClient() {
    if (window.impactClientInitialized) {
        return; // Prevent double initialization
    }
    window.impactClientInitialized = true;

    console.log("[Impact] Starting client initialization...");

    /**
     * This function acts as a bridge to send module state updates 
     * from the GUI to the script injected into the game's context.
     * @param {Module} module - The module that was updated.
     */
    function postModuleUpdate(module) {
        // The payload contains all the necessary info for the in-game script to update a module's state.
        const payload = {
            name: module.name,
            enabled: module.enabled,
            options: Object.fromEntries(Object.entries(module.options).map(([k, v]) => [k, v.value]))
        };

        window.postMessage({ type: 'impactModuledUpdate', payload }, '*');
    }

    // Initialize configuration (e.g., load saved settings).
    setupConfig();

    // Register basic DOM events (like the global error handler).
    registerEvents();

    // Initialize the module manager. This loads all module classes from the files
    // so they can be displayed in the ClickGUI.
    window.moduleManager = new ModuleManager();
    window.moduleManager.loadModules();

    // Set up the communication bridge.
    window.moduleManager.modules.forEach(module => {
        // Wrap the toggle function
        const originalToggle = module.toggle;
        module.toggle = function() {
            originalToggle.apply(this, arguments);
            postModuleUpdate(this);
        };

        // Wrap the options change handler
        const originalOptionsChanged = module.onOptionsChanged;
        module.onOptionsChanged = function() {
            if (originalOptionsChanged) {
                originalOptionsChanged.apply(this, arguments);
            }
            postModuleUpdate(this);
        };
    });

    // --- Game Tick Loop ---
    // This function will be called by the code injected by hooks.js on every game tick.
    window.ImpactClientTick = function() {
        if (!window.moduleManager || !window.moduleManager.modules) return;

        for (const module of window.moduleManager.modules) {
            if (module.enabled && typeof module.onTick === 'function') {
                try {
                    module.onTick();
                } catch (e) {
                    console.error(`Error in module ${module.name}'s onTick:`, e);
                }
            }
        }
    };

    // --- FINALIZATION ---
    window.impactModuledLoaded = true;
    console.log('Impact Moduled Client loaded successfully!');
    console.log('Press Right Arrow to open ClickGUI');
}

// Expose the client initializer to the window context so the hook can call it.
window.startImpactClient = startImpactClient;
