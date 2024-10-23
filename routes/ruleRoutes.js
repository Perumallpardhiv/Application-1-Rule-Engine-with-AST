const express = require('express');
const router = express.Router();
const controller = require('../controller/ruleController');

router.post('/create_rule', controller.createRule);
router.post('/combine_rules', controller.combineRules);
module.exports = router;
