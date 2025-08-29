// Simple packet bridge for hooking game network events if available
const listeners = {};

function ensurePatched() {
	if (window.ClientSocket) {
		// Patch .on to insert our pre-callback fanout for future registrations
		if (!window.ClientSocket.__impactPatchedOn) {
			const originalOn = window.ClientSocket.on?.bind(window.ClientSocket);
			if (originalOn) {
				window.ClientSocket.on = (eventName, cb) => {
					if (!listeners[eventName]) listeners[eventName] = [];
					listeners[eventName].push(cb);
					return originalOn(eventName, (...args) => {
						try {
							if (bridgeListeners[eventName]) {
								bridgeListeners[eventName].forEach(fn => { try { fn(...args); } catch (e) { console.error('[PacketBridge] bridge listener error', e); } });
							}
							cb(...args);
						} catch (e) { console.error('[PacketBridge] listener error', e); }
					});
				};
				window.ClientSocket.__impactPatchedOn = true;
			}
		}
		// Patch .emit so even already-registered events flow through our bridge
		if (!window.ClientSocket.__impactPatchedEmit) {
			const originalEmit = window.ClientSocket.emit?.bind(window.ClientSocket);
			if (originalEmit) {
				window.ClientSocket.emit = (eventName, ...args) => {
					try {
						if (bridgeListeners[eventName]) {
							bridgeListeners[eventName].forEach(fn => { try { fn(...args[0]); } catch(e){ console.error('[PacketBridge] emit bridge error', e); } });
						}
					} catch {}
					return originalEmit(eventName, ...args);
				};
				window.ClientSocket.__impactPatchedEmit = true;
			}
		}
	}
}

const bridgeListeners = {};

export function onPacket(eventName, handler) {
	if (!bridgeListeners[eventName]) bridgeListeners[eventName] = [];
	bridgeListeners[eventName].push(handler);
	ensurePatched();
	return () => offPacket(eventName, handler);
}

export function offPacket(eventName, handler) {
	if (!bridgeListeners[eventName]) return;
	const idx = bridgeListeners[eventName].indexOf(handler);
	if (idx !== -1) bridgeListeners[eventName].splice(idx, 1);
}

function dispatchPacket(name, payload) {
	try { if (bridgeListeners[name]) bridgeListeners[name].forEach(fn => { try { fn(payload); } catch(e){ console.error('[PacketBridge] dispatch error', e); } }); } catch {}
}

if (!window.__impactBridgeDispatch) {
	window.__impactBridgeDispatch = dispatchPacket;
}

export default { onPacket, offPacket };
