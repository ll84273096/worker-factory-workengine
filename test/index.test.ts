import index from '../ts/index';
import { expect } from 'chai';
describe('Test of TS entry', function() {
    it('say hello world', function() {
        expect(index.helloWorld).to.be.equal('hello world!');
    });
});