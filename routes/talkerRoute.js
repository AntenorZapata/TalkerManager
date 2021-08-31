const express = require('express');
const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDateAndRate,
} = require('../middleware/verifyCredentials');

const router = express.Router();
const {
  getAllTalkers,
  getTalker,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
} = require('../controllers/talkerController');

router.route('/search').get(verifyToken, searchTalker);

router
  .route('/')
  .get(getAllTalkers)
  .post(
    verifyToken,
    verifyName,
    verifyAge,
    verifyTalk,
    verifyDateAndRate,
    createTalker,
  );

router.route('/:id')
.get(getTalker)
.put(verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDateAndRate,
  updateTalker)
.delete(verifyToken, deleteTalker);

module.exports = router;
