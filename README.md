# Impact Moduled Client

A highly modularized client for Miniblox.io based on Impact Client v4, featuring a modern ClickGUI system and comprehensive module management.

## Features

- **Modular Architecture**: Clean, organized code structure with categorized modules
- **Advanced ClickGUI**: Trollium-style interface with drag & drop, animations, and customization
- **Module Categories**: Combat, Movement, Visual, and Misc modules
- **Keybind System**: Customizable keybinds for all modules
- **Settings Management**: Real-time configuration with various input types
- **Modern Build System**: Node.js and Webpack for development

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Build

- **Production build**:
  ```bash
  npm run build
  ```
- **Development with watch mode**:
  ```bash
  npm run watch
  ```

## Usage

1. **Open ClickGUI**: Press `Right Arrow` key
2. **Module Control**:
   - Left Click: Toggle module on/off
   - Right Click: Show module settings
   - Middle Click: Set keybind
3. **Navigation**: Drag panel headers to move
4. **Close GUI**: Press `Escape` key

## Module Categories

- **Combat**: AutoClicker, Killaura, Velocity, WTap
- **Movement**: Speed, Step, Fly, JumpFly, NoFall, Scaffold
- **Visual**: Chams, PlayerESP, TextGUI, NametagsPlus, ClickGUI
- **Misc**: AutoRespawn, AutoRejoin, AutoQueue, AutoVote, InvCleaner

## Development

See `MODULE_DEVELOPMENT.md` for detailed information on creating new modules.

## License

MIT License
