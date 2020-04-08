const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    },
    type : {
        type : String,
        default : "User"
    }
});

registrationSchema.pre("save", function(next) {
    bcrypt.genSalt(12)
    .then((salt) => {
        bcrypt.hash(this.password, salt)
        .then((encryptedPassword) => {
            this.password = encryptedPassword;
            next();
        })
        .catch(err => console.log(`Error occured whe hashing ${err}`));
    })
    .catch(err => console.log(`Error occured when salting ${err}`));
})

/* 
    Create a model object. This model object is responsible for
    performing CRUD operations on the given collection.
*/
const userModel = mongoose.model('users', registrationSchema);

module.exports = userModel;