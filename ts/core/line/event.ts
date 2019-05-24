import Event from '../event';

class LineEvent extends Event {
    static readonly ADD_NODE = 'ADD_NODE';
    static readonly ADD_NODES = 'ADD_NODES';
    static readonly ADD_NODES_AT = 'ADD_NODES_AT';
}

export default LineEvent;