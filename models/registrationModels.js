const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema defines the shape of the documents going into the collection
const registrationSchema = new Schema ({

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    userName : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    }
});


/* 
    Create a model object. This model object is responsible for
    performing CRUD operations on the given collection.
*/

const userRegistration = mongoose.model('users', registrationSchema);

module.exports = userRegistration;