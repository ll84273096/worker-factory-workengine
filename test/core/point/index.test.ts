import { expect } from 'chai';
import Point from '../../../ts/core/point';

describe('Test node module', function() {
    it('Instance point', function() {
        const point: Point = new Point();
        expect(point.name).to.be.equal('_POINT_');
    });
});