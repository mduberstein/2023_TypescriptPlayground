// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = "Hello World"
console.log(anExampleVariable)

export class RuleFilter {
    public basket?: Partial<{ [K in PosType]: string[] }>;
}

export type PosType = 'qst' | 'hdx' | 'sicom';

export class ProcessedItem {
    // public plu: string = 'plu';
    // public totalPrice: number = 0;

    public constructor(public plu: string = 'plu', public totalPrice: number = 0) {}
}

export class ProcessedBasket {
    private _items: ProcessedItem[];
    public posType: PosType;
    public taxes: number;
    private _filter: RuleFilter;
    private filteredItems: ProcessedItem[];

        public constructor(posType: PosType, taxes: number, items: ProcessedItem[]) {
        this.posType = posType;
        this.taxes = taxes;
        this.filteredItems = [];
        // Sorts by total price rather than base to effectively reduce more with coupons
        this._items = items.sort((a, b) => b.totalPrice - a.totalPrice);
    }

    public get items(): ProcessedItem[] {
        if (!this._filter) {
            return this._items;
        }
        return this.filteredItems;
    }


    public deepCopy(): ProcessedBasket {
        return new ProcessedBasket(this.posType, this.taxes, JSON.parse(JSON.stringify(this.items)));
    }
}

const pItems = [ new ProcessedItem('plu3', 3), new ProcessedItem('plu1', 1), new ProcessedItem('plu2', 2)];

const pBucket = new ProcessedBasket('hdx', 10, pItems);



