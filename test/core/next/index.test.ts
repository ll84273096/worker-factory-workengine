import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Node from '../../../ts/core/node';
import Line from '../../../ts/core/line';
import Point from '../../../ts/core/point';
import Next from '../../../ts/core/next';
// import Line from '../../../ts/core/node/line';

describe('Test node module', function() {

    it('Instance next', function() {
        const line: Line = new Line();
        const next: Next = Next.perform(line);
        expect(next).to.be.an.instanceof(Next);
    });

    it('Instance point', function(done) {
        const line: Line = new Line();
        const next: Next = Next.perform(line);
        next.run(1).then((result) => {
            expect(result).to.be.equal(1);
            done();
        });
    });
});