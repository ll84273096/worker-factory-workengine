/* eslint-disable no-unused-vars */
import Action, { ActionDeliveryData } from '../action';

class Work {
    private _actions: Action[] = [];

    addAction(action: Action): Work {
        this._actions.push(action);
        return this;
    }

    async start(data: any): Promise<any> {
        const actionDeliveryData: ActionDeliveryData = new ActionDeliveryData();
        actionDeliveryData.startData = data;
        return new Promise((resolve, reject) => (async () => {
            let index = 0;
            let currentAction: any = this._actions[index];
            while (currentAction) {
                try {
                    actionDeliveryData.addPath(currentAction);
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