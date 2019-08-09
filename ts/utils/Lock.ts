import { getGUID } from './common';

class Lock {

    private _map: {[key: string]: string} = {};

    lock(name: string) {
        let lockKey = '';
        if (name && !this._map[name]) {
            lockKey = getGUID();
            this._map[name] = lockKey;
        }
        return lockKey;
    }

    unlock(name: string, key: string): Boolean {
        if (this._map[name] && key === this._map[name]) {
            this._map[name] = '';
        }
        return !!this._map[name];
    }

    isLock(name: string): boolean {
        return !!this._map[name];
    }
}

export default Lock;