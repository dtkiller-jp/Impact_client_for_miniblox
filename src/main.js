// main.js - Combined Patcher & Client Loader

// --- 1. Imports ---
import { ModuleManager } from './module/moduleManager.js';

// --- 2. Client Definition ---
class ImpactClient {
    constructor() {
        this.moduleManager = null;
    }

    start() {
        console.log("[Impact] Starting client...");
        this.moduleManager = new ModuleManager();
        window.moduleManager = this.moduleManager; // Expose for GUI
        
        this.moduleManager.loadModules();
        this.loadConfig();
        this.setupEventListeners();

        setInterval(() => this.saveConfig(), 10000);
        console.log("[Impact] Client started successfully!");
    }

    setupEventListeners() {
        window.impactEvent.addEventListener('tick', () => {
            if (!this.moduleManager) return;
            for (const module of this.moduleManager.modules) {
                if (module.enabled && typeof module.onTick === 'function') {
                    try {
                        module.onTick();
                    } catch (e) {
                        console.error(`[${module.name}] onTick error:`, e);
                    }
                }
            }
        });

        window.impactEvent.addEventListener('render', () => {
            if (!this.moduleManager) return;
            for (const module of this.moduleManager.modules) {
                if (module.enabled && typeof module.onRender === 'function') {
                    try {
                        module.onRender();
                    } catch (e) {
                        console.error(`[${module.name}] onRender error:`, e);
                    }
                }
            }
        });
    }

    loadConfig() {
        try {
            const savedConfig = JSON.parse(GM_getValue("impactModuledConfig", "{}"));
            if (!savedConfig.modules) return;

            for (const module of this.moduleManager.modules) {
                const moduleConfig = savedConfig.modules[module.name];
                if (moduleConfig) {
                    if (moduleConfig.bind) module.bind = moduleConfig.bind;
                    if (moduleConfig.options) {
                        for (const optName in module.options) {
                            if (moduleConfig.options[optName] !== undefined) {
                                module.options[optName].value = moduleConfig.options[optName];
                            }
                        }
                    }
                    if (moduleConfig.enabled && !module.enabled) {
                        module.toggle();
                    }
                }
            }
        } catch (e) {
            console.error("[Impact] Error loading config", e);
        }
    }

    saveConfig() {
        if (!this.moduleManager) return;
        const configToSave = { modules: {} };
        for (const module of this.moduleManager.modules) {
            const optionsToSave = {};
            for (const optName in module.options) {
                optionsToSave[optName] = module.options[optName].value;
            }
            configToSave.modules[module.name] = {
                enabled: module.enabled,
                bind: module.bind,
                options: optionsToSave
            };
        }
        GM_setValue("impactModuledConfig", JSON.stringify(configToSave));
    }
}

// --- 3. Global Client Starter ---
window.startImpactClient = () => {
    const client = new ImpactClient();
    client.start();
};

