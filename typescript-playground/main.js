var Customer = /** @class */ (function () {
    function Customer(id) {
        this.id = id;
    }
    Customer.prototype.fooBar = function () {
        var _this = this;
        var self = this;
        var callback1 = function () {
            return 'hallo welt ' + self.id;
        };
        var callback2 = function () { return '!!hallo welt ' + _this.id; };
        return callback2();
    };
    return Customer;
}());
var c = new Customer(3);
console.log(c.fooBar());
//# sourceMappingURL=main.js.map