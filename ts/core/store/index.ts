import * as dotProp from 'dot-prop';
import Lock from './lock';

abstract class Store {

    private _data: { [key: string]: any } = {};
    private _lock: Lock = new Lock();

    set(key: string, value: any): Store {
        const isLock = this._lock.isLock(key);
        if (!isLock) {
            dotProp.set(this._data, key, value);
        } else {
            console.warn(`The property named ${key} is locked and cannot be assigned`);
        }
        return this;
    }

    get(key: string): any {
        return dotProp.get(this._data, key);
    }

    lock(key: string): string {
        return this._lock.lock(key);
    }

    unlock(key: string, lockKey: string) {
        return this._lock.unlock(key, lockKey);
    }

    isLock(key: string): boolean {
        return this._lock.isLock(key);
    }

    destroy() {
        this._data = null;
    }
}

export default Store;