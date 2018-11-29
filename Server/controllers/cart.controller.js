const Cart = require('../models/cart.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/carts.js

exports.cart_create = function (req, res) {
    
    console.log("post2 works");
    console.log(req.body.userid);
    
    let cart = new Cart(
        {
            userid: req.body.userid,
            item: req.body.item,
            quantity: req.body.quantity,
            price: req.body.price
            
        }
    );
    
    

    cart.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('Cart Created successfully')
    })
};


// controllers/carts.controller.js
exports.cart_details = function (req, res,next) {
    res.send('get works');
    Cart.findById(req.params.id, function (err, cart) {
        if (err) {
        return next(err);
        }
        res.send(cart);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.cart_update = function (req, res) {
    console.log(req);
    console.log("yippie");
    Cart.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, cart,next) {
        if (err) return next(err);
        res.send(cart);
    });
};

exports.cart_update_rating = function (req, res) {
    
    Cart.findByIdAndUpdate(req.params.id,{$push:{rating: req.body.rating}}, {$set: req.body}, function (err, cart,next) {
        if (err) return next(err);
        res.send(cart);
    });
};

exports.cart_update_comment = function (req, res) {
    
    Cart.findByIdAndUpdate(req.params.id,{$push:{comment: req.body.comment}}, {$set: req.body}, function (err, cart,next) {
        if (err) return next(err);
        res.send(cart);
    });
};



exports.cart_delete = function (req, res) {
    Cart.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.cart_findall= function (req, res,next) {
    console.log("WOKR");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    Cart.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.cart_deleteItem=function (req, res, next){
    Cart.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}