import { Player } from "../../../../game-objects/player/player";
import { State, StateMachine } from "../../state-machine";

export abstract class BaseCharacterState implements State {
    protected _gameObject: Player;
    protected _stateMachine!: StateMachine;

    #name: string;

    constructor(name: string, gameObject: Player) {
        this.#name = name;
        this._gameObject = gameObject;
    }

    get name(): string {
        return this.#name;
    }

    set stateMachine(stateMachine: StateMachine) {
        this._stateMachine = stateMachine;
    }
}