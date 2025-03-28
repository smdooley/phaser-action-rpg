import Phaser, { Game } from 'phaser';
import { GameObject } from '../../common/types';

export class BaseGameObjectComponent {
    // protected as it is meant to be used by derived classes
    protected scene: Phaser.Scene;
    protected gameObject : GameObject;

    constructor(gameObject: GameObject) {
        this.scene = gameObject.scene;
        this.gameObject = gameObject;

        this.assignComponentToObject(gameObject);
    }

    // Get the component from the GameObject
    static getComponent<T>(gameObject: GameObject): T {
        return gameObject[`_${this.name}`] as T;
    }

    // Remove the component
    static removeComponent(gameObject: GameObject): void {
        delete gameObject[`_${this.name}`];
    }

    // Store reference to this component in the GameObject
    protected assignComponentToObject(object: GameObject): void {
        object[`_${this.constructor.name}`] = this;
    }
}