const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 100},
    manager: {type: Boolean, required: false},
    active: {type: Boolean, required: false},
    access: {type: Boolean, required: false},
    collName: {type: String, required: false},
    collDes: {type: String, required: false}

}, {collection : 'users'});


// Export the model
module.exports = mongoose.model('User', UserSchema);