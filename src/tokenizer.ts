import { match } from "assert";

export interface Token {
  type: string;
  value: string;
}

type regexMatcher = {
  regex: RegExp;
  type: string;
}

const keywords = ["print", "var", "setpixel", "while", "endwhile"];

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let index = 0;

  const regexMatchers: regexMatcher[] = [
    { regex: /^\/\/.*/, type: "comment" },
    { regex: /^\s+/, type: "whitespace" },
    { regex: /^[0-9.]+/, type: "number" },
    { regex: new RegExp(`^(${keywords.join("|")})`), type: "keyword" },
    { regex: /^"([^"]*)"/, type: "string" },
    { regex: /^[\+\-\*\/\=\(\)]/, type: "operator" },
    { regex: /^(true|false)/, type: "boolean" },
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: "identifier" },
    { regex: /^[{}[\];]/, type: "special" }
  ];

  while (index < input.length) {
    let matched: boolean = false;
    for (const matcher of regexMatchers) {
      const match: RegExpMatchArray | null = input.substring(index).match(matcher.regex);
      if (match) {
        // ignores whitespace and comments
        if (matcher.type !== "whitespace" && matcher.type !== "comment") {
          tokens.push({ type: matcher.type, value: match[0] });
        }
        index += match[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) throw new Error(` cannot identify token at index ${index}`);
  }

  return tokens;
}