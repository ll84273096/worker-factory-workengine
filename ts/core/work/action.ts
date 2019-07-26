export type IRunner = (data: ActionDeliveryData) => Promise<any>;

export interface IActionOptions {
    timeout: number;
    isIgnoreError: boolean;
}

const DEFAULT_OPTIONS: IActionOptions = {
    timeout: 10 * 3600,
    isIgnoreError: false
};

export class ActionDeliveryData {

    private _data: any;
    private _packages: { [key: string]: any };

    constructor(data = {}, packages: { [key: string]: any }) {
        this._data = { ...data };
        this._packages = { ...packages };
    }

    setPackages(packages: { [key: string]: any }) {
        this._packages = { ...this._packages, ...packages };
        return this;
    }

    getPackage(key: string): any {
        return this._packages[key];
    }

    getAllPackages(): { [key: string]: any } {
        return this._packages;
    }

    setData(data: { [key: string]: any }) {
        this._data = { ...this._data, ...data };
        return this;
    }

    getData(key: string): any {
        return this._data[key];
    }
}

class Action {

    private _options: IActionOptions;

    constructor(options: IActionOptions = DEFAULT_OPTIONS) {
        this._options = options;
    }
}

export default Action;