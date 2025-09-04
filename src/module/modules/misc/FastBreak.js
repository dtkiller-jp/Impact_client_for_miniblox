import { Module } from '../../module.js';

export class FastBreak extends Module {
    constructor() {
        super('FastBreak', 'Misc');
    }

    onEnable() {
        // モジュールが有効になった瞬間に設定
        playerController.blockHitDelay = 0;
    }

    onTick() {
        // ゲーム内の他の要因で値が変更された場合に備え、常に0を維持
        if (this.enabled && playerController.blockHitDelay !== 0) {
            playerController.blockHitDelay = 0;
        }
    }

    onDisable() {
        // モジュールが無効になった瞬間にデフォルト値に戻す
        playerController.blockHitDelay = 5;
    }
}
