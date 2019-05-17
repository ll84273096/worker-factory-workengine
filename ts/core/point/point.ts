
// eslint-disable-next-line no-unused-vars
import Node from '../node';
// eslint-disable-next-line no-unused-vars
import Line from '../line';
// eslint-disable-next-line no-unused-vars
import { PointEvent } from './event';

class Point extends Node {

    protected DEFAULT_NAME = '_POINT_';
    private _line: Line;

    constructor() {
        super();
        this.onBeforAddPoint = this.onBeforAddPoint.bind(this);
        this.onAddPoint = this.onAddPoint.bind(this);
        // this.event.addListener(PointEvent.BEFORE_ADD_POINT, this.onBeforAddPoint);
        // this.event.addListener(PointEvent.ADD_POINT, this.onAddPoint);
        // this.event.addListener(PointEvent.AFTER_ADD_POINT, this.onAfterAddPoint);
    }

    get line(): Line {
        return this._line;
    }

    set line(line: Line) {
        this._line = line;
    }

    onBeforAddPoint(line: Line) {
        // override
    }

    onAddPoint(line: Line) {
        // override
    }

    onAfterAddPoint(line: Line) {
        // override
    }
}

export default Point;
