class ActionDeliveryData {

    private _data: { [key: string]: any };
    private _startData: { [key: string]: any };
    private _returnData: { [key: string]: any };
    private _path: any[] = [];

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

    addPath(path: any) {
        this._path.push(path);
    }

    getPath(): any[] {
        return this._path;
    }

    setData(data: { [key: string]: any }) {
        this._data = { ...this._data, ...data };
        return this;
    }

    getData(key: string): any {
        return this._data[key];
    }
}

export default ActionDeliveryData;