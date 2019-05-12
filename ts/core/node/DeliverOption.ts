import { EventEmitter } from 'events';

class DeliverOption {
    private _event: EventEmitter = new EventEmitter();

    addListener(type: string, listener: (...args: any[]) => void): void {
        this._event.addListener(type, listener);
    }

    removeListener(type: string, listener: () => {}): void {
        this._event.removeListener(type, listener);
    }

    removeAllListeners(type?: string): void {
        this._event.removeAllListeners(type);
    }
}

export default DeliverOption;