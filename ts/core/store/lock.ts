import * as dotProp from 'dot-prop';
import * as uuid from 'uuid/v4';

class Lock {

    private _data: {[key: string]: string} = {};

    lock(name: string): string {
        let lockKey;
        if (name && !this.isLock(name) && !this.isParentLock(name)) {
            lockKey = uuid();
            dotProp.set(this._data, name, lockKey);
        }
        return lockKey;
    }

    unlock(name: string, key: string): Boolean {
        let isDeleted = false;
        if (this._isLokeKey(key) && key === dotProp.get(this._data, name)) {
            dotProp.delete(this._data, name);
            isDeleted = true;
        }
        return isDeleted;
    }

    isLock(name: string): boolean {
        let isLock = this._isLokeKey(dotProp.get(this._data, name));
        if (!isLock) {
            isLock = this.isParentLock(name);
        }
        return isLock;
    }

    isParentLock(name: string): boolean {
        let str: string;
        return name.split('.').findIndex((item: string) => {
            if (item) {
                str = str ? `${str}.${item}` : item;
            }
            return this._isLokeKey(dotProp.get(this._data, str));
        }) > -1;
    }

    private _isLokeKey(lockKey: any): boolean {
        return lockKey && typeof lockKey === 'string';
    }
}

export default Lock;