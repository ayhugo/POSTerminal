exports.PointOfSaleTerminal = class PointOfSaleTerminal {
    constructor(){
        this.scannedItems = {};
        this.unitPrices = {};
        this.volumePrices = {};

    }

    setPricingUnit(product, price){
        product.toUpperCase()
        this.unitPrices[product] = price
    }

    #getPricingUnit(product){
        return this.unitPrices[product]
    }

    setPricingVolume(product, volume, price){
        product.toUpperCase()
        this.volumePrices[product] = {
            volume,
            price
        }
    }

    #getPricingVolume(product) {
        return this.volumePrices[product].price
    }

    #getVolumeForDiscount(product){
        return this.volumePrices[product].volume
    }

    scanProduct(product) {
        if (product === undefined) throw new Error
        product.toUpperCase()
        if (this.#getPricingUnit(product) === undefined) throw new Error
        if(this.scannedItems[product]){
            this.scannedItems[product]++ 
        } else {
            this.scannedItems[product] = 1
        }
    }

    calculateTotal(){
        let totalPrice = 0.00;
        for(const product in this.scannedItems){
            const productCount = this.scannedItems[product]

            if(this.volumePrices[product]){
                //Yes this product has volumne sales

                let discountCount = 0.00;
                const volumeForDiscount = this.#getVolumeForDiscount(product)

                for(let i = 1; i < productCount+1; i++) {
                    //Is there enough volume to get a discount once... twice... etc...
                    if (productCount-(volumeForDiscount*i)>=0){
                        discountCount = discountCount+1
                    }
                }
                totalPrice += (productCount-discountCount*volumeForDiscount)*this.#getPricingUnit(product)+discountCount*this.#getPricingVolume(product)
            } else {
                totalPrice += productCount * this.#getPricingUnit(product)
            }
        }
        return totalPrice
    }
}
