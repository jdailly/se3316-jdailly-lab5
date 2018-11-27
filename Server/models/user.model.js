const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 100},
    manager: {type: Boolean, required: false},
    active: {type: Boolean, required: false}

}, {collection : 'users'});


// Export the model
module.exports = mongoose.model('User', UserSchema);