"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureProjectDir = void 0;
const utils_1 = require("../utils");
const inquirer_1 = require("inquirer");
async function ensureProjectDir(projectName) {
    if (!projectName) {
        const { name } = await inquirer_1.prompt({
            type: "input",
            name: "name",
            message: "To continue, you must enter a project name：",
        });
        projectName = name;
    }
    return await utils_1.inquirerDir(projectName);
}
exports.ensureProjectDir = ensureProjectDir;
//# sourceMappingURL=generateProjectDir.js.map