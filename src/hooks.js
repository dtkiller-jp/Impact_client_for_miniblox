

// 1. Import all code files as raw strings.
import injectionPayload from 'raw-loader!./injection_payload.js';
import module_js from 'raw-loader!./module/module.js';
import config_manager_js from 'raw-loader!./config/manager.js';
import ModuleSettings_js from 'raw-loader!./module/modules/visual/components/ModuleSettings.js';
import Panel_js from 'raw-loader!./module/modules/visual/components/Panel.js';
import AutoClicker_js from 'raw-loader!./module/modules/combat/AutoClicker.js';
import Killaura_js from 'raw-loader!./module/modules/combat/Killaura.js';
import Velocity_js from 'raw-loader!./module/modules/combat/Velocity.js';
import WTap_js from 'raw-loader!./module/modules/combat/WTap.js';
import AntiBan_js from 'raw-loader!./module/modules/misc/AntiBan.js';
import AntiCheat_js from 'raw-loader!./module/modules/misc/AntiCheat.js';
import AutoArmor_js from 'raw-loader!./module/modules/misc/AutoArmor.js';
import AutoCraft_js from 'raw-loader!./module/modules/misc/AutoCraft.js';
import AutoFunnyChat_js from 'raw-loader!./module/modules/misc/AutoFunnyChat.js';
import AutoQueue_js from 'raw-loader!./module/modules/misc/AutoQueue.js';
import AutoRejoin_js from 'raw-loader!./module/modules/misc/AutoRejoin.js';
import AutoRespawn_js from 'raw-loader!./module/modules/misc/AutoRespawn.js';
import AutoVote_js from 'raw-loader!./module/modules/misc/AutoVote.js';
import Breaker_js from 'raw-loader!./module/modules/misc/Breaker.js';
import ChatDisabler_js from 'raw-loader!./module/modules/misc/ChatDisabler.js';
import ChestSteal_js from 'raw-loader!./module/modules/misc/ChestSteal.js';
import FastBreak_js from 'raw-loader!./module/modules/misc/FastBreak.js';
import FilterBypass_js from 'raw-loader!./module/modules/misc/FilterBypass.js';
import GhostJoin_js from 'raw-loader!./module/modules/misc/GhostJoin.js';
import InvCleaner_js from 'raw-loader!./module/modules/misc/InvCleaner.js';
import StreamerMode_js from 'raw-loader!./module/modules/misc/StreamerMode.js';
import TestModule_js from 'raw-loader!./module/modules/misc/TestModule.js';
import Timer_js from 'raw-loader!./module/modules/misc/Timer.js';
import Tokeniser_js from 'raw-loader!./module/modules/misc/Tokeniser.js';
import AntiFall_js from 'raw-loader!./module/modules/movement/AntiFall.js';
import Fly_js from 'raw-loader!./module/modules/movement/Fly.js';
import InfiniteFly_js from 'raw-loader!./module/modules/movement/InfiniteFly.js';
import InvWalk_js from 'raw-loader!./module/modules/movement/InvWalk.js';
import Jesus_js from 'raw-loader!./module/modules/movement/Jesus.js';
import JumpFly_js from 'raw-loader!./module/modules/movement/JumpFly.js';
import KeepSprint_js from 'raw-loader!./module/modules/movement/KeepSprint.js';
import NoFall_js from 'raw-loader!./module/modules/movement/NoFall.js';
import NoSlowdown_js from 'raw-loader!./module/modules/movement/NoSlowdown.js';
import Phase_js from 'raw-loader!./module/modules/movement/Phase.js';
import Scaffold_js from 'raw-loader!./module/modules/movement/Scaffold.js';
import Speed_js from 'raw-loader!./module/modules/movement/Speed.js';
import Step_js from 'raw-loader!./module/modules/movement/Step.js';
import Chams_js from 'raw-loader!./module/modules/visual/Chams.js';
import ClickGUI_js from 'raw-loader!./module/modules/visual/ClickGUI.js';
import CPSCounter_js from 'raw-loader!./module/modules/visual/CPSCounter.js';
import FPSCounter_js from 'raw-loader!./module/modules/visual/FPSCounter.js';
import Keystrokes_js from 'raw-loader!./module/modules/visual/Keystrokes.js';
import NametagsPlus_js from 'raw-loader!./module/modules/visual/NametagsPlus.js';
import PlayerESP_js from 'raw-loader!./module/modules/visual/PlayerESP.js';
import TestMusicPlayer_js from 'raw-loader!./module/modules/visual/TestMusicPlayer.js';
import TextGUI_js from 'raw-loader!./module/modules/visual/TextGUI.js';
import moduleManager_js from 'raw-loader!./module/moduleManager.js';

