// ==UserScript==
// @name         Impact Moduled for MiniBlox
// @namespace    Impact_Moduled
// @version      1.0.2
// @description  The ultimate MiniBlox hacked client with modular architecture
// @author       Impact_Moded_Team
// @match        https://miniblox.io/*
// @match        https://miniblox.org/*
// @match        https://miniblox.online/*
// @match        https://blockcraft.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=miniblox.io
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @require      https://raw.githubusercontent.com/dtkiller-jp/Impact_client_for_miniblox/refs/heads/main/build/impactmoduled.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Simple function to wait for Impact Moduled to load
    function waitForImpactModuled() {
        // Check if Impact Moduled is loaded
        const isLoaded = window.impactModuledLoaded || 
                        window.moduleManager || 
                        window.__gameReplacements || 
                        window.__gameDumps ||
                        typeof window.getGameModifications === 'function';
        
        if (isLoaded && !window.__userscriptInitialized) {
            console.log('[Userscript] Impact Moduled detected - integration complete');
            window.__userscriptInitialized = true;
            
            // Log what's available
            if (window.__gameReplacements) {
                console.log('[Userscript] Game replacements available:', Object.keys(window.__gameReplacements).length);
            }
            
            if (window.__gameDumps) {
                console.log('[Userscript] Game dumps available:', Object.keys(window.__gameDumps).length);
            }
            
        } else {
            // Wait and try again
            setTimeout(waitForImpactModuled, 500);
        }
    }

    // Start waiting for Impact Moduled
    console.log('[Userscript] Starting Impact Moduled detection...');
    setTimeout(waitForImpactModuled, 1000);
    
    // Listen for custom events from Impact Moduled
    window.addEventListener('impactModuledLoaded', () => {
        setTimeout(waitForImpactModuled, 100);
    });
    
    window.addEventListener('impactModuledHooksReady', () => {
        setTimeout(waitForImpactModuled, 100);
    });

})();