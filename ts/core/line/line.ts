// eslint-disable-next-line no-unused-vars
import Node from '../node';


interface NodeInfo {
    node: Node;
}

class Line extends Node {

    protected DEFAULT_NAME = '_NODE_';
    private _arrNodeIds: string[] = [];
    private _mapNodes: {[index: string]: any} = {};
    private _currentNodeId: string = '';

    get length(): number {
        return this._arrNodeIds.length;
    }

    addNode(node: Node) {
        this._addNodesAtIndex([node]);
    }

    addNodes(nodes: Node[]) {
        this._addNodesAtIndex(nodes);
    }

    addNodesAt(nodes: Node[], index: number) {
        this._addNodesAtIndex(nodes, index);
    }

    remove(id: string) {
        this._removeNodeByIds([id]);
    }

    destroy() {
        this._arrNodeIds = [];
        this._mapNodes = {};
        super.destroy();
    }

    getNodeByIndex(index: number): Node {
        return this._mapNodes[this._arrNodeIds[index]] && this._mapNodes[this._arrNodeIds[index]].node;
    }

    private _addNodesAtIndex(nodes: Node[], index?: number) {
        let newIndex: number = index;

        if (newIndex === null || typeof newIndex === 'undefined') {
            newIndex = this._arrNodeIds.length;
        }
        this._arrNodeIds.splice(newIndex, 0, ...this._initAddedNodes(nodes));
    }

    private _removeNodeByIds(ids: string[]) {
        ids.forEach((id: string) => delete this._mapNodes[id]);
        this._arrNodeIds = this._arrNodeIds.filter((id: string) => !ids.includes(id));
    }

    private _initAddedNodes(nodes: Node[]): string[] {
        return nodes.map((node: Node) => {
            this._mapNodes[node.id] = this._createNodeInfo(node);
            return node.id;
        });
    }

    private _createNodeInfo(node: Node): NodeInfo {
        return {
            node
        };
    }

    private _getRootNode(): Node {
        return this._mapNodes[this._arrNodeIds[0]].node;
    }

    private _getNodeById(id: string): Node {
        return this._mapNodes[id].node;
    }
}

export default Line;