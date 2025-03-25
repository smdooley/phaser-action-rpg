import Phaser from "phaser";
import { InputComponent } from "./input-component"

export class KeyboardComponent extends InputComponent {

    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    actionKey: Phaser.Input.Keyboard.Key;
    attackKey: Phaser.Input.Keyboard.Key;
    // selectKey: Phaser.Input.Keyboard.Key;
    enterKey: Phaser.Input.Keyboard.Key;

    constructor(keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
        super();

        this.cursorKeys = keyboardPlugin.createCursorKeys();

        this.actionKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.attackKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.enterKey = keyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    get isUpDown(): boolean {
        return this.cursorKeys.up.isDown;
    }

    get isUpJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.cursorKeys.up);
    }

    get isDownDown(): boolean {
        return this.cursorKeys.down.isDown;
    }

    get isDownJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.cursorKeys.down);
    }

    get isLeftDown(): boolean {
        return this.cursorKeys.left.isDown;
    }

    get isRightDown(): boolean {
        return this.cursorKeys.right.isDown;
    }

    get isActionJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.actionKey);
    }

    get isAttackJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.attackKey);
    }

    get isSelectJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift);
    }
    
    get isEnterJustDown(): boolean {
        return Phaser.Input.Keyboard.JustDown(this.enterKey);
    }
}