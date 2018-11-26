const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    //tax: {type: Number, required: false},
    //quantity: {type: Number, required: true},
}, {collection : 'users'});


// Export the model
module.exports = mongoose.model('User', ProductSchema);