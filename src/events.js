// Event management system
export function registerEvents() {
    // Register game events and custom events
    
    // Setup basic event listeners
    window.addEventListener('load', () => {
        console.log('[Events] Page loaded, setting up event listeners...');
    });
    
    // Error handling
    window.addEventListener('error', (event) => {
        console.error('[Events] Global error:', event.error);
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('[Events] Unhandled promise rejection:', event.reason);
    });
    
    console.log('[Events] Event system initialized');
}
