const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const cart_controller = require('../controllers/cart.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', cart_controller.test);
module.exports = router;

router.post('/create', cart_controller.cart_create);
router.get('/:id', cart_controller.cart_details);
router.put('/:id/update', cart_controller.cart_update);
router.delete('/:id/delete', cart_controller.cart_delete);
router.get('/',cart_controller.cart_findall);
router.delete('/delete',cart_controller.cart_deleteItem);