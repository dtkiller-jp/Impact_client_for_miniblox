// This ModuleManager will be executed in the injected scope.
// It assumes all module classes are already defined in the same scope.

class ModuleManager {
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
