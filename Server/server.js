/*// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = 8081; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://jdailly:afed2365ab@ds043487.mlab.com:43487/se3316-jdailly-lab5'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Product models lives here
var Product = require('./models/product.models');
var User = require('./models/user.models');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// on routes that end in /prodcuts
// ----------------------------------------------------
router.route('/products')

	
	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		console.log("wtf");
		var product = new Product();		// create a new instance of the Bear model
		product.name = req.body.name;  // set the bears name (comes from the request)

		product.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Product created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		console.log('wtf');
		Product.find(function(err, products) {
			if (err)
				res.send(err);

			res.json(products);
		});
	});

router.route('/products/:products_id')

	// get the bear with that id
	.get(function(req, res) {
		Product.findById(req.params.products_id, function(err, product) {
			if (err)
				res.send(err);
			res.json(product);
		});
	})

	// update the product with this id
	.put(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {

			if (err)
				res.send(err);

			product.name = req.body.name;
			product.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Product updated!' });
			});

		});
	})

	// delete the product with this id
	.delete(function(req, res) {
		Product.remove({
			_id: req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});




router.route('/users')


	.post(function(req, res) {
		console.log('help');
		var user = new User();		// create a new instance of the Bear model
		user.name = req.body.name;  // set the bears name (comes from the request)

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		User.find(function(err, products) {
			if (err)
				res.send(err);

			res.json(products);
		});
	});

router.route('/users/:users_id')

	// get the bear with that id
	.get(function(req, res) {
		User.findById(req.params.users_id, function(err, product) {
			if (err)
				res.send(err);
			res.json(product);
		});
	})

	// update the product with this id
	.put(function(req, res) {
		User.findById(req.params.users_id, function(err, product) {

			if (err)
				res.send(err);

			user.name = req.body.name;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Product updated!' });
			});

		});
	})

	// delete the product with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.users_id
		}, function(err, product) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);*/


// Get dependencies
const express = require('express');
//const path = require('path');
//const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const apiProduct = require('./routes/product.route');
const apiUser= require('./routes/user.route')



const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://jdailly:afed2365ab@ds043487.mlab.com:43487/se3316-jdailly-lab5';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/product', apiProduct);
app.use('/api/user', apiUser);


// Catch all other routes and return the index file
//app.get('*', (req, res) => {
 // res.sendFile(path.join(__dirname, 'dist/index.html'));
//});


let port = 8081;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});