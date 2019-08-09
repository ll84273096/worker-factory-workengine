import * as dotProp from 'dot-prop';
import { Lock } from '../../utils';

// export const LOCK_KEY = {
//     PREV_DATA: 'prev_data'
// };


class ActionDeliveryData {

    static readonly LOCK_KEY = {
        PATH: 'path',
        PATH_INDEX: 'path_index',
        START_DATA: 'start_data',
        PREV_DATA: 'prev_data'
    };

    private _data: { [key: string]: any };
    private _startData: { [key: string]: any };
    private _returnData: any;
    private _prevData: any;
    private _path: any[];
    private _pathIndex: number;
    private _nextAnchor: string | number;
    private _seek: string | number;
    private _lock: Lock;

    constructor(data: { [key: string]: any } = {}) {
        this._data = { ...data };
        this._lock = new Lock();
    }

    set startData(data: { [key: string]: any }) {
        const isLock = this.isLock(ActionDeliveryData.LOCK_KEY.START_DATA);
        if (!isLock) {
            this._startData = data;
            this.lock(ActionDeliveryData.LOCK_KEY.START_DATA);
        } else {
            console.warn('The property named StartData is locked and cannot be assigned');
        }
    }

    get startData(): { [key: string]: any } {
        return this._startData;
    }

    set returnData(data: any) {
        this._returnData = data;
    }

    get returnData(): any {
        return this._returnData;
    }

    get prevData(): any {
        return this._prevData;
    }

    set prevData(data: any) {
        if (!this.isLock(ActionDeliveryData.LOCK_KEY.PREV_DATA)) {
            this._prevData = data;
        } else {
            console.warn('PrevData property is locked and cannot be assigned');
        }
    }

    set path(path: string[]) {
        const isLock = this.isLock(ActionDeliveryData.LOCK_KEY.PATH);
        if (!isLock) {
            this._path = path;
            this.lock(ActionDeliveryData.LOCK_KEY.PATH);
        } else {
            console.warn('The property named path is locked and cannot be assigned');
        }
    }

    get path(): string[] {
        return this._path;
    }

    set pathIndex(index: number) {
        if (!this.isLock(ActionDeliveryData.LOCK_KEY.PATH_INDEX)) {
            this._pathIndex = index;
        } else {
            console.warn('pathIndex property is locked and cannot be assigned');
        }
    }

    get pathIndex(): number {
        return this._pathIndex;
    }

    set nextAnchor(anchor: string | number) {
        this._nextAnchor = anchor;
    }

    get nextAnchor(): string | number {
        return this._nextAnchor;
    }

    set seek(index: string | number) {
        this._seek = index;
    }

    get seek(): string | number {
        return this._seek;
    }

    lock(name: string): string {
        return this._lock.lock(name);
    }

    unlock(name: string, key: string) {
        return this._lock.unlock(name, key);
    }

    isLock(name: string): boolean {
        return this._lock.isLock(name);
    }

    setData(key: string, value: any) {
        dotProp.set(this._data, key, value);
        return this;
    }

    getData(key: string): any {
        return dotProp.get(this._data, key);
    }

    destroy() {
        this._data = null;
        this._startData = null;
        this._returnData = null;
        this._prevData = null;
        this._path = null;
        this._pathIndex = 0;
    }
}

export default ActionDeliveryData;