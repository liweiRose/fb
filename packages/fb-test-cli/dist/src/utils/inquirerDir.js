"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquirerDir = void 0;
const inquirer_1 = require("inquirer");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
async function inquirerDir(name, context = process.cwd()) {
    const fullPath = path_1.join(context, name);
    if (fs_extra_1.pathExistsSync(fullPath)) {
        const { rewrite } = await inquirer_1.prompt({
            type: "confirm",
            name: "rewrite",
            message: `路径 ${fullPath} 已存在, 是否将其覆盖？`,
        });
        if (rewrite) {
            fs_extra_1.removeSync(fullPath);
            fs_extra_1.mkdirSync(fullPath, {});
        }
    }
    else {
        fs_extra_1.mkdirSync(fullPath);
    }
    return { fullPath, name };
}
exports.inquirerDir = inquirerDir;
//# sourceMappingURL=inquirerDir.js.map