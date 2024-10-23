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

module.exports = { parseRuleString };
