class Customer {
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    fooBar(): string {
        const self = this;
        const callback1 = function() {
            return 'hallo welt ' + self.id;
        }

        const callback2 = () => '!!hallo welt ' + this.id;
        
        return callback2();
    }
}

const c = new Customer(3);
console.log(c.fooBar());