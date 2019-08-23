import * as uuid from 'uuid/v4';
import Store from '../store';

const DEFAULT_STORE_NAMESPACE: string = uuid();
const CUSTOM_STORE_NAMESPACE: string = uuid();

export const createDefaultPropsKey = (key: string) => `${DEFAULT_STORE_NAMESPACE}.${key}`;

class DeliveryData extends Store {

    set(key: string, value: any): DeliveryData {
        super.set(this._getNamespaceKey(key), value);
        return this;
    }

    get(key: string): any {
        return super.get(this._getNamespaceKey(key));
    }

    lock(key: string): string {
        return super.lock(this._getNamespaceKey(key));
    }

    unlock(key: string, lockKey: string) {
        return super.unlock(this._getNamespaceKey(key), lockKey);
    }

    isLock(key: string): boolean {
        return super.isLock(this._getNamespaceKey(key));
    }

    protected setDefaultData(key: string, value: any, isLock: boolean = false) {
        if (key) {
            this.set(key, value);
            isLock && this.lock(key);
        }
    }

    protected getDefaultData(key: string): any {
        if (key) {
            return this.get(key);
        }
    }

    private _getNamespaceKey(key: string): string {
        let namespaceKey = key;
        if (key.split('.')[0] !== DEFAULT_STORE_NAMESPACE) {
            namespaceKey = `${CUSTOM_STORE_NAMESPACE}.${key}`;
        }
        return namespaceKey;
    }
}

export default DeliveryData;