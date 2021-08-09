const expect = require('chai').expect;
const Terminal = require('../main');

it('Scan items ABCDABA. total = 13.25', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    t.scanProduct("A");
    t.scanProduct("B");
    t.scanProduct("C");
    t.scanProduct("D");
    t.scanProduct("A");
    t.scanProduct("B");
    t.scanProduct("A");

    expect(t.calculateTotal()).to.equal(13.25);
})


it('Scan items CCCCCC. total = 6.00', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");

    expect(t.calculateTotal()).to.equal(6.00);
})

it('Scan items ABCD. total = 7.25', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    t.scanProduct("A");
    t.scanProduct("B");
    t.scanProduct("C");
    t.scanProduct("D");


    expect(t.calculateTotal()).to.equal(7.25);
})

it('Scan items AAAAAAA (two discounts applied). total = 8.5', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");

    expect(t.calculateTotal()).to.equal(8.5);
})

it('Scan items AAAAAAACCCCCC total = 14.5', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("A");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    t.scanProduct("C");
    expect(t.calculateTotal()).to.equal(14.5);
})


it('Scan item that doesnt exist. should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.scanProduct("A");
    }).to.throw();
})

it('scanProduct() empty. should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.scanProduct();
    }).to.throw();
})


it('Scan a lot of C iems. without crashing', function () {
    var t = new Terminal.PointOfSaleTerminal;
    t.setPricingUnit("A", 1.25);
    t.setPricingUnit("B", 4.25);
    t.setPricingUnit("C", 1.0);
    t.setPricingUnit("D", 0.75);
    t.setPricingVolume("A", 3, 3);
    t.setPricingVolume("C", 6, 5);

    expect(() => {
        for (i = 0; i < 1000000; i++) {
            t.scanProduct("C");
        }
    }).not.to.throw();
})


it('setPricingUnit for a string "a". should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.setPricingUnit("C", "a");
    }).to.throw();
})

it('setPricingUnit for a string "1". should not error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.setPricingUnit("C", "1");
    }).not.to.throw();
})

it('setPricingVolume for a price="a" and volume=1. should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.setPricingUnit("C", "1");
        t.setPricingVolume("C", "a", 1)
    }).to.throw();
})

it('setPricingVolume for a price="a" and volume="a". should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.setPricingUnit("C", "1");
        t.setPricingVolume("C", "a", "a")
    }).to.throw();
})

it('setPricingVolume for product that does not have a pricingunit. should error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.setPricingVolume("C", 3, 1)
    }).to.throw();
})
