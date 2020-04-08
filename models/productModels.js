const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// the schema defines the shape of the documents going into the collection
const productSchema = new Schema ({
    productName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    bestSeller : {
        type : Boolean,
        default : false
    },
    imagePath : {
        type : String
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;