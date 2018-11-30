const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WishListSchema = new Schema({
    email: {type: String, required: true, max: 100},
    item: {type: String, required: false},
    quantity: {type: Number, required: false},
    des: {type: String, required: false},
    access: {type: Boolean, required: false}

}, {collection : 'wishList'});


// Export the model
module.exports = mongoose.model('WishList', WishListSchema)