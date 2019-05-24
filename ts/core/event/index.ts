class Event {
    readonly timestamp: number;
    readonly type: string;
    readonly target: any;
    readonly data: {[key: string]: any};
    constructor(type: string, target: any, data: {[key: string]: any}) {
        this.type = type;
        this.target = target;
        this.data = data;
        this.timestamp = new Date().getTime();
    }
}

export default Event;