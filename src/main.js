
import { ModuleManager } from './module/moduleManager.js';
import { setupConfig } from './config/manager.js';
import { registerEvents } from './events.js';




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

    initialize() {
        console.log("[Impact] Initializing client...");
        hook(); // Set up all game hooks first.

        document.addEventListener('impact-game-ready', () => this.onGameReady());
    }

    onGameReady() {
        if (this.initialized) return;
        console.log("[Impact] Game is ready. Starting modules...");

        this.moduleManager = new ModuleManager();
        window.moduleManager = this.moduleManager; // Expose for GUI and debugging

        // Load modules and apply saved config
        this.moduleManager.loadModules();
        setupConfig(this.moduleManager);

        // Set up event listeners to bridge hooks to the module manager
        this.setupEventListeners();
        
        // Save config periodically
        setInterval(() => {
            saveConfig(this.moduleManager);
        }, 10000);

        this.initialized = true;
        console.log("[Impact] Client initialized successfully!");
    }

    setupEventListeners() {
        document.addEventListener('impact-tick', (e) => {
            if (!this.initialized || !this.moduleManager) return;
            this.moduleManager.onTick(e);
        });

        document.addEventListener('impact-packet-send', (e) => {
            if (!this.initialized || !this.moduleManager) return;
            this.moduleManager.onPacketSend(e);
        });

        document.addEventListener('impact-packet-receive', (e) => {
            if (!this.initialized || !this.moduleManager) return;
            this.moduleManager.onPacketReceive(e);
        });
    }
}

// Start the client
const client = new ImpactClient();
client.initialize();
