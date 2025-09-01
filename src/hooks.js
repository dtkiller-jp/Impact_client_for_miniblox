/*
 * Impact Moduled - Bridge Hooks
 * This script is responsible for hooking into the game's core functionalities
 * and dispatching custom events that the main client can listen to.
 */

export function hook() {
    if (window.impactHooksInitialized) {
        return;
    }
    window.impactHooksInitialized = true;

    console.log("[Impact Hooks] Initializing...");

    // 1. WebSocket Hooking
    const originalWebSocket = window.WebSocket;
    const originalSend = originalWebSocket.prototype.send;

    window.WebSocket = function(url, protocols) {
        const socket = new originalWebSocket(url, protocols);
        if (url.includes('bloxd.io')) {
            console.log("[Impact Hooks] Game WebSocket instance captured.");
            socket.addEventListener('message', (event) => {
                const receiveEvent = new CustomEvent('impact-packet-receive', { detail: event, cancelable: true });
                if (!document.dispatchEvent(receiveEvent)) {
                    event.stopImmediatePropagation();
                }
            }, true); // Use capture phase to intercept before the game does.
        }
        return socket;
    };
    window.WebSocket.prototype = originalWebSocket.prototype;

    originalWebSocket.prototype.send = function(data) {
        const sendEvent = new CustomEvent('impact-packet-send', { detail: { data: data }, cancelable: true });
        if (document.dispatchEvent(sendEvent)) {
            originalSend.call(this, data);
        }
    };
    
    // 2. Game Loop Hook (using requestAnimationFrame)
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    function animationFrameHook(timestamp) {
        document.dispatchEvent(new CustomEvent('impact-tick', { detail: { timestamp } }));
        originalRequestAnimationFrame(animationFrameHook);
    }
    window.requestAnimationFrame = animationFrameHook;

    // 3. Game Ready Hook (wait for player object)
    let readyInterval = setInterval(() => {
        // This heuristic needs to be robust.
        // We search for a global variable that looks like the player object.
        if (typeof unsafeWindow !== 'undefined') {
            for (const key in unsafeWindow) {
                const p = unsafeWindow[key];
                if (p && typeof p === 'object' && p.hasOwnProperty('inventory') && p.hasOwnProperty('pos') && p.hasOwnProperty('motion')) {
                    console.log(`[Impact Hooks] Player object found as '${key}'.`);
                    window.player = p;
                    // Try to find the game object as well
                    for (const gameKey in unsafeWindow) {
                        const g = unsafeWindow[gameKey];
                        if (g && typeof g === 'object' && g.hasOwnProperty('world') && g.hasOwnProperty('chat')) {
                            window.game = g;
                            console.log(`[Impact Hooks] Game object found as '${gameKey}'.`);
                            break;
                        }
                    }
                    clearInterval(readyInterval);
                    document.dispatchEvent(new CustomEvent('impact-game-ready'));
                    return;
                }
            }
        }
    }, 1000);

    console.log("[Impact Hooks] All hooks have been set up.");
}