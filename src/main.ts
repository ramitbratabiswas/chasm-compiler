import { tokenize } from "./tokenizer";

const sourceCode = `
print 200
`;

const tokens = tokenize(sourceCode);

console.log("Tokens:", tokens);