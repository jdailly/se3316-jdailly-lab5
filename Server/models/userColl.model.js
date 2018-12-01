const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let UserCollSchema = new Schema({
    
    item: {type: String, required: false},
    quantity: {type: Number, required: false},
    des: {type: String, required: false},

});


// Export the model
module.exports = mongoose.model('UserColl', UserCollSchema)