// 2. The core injection logic from the original client.
(function() {
    'use strict';

    let replacements = {};
    let dumpedVarNames = {};
    //const storeName = "a" + crypto.randomUUID().replaceAll("-", "").substring(16);
    //const vapeName = crypto.randomUUID().replaceAll("-", "").substring(16);
    //const VERSION = "1.5-moduled";

    function addModification(replacement, code, replace) {
        replacements[replacement] = [code, replace];
    }

    //function addDump(replacement, code) {
    //    dumpedVarNames[replacement] = code;
    //}

    function modifyCode(text) {
        // At runtime, evaluate the payload to populate replacements and dumpedVarNames.
        try {
            (0, eval)(injectionPayload);
        } catch (e) {
            console.error("[Impact] Error evaluating injection payload:", e);
            return text; // Return original text on failure
        }

        // Combine all modules into a single string.
        const allModulesCode = [
            config_manager_js,
            module_js, 
            ModuleSettings_js, 
            Panel_js, 
            AutoClicker_js, Killaura_js, Velocity_js, WTap_js,
            AntiBan_js, AntiCheat_js, AutoArmor_js, AutoCraft_js, AutoFunnyChat_js, AutoQueue_js, AutoRejoin_js, AutoRespawn_js, AutoVote_js, Breaker_js, ChatDisabler_js, ChestSteal_js, FastBreak_js, FilterBypass_js, GhostJoin_js, InvCleaner_js, StreamerMode_js, TestModule_js, Timer_js, Tokeniser_js,
            AntiFall_js, Fly_js, InfiniteFly_js, InvWalk_js, Jesus_js, JumpFly_js, KeepSprint_js, NoFall_js, NoSlowdown_js, Phase_js, Scaffold_js, Speed_js, Step_js,
            Chams_js, ClickGUI_js, CPSCounter_js, FPSCounter_js, Keystrokes_js, NametagsPlus_js, PlayerESP_js, TestMusicPlayer_js, TextGUI_js,
            moduleManager_js
        ].map(code => code.replace(/^(export|import).*/gm, '')).join('\n\n');

        // Create the final bundle to be injected.
        const fullInjectedCode = `(function() {\n${allModulesCode}\nconst moduleManager = new ModuleManager();\nmoduleManager.loadModules();\n})();`;

        // Add the main module bundle as a modification.
        addModification('document.addEventListener("contextmenu",m=>m.preventDefault());', fullInjectedCode);

        // Run the original replacement logic.
        let modifiedText = text;
        for(const [name, regexStr] of Object.entries(dumpedVarNames)) {
            try {
                const regex = new RegExp(regexStr);
                const matched = modifiedText.match(regex);
                if (matched && matched[1]) {
                    for(const [replacement, code] of Object.entries(replacements)){
                        const newKey = replacement.replaceAll(name, matched[1]);
                        if (newKey !== replacement) {
                            delete replacements[replacement];
                            replacements[newKey] = [code[0].replaceAll(name, matched[1]), code[1]];
                        }
                    }
                }
            } catch (e) {
                console.error(`[Impact] Error processing dump ${name}:`, e);
            }
        }

        for(const [replacement, code] of Object.entries(replacements)) {
            modifiedText = modifiedText.replace(replacement, code[1] ? code[0] : replacement + code[0]);
        }

        return modifiedText;
    }

    // 3. The script interception and execution logic.
    async function execute(src, oldScript) {
        if (oldScript) {
            oldScript.type = 'javascript/blocked';
            oldScript.remove();
        }
        const originalCode = await fetch(src).then(e => e.text());
        const modifiedCode = modifyCode(originalCode);

        const newScript = document.createElement("script");
        newScript.type = "module";
        newScript.crossOrigin = "";
        newScript.textContent = modifiedCode;
        document.head.appendChild(newScript);
        console.log("[Impact] Injected modified game code.");
        newScript.remove();
    }

    new MutationObserver(async (mutations, observer) => {
        const gameScriptNode = mutations
            .flatMap(m => [...m.addedNodes])
            .filter(n => n.tagName === 'SCRIPT')
            .find(n => n.src && n.src.includes("/assets/index"));

        if (gameScriptNode) {
            console.log("[Impact] Game script found:", gameScriptNode.src);
            observer.disconnect();
            await execute(gameScriptNode.src, gameScriptNode);
        }
    }).observe(document, {
        childList: true,
        subtree: true,
    });

    console.log("[Impact] Hook initialized. Waiting for game script...");
})();
