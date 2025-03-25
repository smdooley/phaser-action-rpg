import Phaser from 'phaser';
import { Position } from '../../common/types';
import { PLAYER_ANIMATION_KEYS } from '../../common/assets';
import { InputComponent } from '../../components/input/input-component';

export type PlayerConfig = {
    scene: Phaser.Scene;
    position: Position;
    // x: number;
    // y: number;
    texture: string;
    frame?: number;
    controls: InputComponent;
};

export class Player extends Phaser.Physics.Arcade.Sprite {
    controls: InputComponent;

    constructor(config: PlayerConfig) {
        const { scene, position, texture, frame } = config;
        const { x, y } = position;

        super(scene, x, y, texture, frame || 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.controls = config.controls;

        this.play({
            key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1
        });

        config.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        config.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            config.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        });
    }

    update(): void {
        if(this.controls.isUpDown) {
            this.play({
                key: PLAYER_ANIMATION_KEYS.IDLE_UP, repeat: -1
            }, true); 
        }
        else if(this.controls.isDownDown) {
            this.play({
                key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1
            }, true); 
        }

        if(this.controls.isLeftDown) {
            this.setFlipX(true);
            this.play({
                key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1
            }, true); 
        }
        else if(this.controls.isRightDown) {
            this.setFlipX(false);
            this.play({
                key: PLAYER_ANIMATION_KEYS.IDLE_SIDE, repeat: -1
            }, true); 
        }
    }
}