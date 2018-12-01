const express = require('express');
const router = express.Router();
const policy_controller = require('../controllers/policy.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', policy_controller.test);
module.exports = router;

router.post('/create', policy_controller.policy_create);
router.get('/:id', policy_controller.policy_details);
router.put('/:id/update', policy_controller.policy_update);
router.put('/:id/rating', policy_controller.policy_update_rating);
router.put('/:id/comment', policy_controller.policy_update_comment);
router.delete('/:id/delete', policy_controller.policy_delete);
router.get('/',policy_controller.policy_findall);
router.delete('/delete',policy_controller.policy_deleteItem);