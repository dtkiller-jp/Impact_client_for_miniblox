# Module Development Guide

This guide explains how to create new modules for the Impact Moduled Client.

## Table of Contents

1. [Module Structure](#module-structure)
2. [Creating a New Module](#creating-a-new-module)
3. [Module Template](#module-template)
4. [Module Options](#module-options)
5. [Module Lifecycle](#module-lifecycle)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

## Module Structure

Every module extends the base `Module` class and follows this structure:

```javascript
import { Module } from '../../module.js';

export class YourModule extends Module {
    constructor() {
        super('ModuleName', 'category');
        // Initialize options and properties
    }

    onEnable() {
        // Called when module is enabled
    }

    onDisable() {
        // Called when module is disabled
    }

    onTick() {
        // Called every game tick (if enabled)
    }

    onRender() {
        // Called every render frame (if enabled)
    }
}
```

## Creating a New Module

### 1. Choose Category
Select the appropriate category for your module:
- `combat` - Combat-related features (Killaura, AutoClicker, etc.)
- `movement` - Movement modifications (Speed, Fly, etc.)
- `visual` - Visual enhancements (ESP, Chams, etc.)
- `misc` - Utility features (AutoRespawn, InvCleaner, etc.)

### 2. Create File
Create a new `.js` file in the appropriate category directory:
```
src/module/modules/[category]/YourModule.js
```

### 3. Register Module
The module will be automatically registered in `moduleManager.js` - no manual registration needed.

## Module Template

Here's a complete template for creating new modules:

```javascript
import { Module } from '../../module.js';

export class YourModule extends Module {
    constructor() {
        super('YourModule', 'category'); // 'category' should be: combat, movement, visual, or misc
        
        // Add module options
        this.addOption('enabled', true);           // Boolean option
        this.addOption('value', 1.0);              // Number option
        this.addOption('text', 'default');         // String option
        this.addOption('color', '#ff0000');        // Color option
        
        // Set default keybind (optional)
        this.bind = 'KeyR';
        
        // Initialize module-specific properties
        this.isActive = false;
        this.timer = 0;
    }

    onEnable() {
        // Called when module is enabled
        console.log(`${this.name} enabled`);
        this.isActive = true;
        
        // Add event listeners, start timers, etc.
        this.startModule();
    }

    onDisable() {
        // Called when module is disabled
        console.log(`${this.name} disabled`);
        this.isActive = false;
        
        // Clean up event listeners, stop timers, etc.
        this.stopModule();
    }

    onTick() {
        // Called every game tick (if module is enabled)
        if (!this.isActive) return;
        
        // Update module logic here
        this.updateLogic();
    }

    onRender() {
        // Called every render frame (if module is enabled)
        if (!this.isActive) return;
        
        // Render visual elements here
        this.renderElements();
    }

    // Custom methods
    startModule() {
        // Initialize module functionality
        this.timer = setInterval(() => {
            this.performAction();
        }, 1000);
    }

    stopModule() {
        // Clean up module functionality
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateLogic() {
        // Update module logic here
        // Access options with: this.options['optionName'].value
        const value = this.options['value'].value;
        
        // Your logic here
    }

    renderElements() {
        // Render visual elements here
        // Example: Draw ESP, overlays, etc.
    }

    performAction() {
        // Perform module-specific actions
        console.log(`${this.name} performing action`);
    }
}
```

## Module Options

### Option Types

The `addOption` method supports different types of options:

```javascript
// Boolean option
this.addOption('enabled', true);

// Number option
this.addOption('speed', 1.0);

// String option
this.addOption('message', 'Hello World');

// Color option
this.addOption('color', '#ff0000');
```

### Accessing Options

Access option values in your module methods:

```javascript
onTick() {
    const speed = this.options['speed'].value;
    const enabled = this.options['enabled'].value;
    
    if (enabled) {
        this.applySpeed(speed);
    }
}
```

### Option Properties

Each option object has these properties:
- `type`: The data type
- `value`: Current value
- `label`: Display label
- `defaultValue`: Original value
- `range`: Optional range for number inputs

## Module Lifecycle

### 1. Constructor
- Initialize module properties
- Add options
- Set default keybind

### 2. onEnable()
- Called when module is enabled
- Initialize functionality
- Add event listeners
- Start timers/loops

### 3. onTick()
- Called every game tick
- Update module logic
- Perform actions

### 4. onRender()
- Called every render frame
- Draw visual elements
- Update UI

### 5. onDisable()
- Called when module is disabled
- Clean up resources
- Remove event listeners
- Stop timers/loops

## Best Practices

### 1. Resource Management
- Always clean up in `onDisable()`
- Use `this.isActive` flag to prevent operations when disabled
- Clear intervals and timeouts

### 2. Performance
- Keep `onTick()` and `onRender()` lightweight
- Use `requestAnimationFrame` for smooth animations
- Avoid heavy operations in render loops

### 3. Error Handling
- Wrap critical operations in try-catch blocks
- Log errors for debugging
- Gracefully handle failures

### 4. Naming Conventions
- Use PascalCase for class names
- Use descriptive names for methods
- Follow existing module patterns

### 5. Code Organization
- Group related functionality in methods
- Use clear, descriptive variable names
- Add comments for complex logic

## Examples

### Simple Toggle Module
```javascript
import { Module } from '../../module.js';

export class SimpleToggle extends Module {
    constructor() {
        super('SimpleToggle', 'misc');
        this.addOption('message', 'Module is active!');
    }

    onEnable() {
        console.log(this.options['message'].value);
    }

    onDisable() {
        console.log('Module deactivated');
    }
}
```

### Timer-Based Module
```javascript
import { Module } from '../../module.js';

export class TimerModule extends Module {
    constructor() {
        super('TimerModule', 'misc');
        this.addOption('interval', 1000);
        this.timer = null;
    }

    onEnable() {
        const interval = this.options['interval'].value;
        this.timer = setInterval(() => {
            this.performAction();
        }, interval);
    }

    onDisable() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    performAction() {
        console.log('Timer action performed');
    }
}
```

### Visual Module
```javascript
import { Module } from '../../module.js';

export class VisualModule extends Module {
    constructor() {
        super('VisualModule', 'visual');
        this.addOption('color', '#00ff00');
        this.addOption('size', 10);
        this.overlay = null;
    }

    onEnable() {
        this.createOverlay();
    }

    onDisable() {
        this.removeOverlay();
    }

    onRender() {
        if (this.overlay) {
            this.updateOverlay();
        }
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.style.position = 'fixed';
        this.overlay.style.top = '10px';
        this.overlay.style.right = '10px';
        this.overlay.style.color = this.options['color'].value;
        this.overlay.style.fontSize = this.options['size'].value + 'px';
        this.overlay.textContent = 'Visual Module Active';
        document.body.appendChild(this.overlay);
    }

    removeOverlay() {
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
    }

    updateOverlay() {
        this.overlay.style.color = this.options['color'].value;
        this.overlay.style.fontSize = this.options['size'].value + 'px';
    }
}
```

## Testing Your Module

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Load in browser** and check console for errors

3. **Test functionality**:
   - Enable/disable module
   - Change options
   - Test keybind functionality
   - Verify cleanup on disable

## Troubleshooting

### Common Issues

1. **Module not appearing**: Check file path and export syntax
2. **Options not working**: Verify option names match exactly
3. **Memory leaks**: Ensure cleanup in `onDisable()`
4. **Performance issues**: Check for heavy operations in `onTick()`/`onRender()`

### Debug Tips

- Use `console.log()` to track module lifecycle
- Check browser console for errors
- Verify option values are being read correctly
- Test with minimal functionality first

## Need Help?

- Check existing modules for examples
- Review the base `Module` class implementation
- Look at `moduleManager.js` for registration logic
- Examine ClickGUI components for UI integration
