/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Action, { ActionDeliveryData } from '../../../ts/core/action';
// import Line from '../../../ts/core/node/line';

describe('Test action module', function() {

    it('Instance action', function(done) {
        const data: ActionDeliveryData = new ActionDeliveryData();
        const action: Action = new Action(async () => {
            return 0;
        });
        action.start(data).then((result) => {
            expect(result).to.be.equal(0);
            done();
        });
    });

    it('Test the timeout of action ', (done) => {
        const data: ActionDeliveryData = new ActionDeliveryData();
        const action: Action = new Action(async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 200));
        }, {
            timeout: 100,
            isIgnoreError: false
        });
        action.start(data).catch((error: Error) => {
            done();
        });
    });

    it('Test the ignore error of action', (done) => {
        const data: ActionDeliveryData = new ActionDeliveryData();
        const action: Action = new Action(async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 200));
            return 0;
        }, {
            timeout: 100,
            isIgnoreError: true
        });
        action.start(data).then((result) => {
            done();
        });
    });

    it('Test the action delivery data', (done) => {
        const data: ActionDeliveryData = new ActionDeliveryData();
        data.startData = { x: 0 };
        new Action(async (data: ActionDeliveryData) => {
            const { x } = data.startData;
            expect(x).to.be.equal(0);
            done();
        }).start(data);
    });

    // it('Test the method then in next ', function(done) {
    //     const point1: Point = new Point((data: string) => Promise.resolve(`${data}->起床`));
    //     const point2: Point = new Point((data: string) => Promise.resolve(`${data}->吃早点`));
    //     const point3: Point = new Point((data: string) => Promise.resolve(`${data}->上班`));
    //     const line: Line = new Line();
    //     line.addNodes([point1, point2, point3]);
    //     const next: Next<number> = Next.perform(line);
    //     next.run('开始').then((value1: number) => {
    //         expect(value1).to.be.equal('开始->起床->吃早点->上班');
    //         done();
    //     });
    // });
});