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
        work.addAction(action).start({ x: 1 }).then((result) => {
            const { x } = result;
            expect(x).to.be.equal(1);
            done();
        });
    });

    it('Test the static method getWork in Work', function() {
        expect(Work.getWork()).to.be.instanceOf(Work);
    });

    it('Test the method addAction in Work', function(done) {
        const result: number[] = [];
        Work.getWork().addAction(async (data: ActionDeliveryData) => {
            result.push(data.startData);
        }).start(0).then(() => {
            expect(result).to.be.deep.equal([0]);
            done();
        });
    });

    it('Adding multiple actions to work', function(done) {
        // const data: ActionDeliveryData = new ActionDeliveryData();
        const action1: Action = new Action(async (data: ActionDeliveryData) => {
            data.setData('test.count', 0);
            // data.setData({ count: 0 });
        });
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            const count = data.getData('test.count');
            data.returnData = { count: count + 1 };
        });
        Work.getWork().addAction(action1).addAction(action2).start().then((result) => {
            const { count } = result;
            expect(count).to.be.equal(1);
            done();
        });
    });

    it('Test start data in delivery data', function(done) {
        const result: number[] = [];
        const action: Action = new Action(async (data: ActionDeliveryData) => {
            result.push(data.startData);
        });
        Work.getWork().addAction(action).start(0).then(() => {
            expect(result).to.be.deep.equal([0]);
            done();
        });
    });

    it('Test path in delivery data', function(done) {
        // const data: ActionDeliveryData = new ActionDeliveryData();
        const ids: string[] = [];
        const action1: Action = new Action(async (data: ActionDeliveryData) => {});
        ids.push(action1.id);
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            data.returnData = { path: data.path };
        });
        ids.push(action2.id);
        Work.getWork().addAction(action1).addAction(action2).start().then((result) => {
            const { path } = result;
            expect(path).to.deep.equal(ids);
            done();
        });
    });

    it('Test path index in delivery data', function(done) {
        const result: number[] = [];
        const action1: Action = new Action(async (data: ActionDeliveryData) => {
            result.push(data.pathIndex);
        });
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            result.push(data.pathIndex);
        });
        Work.getWork().addAction(action1).addAction(action2).start().then(() => {
            expect(result).to.be.deep.equal([0, 1]);
            done();
        });
    });

    it('Test prevData in delivery data', function(done) {
        const action1: Action = new Action(async (data: ActionDeliveryData) => {
            return 0;
        });
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            expect(data.prevData).to.be.equal(0);
            return 1;
        });
        const action3: Action = new Action(async (data: ActionDeliveryData) => {
            expect(data.prevData).to.be.equal(1);
            done();
        });
        Work.getWork().addAction(action1).addAction(action2).addAction(action3).start();
    });

    it('Test returnData in delivery data', function(done) {
        const action: Action = new Action(async (data: ActionDeliveryData) => {
            data.returnData = 1;
        });
        Work.getWork().addAction(action).start().then((result) => {
            expect(result).to.be.equal(1);
            done();
        });
    });

    it('Test seek by number in delivery data', function(done) {
        let key = false;
        const arr: number[] = [];
        const action1: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(0);
            data.seek = 2;
        });
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(1);
        });
        const action3: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(2);
            if (!key) {
                data.seek = 1;
                key = true;
            }
        });
        Work.getWork().addAction(action1).addAction(action2).addAction(action3).start().then((result) => {
            expect(arr).to.deep.equal([0, 2, 1, 2]);
            done();
        });
    });

    it('Test seek by anchor in delivery data', function(done) {
        let key = false;
        const arr: number[] = [];
        const action1: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(0);
            data.seek = 'anchor2';
        });
        const action2: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(1);
        }, {
            anchor: 'anchor1'
        });
        const action3: Action = new Action(async (data: ActionDeliveryData) => {
            arr.push(2);
            if (!key) {
                data.seek = 'anchor1';
                key = true;
            }
        }, {
            anchor: 'anchor2'
        });
        Work.getWork().addAction(action1).addAction(action2).addAction(action3).start().then((result) => {
            expect(arr).to.deep.equal([0, 2, 1, 2]);
            done();
        });
    });

});