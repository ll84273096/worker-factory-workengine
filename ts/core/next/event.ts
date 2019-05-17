import { Event } from '../node';

class NextEvent extends Event {
    static readonly ERROR = 'NEXT_EVENT_ERROR';
}

export default NextEvent;