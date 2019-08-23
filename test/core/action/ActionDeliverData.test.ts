/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import ActionDeliverData from '../../../ts/core/action/ActionDeliverData';
// import Line from '../../../ts/core/node/line';

describe('Test ActionDeliverData module', function() {

    it('Instance ActionDeliverData', function() {
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        expect(actionDeliverData).to.be.instanceOf(ActionDeliverData);
    });

    it('Test the startData of ActionDeliverData', function() {
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.startData = 0;
        actionDeliverData.startData = 1;
        expect(actionDeliverData.startData).to.be.equal(0);
    });

    it('Test the returnData of ActionDeliverData', function() {
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.returnData = 0;
        actionDeliverData.returnData = 1;
        expect(actionDeliverData.returnData).to.be.equal(0);
    });

    it('Test the path of ActionDeliverData', function() {
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.path = ['0'];
        actionDeliverData.path = ['1'];
        expect(actionDeliverData.path).to.be.deep.equal(['0']);
    });

    it('Test the prevData of ActionDeliverData', function() {
        const result = [];
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.prevData = 0;
        result.push(actionDeliverData.prevData);
        const lockKey = actionDeliverData.lock(ActionDeliverData.DEFAULT_PROPS.PREV_DATA);
        actionDeliverData.prevData = 1;
        result.push(actionDeliverData.prevData);
        actionDeliverData.unlock(ActionDeliverData.DEFAULT_PROPS.PREV_DATA, lockKey);
        actionDeliverData.prevData = 2;
        result.push(actionDeliverData.prevData);
        expect(result).to.be.deep.equal([0, 0, 2]);
    });

    it('Test the pathIndex of ActionDeliverData', function() {
        const result = [];
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.pathIndex = 0;
        result.push(actionDeliverData.pathIndex);
        const lockKey = actionDeliverData.lock(ActionDeliverData.DEFAULT_PROPS.PATH_INDEX);
        actionDeliverData.pathIndex = 1;
        result.push(actionDeliverData.pathIndex);
        actionDeliverData.unlock(ActionDeliverData.DEFAULT_PROPS.PATH_INDEX, lockKey);
        actionDeliverData.pathIndex = 2;
        result.push(actionDeliverData.pathIndex);
        expect(result).to.be.deep.equal([0, 0, 2]);
    });

    it('Test the seek of ActionDeliverData', function() {
        const result = [];
        const actionDeliverData: ActionDeliverData = new ActionDeliverData();
        actionDeliverData.seek = 0;
        result.push(actionDeliverData.seek);
        const lockKey = actionDeliverData.lock(ActionDeliverData.DEFAULT_PROPS.SEEK);
        actionDeliverData.seek = 1;
        result.push(actionDeliverData.seek);
        actionDeliverData.unlock(ActionDeliverData.DEFAULT_PROPS.SEEK, lockKey);
        actionDeliverData.seek = 2;
        result.push(actionDeliverData.seek);
        expect(result).to.be.deep.equal([0, 0, 2]);
    });
});