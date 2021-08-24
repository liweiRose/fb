"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const package_json_1 = require("../package.json");
const create_1 = require("./create");
const constant_1 = require("./common/constant");
const cli = cac_1.cac("fb-create-app");
cli
    .command("create [root]")
    .option("-t, --type", `[library | application] 创建项目的类型 (默认: library )`)
    .option("-lang, --language", `[typescript | javascript] 创建项目的语言 (默认: typescript )`)
    .option("-lib, --library", `[cli | common | component] 库项目的类型 (默认: common )`)
    .option("-app, --application", `[vue | react | angular] 应用项目的类型/框架 (默认: Vue )`)
    .option("-env, --environment", `['browser' | 'node' | 'common'] 项目所属环境 (默认: common )`)
    .action(async (root, options) => {
    const { fullPath } = await create_1.ensureProjectDir(root);
    create_1.creator({
        ...options,
        projectPath: fullPath,
    });
}).description = constant_1.CLI_CREATE_DESCRIPTION;
cli.help();
cli.version(package_json_1.version);
cli.parse();
//# sourceMappingURL=index.js.map