import { DebugMode } from './constant';

interface IDebugOptions {
    mode?: DebugMode,
    placeholder?: string,
}

const DEFAULT_PLACEHOLDER: string = 'newton:';

const DEFAULT_OPTIONS: IDebugOptions = {
    mode: DebugMode.DEV,
    placeholder: DEFAULT_PLACEHOLDER
}

class debug {
    private options: IDebugOptions = {};
    constructor (options: IDebugOptions) {
        this.setOptions(options);
    }

    setOptions (options: IDebugOptions) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }
    }

    log (...args: any[]) {
        this.isShowDebugMessage() && console.log(...args);
    }

    info (...args: any[]) {
        this.isShowDebugMessage() && console.info(...args);
    }

    private isShowDebugMessage ():boolean {
        return this.options.mode === DebugMode.DEV;
    }

}
export default debug