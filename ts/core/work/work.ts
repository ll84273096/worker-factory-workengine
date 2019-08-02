/* eslint-disable no-unused-vars */
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
                    actionDeliveryData.pathIndex = index;
                    await currentAction.start(actionDeliveryData);
                    index++;
                    currentAction = this._actions[index];
                } catch (error) {
                    currentAction = null;
                    reject(error);
                }
            }
            resolve(actionDeliveryData.returnData);
        })());
    }
}

export default Work;