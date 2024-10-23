const express = require('express');
const router = express.Router();
const controller = require('../controller/ruleController');

router.post('/create_rule', controller.createRule);
router.post('/combine_rules', controller.combineRules);
router.post('/evaluate_rule', controller.evaluateRule);
router.put('/update_rule', controller.updateRule);
router.get('/history', controller.getRuleHistory);
module.exports = router;
