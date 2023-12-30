 
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    constructor(sourceCode) {
        this.sourceCode = sourceCode;
        this.position = 0;
        this.currentChar = this.sourceCode[this.position];
    }

    nextToken() {
        let token;

        const keyword = this.checkForKeyword();
        if (keyword) {
            token = new Token('KEYWORD', keyword);
            this.consumeChars(keyword.length);
            return token;
        }

        if (this.currentChar === '+') {
            token = new Token('PLUS', '+');
        } else if (this.currentChar === '-') {
            token = new Token('MINUS', '-');
        } else if (this.currentChar === '*') {
            token = new Token('MULTIPLY', '*');
        } else if (this.currentChar === '/') {
            token = new Token('DIVIDE', '/');
        } else if (this.currentChar === '(') {
            token = new Token('LPAREN', '(');
        } else if (this.currentChar === ')') {
            token = new Token('RPAREN', ')');
        } else if (this.currentChar === '{') {
            token = new Token('LBRACE', '{');
        } else if (this.currentChar === '}') {
            token = new Token('RBRACE', '}');
        } else if (this.currentChar === ';') {
            token = new Token('SEMICOLON', ';');
        } else if (this.currentChar === '=') {
            token = new Token('ASSIGN', '=');
        } else if (this.currentChar === '=') {
            const nextChar = this.peekNextChar();
            if (nextChar === '=') {
                token = new Token('EQUAL', '==');
                this.consumeChars(2);
            } else {
                token = new Token('ASSIGN', '=');
                this.consumeChar();
            }
        } else if (/\d/.test(this.currentChar)) {
            const value = this.consumeNumber();
            token = new Token('NUMERIC', value);
        } else if (/[a-zA-Z_]/.test(this.currentChar)) {
            const value = this.consumeIdentifier();
            token = new Token('IDENTIFIER', value);
        } else if (/\s/.test(this.currentChar)) {
            this.consumeWhitespace();
            return this.nextToken();
        } else if (this.currentChar === null) {
            token = new Token('EOF', null);
        } else {
            throw new Error('Invalid character: ' + this.currentChar);
        }

        this.consumeChar();
        return token;
    }

    checkForKeyword() {
        const keywords = ['int', 'float', 'double','if','else'];
        for (const keyword of keywords) {
            if (this.sourceCode.startsWith(keyword, this.position)) {
                return keyword;
            }
        }
        return null;
    }

    consumeChars(count) {
        for (let i = 0; i < count; i++) {
            this.consumeChar();
        }
    }

    consumeNumber() {
        let value = '';
        while (/\d/.test(this.currentChar)) {
            value += this.currentChar;
            this.consumeChar();
        }
        if (this.currentChar === '.') {
            value += this.currentChar;
            this.consumeChar();
            while (/\d/.test(this.currentChar)) {
                value += this.currentChar;
                this.consumeChar();
            }
        }
        return value;
    }

    consumeIdentifier() {
        let value = '';
        while (/[a-zA-Z_]/.test(this.currentChar) || /\d/.test(this.currentChar)) {
            value += this.currentChar;
            this.consumeChar();
        }
        return value;
    }

    consumeWhitespace() {
        while (/\s/.test(this.currentChar)) {
            this.consumeChar();
        }
    }

    consumeChar() {
        this.position++;
        this.currentChar = this.sourceCode[this.position];
    }

    peekNextChar() {
        const nextPosition = this.position + 1;
        return this.sourceCode[nextPosition];
    }
}

const sourceCode = `float o=1.7;
if(o==10) o=5; else o=1; int x = 5;`;
const lexer = new Lexer(sourceCode);
let token = lexer.nextToken();

while (token.type !== 'EOF') {
    console.log(`${token.type}: ${token.value}`);
    token = lexer.nextToken();
}