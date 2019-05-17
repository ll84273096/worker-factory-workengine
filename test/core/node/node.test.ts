import Node from '../../../ts/core/node_old/node';
import { NodeEvent } from '../../../ts/core/event';
import { expect } from 'chai';
import Line from '../../../ts/core/node_old/line';
describe('Test node module', function() {
    it('Instance node', function() {
        const node: Node = new Node({ name: 'test_node' });
        expect(node.name).to.be.equal('_NODE_');
    });
    it('Test add the first node', function(done) {
        const node1: Node = new Node();
        const node2: Node = new Node();
        node1.addNode(node2);
        expect(node2.rootNode).to.be.equal(node1);
        expect(node2.line).to.be.equal(node1.line);
        expect(node1.line.length).to.be.equal(2);
        done();
        // node1.addListener(NodeEvent.ADD_NEXT_NODE, (...args: any[]) => {
        //     expect(args[0]).to.be.equal('add_node');
        //     done();
        // });
        // node1.addNextNode(node2);
    });
    it('Test add multiple nodes', function(done) {
        const node1: Node = new Node();
        const node2: Node = new Node();
        const node3: Node = new Node();
        node1.addNodes([node2, node3]);
        expect(node2.rootNode).to.be.equal(node1);
        expect(node3.rootNode).to.be.equal(node1);
        expect(node3.line).to.be.equal(node1.line);
        expect(node2.line).to.be.equal(node1.line);
        expect(node1.line.length).to.be.equal(3);
        done();
    });
    it('Test add root nodes by line', function(done) {
        const node1: Node = new Node();
        const node2: Node = new Node();
        const node3: Node = new Node();
        const node4: Node = new Node();
        node1.addNodes([node2, node3]);
        node1.line.addRootNode(node4);
        expect(node1.rootNode).to.be.equal(node4);
        expect(node2.rootNode).to.be.equal(node4);
        expect(node3.rootNode).to.be.equal(node4);
        expect(node1.line).to.be.equal(node4.line);
        expect(node2.line).to.be.equal(node4.line);
        expect(node3.line).to.be.equal(node4.line);
        done();
    });
    it('Test destroy method for line', function(done) {
        const node1: Node = new Node();
        const node2: Node = new Node();
        const node3: Node = new Node();
        const node4: Node = new Node();
        node1.addNodes([node2, node3]);
        node4.line = new Line();
        node4.addNodes([node1, node2, node3]);
        done();
    });
});