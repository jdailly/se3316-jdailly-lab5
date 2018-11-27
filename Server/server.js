
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