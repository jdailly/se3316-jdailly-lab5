const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const comments_controller = require('../controllers/comments.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', comments_controller.test);
module.exports = router;

router.post('/create', comments_controller.comments_create);
router.get('/:id', comments_controller.comments_details);
router.put('/:id/update', comments_controller.comments_update);
router.delete('/:id/delete', comments_controller.comments_delete);
router.get('/',comments_controller.comments_findall);
router.delete('/delete',comments_controller.comments_deleteItem);