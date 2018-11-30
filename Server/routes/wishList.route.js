const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const wishList_controller = require('../controllers/wishList.contoller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', wishList_controller.test);
module.exports = router;

router.post('/create', wishList_controller.wishList_create);
router.get('/:id', wishList_controller.wishList_details);
router.put('/:id/update', wishList_controller.wishList_update);
router.put('/:id/item', wishList_controller.wishList_update_item);
router.put('/:id/quantity', wishList_controller.wishList_update_quantity);
router.put('/:id/des', wishList_controller.wishList_update_des);
router.delete('/:id/delete', wishList_controller.wishList_delete);
router.get('/',wishList_controller.wishList_findall);
router.delete('/delete',wishList_controller.wishList_deleteItem);