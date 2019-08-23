import { DeliveryData, createDefaultPropsKey } from '../deliverdata';

class ActionDeliveryData extends DeliveryData {

    static readonly DEFAULT_PROPS = {
        PATH: createDefaultPropsKey('path'),
        PATH_INDEX: createDefaultPropsKey('pathIndex'),
        START_DATA: createDefaultPropsKey('startData'),
        PREV_DATA: createDefaultPropsKey('prevData'),
        RETURN_DATA: createDefaultPropsKey('returnData'),
        SEEK: createDefaultPropsKey('seek')
    };

    private _seek: string | number;

    constructor(data: { [key: string]: any } = {}) {
        super();
    }

    set startData(data: any) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.START_DATA, data, true);
        // this._setDataOnce(DEFAULT_PROPS.START_DATA, data);
    }

    get startData(): any {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.START_DATA);
    }

    set returnData(data: any) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.RETURN_DATA, data, true);
    }

    get returnData(): any {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.RETURN_DATA);
    }

    set prevData(data: any) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.PREV_DATA, data);
        // this.set(ActionDeliveryData.DEFAULT_PROPS.PREV_DATA, data);
    }

    get prevData(): any {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.PREV_DATA);
        // return this._getData(DEFAULT_PROPS.PREV_DATA);
    }

    set path(path: string[]) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.PATH, path, true);
    }

    get path(): string[] {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.PATH);
    }

    set pathIndex(index: number) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.PATH_INDEX, index);
    }

    get pathIndex(): number {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.PATH_INDEX);
    }

    set seek(index: string | number) {
        this.setDefaultData(ActionDeliveryData.DEFAULT_PROPS.SEEK, index);
    }

    get seek(): string | number {
        return this.getDefaultData(ActionDeliveryData.DEFAULT_PROPS.SEEK);
    }

    setData(key: string, value: any) {
        this.set(key, value);
        return this;
    }

    getData(key: string): any {
        return this.get(key);
    }
}

export default ActionDeliveryData;