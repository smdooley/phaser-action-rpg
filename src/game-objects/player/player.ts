import Phaser from 'phaser';
import { Direction, Position } from '../../common/types';
import { InputComponent } from '../../components/input/input-component';
import { ControlsComponent } from '../../components/game-object/controls-component';
import { StateMachine } from '../../components/state-machine/state-machine';
import { IdleState } from '../../components/state-machine/states/character/idle-state';
import { CHARACTER_STATES } from '../../components/state-machine/states/character/character-states';
import { MoveState } from '../../components/state-machine/states/character/move-state';
import { SpeedComponent } from '../../components/game-object/speed-component';
import { PLAYER_SPEED } from '../../common/config';
import { DirectionComponent } from '../../components/game-object/direction-component';

export type PlayerConfig = {
    scene: Phaser.Scene;
    position: Position;
    texture: string;
    frame?: number;
    controls: InputComponent;
};

export class Player extends Phaser.Physics.Arcade.Sprite {
    controlsComponent: ControlsComponent;
    stateMachine: StateMachine;
    speedComponent: SpeedComponent;
    directionComponent: DirectionComponent;

    constructor(config: PlayerConfig) {
        const { scene, position, texture, frame } = config;
        const { x, y } = position;

        super(scene, x, y, texture, frame || 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.controlsComponent = new ControlsComponent(this, config.controls);
        this.speedComponent = new SpeedComponent(this, PLAYER_SPEED);
        this.directionComponent = new DirectionComponent(this);

        this.stateMachine = new StateMachine('player');
        this.stateMachine.addState(new IdleState(this));
        this.stateMachine.addState(new MoveState(this));
        this.stateMachine.setState(CHARACTER_STATES.IDLE_STATE);

        config.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        config.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            config.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        });
    }

    get controls(): InputComponent {
        return this.controlsComponent.controls;
    }

    get speed(): number {
        return this.speedComponent.speed;
    }

    get direction(): Direction {
        return this.directionComponent.direction;
    }

    set direction(value: Direction) {
        this.directionComponent.direction = value;
    }

    update(): void {
        
        this.stateMachine.update();
    }
}