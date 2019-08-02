import * as dotProp from 'dot-prop';
class ActionDeliveryData {

    private _data: { [key: string]: any };
    private _startData: { [key: string]: any };
    private _returnData: { [key: string]: any };
    private _path: any[];
    private _pathIndex: number;

    constructor(data: { [key: string]: any } = {}) {
        this._data = { ...data };
    }

    set startData(data: { [key: string]: any }) {
        if (!this._startData) {
            this._startData = data;
        }
    }

    get startData(): { [key: string]: any } {
        return this._startData;
    }

    set returnData(data: { [key: string]: any }) {
        if (!this._returnData) {
            this._returnData = data;
        }
    }

    get returnData(): { [key: string]: any } {
        return this._returnData;
    }

    set path(path: string[]) {
        if (!this._path) {
            this._path = path;
        }
    }

    get path(): string[] {
        return this._path;
    }

    set pathIndex(index: number) {
        this._pathIndex = index;
    }

    get pathIndex(): number {
        return this._pathIndex;
    }

    // addPath(path: any) {
    //     this._path.push(path);
    // }

    // getPath(): any[] {
    //     return this._path;
    // }

    setData(key: string, value: any) {
        dotProp.set(this._data, key, value);
        return this;
    }

    getData(key: string): any {
        return dotProp.get(this._data, key);
    }
}

export default ActionDeliveryData;