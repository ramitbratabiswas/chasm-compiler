import { match } from "assert";

export interface Token {
  type: string;
  value: string;
}

type regexMatcher = {
  regex: RegExp;
  type: string;
}

const keywords = ["add"];
export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let index = 0;

  const regexMatchers: regexMatcher[] = [
    { regex: /^\/\/.*/, type: "comment_token" },
    { regex: /^\s+/, type: "whitespace_token" },
    { regex: /^[0-9.]+/, type: "number_token" },
    { regex: new RegExp(`^(${keywords.join("|")})`), type: "keyword_token" }
  ];

  while (index < input.length) {
    let matched: boolean = false;
    for (const matcher of regexMatchers) {
      const match: RegExpMatchArray | null = input.substring(index).match(matcher.regex);
      if (match) {
        // ignores whitespace and comments
        if (matcher.type !== "whitespace_token" && matcher.type !== "comment_token") {
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