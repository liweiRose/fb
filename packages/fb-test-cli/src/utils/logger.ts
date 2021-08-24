import stripAnsi from "strip-ansi";
import { bgYellow, bgBlackBright, yellow, bgBlue } from "chalk";

function format(label: string, msg: string) {
  return msg
    .split("\n")
    .map((line, i) => {
      // 从字符串中去除 ANSI 转义码
      return i === 0
        ? `${label} ${line}`
        : line.padStart(stripAnsi(label).length + line.length + 1);
    })
    .join("\n");
}

function chalkTag(msg: string) {
  return bgBlackBright.white.dim(` ${msg} `);
}

export function warn(msg: string, tag?: string) {
  console.warn(
    format(bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""), yellow(msg))
  );
}

export function info(msg: string, tag?: string) {
  console.log(format(bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg));
}
