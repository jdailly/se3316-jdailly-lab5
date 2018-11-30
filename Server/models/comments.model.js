const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentsSchema = new Schema({
    productID: {type: String, required: true},
    user: {type: String, required: false},
    comment: {type: String, required: false},
    rating: {type: Number, required: false},
    hidden: {type: Boolean, required: false}

}, {collection :'comments'});


// Export the model
module.exports = mongoose.model('Comments', CommentsSchema);