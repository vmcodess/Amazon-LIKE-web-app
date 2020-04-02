const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// the schema defines the shape of the documents going into the collection
const productSchema = new Schema ({
    productName : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    // productCategory : {
    //     type : String,
    //     required : true
    // },
    quantity : {
        type : Number,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    },
    imagePath : {
        type : String,
        required : true
    }
});


const productModel = mongoose.model('products', productSchema);

module.exports = productModel;