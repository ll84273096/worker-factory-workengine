import Node from '../../../ts/core/node';
import { NodeEvent } from '../../../ts/core/event';
import { expect } from 'chai';
describe('Test node module', function() {
    it('Instance node', function() {
        const node: Node = new Node({ name: 'test_node' });
        expect(node.getName()).to.be.equal('test_node');
    });
    it('add node', function(done) {
        const node1: Node = new Node({ name: 'test_node' });
        const node2: Node = new Node({ name: 'test_node' });
        node1.addListener(NodeEvent.ADD_NEXT_NODE, (...args: any[]) => {
            expect(args[0]).to.be.equal('add_node');
            done();
        });
        node1.addNextNode(node2);
    });
});