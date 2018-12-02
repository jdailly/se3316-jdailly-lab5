const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/products.js

exports.product_create = function (req, res) {
    
    console.log("post works");
    console.log(req.body.name);
    
    let product = new Product(
        {
            name: encodeHTML(req.body.name),
            price: req.body.price,
            tax: req.body.tax,
            quantity: req.body.quantity,
            des: req.body.des,
            purchased: req.body.purchased,
            url: req.body.url
            
        }
    );
    
    

    product.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};


// controllers/products.controller.js
exports.product_details = function (req, res,next) {
    res.send('get works');
    Product.findById(req.params.id, function (err, product) {
        if (err) {
        return next(err);
        }
        res.send(product);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.product_update = function (req, res) {
    console.log(req);
    console.log("yippie");
    Product.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, product,next) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.product_update_rating = function (req, res) {
    
    Product.findByIdAndUpdate(req.params.id,{$push:{rating: req.body.rating}}, {$set: req.body}, function (err, product,next) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.product_update_comment = function (req, res) {
    
    Product.findByIdAndUpdate(req.params.id,{$push:{comment: req.body.comment}}, {$set: req.body}, function (err, product,next) {
        if (err) return next(err);
        res.send(product);
    });
};



exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.product_findall= function (req, res,next) {
    console.log("WOKR");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    Product.find({quantity: {$gt: 0}}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.product_deleteItem=function (req, res, next){
    Product.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}