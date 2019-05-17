import { Event } from '../node';

export class PointEvent extends Event {
    static readonly BEFORE_ADD_POINT = 'POINT_EVENT_BEFORE_ADD_POINT';
    static readonly ADD_POINT = 'POINT_EVENT_ADD_POINT';
    static readonly AFTER_ADD_POINT = 'POINT_EVENT_AFTER_ADD_POINT';
}