import { AutoClicker } from './modules/combat/AutoClicker.js';
import { Killaura } from './modules/combat/Killaura.js';
import { Velocity } from './modules/combat/Velocity.js';
import { WTap } from './modules/combat/WTap.js';
import { Speed } from './modules/movement/Speed.js';
import { Step } from './modules/movement/Step.js';
import { InfiniteFly } from './modules/movement/InfiniteFly.js';
import { KeepSprint } from './modules/movement/KeepSprint.js';
import { NoSlowdown } from './modules/movement/NoSlowdown.js';
import { Phase } from './modules/movement/Phase.js';
import { AntiFall } from './modules/movement/AntiFall.js';
import { InvWalk } from './modules/movement/InvWalk.js';
import { Jesus } from './modules/movement/Jesus.js';
import { Fly } from './modules/movement/Fly.js';
import { JumpFly } from './modules/movement/JumpFly.js';
import { NoFall } from './modules/movement/NoFall.js';
import { Scaffold } from './modules/movement/Scaffold.js';
import { Chams } from './modules/visual/Chams.js';
import { PlayerESP } from './modules/visual/PlayerESP.js';
import { TextGUI } from './modules/visual/TextGUI.js';
import { NametagsPlus } from './modules/visual/NametagsPlus.js';
import { ClickGUI } from './modules/visual/ClickGUI.js';
import { Keystrokes } from './modules/visual/Keystrokes.js';
import { FPSCounter } from './modules/visual/FPSCounter.js';
import { CPSCounter } from './modules/visual/CPSCounter.js';
import { TestMusicPlayer } from './modules/visual/TestMusicPlayer.js';
import { AutoRespawn } from './modules/misc/AutoRespawn.js';
import { AutoRejoin } from './modules/misc/AutoRejoin.js';
import { AutoQueue } from './modules/misc/AutoQueue.js';
import { AutoVote } from './modules/misc/AutoVote.js';
import { InvCleaner } from './modules/misc/InvCleaner.js';
import { ChestSteal } from './modules/misc/ChestSteal.js';
import { AntiBan } from './modules/misc/AntiBan.js';
import { ChatDisabler } from './modules/misc/ChatDisabler.js';
import { FilterBypass } from './modules/misc/FilterBypass.js';
import { AutoFunnyChat } from './modules/misc/AutoFunnyChat.js';
import { Timer } from './modules/misc/Timer.js';
import { Breaker } from './modules/misc/Breaker.js';
import { AutoArmor } from './modules/misc/AutoArmor.js';
import { AutoCraft } from './modules/misc/AutoCraft.js';
import { GhostJoin } from './modules/misc/GhostJoin.js';
import { StreamerMode } from './modules/misc/StreamerMode.js';
import { FastBreak } from './modules/misc/FastBreak.js';
import { AntiCheat } from './modules/misc/AntiCheat.js';
import { Tokeniser } from './modules/misc/Tokeniser.js';
import { TestModule } from './modules/misc/TestModule.js';


export class ModuleManager {
    constructor() {
        this.modules = [];
        this.setupKeybindListener();
    }

    setupKeybindListener() {
        // This listener will be active within the game's context.
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            for (const module of this.modules) {
                if (module.bind && module.bind.toLowerCase() === e.key.toLowerCase()) {
                    module.toggle();
                }
            }
        });
    }

    loadModules() {
        // The module classes are expected to be globally available here.
        this.register(new AutoClicker());
        this.register(new Killaura());
        this.register(new Velocity());
        this.register(new WTap());
        this.register(new Speed());
        this.register(new Step());
        this.register(new InfiniteFly());
        this.register(new KeepSprint());
        this.register(new NoSlowdown());
        this.register(new Phase());
        this.register(new AntiFall());
        this.register(new InvWalk());
        this.register(new Jesus());
        this.register(new Fly());
        this.register(new JumpFly());
        this.register(new NoFall());
        this.register(new Scaffold());
        this.register(new Chams());
        this.register(new PlayerESP());
        this.register(new TextGUI());
        this.register(new NametagsPlus());
        this.register(new ClickGUI());
        this.register(new Keystrokes());
        this.register(new FPSCounter());
        this.register(new CPSCounter());
        this.register(new TestMusicPlayer());
        this.register(new AutoRespawn());
        this.register(new AutoRejoin());
        this.register(new AutoQueue());
        this.register(new AutoVote());
        this.register(new InvCleaner());
        this.register(new ChestSteal());
        this.register(new AntiBan());
        this.register(new ChatDisabler());
        this.register(new FilterBypass());
        this.register(new AutoFunnyChat());
        this.register(new Timer());
        this.register(new Breaker());
        this.register(new AutoArmor());
        this.register(new AutoCraft());
        this.register(new GhostJoin());
        this.register(new StreamerMode());
        this.register(new FastBreak());
        this.register(new AntiCheat());
        this.register(new Tokeniser());
        this.register(new TestModule());

        window.getModule = (name) => this.getModule(name);
        // Load config after modules are registered
        if (typeof setupConfig === 'function') {
            setupConfig(this);
        }
    }

    register(module) {
        this.modules.push(module);
    }

    getModule(name) {
        return this.modules.find(m => m.name.toLowerCase() === name.toLowerCase());
    }

    getModulesByCategory(category) {
        return this.modules.filter(m => m.category.toLowerCase() === category.toLowerCase());
    }
}
