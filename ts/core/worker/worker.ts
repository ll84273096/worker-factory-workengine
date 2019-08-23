import { DispatchObject } from '../object';
import Work from '../work';

interface IWorkerOption {
    id?: string;
    name?: string;
    works?: any[];
}


class Worker extends DispatchObject {

    private _id: string;
    private _name: string;
    private _options: IWorkerOption;
    private _works: Work[];
    private _runningWorks: Work[];

    constructor(options: IWorkerOption = {}) {
        super();
        this._options = options;
        this._works = [];
        this._runningWorks = [];
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

    // removeWork(work: any): Worker {
    //     const index: number = this._works.indexOf(work);
    //     if (index > -1) {
    //         this._works.splice(index, 1);
    //     }
    //     return this;
    // }

    async race(data: any): Promise<any> {
        const works: Promise<any>[] = this._works.map((work: Work) => work.start(data));
        this._works = [];
        return Promise.race(works);
    }

    async all(data: any): Promise<any> {
        const works: Promise<any>[] = this._works.map((work: Work) => work.start(data));
        this._works = [];
        return Promise.all(works);
    }

    async start(data: any): Promise<any> {
        const runningWorks: Work[] = [...this._works];
        this._works = [];
        return new Promise((resolve, reject) => (async () => {
            let index = 0;
            let currentWork: Work = runningWorks[index];
            let prevStartData: any;
            while (currentWork) {
                try {
                    if (index === 0) {
                        prevStartData = data;
                    }
                    prevStartData = await currentWork.start(prevStartData);
                    index++;
                    currentWork = runningWorks[index];
                } catch (error) {
                    reject(error);
                }
            }
            resolve(prevStartData);
        })());
    }
}

export default Worker;