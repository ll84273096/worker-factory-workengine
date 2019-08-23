import { expect } from 'chai';
import { Lock } from '../../ts/utils';

describe('Test work module', function() {

    it('Instance Lock', function() {
        const lock: Lock = new Lock();
        expect(lock).to.be.an.instanceof(Lock);
    });

    it('Test lock a key', function() {
        const lock: Lock = new Lock();
        lock.lock('a');
        expect(lock.isLock('a')).to.be.equal(true);
    });

    it('Test unlock a key', function() {
        const lock: Lock = new Lock();
        const lockKey: string = lock.lock('a');
        lock.unlock('a', lockKey);
        expect(lock.isLock('a')).to.be.equal(false);
    });

    it('Test parent lock', function() {
        const lock: Lock = new Lock();
        lock.lock('a');
        expect([lock.isLock('a'), lock.isLock('a.b'), lock.isLock('a.b.c')]).to.be.deep.equal([true, true, true]);
    });

    it('Test parent unlock', function() {
        const lock: Lock = new Lock();
        lock.lock('a.b');
        const key = lock.lock('a');
        lock.unlock('a', key);
        expect([lock.isLock('a'), lock.isLock('a.b')]).to.be.deep.equal([false, false]);
    });

    // it('Test parent unlock')


    // it('Adding multiple actions to work', function(done) {
    //     // const data: ActionDeliveryData = new ActionDeliveryData();
    //     const action1: Action = new Action(async (data: ActionDeliveryData) => {
    //         data.setData('test.count', 0);
    //         // data.setData({ count: 0 });
    //     });
    //     const action2: Action = new Action(async (data: ActionDeliveryData) => {
    //         const count = data.getData('test.count');
    //         data.returnData = { count: count + 1 };
    //     });
    //     const work: Work = new Work();
    //     work.addAction(action1).addAction(action2).start().then((result) => {
    //         const { count } = result;
    //         expect(count).to.be.equal(1);
    //         done();
    //     });
    // });

    // it('Test path in delivery data', function(done) {
    //     // const data: ActionDeliveryData = new ActionDeliveryData();
    //     const ids: string[] = [];
    //     const action1: Action = new Action(async (data: ActionDeliveryData) => {});
    //     ids.push(action1.id);
    //     const action2: Action = new Action(async (data: ActionDeliveryData) => {
    //         data.returnData = { path: data.path };
    //     });
    //     ids.push(action2.id);
    //     const work: Work = new Work();
    //     work.addAction(action1).addAction(action2).start().then((result) => {
    //         const { path } = result;
    //         expect(path).to.deep.equal(ids);
    //         done();
    //     });
    // });

    // it('Test path index in delivery data', function(done) {
    //     const action1: Action = new Action(async (data: ActionDeliveryData) => {});
    //     const action2: Action = new Action(async (data: ActionDeliveryData) => {
    //         expect(data.pathIndex).to.be.equal(1);
    //         done();
    //     });
    //     new Work().addAction(action1).addAction(action2).start();
    // });

    // it('Test prev data in delivery data', function(done) {
    //     const action1: Action = new Action(async (data: ActionDeliveryData) => {
    //         return 0;
    //     });
    //     const action2: Action = new Action(async (data: ActionDeliveryData) => {
    //         expect(data.prevData).to.be.equal(0);
    //         data.prevData = 100;
    //         return 1;
    //     });
    //     const action3: Action = new Action(async (data: ActionDeliveryData)  => {
    //         expect(data.prevData).to.be.equal(1);
    //         done();
    //     });
    //     new Work().addAction(action1).addAction(action2).addAction(action3).start();
    // });

    // it('Test PrevData lock in delivery data', function(done) {
    //     const action: Action = new Action(async (data: ActionDeliveryData) => {
    //         expect(data.isLock(ActionDeliveryData.LOCK_KEY.PREV_DATA)).to.be.equal(true);
    //         done();
    //     });
    //     new Work().addAction(action).start();
    // });

    // it('Test seek by number in delivery data', function(done) {
    //     let key = false;
    //     const arr: number[] = [];
    //     const action1: Action = new Action(async (data: ActionDeliveryData) => {
    //         arr.push(0);
    //         data.seek = 2;
    //     });
    //     const action2: Action = new Action(async (data: ActionDeliveryData) => {
    //         arr.push(1);
    //     });
    //     const action3: Action = new Action(async (data: ActionDeliveryData) => {
    //         arr.push(2);
    //         if (key) {
    //             expect(arr).to.deep.equal([0, 2, 1, 2]);
    //             done();
    //         }
    //         if (!key) {
    //             data.seek = 1;
    //             key = true;
    //         }
    //     });
    //     new Work().addAction(action1).addAction(action2).addAction(action3).start();
    // });

});