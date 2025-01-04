import { tokenize } from "./tokenizer";

const sourceCode = `
print 200
// comment
setpixel false
`;

const tokens = tokenize(sourceCode);

console.log("Tokens:", tokens);