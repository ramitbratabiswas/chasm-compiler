import { tokenize } from "./tokenizer";
import { parse } from "./parser";

const sourceCode = `
print 200
`;

const tokens = tokenize(sourceCode);
const ast = parse(tokens);

console.log("Tokens:", tokens);
console.log("AST:", ast);