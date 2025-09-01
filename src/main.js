import { ModuleManager } from './module/moduleManager.js';
import { setupConfig, saveConfig } from './config/manager.js';
import { registerEvents } from './events.js';
import { hook } from './hooks.js';

// 1. Set up the hooks immediately. This must run before the game code.
hook();

// 2. Main client class
class ImpactClient {
    constructor() {
        this.moduleManager = new ModuleManager();
        window.moduleManager = this.moduleManager; // Expose for GUI and debugging
        this.initialized = false;
    }

    start() {
        console.log("[Impact] Game is ready. Starting client initialization...");

        // Load saved settings from config
        setupConfig(this.moduleManager);

        // Register non-game-related events (e.g., error handlers)
        registerEvents();

        // Load all module classes
        this.moduleManager.loadModules();

        // Set up event listeners to bridge hooks to the module manager
        this.setupEventListeners();
        
        // Save config periodically
        setInterval(() => {
            saveConfig(this.moduleManager);
        }, 10000);

        this.initialized = true;
        window.impactClientInitialized = true;
        console.log("[Impact] Client initialized successfully!");
        console.log("[Impact] Press Right Arrow to open ClickGUI.");
    }

    setupEventListeners() {
        document.addEventListener('impact-tick', () => {
            if (!this.initialized) return;
            this.moduleManager.onTick();
        });

        document.addEventListener('impact-packet-send', (event) => {
            if (!this.initialized) return;
            this.moduleManager.onPacketSend(event);
        });

        document.addEventListener('impact-packet-receive', (event) => {
            if (!this.initialized) return;
            this.moduleManager.onPacketReceive(event);
        });
    }
}

// 3. Initialization logic
// Wait for the hooks to tell us the game is ready.
document.addEventListener('impact-game-ready', (event) => {
    // Expose game objects globally for modules to use
    window.player = event.detail.player;
    window.game = event.detail.game;

    // Initialize the client
    const client = new ImpactClient();
    client.start();
});