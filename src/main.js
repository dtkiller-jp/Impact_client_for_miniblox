
import { ModuleManager } from './module/moduleManager.js';
import { hook } from './hooks.js';
import { setupConfig, saveConfig } from './config/manager.js';

class ImpactClient {
    constructor() {
        this.moduleManager = null;
        this.initialized = false;
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
            if (!this.initialized) return;
            this.moduleManager.onTick(e);
        });

        document.addEventListener('impact-packet-send', (e) => {
            if (!this.initialized) return;
            this.moduleManager.onPacketSend(e);
        });

        document.addEventListener('impact-packet-receive', (e) => {
            if (!this.initialized) return;
            this.moduleManager.onPacketReceive(e);
        });
    }
}

// Start the client
const client = new ImpactClient();
client.initialize();
