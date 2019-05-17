class Processor {
    private _runHandler: (...args: any[]) => Promise<any>;

    constructor(runHandler: (...args: any[]) => Promise<any>) {
        this._runHandler = runHandler;
    }

    run(...args: any[]): Promise<any> {
        return this._runHandler(...args);
    }
}

export default Processor;