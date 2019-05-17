import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Node from '../../../ts/core/node';
import Line from '../../../ts/core/line';
import Next from '../../../ts/core/next';
// import Line from '../../../ts/core/node/line';

describe('Test node module', function() {

    it('Instance next', function() {
        const line: Line = new Line();
        const next: Next<any> = Next.perform(line);
        expect(next).to.be.an.instanceof(Next);
    });

    it('Test the method then in next ', function(done) {
        const line: Line = new Line();
        const next: Next<number> = Next.perform(line);
        next.run(1, 2, 3).then((value1: number) => {
            expect(value1).to.be.equal(1);
            done();
        });
    });
});