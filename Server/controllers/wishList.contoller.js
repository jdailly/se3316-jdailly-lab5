const WishList = require('../models/wishList.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/wishLists.js

exports.wishList_create = function (req, res) {
    console.log("post works");
    //console.log(req.body.email);
    
    let wishList = new WishList(
        {
            email: req.body.email,
            item: req.body.item,
            quantity: req.body.quantity,
            des: req.body.des,
            access: req.body.access
        }
        );
    
    console.log(wishList);

    wishList.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('WishList Created successfully')
    })
};


// controllers/wishLists.controller.js
exports.wishList_details = function (req, res,next) {
    res.send('get works');
    WishList.findById(req.params.id, function (err, wishList) {
        if (err) {
        return next(err);
        }
        res.send(wishList);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.wishList_update = function (req, res) {
    
    WishList.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishList,next) {
        if (err) return next(err);
        res.send('WishList udpated.');
    });
};

exports.wishList_delete = function (req, res) {
    WishList.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.wishList_findall= function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
    WishList.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.wishList_deleteItem=function (req, res, next){
    WishList.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}




exports.wishList_update_item = function (req, res) {
    console.log("please work");
    WishList.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist,next) {
        if (err) return next(err);
        res.send(wishlist);
    });
};

exports.wishList_update_quantity = function (req, res) {
    
     WishList.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist,next) {
        if (err) return next(err);
        res.send(wishlist);
    });
};

exports.wishList_update_des = function (req, res) {
    
    WishList.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, wishlist,next) {
        if (err) return next(err);
        res.send(wishlist);
    });
};
