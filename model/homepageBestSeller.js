const homeBestSeller = {

    fakeDB2 : [],

    init2() {

        this.fakeDB2.push({
            bestSellerImg : `/img/bestSeller1.jpg`,
            boolean : true
        }),

        this.fakeDB2.push({
            bestSellerImg : `/img/bestSeller2.jpg`,
            boolean : true
        }),

        this.fakeDB2.push({
            bestSellerImg : `/img/bestSeller3.jpg`,
            boolean : true
        }),

        this.fakeDB2.push({
            bestSellerImg : `/img/product3.png`,
            boolean : false
        })
    },

    gethomeBestSeller(){
        return this.fakeDB2;
    },

    //return bestseller
    returnBestSeller(){
        return this.fakeDB2;
    }
} 

homeBestSeller.init2();
module.exports = homeBestSeller;