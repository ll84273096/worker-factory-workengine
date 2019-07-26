import * as EventEmitter from 'events';
import Event from '../event';

abstract class DispatchObject {

    private _event: EventEmitter;

    constructor() {
        this._event = new EventEmitter();
    }

    addListener(event: string, listener: (event: string, ...args: any[]) => void): void {
        this._event.addListener(event, listener);
    }

    once(event: string, listener: (event: string, ...args: any[]) => void): void {
        this._event.once(event, listener);
    }

    removeListener(event: string, listener: (event: string, ...args: any[]) => void): void {
        this._event.removeListener(event, listener);
    }

    removeAllListeners(event?: string): void {
        this._event.removeAllListeners(event);
    }

    emit(event: string, ...args: any[]): void {
        this._event.emit(event, ...args);
    }
}

export default DispatchObject;