import { EventEmitter } from 'events';
import { getGUID } from '../../utils';
// import Event from '../event';
// import { Event as NodeEvent } from './constant';
import { NodeEvent } from '../event';

interface NodeOptions {
    name?: string;
}

const DEFAULT_OPTIONS: NodeOptions = {
    name: 'node'
};

class Node {
    private _id: string = getGUID();
    private _name: string = '';
    private _options: NodeOptions;
    private _arrNextNodeList: Node[] = [];
    private _arrPrevNodeList: Node[] = [];
    private _event: EventEmitter;

    constructor(options: NodeOptions = {}) {
        this._options = {
            ...DEFAULT_OPTIONS,
            ...options
        };
        this._name = this._options.name;
        this._event = new EventEmitter();
    }

    getId(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    addListener(type: NodeEvent, listener: (...args: any[]) => void): void {
        this._event.addListener(type.toString(), listener);
    }

    removeListener(type: NodeEvent, listener: () => {}): void {
        this._event.removeListener(type.toString(), listener);
    }

    removeAllListeners(type?: NodeEvent): void {
        this._event.removeAllListeners(type.toString());
    }

    addNextNode(node: Node, index?: number): Node {
        this._addNodes(this._arrNextNodeList, [node], index);
        this._event.emit(NodeEvent.ADD_NEXT_NODE, 'add_node');
        return this;
    }

    addNextNodes(nodes: Node[], index?: number): Node {
        this._addNodes(this._arrNextNodeList, nodes, index);
        return this;
    }

    addPrevNode(node: Node, index?: number): Node {
        this._addNodes(this._arrPrevNodeList, [node], index);
        return this;
    }

    addPrevNodes(nodes: Node[], index?: number): Node {
        this._addNodes(this._arrPrevNodeList, nodes, index);
        return this;
    }

    private _addNodes(arrNodeList: Node[], nodes: Node[], index: number): void {
        let _index: number = index;
        if (_index === null && typeof _index === 'undefined') {
            _index = arrNodeList.length;
        }
        arrNodeList.splice(_index, 0, ...nodes);
    }

    private _addListenerTo

}

export default Node;
