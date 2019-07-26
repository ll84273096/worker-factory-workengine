class PassData {
    private _constantMap: {[key: string]: any} = {};
    private _valueMap: {[key: string]: any} = {};
    private _index: number = 0;
    private _id: string = getGUID();

    get id(): string {
        return this._id;
    }

    get index(): number {
        return this._index;
    }

    set index(index: number) {
        this._index = index;
    }

    setConstant(key: string, value: any): PassData {
        if (!this._constantMap.hasOwnProperty(key)) {
            this._constantMap[key] = value;
        }
        return this;
    }

    getConstant(key: string): any {
        return this._constantMap[key];
    }

    setValue(key: string, value: any): PassData {
        this._valueMap[key] = value;
        return this;
    }

    getValue(key: string): any {
        return this._valueMap[key];
    }
}

export default PassData;