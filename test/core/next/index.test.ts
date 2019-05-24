import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Node from '../../../ts/core/node';
import Line from '../../../ts/core/line';
import Next from '../../../ts/core/next';
import Point from '../../../ts/core/point';
// import Line from '../../../ts/core/node/line';

describe('Test node module', function() {

    it('Instance next', function() {
        const line: Line = new Line();
        const next: Next<any[]> = Next.perform(line);
        expect(next).to.be.an.instanceof(Next);
    });

    it('Test the method then in next ', function(done) {
        const point1: Point = new Point((data: string) => Promise.resolve(`${data}->起床`));
        const point2: Point = new Point((data: string) => Promise.resolve(`${data}->吃早点`));
        const point3: Point = new Point((data: string) => Promise.resolve(`${data}->上班`));
        const line: Line = new Line();
        line.addNodes([point1, point2, point3]);
        const next: Next<number> = Next.perform(line);
        next.run('开始').then((value1: number) => {
            expect(value1).to.be.equal('开始->起床->吃早点->上班');
            done();
        });
    });
});