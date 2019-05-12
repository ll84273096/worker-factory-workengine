import { EventEmitter } from 'events';

export enum NodeEvent {
    ADD_NEXT_NODE= 'ADD_NEXT_NODE',
    ADD_PREV_NODE= 'ADD_PREV_NODE'
}

const event = new EventEmitter();



export default EventEmitter;