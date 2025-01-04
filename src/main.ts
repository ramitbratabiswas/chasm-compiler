import { writeFileSync } from "fs";
import { tokenize } from "./tokenizer";
import { parse } from "./parser";
import { emit } from "./emitter";

const sourceCode = ` 42 `;

const tokens = tokenize(sourceCode);
const ast = parse(tokens);
const wasm = emit(ast);

console.log("Tokens:", tokens);
console.log("AST:", ast);
console.log("WASM:", wasm);

writeFileSync("res.wasm", wasm);