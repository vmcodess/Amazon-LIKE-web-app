const homeCategoryProducts = {

    fakeDB : [],

    init()
    {

        this.fakeDB.push({
            categoryTitle : 'Electronics',
            categoryImg : `/img/electronics.jpg`
        });

        this.fakeDB.push({
            categoryTitle : 'Office Solutions',
            categoryImg : `/img/officeSolutions.jpg`
        });

        this.fakeDB.push({
            categoryTitle : 'Nutrition',
            categoryImg : `/img/nutrition&wellness.jpg`
        });

        this.fakeDB.push({
            categoryTitle : `Shoes`,
            categoryImg : `/img/shoes.jpg`
        })
    },

        getCategoryProducts()
        {
            return this.fakeDB;
        }
    
}

homeCategoryProducts.init();
module.exports = homeCategoryProducts;