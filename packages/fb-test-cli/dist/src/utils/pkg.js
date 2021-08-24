"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePkg = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const read_pkg_1 = require("read-pkg");
// read-pkg 7.0.0 版本 Pure ESM
function resolvePkg(context) {
    if (fs_1.existsSync(path_1.join(context, "package.json"))) {
        return read_pkg_1.default({ cwd: context });
    }
    return {};
}
exports.resolvePkg = resolvePkg;
//# sourceMappingURL=pkg.js.map