import Action from './Action';
// import ActionDeliverData from './ActionDeliverData';

class AnchorAction extends Action {

    private _name: string;

    constructor(name: string) {
        super(async () => {});
        this._name = name;
    }

    get name(): string {
        return this._name;
    }
}

export default AnchorAction;