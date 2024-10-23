const express = require('express');
const router = express.Router();
const controller = require('../controller/ruleController');

router.post('/create_rule', controller.createRule);
module.exports = router;
