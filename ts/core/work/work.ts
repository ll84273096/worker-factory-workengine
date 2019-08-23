import * as uuid from 'uuid/v4';
// eslint-disable-next-line no-unused-vars
import Action, { ActionDeliveryData, IRunner, IActionOptions } from '../action';

class Work {

    static getWork(): Work {
        return new Work();
    }

    private _id: string = uuid();
    private _actions: Action[] = [];
    private _actionPath: string[] = [];
    private _actionMapping: {[key: string]: any} = {};

    get id(): string {
        return this._id;
    }

    addAction(action: Action | IRunner, options?: IActionOptions): Work {
        let actionInstance;
        if (action instanceof Action) {
            actionInstance = action;
        } else {
            actionInstance = new Action(action, options);
        }
        this._actions.push(actionInstance);
        this._actionPath.push(actionInstance.id);
        this._actionMapping[actionInstance.id] = actionInstance;
        return this;
    }

    async start(data?: any): Promise<any> {
        const actionDeliveryData: ActionDeliveryData = new ActionDeliveryData();
        actionDeliveryData.startData = data;
        actionDeliveryData.path = this._actionPath;
        return new Promise((resolve, reject) => (async () => {
            let index = 0;
            let currentAction: any = this._actions[index];
            while (currentAction) {
                try {
                    // actionDeliveryData.addPath(currentAction);
                    // 注入actionDeliverData
                    actionDeliveryData.seek = null;
                    actionDeliveryData.pathIndex = index;
                    const pathIndexLockKey = actionDeliveryData.lock(ActionDeliveryData.DEFAULT_PROPS.PATH_INDEX);
                    const prevDataLockKey = actionDeliveryData.lock(ActionDeliveryData.DEFAULT_PROPS.PREV_DATA);
                    const prevData = await currentAction.start(actionDeliveryData);
                    actionDeliveryData.unlock(ActionDeliveryData.DEFAULT_PROPS.PATH_INDEX, pathIndexLockKey);
                    actionDeliveryData.unlock(ActionDeliveryData.DEFAULT_PROPS.PREV_DATA, prevDataLockKey);
                    actionDeliveryData.prevData = prevData;
                    const seekIndex = this._getIndexByAnchor(actionDeliveryData.seek);
                    if (seekIndex > -1) {
                        index = seekIndex;
                    } else {
                        index++;
                    }
                    currentAction = this._actions[index];
                } catch (error) {
                    currentAction = null;
                    reject(error);
                }
            }
            resolve(actionDeliveryData.returnData);
        })());
    }

    private _getIndexByAnchor(anchor: string | number): number {
        let index = -1;
        if (typeof anchor === 'string') {
            index = this._actions.findIndex((action: Action) => action.anchor === anchor);
        } else if (typeof anchor === 'number') {
            index = anchor < 0 ? -1 : anchor;
        }
        return index;
    }
}

export default Work;