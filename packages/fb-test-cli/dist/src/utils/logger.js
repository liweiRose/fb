"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.warn = void 0;
const strip_ansi_1 = require("strip-ansi");
const chalk_1 = require("chalk");
function format(label, msg) {
    return msg
        .split("\n")
        .map((line, i) => {
        // 从字符串中去除 ANSI 转义码
        return i === 0
            ? `${label} ${line}`
            : line.padStart(strip_ansi_1.default(label).length + line.length + 1);
    })
        .join("\n");
}
function chalkTag(msg) {
    return chalk_1.bgBlackBright.white.dim(` ${msg} `);
}
function warn(msg, tag) {
    console.warn(format(chalk_1.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""), chalk_1.yellow(msg)));
}
exports.warn = warn;
function info(msg, tag) {
    console.log(format(chalk_1.bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg));
}
exports.info = info;
//# sourceMappingURL=logger.js.map