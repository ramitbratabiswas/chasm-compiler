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
    { regex: /^[0-9.]+/, type: "number" },
    { regex: new RegExp(`^(${keywords.join("|")})`), type: "keyword" },
    { regex: /^\s+/, type: "whitespace" },
    { regex: /^[\+\-\*\/\=\(\)]/, type: "operator" },
  ];

  while (index < input.length) {
    let matched: boolean = false;
    for (const matcher of regexMatchers) {
      const match : RegExpMatchArray | null = input.substring(index).match(matcher.regex);
      if (match) {
        if (matcher.type === "keyword") {
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