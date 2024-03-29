import { EventEmitter } from 'events';
import { getGUID } from '../../utils';
// eslint-disable-next-line no-unused-vars
import Processor from '../Processor';


abstract class Node {

    protected DEFAULT_NAME = '_NODE_';
    private _id: string = getGUID();
    private _processor: Processor;
    private _event: EventEmitter;
    private _isDestroy: boolean;
    private _handler: (data: any) => Promise<any>;

    constructor(handler?: (data: any) => Promise<any>) {
        // this._options = options;
        this._handler = handler;
        this._event = new EventEmitter();
        this._isDestroy = false;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.DEFAULT_NAME;
    }

    get isDestroy(): boolean {
        return this._isDestroy;
    }

    run(data: any): Promise<any> {
        let promise: Promise<any>;
        if (this._handler === null || typeof this._handler === 'undefined') {
            promise = Promise.resolve(data);
        } else {
            promise = this._handler(data);
        }
        return promise;
    }

    destroy() {
        this._event.removeAllListeners();
        this._isDestroy = true;
        console.log('The instance of line has been destroyed');
    }

    addListener(type: string, listener: (...args: any[]) => void) {
        this._event.addListener(type, listener);
    }

    removeListener(type: string, listener: () => {}): void {
        this._event.removeListener(type, listener);
    }

    removeAllListeners(type?: string): void {
        this._event.removeAllListeners(type);
    }

    triggerEvent(type: string, event: Event) {
        this._event.emit(type, event);
    }

    protected getEvent(): EventEmitter {
        return this._event;
    }
}

export default Node;