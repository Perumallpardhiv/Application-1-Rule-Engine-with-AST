const Rule = require('../models/ruleSchema');
const { parseRuleString } = require('../utils/ast');

exports.createRule = async (req, res) => {
  const { ruleName, ruleString } = req.body;

  if (!ruleName || !ruleString) {
    return res.status(400).json({ error: 'Fill all details' });
  }

  try {
    const rootNode = parseRuleString(ruleString);
    const newRule = new Rule({ ruleName, ruleAST: rootNode, ruleASTString: ruleString });
    await newRule.save();
    res.status(201).json(newRule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
