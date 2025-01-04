import { Token } from "./tokenizer";
export interface ASTNode {
  type: string;
  [key: string]: any;
}

const TokenTypes = [ "number_token" ]

export const parse = (tokens: Token[]): ASTNode[] => {
  const ast: ASTNode[] = [];
  let index = 0;

  // go to next token
  const eatToken = () => tokens[index++];

  while (index < tokens.length) {
    const token = eatToken();

    if (token.type === "number_token") {
      ast.push({ type: "number", value: token.value });
    } else {
      // !!!TODO: add more token type cases
      throw new Error(`unknown token type ${token.type}`);
    }
  }
  return ast;
}

function parseAddStatement(eatToken: () => Token): ASTNode {
  const addKeyWord = eatToken();
  const num1 = eatToken(), num2 = eatToken();
  console.log("num1: ", num1);
  console.log("num2: ", num2);
  return {
    type: "addFunc",
    operands: [
      { type: "numberLiteral", value: num1.value },
      { type: "numberLiteral", value: num2.value }
    ]
  }
}