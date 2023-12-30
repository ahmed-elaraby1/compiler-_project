function parseExpression(expression) {
    const tokens = expression.match(/[-+*/()]|\d+/g);
    let idx = 0;
   
    function parseTerm() {
       let left = parseFactor();
   
       while (idx < tokens.length && (tokens[idx] === '*' || tokens[idx] === '/')) {
         const operator = tokens[idx];
         idx++;
         const right = parseFactor();
   
         if (operator === '*') {
           left *= right;
         } else {
           left /= right;
         }
       }
   
       return left;
    }
   
    function parseExpression() {
       let left = parseTerm();
   
       while (idx < tokens.length && (tokens[idx] === '+' || tokens[idx] === '-')) {
         const operator = tokens[idx];
         idx++;
         const right = parseTerm();
   
         if (operator === '+') {
           left += right;
         } else {
           left -= right;
         }
       }
   
       return left;
    }
   
    function parseFactor() {
       let token = tokens[idx];
       idx++;
   
       if (token === '(') {
         const result = parseExpression();
         idx++; 
         return result;
       } else {
         return parseInt(token);
       }
    }
   
    return parseExpression();
   }
   
   
   const expression = "2 * (5 + 4) - 5 / 2";
   const result = parseExpression(expression);
   console.log(`Result: ${result}`);