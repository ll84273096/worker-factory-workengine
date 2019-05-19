import { EventEmitter } from 'events';
// eslint-disable-next-line no-unused-vars
import Line from '../line';
// eslint-disable-next-line no-unused-vars
import Node from '../node';
import NextEvent from './event';
import { getGUID } from '../../utils';

class Next<T> implements Promise<T> {

    static perform(line: Line): Next<any> {
        return new Next(line);
    }

    [Symbol.toStringTag]: 'Promise';

    private _id: string;
    private _event: EventEmitter;
    private _line: Line;
    private _index: number;
    private _prevArgs: any[];
    private _promise: Promise<T>;
    private _resolve: (...args: any[]) => void;
    private _reject: (error: Error) => void;
    private _isPaused: boolean;

    private constructor(line: Line) {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._id = getGUID();
        this._event = new EventEmitter();
        this._line = line;
        this._index = 0;
        this._prevArgs = [];
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

    resolve(val: T) {
        this._resolve(val);
    }

    reject(reason: any) {
        this._reject(reason);
    }

    run(...args: any[]): Next<T> {
        setTimeout(() => {
            this._run(0, ...args);
        });
        return this;
    }

    pause(): Next<T> {
        this._isPaused = true;
        return this;
    }

    continue(): Next<T> {
        this._isPaused = false;
        this._run(this._index, ...this._prevArgs);
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

    onChange(): Next<T> {
        return this;
    }

    private _onChange(type: string) {
        let event: NextEvent;
        switch (type) {
            case NextEvent.ON_NEXT:
                event = new NextEvent(NextEvent.name, this, {});
        }
    }

    private _run(index: number = 0, ...args: any[]) {
        const currentNode: Node = this._line.getNodeByIndex(index);
        if (!this._isPaused) {
            if (currentNode) {
                currentNode.run(...args).then((...args: any[]) => {
                    this._index++;
                    if (this._index > this._line.length) {
                        this._resolve(...args);
                    } else {
                        this._run(this._index, args);
                    }
                }).catch((error: Error) => {
                    this._reject(error);
                });
            } else if (this._line.length === 0 || this.index >= this._line.length - 1) {
                this._resolve(...args);
            } else if (this.index >= this._line.length - 1) {
                this._resolve(...this._prevArgs);
            } else {
                this._index++;
                this._run(this._index, ...this._prevArgs);
            }
        }

        this._prevArgs = args;
    }
}

export default Next;