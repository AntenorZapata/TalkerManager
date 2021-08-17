const express = require('express');

const router = express.Router();
const talkerController = require('../controllers/talkerController');

router
  .route('/')
  .get(talkerController.getAllTalkers)
  .post(talkerController.createTalker);
router.route('/:id').get(talkerController.getTalker);

module.exports = router;
