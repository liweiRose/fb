"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creator = void 0;
const presetOptions_1 = require("./presetOptions");
const structure_1 = require("./structure");
__exportStar(require("./generateProjectDir"), exports);
async function creator(options) {
    // 预处理配置
    options = await presetOptions_1.default(options);
    // 构造模板文件
    await structure_1.default(options);
}
exports.creator = creator;
//# sourceMappingURL=index.js.map