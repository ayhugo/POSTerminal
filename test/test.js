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



it('Scan item that doesnt exist. throw error', function () {
    var t = new Terminal.PointOfSaleTerminal;
    expect(() => {
        t.scanProduct("A");
    }).to.throw();
})

it('scanProduct() empty. throw error', function () {
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

