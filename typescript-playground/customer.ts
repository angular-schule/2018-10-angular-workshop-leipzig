export class Customer {
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    fooBar(): string {
        const self = this;
        const callback1 = function() {
            return `hallo welt,
die ID ist ${self.id}!`;
        }

        const callback2 = () => '!!hallo welt ' + this.id;
        
        return callback1();
    }
}