import { EventEmitter } from 'events';
// eslint-disable-next-line no-unused-vars
import Line from '../line';
// eslint-disable-next-line no-unused-vars
import Node from '../node';
import NextEvent from './event';
import PassData from '../pass_data';
import { getGUID } from '../../utils';

interface NextPassDataRoadMapItem {
    id: string;
    node: Node;
    inputData: any;
    outputData: any;
    startTimestamp: number;
    endTimestamp: number;
}

class NextPassData extends PassData {
    private _roadMap: NextPassDataRoadMapItem[] = [];

    get roadMap(): NextPassDataRoadMapItem[] {
        return this._roadMap;
    }

    get lastRoadMap(): NextPassDataRoadMapItem {
        return this._roadMap[this._roadMap.length - 1];
    }

    addRoadMapItem(roadMapItem: NextPassDataRoadMapItem) {
        this._roadMap.push(roadMapItem);
    }
}

class Next<T> implements Promise<T> {

    static perform(line: Line): Next<any> {
        return new Next(line);
    }

    [Symbol.toStringTag]: 'Promise';

    private _id: string;
    private _event: EventEmitter;
    private _line: Line;
    private _index: number;
    private _prevRunData: any;
    private _promise: Promise<T>;
    private _resolve: (data: T) => void;
    private _reject: (error: Error) => void;
    private _isPaused: boolean;
    private _passData: NextPassData;

    private constructor(line: Line) {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._id = getGUID();
        this._event = new EventEmitter();
        this._line = line;
        this._index = 0;
        this._isPaused = false;
    }

    get id(): string {
        return this._id;
    }

    get index(): number {
        return this._index;
    }

    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) =>
        TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) =>
        TResult2 | PromiseLike<TResult2>) | undefined | null
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    catch<TResult = never>(onrejected?: ((reason: any) =>
    TResult | PromiseLike<TResult>) | undefined | null): Promise<any | TResult> {
        return this._promise.then(onrejected);
    }

    finally(onfinally?: (() => void) | undefined | null): Promise<any> {
        return this._promise.finally(onfinally);
    }

    resolve(value: T) {
        this._resolve(value);
    }

    reject(reason: any) {
        this._reject(reason);
    }

    run(data?: any): Next<T> {
        setTimeout(() => {
            this._passData = new NextPassData();
            this._passData.setConstant('nextId', this.id);
            this._run(0, data, this._passData);
        });
        return this;
    }

    pause(): Next<T> {
        this._isPaused = true;
        return this;
    }

    continue(): Next<T> {
        this._isPaused = false;
        this._run(this._index, this._prevRunData, this._passData);
        return this;
    }

    onNext(): Next<T> {
        return this;
    }

    onPause(): Next<T> {
        return this;
    }

    onContinue(): Next<T> {
        return this;
    }

    onStop(): Next<T> {
        return this;
    }

    onChange(callBack: (event: NextEvent) => void): Next<T> {
        this._event.addListener(NextEvent.ON_CHANGE, callBack);
        return this;
    }

    private _onChange(type: string) {
        let event: NextEvent;
        const eventData = {
            type,
            lint: this._line,
            index: this._index,
            node: this._line.getNodeByIndex(this._index),
            nextNode: this._line.getNodeByIndex(this._index + 1),
            isLast: this._index === this._line.length - 1,
            isFirst: this._index === 0
        };
        switch (type) {
            case NextEvent.ON_NEXT:
                event = new NextEvent(NextEvent.name, this, eventData);
        }
        this._event.emit(event.type, event);
    }

    private _run(index: number = 0, data: any, passData: NextPassData) {
        const currentNode: Node = this._line.getNodeByIndex(index);
        let inputData: any = data;
        let startTimestamp: number = new Date().getTime();
        let promise: Promise<any>;
        if (!this._isPaused) {
            if (currentNode) {
                promise = currentNode.run(data);
            } else {
                promise = Promise.resolve(data);
            }
        }
        if (promise) {
            promise.then((data: any) => {
                passData.addRoadMapItem({
                    id: currentNode && currentNode.id,
                    node: currentNode,
                    inputData,
                    outputData: data,
                    startTimestamp,
                    endTimestamp: new Date().getTime()
                });
                if (this._index >= this._line.length - 1) {
                    this._onRunSuccess(data);
                } else {
                    this._index++;
                    this._run(this._index, data, passData);
                }
                this._prevRunData = data;
            }).catch((error: Error) => {
                this._onRunFail(error);
            });
        }
    }

    private _onRunSuccess(result: any) {
        this._resolve(result);
    }

    private _onRunFail(error: Error) {
        this._reject(error);
    }

}

export default Next;