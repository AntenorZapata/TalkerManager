const express = require('express');
const validation = require('../services/validation');

const router = express.Router();
const talkerController = require('../controllers/talkerController');

router
  .route('/')
  .get(talkerController.getAllTalkers)
  .post(validation, talkerController.createTalker);

router.route('/:id').get(talkerController.getTalker).put(validation, talkerController.updateTalker);

module.exports = router;
