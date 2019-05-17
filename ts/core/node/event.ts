class Event {
    readonly timestamp: number;
    readonly type: string;
    readonly target: any;
    public data: any;
    constructor(type: string, target: any, data: any) {
        this.type = type;
        this.target = target;
        this.data = data;
        this.timestamp = new Date().getTime();
    }
}

class LineEvent extends Event {
    static readonly ADD_NODE = 'ADD_NODE';
    static readonly ADD_NODES = 'ADD_NODES';
    static readonly ADD_NODES_AT = 'ADD_NODES_AT';
}

export {
    Event,
    LineEvent
};