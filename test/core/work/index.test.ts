/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Work from '../../../ts/core/work';
// eslint-disable-next-line no-unused-vars
import Action, { ActionDeliveryData } from '../../../ts/core/action';
// import Line from '../../../ts/core/node/line';

describe('Test work module', function() {

    it('Instance work', function(done) {
        // const data: ActionDeliveryData = new ActionDeliveryData();
        const action: Action = new Action(async (data: ActionDeliveryData) => {
            data.returnData = { ...data.startData };
        });
        const work: Work = new Work();
        work.addAction(action).start({ x: 0 }).then((result) => {
            const { x } = result;
            expect(x).to.be.equal(0);
            done();
        });
    });
});