const express = require('express');
const router = express.Router();

const { sign_up, sign_in } = require('../controllers/index');

// router.route('/').

router.post('/signin', sign_in);
router.post('/signup', sign_up);


module.exports = router;