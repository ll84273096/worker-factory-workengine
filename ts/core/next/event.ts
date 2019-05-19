import { Event } from '../node';

class NextEvent extends Event {
    static readonly ERROR = 'NEXT_EVENT_ERROR';
    static readonly ON_NEXT = 'NEXT_EVENT_ON_NEXT';
    static readonly ON_PAUSE = 'NEXT_EVENT_ON_PAUSE';
    static readonly ON_CONTINUE = 'NEXT_EVENT_ON_CONTINUE';
    static readonly ON_CHANGE = 'NEXT_EVENT_ON_CHANGE';
}

export default NextEvent;