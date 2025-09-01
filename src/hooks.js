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

    console.log("[Impact Hooks] Initializing...",Date.now());

    // 1. WebSocket Hooking
    const originalWebSocket = window.WebSocket;
    const originalSend = originalWebSocket.prototype.send;
    const originalAddEventListener = originalWebSocket.prototype.addEventListener;

    // We need to keep track of the WebSocket instance used by the game
    let gameSocket = null;

    window.WebSocket = function(url, protocols) {
        const socket = new originalWebSocket(url, protocols);
        // Assuming the game uses a specific URL pattern for its WebSocket
        if (url.includes('bloxd.io')) {
            console.log("[Impact Hooks] Game WebSocket instance captured.");
            gameSocket = socket;

            // Expose it for debugging or advanced usage
            window.gameSocket = gameSocket;
        }
        return socket;
    };
    window.WebSocket.prototype = originalWebSocket.prototype;

    originalWebSocket.prototype.send = function(data) {
        // Dispatch a custom event before sending the packet
        const sendEvent = new CustomEvent('impact-packet-send', {
            detail: { socket: this, data: data },
            cancelable: true
        });

        if (document.dispatchEvent(sendEvent)) {
            // If the event was not cancelled, call the original send function
            originalSend.call(this, data);
        }
    };

    originalWebSocket.prototype.addEventListener = function(type, listener, options) {
        if (type === 'message') {
            const newListener = function(event) {
                // Dispatch a custom event when a message is received
                const receiveEvent = new CustomEvent('impact-packet-receive', {
                    detail: { socket: this, data: event.data },
                    cancelable: true
                });

                if (document.dispatchEvent(receiveEvent)) {
                    // If the event was not cancelled, call the original listener
                    listener.call(this, event);
                }
            };
            // Store the original listener to be able to remove it later if needed
            listener.impactHookedListener = newListener;
            originalAddEventListener.call(this, type, newListener, options);
        } else {
            originalAddEventListener.call(this, type, listener, options);
        }
    };
    
    // 2. Game Loop Hook (using requestAnimationFrame)
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    let lastTick = 0;

    function animationFrameHook(timestamp) {
        if(timestamp - lastTick >= 16) { // Roughly 60 FPS
            lastTick = timestamp;
            document.dispatchEvent(new CustomEvent('impact-tick'));
        }
        originalRequestAnimationFrame(animationFrameHook);
    }
    window.requestAnimationFrame = animationFrameHook;

    // 3. Game Ready Hook (wait for player object)
    let readyInterval = setInterval(() => {
        // Heuristic to determine if the game is ready. 
        // This needs to be adapted to the actual game's global objects.
        // We assume the original client looked for `window.player`.
        if (unsafeWindow.player && unsafeWindow.game) {
            clearInterval(readyInterval);
            console.log("[Impact Hooks] Game appears to be ready. Firing event.");
            document.dispatchEvent(new CustomEvent('impact-game-ready', {
                detail: {
                    player: unsafeWindow.player,
                    game: unsafeWindow.game
                }
            }));
        }
    }, 500);

    console.log("[Impact Hooks] All hooks have been set up.");
}
