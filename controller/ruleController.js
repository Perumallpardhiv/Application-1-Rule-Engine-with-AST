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

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

exports.combineRules = async (req, res) => {
  const { rules, operators } = req.body;

  try {
    const ruleDocs = await Rule.find({ ruleName: { $in: rules } });

    if (ruleDocs.length === 0) {
      return res.status(404).json({ error: 'No matching Rules' });
    }

    const ruleASTs = ruleDocs.map(rule => rule.ruleAST);
    const combinedRootNode = combineNodes(ruleASTs, operators);
    const combinedRuleName = `combined${generateRandomString(4)}`;
    const combinedRuleASTString = `Combined(${rules.join(` ${operators} `)})`;

    const combinedRule = new Rule({
      ruleName: combinedRuleName,
      ruleAST: combinedRootNode,
      ruleASTString: combinedRuleASTString
    });

    await combinedRule.save();
    res.status(201).json({
      ruleName: combinedRuleName,
      ruleAST: combinedRootNode,
      ruleASTString: combinedRuleASTString,
      message: 'Combined Rule Created.'
    });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(500).json({ error: 'An error occurred in combining rules.' });
  }
};
