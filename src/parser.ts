import { Token } from "./tokenizer";
export interface ASTNode {
  type: string;
  [key: string]: any;
}

export const parse = (tokens: Token[]): ASTNode[] => {
  const ast: ASTNode[] = [];
  let index = 0;

  // go to next token
  const eatToken = () => tokens[index++];

  while (index < tokens.length) {
    const token = tokens[index];

    if (token.type === "keyword") {
      switch (token.value) {
        case "print":
          ast.push(parsePrintStatement(eatToken));
          break;
        // !!!TODO: add more keyword token value cases
        default:
          throw new Error(`unknown keyword ${token.value}`);
      }
    } else {
      // !!!TODO: add more token type cases
      throw new Error(`unknown token type ${token.type}`);
    }
  }
  return ast;
}

function parsePrintStatement(eatToken: () => Token): ASTNode {
  const keywordToken = eatToken();
  const expressionToken = eatToken();

  if (expressionToken.type !== "number") {
    throw new Error(`Expected number after 'print', found: ${expressionToken.value}`);
  }

  return {
    type: "printStatement",
    expression: {
      type: "numberLiteral",
      value: parseFloat(expressionToken.value),
    },
  };
}