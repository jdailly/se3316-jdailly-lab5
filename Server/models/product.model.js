const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    tax: {type: Number, required: true},
    quantity: {type: Number, required: false},
    des: {type: String, required: false},
    purchased: {type: Number, required: false},
    url: {type: String, required: false}
}, {collection : 'products'});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);