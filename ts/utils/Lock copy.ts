import * as dotProp from 'dot-prop';
import { getGUID } from './common';

class Lock {

    private _map: {[key: string]: string} = {};
    private _arr: string[] = [];

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
        const pName = Object.keys(this._map).find((item: string) => (name.length >= item.length && name.indexOf(item) === 0 && (name[item.length] === '.' || typeof name[item.length] === 'undefined')));
        return pName ? !!this._map[pName] : false;
    }
}

export default Lock;