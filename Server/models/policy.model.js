const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PolicySchema = new Schema({
    descript: {type: String, required: true},
}, {collection : 'policy'});


// Export the model
module.exports = mongoose.model('Policy', PolicySchema);