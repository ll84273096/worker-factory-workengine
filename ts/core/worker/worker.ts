import { DispatchObject } from '../object';

interface IWorkerOption {
    id?: string;
    name?: string;
    works?: any[];
}


class Worker extends DispatchObject {

    private _id: string;
    private _name: string;
    private _options: IWorkerOption;
    private _works: any[];

    constructor(options: IWorkerOption = {}) {
        super();
        this._options = options;
        this._works = [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    addWork(work: any): Worker {
        this._works.push(work);
        return this;
    }

    removeWork(work: any): Worker {
        const index: number = this._works.indexOf(work);
        if (index > -1) {
            this._works.splice(index, 1);
        }
        return this;
    }

    async start(): Promise<any> {
        return new Promise((resolve, reject) => (async () => {
            let index = 0;
            let currentWork: any = this._works[index];
            while (currentWork) {
                try {
                    await currentWork();
                    index++;
                    currentWork = this._works[index];
                } catch (error) {
                    reject(error);
                }
            }
            resolve();
        })());
    }
}

export default Worker;