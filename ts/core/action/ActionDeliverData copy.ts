import * as dotProp from 'dot-prop';
import { Lock } from '../../utils';

// export const LOCK_KEY = {
//     PREV_DATA: 'prev_data'
// };

interface IActionDeliveryStore {
    data: { [key: string]: any };
    startData: any;
}

const DEFAULT_PROPS = {
    PATH: 'path',
    PATH_INDEX: 'pathIndex',
    START_DATA: 'startData',
    PREV_DATA: 'prevData'
};

class ActionDeliveryData {

    static readonly LOCK_KEY = {
        PATH: 'path',
        PATH_INDEX: 'pathIndex',
        START_DATA: 'startData',
        PREV_DATA: 'prevData'
    };

    private _store: IActionDeliveryStore;

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
        // this._data = { ...data };
        this._store = {
            data: { ...data },
            startData: null,
        };
        // this._data = { customData: { ...data } };
        this._lock = new Lock();
    }

    set startData(data: any) {
        this._setDataOnce(DEFAULT_PROPS.START_DATA, data);
        // const isLock = this.isLock(ActionDeliveryData.LOCK_KEY.START_DATA);
        // if (!isLock) {
        //     this._startData = data;
        //     this.lock(ActionDeliveryData.LOCK_KEY.START_DATA);
        // } else {
        //     console.warn('The property named StartData is locked and cannot be assigned');
        // }
    }

    get startData(): any {
        return this._getData(DEFAULT_PROPS.START_DATA);
    }

    set returnData(data: any) {
        this._returnData = data;
    }

    get returnData(): any {
        return this._returnData;
    }

    get prevData(): any {
        return this._getData(DEFAULT_PROPS.PREV_DATA);
    }

    set prevData(data: any) {
        this._setDataByLock(ActionDeliveryData.LOCK_KEY.PREV_DATA, data);
    }

    set path(path: string[]) {
        this._setDataOnce(ActionDeliveryData.LOCK_KEY.PATH, path);
    }

    get path(): string[] {
        return this._getData(DEFAULT_PROPS.PATH);
    }

    set pathIndex(index: number) {
        this._setDataByLock(ActionDeliveryData.LOCK_KEY.PATH_INDEX, index);
    }

    get pathIndex(): number {
        return this._getData(DEFAULT_PROPS.PATH_INDEX);
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
        if (key) {
            this._setData(`data.${key}`, value);
        }
        return this;
    }

    getData(key: string): any {
        if (key) {
            return this._getData(`data.${key}`);
        }
    }

    destroy() {
        this._data = null;
        this._returnData = null;
        this._prevData = null;
        this._path = null;
        this._pathIndex = 0;
    }

    private _setDataOnce(key: string, value: any) {
        const isLock = this.isLock(key);
        if (!isLock) {
            this._setData(key, value);
            this.lock(key);
        } else {
            console.warn(`The property named ${key} is locked and cannot be assigned`);
        }
    }

    private _setDataByLock(key: string, value: any) {
        if (!this.isLock(key)) {
            this._setData(key, value);
        } else {
            console.warn(`${key} property is locked and cannot be assigned`);
        }
    }

    private _setData(key: string, value: any) {
        const isLock = this.isLock(key);
        if (!isLock) {
            dotProp.set(this._store, key, value);
        } else {
            console.warn(`The property named ${key} is locked and cannot be assigned`);
        }
        return this;
    }

    private _getData(key: string): any {
        return dotProp.get(this._store, key);
    }
}

export default ActionDeliveryData;