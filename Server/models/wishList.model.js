const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const userColl = require('./userColl.model');

let UserCollSchema = new Schema({
    
    item: {type: String, required: false},
    quantity: {type: String, required: false},
    des: {type: String, required: false},

});


let WishListSchema = new Schema({
    name: {type: String, required: false},
    email: {type: String, required: true, max: 100},
    descrip: {type: String, required: false},
    access: {type: Boolean, required: false},
    userCollection: [UserCollSchema]

}, {collection : 'wishList'});


// Export the model
module.exports = mongoose.model('WishList', WishListSchema)