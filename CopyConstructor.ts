
const anExampleVariable = "Hello World"
console.log(anExampleVariable)

export class TxStateDAO {
    barcode: string;
    ttl?: number;
    
        public constructor(dao?: TxStateDAO) {
        this.ttl = Math.floor(Date.now() / 1000 + 3600);

        if (dao) {
            if (dao.constructor === TxStateDAO) {
                return dao;
            }
            Object.assign(this, dao);
        }
    }

    public toString():string {
        let ret = `TxStateDAO, barcode: ${this.barcode}, ttl: ${this.ttl}.`;
        return ret;
    }
}

let state1: TxStateDAO = new TxStateDAO();
console.log('state1: ', state1);
console.log(`state1.toString(): ${state1.toString()}`);
let state2: TxStateDAO = new TxStateDAO(state1);
console.log('state2: ', state2);
console.log(`state2.toString(): ${state2.toString()}`);
console.log('state1 === state2: ', state1 === state2);