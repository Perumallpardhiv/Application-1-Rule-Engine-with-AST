const Rule = require('../models/ruleSchema');
const { parseRuleString, combineNodes, evaluate } = require('../utils/ast');

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

exports.evaluateRule = async (req, res) => {
  const { ast, data } = req.body;

  try {
    const rule = await Rule.findOne({ ruleName: ast });

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const result = evaluate(rule.ruleAST, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRule = async (req, res) => {
  const { ruleName, newRuleName, newRuleString } = req.body;

  if (!ruleName || (!newRuleName && !newRuleString)) {
    return res.status(400).json({ error: 'Fill all details' });
  }

  try {
    const rule = await Rule.findOne({ ruleName });

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    if (newRuleName) {
      rule.ruleName = newRuleName;
    }
    if (newRuleString) {
      const rootNode = parseRuleString(newRuleString);
      rule.ruleAST = rootNode;
      rule.ruleASTString = newRuleString;
    }

    await rule.save();
    res.status(200).json({ message: 'Rule Updated', updatedRuleName: rule.ruleName });
  } catch (error) {
    console.error('Error updating rule:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRuleHistory = async (req, res) => {
  try {
    const rules = await Rule.find({})
      .select('ruleName createdAt ruleASTString ruleAST')
      .sort('-createdAt')
      .limit(10);

    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
