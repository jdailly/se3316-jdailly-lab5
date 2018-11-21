// BASE SETUP
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /prodcuts
// ----------------------------------------------------
router.route('/products')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
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


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);