import { EventEmitter } from 'events';
import Line from '../line';
import Node from '../node';
import NextEvent from './event';
import { getGUID } from '../../utils';

// export class Deferred<T> implements Promise<T> {

//     [Symbol.toStringTag]: 'Promise';
//     private _resolveSelf: { (value?: T | PromiseLike<T>): void; (arg0: T): void };
//     private _rejectSelf: { (reason?: any): void; (arg0: any): void };
//     private promise: Promise<T>

//     constructor() {
//         this.promise = new Promise((resolve, reject) =>
//         {
//             this._resolveSelf = resolve;
//             this._rejectSelf = reject;
//         });
//     }

//     then<TResult1 = T, TResult2 = never>(
//         onfulfilled?: ((value: T) =>
//         TResult1 | PromiseLike<TResult1>) | undefined | null,
//         onrejected?: ((reason: any) =>
//         TResult2 | PromiseLike<TResult2>) | undefined | null
//     ): Promise<TResult1 | TResult2> {
//         return this.promise.then(onfulfilled, onrejected);
//     }

//     catch<TResult = never>(onrejected?: ((reason: any) =>
//     TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
//         return this.promise.then(onrejected);
//     }

//     resolve(val: T) { this._resolveSelf(val) }
//     reject(reason: any) { this._rejectSelf(reason) }
// }

class Next implements Promise<any> {

    static perform(line: Line): Next {
        return new Next(line);
    }

    [Symbol.toStringTag]: 'Promise';

    private _id: string;
    private _event: EventEmitter;
    private _line: Line;
    private _index: number;
    private _prevArgs: any[];
    private _promise: Promise<any>;
    private _resolve: (...args: any[]) => void;
    private _reject: (error: Error) => void;

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
    }

    get id(): string {
        return this._id;
    }

    get index(): number {
        return this._index;
    }

    then<TResult1 = any, TResult2 = never>(
        onfulfilled?: ((value: any) =>
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

    resolve(val: any) {
        this._resolve(val);
    }

    reject(reason: any) {
        this._reject(reason);
    }

    run(...args: any[]): Next {
        setTimeout(() => {
            this._run(0, ...args);
        });
        return this;
    }

    private _run(index: number = 0, ...args: any[]) {
        const currentNode: Node = this._line.getNodeByIndex(index);
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
        this._prevArgs = args;
    }
}

export default Next;