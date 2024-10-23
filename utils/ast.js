function parseRuleString(ruleString) {
    const tokens = ruleString.match(/(\(|\)|AND|OR|<=|>=|!=|<|>|=|[^()\s]+)/g);
    const stack = [];
    const operators = [];

    function applyOperator() {
        const operator = operators.pop();
        const right = stack.pop();
        const left = stack.pop();
        stack.push({ type: 'operator', operator, left, right });
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim();
        if (token === ' ') continue;

        if (token === 'AND' || token === 'OR') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                applyOperator();
            }
            operators.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                applyOperator();
            }
            operators.pop();
        } else {
            let key = null;
            let operator = null;
            let value = null;
            while (i < tokens.length && (key == null || operator == null || value == null)) {
                if (key === null) key = tokens[i];
                else if (operator == null) operator = tokens[i];
                else value = tokens[i];
                i++;
            }
            i--;
            stack.push({ type: 'operand', key, operator, value });
        }
    }

    while (operators.length) {
        applyOperator();
    }

    return stack[0];
}

function combineNodes(rules, operators) {
    if (rules.length === 1) return rules[0];

    let combined = rules[0];
    for (let i = 1; i < rules.length; i++) {
        const currentOperator = operators[i - 1];
        combined = {
            type: 'operator',
            operator: currentOperator,
            left: combined,
            right: rules[i],
        };
    }

    return combined;
}

function printTree(node, prefix = '', isLeft = true) {
    if (!node) return;
    console.log(prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`));
    if (node.left) printTree(node.left, prefix + (isLeft ? "│   " : "    "), true);
    if (node.right) printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
}

function evaluate(node, data) {
    if (node.type === 'operator') {
        const leftResult = evaluate(node.left, data);
        const rightResult = evaluate(node.right, data);
        return node.operator === 'AND' ? leftResult && rightResult : leftResult || rightResult;
    }

    if (node.type === 'operand') {
        let { key, operator, value } = node;
        value = typeof value === 'string' && value.startsWith("'") && value.endsWith("'")
            ? value.slice(1, -1)
            : value;

        switch (operator) {
            case '>': return data[key] > value;
            case '<': return data[key] < value;
            case '>=': return data[key] >= value;
            case '<=': return data[key] <= value;
            case '==':
            case '=': return data[key] == value;
            case '!=': return data[key] != value;
            default: return false;
        }
    }
    return false;
}

module.exports = { parseRuleString, combineNodes, printTree, evaluate };
