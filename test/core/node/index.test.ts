import { expect } from 'chai';
// eslint-disable-next-line no-unused-vars
import Node from '../../../ts/core/node';
import Line from '../../../ts/core/line';
import Point from '../../../ts/core/point';
// import Line from '../../../ts/core/node/line';

describe('Test node module', function() {
    it('Instance point', function() {
        const point: Point = new Point();
        expect(point.name).to.be.equal('_POINT_');
    });

    it('Test add a node', function() {
        const line: Line = new Line();
        const point: Point = new Point();
        line.addNode(point);
        expect(line.length).to.be.equal(1);
        expect(line.getNodeByIndex(0)).to.be.equal(point);
    });

    it('Test add nodes', function() {
        const line: Line = new Line();
        const point1: Point = new Point();
        const point2: Point = new Point();
        line.addNodes([point1, point2]);
        expect(line.length).to.be.equal(2);
        expect(line.getNodeByIndex(0)).to.be.equal(point1);
        expect(line.getNodeByIndex(1)).to.be.equal(point2);
    });

    it('Test add nodes at index', function() {
        const line: Line = new Line();
        const point1: Point = new Point();
        const point2: Point = new Point();
        const point3: Point = new Point();
        line.addNodes([point1, point2]);
        line.addNodesAt([point3], 0);
        expect(line.length).to.be.equal(3);
        expect(line.getNodeByIndex(0)).to.be.equal(point3);
        expect(line.getNodeByIndex(1)).to.be.equal(point1);
    });

    it('Test add line as node', function() {
        const line: Line = new Line();
        const lineNode: Line = new Line();
        line.addNode(lineNode);
        expect(line.length).to.be.equal(1);
        expect(line.getNodeByIndex(0)).to.be.equal(lineNode);
    });

    // it('Test add the first node', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     node1.addNode(node2);
    //     expect(node2.rootNode).to.be.equal(node1);
    //     expect(node2.line).to.be.equal(node1.line);
    //     expect(node1.line.length).to.be.equal(2);
    //     done();
    // });
    // it('Test add multiple nodes', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     const node3: Node = new Node();
    //     node1.addNodes([node2, node3]);
    //     expect(node2.rootNode).to.be.equal(node1);
    //     expect(node3.rootNode).to.be.equal(node1);
    //     expect(node3.line).to.be.equal(node1.line);
    //     expect(node2.line).to.be.equal(node1.line);
    //     expect(node1.line.length).to.be.equal(3);
    //     done();
    // });
    // it('Test add root nodes by line', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     const node3: Node = new Node();
    //     const node4: Node = new Node();
    //     node1.addNodes([node2, node3]);
    //     node1.line.addRootNode(node4);
    //     expect(node1.rootNode).to.be.equal(node4);
    //     expect(node2.rootNode).to.be.equal(node4);
    //     expect(node3.rootNode).to.be.equal(node4);
    //     expect(node1.line).to.be.equal(node4.line);
    //     expect(node2.line).to.be.equal(node4.line);
    //     expect(node3.line).to.be.equal(node4.line);
    //     done();
    // });
    // it('Test destroy method for line', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     const node3: Node = new Node();
    //     const node4: Node = new Node();
    //     node1.addNodes([node2, node3]);
    //     node4.line = new Line();
    //     node4.addNodes([node1, node2, node3]);
    //     done();
    // });
    // it('Test add node event', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     node1.addListener(LineEvent.ADD_NODE, (event: LineEvent) => {
    //         console.log(event);
    //         expect(event.data.nodes[0]).to.be.equal(node2);
    //         expect(event.data.nodes.length).to.be.equal(1);
    //         expect(event.data.index).to.be.equal(1);
    //         done();
    //     });
    //     node1.addNode(node2);
    // });
    // it('Test add nodes event', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     const node3: Node = new Node();
    //     node1.addListener(LineEvent.ADD_NODES, (event: LineEvent) => {
    //         console.log(event);
    //         expect(event.data.nodes.length).to.be.equal(2);
    //         expect(event.data.nodes[0]).to.be.equal(node2);
    //         expect(event.data.nodes[1]).to.be.equal(node3);
    //         done();
    //     });
    //     node1.addNodes([node2, node3]);
    // });
    // it('Test remove node', function(done) {
    //     const node1: Node = new Node();
    //     const node2: Node = new Node();
    //     const node3: Node = new Node();
    //     node1.addNodes([node2, node3]);
    //     node1.remove(node2.id);
    //     expect(node1.line.length).to.be.equal(2);
    //     done();
    // });
});