// --- 4. Patcher Logic ---
(function() {
    'use strict';
    let replacements = {};
    let dumpedVarNames = {};
    const storeName = "a" + crypto.randomUUID().replaceAll("-", "").substring(16);
    const vapeName = crypto.randomUUID().replaceAll("-", "").substring(16);
    const VERSION = "1.6";

    function addModification(replacement, code, replace) {
        replacements[replacement] = [code, replace];
    }

    function addDump(replacement, code) {
        dumpedVarNames[replacement] = code;
    }

    function modifyCode(text) {
        let modifiedText = text;
        for(const [name, regex] of Object.entries(dumpedVarNames)) {
            const matched = modifiedText.match(regex);
            if (matched) {
                for(const [replacement, code] of Object.entries(replacements)){
                    delete replacements[replacement];
                    replacements[replacement.replaceAll(name, matched[1])] = [code[0].replaceAll(name, matched[1]), code[1]];
                }
            }
        }
        for(const [replacement, code] of Object.entries(replacements)) {
            modifiedText = modifiedText.replace(replacement, code[1] ? code[0] : replacement + code[0]);
        }
        const newScript = document.createElement("script");
        newScript.type = "module";
        newScript.crossOrigin = "";
        newScript.textContent = modifiedText;
        document.head.appendChild(newScript);
        newScript.textContent = "";
        newScript.remove();
    }

	// DUMPING
	addDump('moveStrafeDump', 'this\\.([a-zA-Z]+)=\\([a-zA-Z]+\\.right');
	addDump('moveForwardDump', 'this\\.([a-zA-Z]+)=\\([a-zA-Z]+\\.(up|down)');
	addDump('keyPressedDump', 'function ([a-zA-Z]*)\\([a-zA-Z]*\\)\\{return keyPressed\\([a-zA-Z]*\\)');
	addDump('entitiesDump', 'this\\.([a-zA-Z]*)\\.values\\(\\\)\)[a-zA-Z]* instanceof EntityTNTPrimed');
	addDump('isInvisibleDump', '[a-zA-Z]*\\.([a-zA-Z]*)\\((\\)&amp;&amp;\\([a-zA-Z]*=new ([a-zA-Z]*)\\(new');
	addDump('attackDump', 'hitVec.z\\}\\}\\)\\\)\),player\\.([a-zA-Z]*)');
	addDump('lastReportedYawDump', 'this\\.([a-zA-Z]*)=this\\.yaw,this\\.last');
	addDump('windowClickDump', '([a-zA-Z]*)\\(this\\.inventorySlots\\.windowId');
	addDump('playerControllerDump', 'const ([a-zA-Z]*)=new PlayerController,');
	addDump('damageReduceAmountDump', 'ItemArmor&amp;&amp;\\([a-zA-Z]*\\+\\=[a-zA-Z]*\\.([a-zA-Z]*))');
	addDump('boxGeometryDump', 'w=new Mesh\\(new ([a-zA-Z]*)\\(1');
	addDump('syncItemDump', 'playerControllerMP\\.([a-zA-Z]*)\\((\\)ClientSocket\\.sendPacket');

	// PRE
	addModification('document.addEventListener("DOMContentLoaded",startGame,!1);', `
		setTimeout(function() {
			var DOMContentLoaded_event = document.createEvent("Event");
			DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
			document.dispatchEvent(DOMContentLoaded_event);
		}, 0);
	`);
	addModification('y:this.getEntityBoundingBox().min.y,', 'y:sendY != false ? sendY : this.getEntityBoundingBox().min.y,', true);
	addModification('Potions.jump.getId(),"5");', `
        window.impactEvent = new EventTarget();
		let blocking = false; let sendYaw = false; let sendY = false; let breakStart = Date.now(); let noMove = Date.now();
		let lastJoined, velocityhori, velocityvert, chatdisablermsg, textguifont, textguisize, textguishadow, attackedEntity, stepheight;
		let attackTime = Date.now(); let chatDelay = Date.now();
	`);

	addModification('VERSION$1," | ",', `"${vapeName} v${VERSION}"," | ",`);
    addModification('if(!x.canConnect){', `x.errorMessage = x.errorMessage === "Could not join server. You are connected to a VPN or proxy. Please disconnect from it and refresh the page." ? "You\'re maybe IP banned or you\'re using a vpn " : x.errorMessage;`);
	addModification('I(this,"glintTexture");', `I(this, "vapeTexture");I(this, "v4Texture");`);
	const corsMoment = url => new URL(`https://corsproxy.io/?url=${url}`).href;
	addModification('skinManager.loadTextures(),', ',this.loadVape(),');
	addModification('async loadSpritesheet(){', `
		async loadVape() {
			this.vapeTexture = await this.loader.loadAsync("${corsMoment("https://raw.githubusercontent.com/progmem-cc/miniblox.impact.client.updatedv2/refs/heads/main/logo.png")}");
			this.v4Texture = await this.loader.loadAsync("${corsMoment("https://raw.githubusercontent.com/progmem-cc/miniblox.impact.client.updatedv2/refs/heads/main/logov4.png")}");
		}
		async loadSpritesheet(){
	`, true);
	addModification('player.setPositionAndRotation(h.x,h.y,h.z,h.yaw,h.pitch),', `
		noMove = Date.now() + 500;
		player.setPositionAndRotation(h.x,h.y,h.z,h.yaw,h.pitch),
	`, true);
	addModification('COLOR_TOOLTIP_BG,BORDER_SIZE)}', `
		function drawImage(ctx, img, posX, posY, sizeX, sizeY, color) {
			if (color) {
				ctx.fillStyle = color;
				ctx.fillRect(posX, posY, sizeX, sizeY);
				ctx.globalCompositeOperation = "destination-in";
			}
			ctx.drawImage(img, posX, posY, sizeX, sizeY);
			if (color) ctx.globalCompositeOperation = "source-over";
		}
	`);
	addModification('(this.drawSelectedItemStack(),this.drawHintBox())', `
		if (ctx$5 && window.moduleManager?.getModule("TextGUI")?.enabled) {
			const colorOffset = (Date.now() / 4000);
			const posX = 15; const posY = 17;
			ctx$5.imageSmoothingEnabled = true; ctx$5.imageSmoothingQuality = "high";
			drawImage(ctx$5, textureManager.vapeTexture.image, posX, posY, 80, 21, \`HSL(${(colorOffset % 1) * 360}, 100%, 50%)\`);
			drawImage(ctx$5, textureManager.v4Texture.image, posX + 81, posY + 1, 33, 18);
		}
	`);
	addModification('+=h*y+u*x}', `if (this == player) { window.impactEvent.dispatchEvent(new CustomEvent('tick')); }`);
	addModification('this.game.unleash.isEnabled("disable-ads")', 'true', true);
	addModification('h.render()})', '; window.impactEvent.dispatchEvent(new CustomEvent(\'render\'));');
	addModification('updateNameTag(){let h="white",p=1;', 'this.entity.team = this.entity.profile.cosmetics.color;');
	addModification('connect(u,h=!1,p=!1){', 'lastJoined = u;');
	addModification('SliderOption("Render Distance ",2,8,3)', 'SliderOption("Render Distance ",2,64,3)', true);
	addModification('ClientSocket.on("CPacketDisconnect",h=>{', `if (window.moduleManager?.getModule("AutoRejoin")?.enabled) { setTimeout(function() { j.connect(lastJoined); }, 400); }`);
	addModification('ClientSocket.on("CPacketMessage",h=>{', `
		if (player && h.text && !h.text.startsWith(player.name) && window.moduleManager?.getModule("ChatDisabler")?.enabled && chatDelay < Date.now()) {
			chatDelay = Date.now() + 1000;
			setTimeout(function() { ClientSocket.sendPacket(new SPacketMessage({text: Math.random() + ("\\n" + chatdisablermsg[1]).repeat(20)})); }, 50);
		}
		if (h.text && h.text.startsWith("\\\\bold\\\\How to play:")) { breakStart = Date.now() + 25000; }
		if (h.text && h.text.indexOf("Poll started") != -1 && h.id == undefined && window.moduleManager?.getModule("AutoVote")?.enabled) { ClientSocket.sendPacket(new SPacketMessage({text: "/vote 2"})); }
		if (h.text && h.text.indexOf("won the game") != -1 && h.id == undefined && window.moduleManager?.getModule("AutoQueue")?.enabled) { game.requestQueue(); }
	`);
	addModification('ClientSocket.on("CPacketUpdateStatus",h=>{', `
		if (h.rank && h.rank != "" && RANK.LEVEL[$.rank].permLevel > 2) {
			game.chat.addChat({ text: "STAFF DETECTED : " + h.rank + "\\n".repeat(10), color: "red" });
		}
	`);
	addModification('bindKeysWithDefaults("b",m=>{', 'bindKeysWithDefaults("semicolon",m=>{', true);
	addModification('bindKeysWithDefaults("i",m=>{', 'bindKeysWithDefaults("apostrophe",m=>{', true);
	addModification('Object.assign(keyMap,u)', '; keyMap["Semicolon"] = "semicolon"; keyMap["Apostrophe"] = "apostrophe";');
	addModification('player.getActiveItemStack().item instanceof', 'null == ', true);
	addModification('const m=player.openContainer', `const m = player.openContainer ?? { getLowerChestInventory: () => {getSizeInventory: () => 0} }`, true);
    addModification('document.addEventListener("contextmenu",m=>m.preventDefault());', `
        if (typeof window.startImpactClient === 'function') {
            console.log('[Impact Patcher] Starting client...');
            setTimeout(window.startImpactClient, 0);
        } else {
            console.error('[Impact Patcher] Client start function not found!');
        }
    `);

    async function execute(src, oldScript) {
        Object.defineProperty(unsafeWindow.globalThis, storeName, {value: {}, enumerable: false});
        if (oldScript) oldScript.type = 'javascript/blocked';
        const text = await fetch(src).then(e => e.text());
        modifyCode(text);
        if (oldScript) oldScript.type = 'module';
    }

    new MutationObserver(async (mutations, observer) => {
        let oldScript = mutations
            .flatMap(e => [...e.addedNodes])
            .filter(e => e.tagName == 'SCRIPT')
            .find(e => e.src.includes("https://miniblox.io/assets/index"));
        if (oldScript) {
            observer.disconnect();
            execute(oldScript.src, oldScript);
        }
    }).observe(document, {
        childList: true,
        subtree: true,
    });
})();