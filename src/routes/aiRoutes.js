const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/explain', aiController.explain);

module.exports = router;