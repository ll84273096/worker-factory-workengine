/* eslint-disable no-unused-vars */
import { getGUID } from '../../utils/index';
import Action, { ActionDeliveryData, IRunner, IActionOptions } from '../action';

class Work {

    static createAction(runner: IRunner, options?: IActionOptions): Action {
        return new Action(runner, options);
    }

    private _actions: Action[] = [];
    private _actionPath: string[] = [];
    private _actionMapping: {[key: string]: any} = {};

    addAction(action: Action): Work {
        this._actions.push(action);
        this._actionPath.push(action.id);
        this._actionMapping[action.id] = action;
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
                    const pathIndexLockKey = actionDeliveryData.lock(ActionDeliveryData.LOCK_KEY.PATH_INDEX);
                    const prevDataLockKey = actionDeliveryData.lock(ActionDeliveryData.LOCK_KEY.PREV_DATA);
                    const prevData = await currentAction.start(actionDeliveryData);
                    actionDeliveryData.unlock(ActionDeliveryData.LOCK_KEY.PATH_INDEX, pathIndexLockKey);
                    actionDeliveryData.unlock(ActionDeliveryData.LOCK_KEY.PREV_DATA, prevDataLockKey);
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