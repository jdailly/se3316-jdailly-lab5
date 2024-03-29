const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    
    userid: {type: String, required: true},
    item: {type: String, required: false},
    quantity: {type: Number, required: false},
    price: {type: Number, required: false},
    bought: {type: Boolean, required: false}

}, {collection : 'cart'});


// Export the model
module.exports = mongoose.model('Cart', CartSchema);