"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = /** @class */ (function () {
    function Customer(id) {
        this.id = id;
    }
    Customer.prototype.fooBar = function () {
        var _this = this;
        var self = this;
        var callback1 = function () {
            return "hallo welt,\ndie ID ist " + self.id + "!";
        };
        var callback2 = function () { return '!!hallo welt ' + _this.id; };
        return callback1();
    };
    return Customer;
}());
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map