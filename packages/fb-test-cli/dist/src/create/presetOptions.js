"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const chalk_1 = require("chalk");
const enum_1 = require("../common/enum");
const utils_1 = require("../utils");
// 交互选择 写的有点啰嗦 可以抽象成配置，进行组合
async function promptList({ enums, inputValue, defaultValue, message, choices, }) {
    if (!utils_1.enumContains(enums, inputValue)) {
        if (!inputValue) {
            const { answer } = await inquirer_1.prompt({
                type: "list",
                name: "answer",
                message: `${message}:`,
                choices,
                default: defaultValue,
            });
            return answer;
        }
        else {
            utils_1.warn(`无效的输入 ${chalk_1.red(inputValue)}，系统已重置为默认值 ${chalk_1.cyan(defaultValue)}`);
            return defaultValue;
        }
    }
    return inputValue;
}
const typePromptOptions = {
    message: "要创建项目的类型",
    choices: [
        {
            value: enum_1.APP_TYPE.APP,
            name: "Application (集成 Vue/React/Angular 之一前端框架的最佳实践，生成符合 nut 规范的应用程序)",
        },
        {
            value: enum_1.APP_TYPE.LIB,
            name: "Library     (集成 JS/TS 基础库的最佳实践，生成符合 nut 规范的库)",
        },
    ],
};
const langPromptOptions = {
    message: "所想使用的语言",
    choices: [
        {
            value: enum_1.LANG.JS,
            name: "JavaScript (我们推荐您使用 TypeScript 虽然我们提供了 JavaScript 选择)",
        },
        {
            value: enum_1.LANG.TS,
            name: "TypeScript",
        },
    ],
};
const applicationPromptOptions = {
    message: "所想使用的框架:",
    choices: [
        {
            value: enum_1.APPLICATION.VUE,
            name: "Vue.js",
        },
        {
            value: enum_1.APPLICATION.REACT,
            name: "React.js",
        },
        {
            value: enum_1.APPLICATION.ANGULAR,
            name: "Angular (尚未支持，敬请期待！)",
            disabled: true,
        },
    ],
};
const vueVersionPromptOptions = {
    message: "对应框架版本",
    choices: [
        {
            value: enum_1.VERSION_VUE.OLD,
            name: "2.x",
        },
        {
            value: enum_1.VERSION_VUE.NEXT,
            name: "3.x",
        },
    ],
};
const reactVersionPromptOptions = {
    message: "对应框架版本",
    choices: [
        {
            value: enum_1.VERSION_REACT.CLASS,
            name: "class （表示 16.7 版本之前）",
        },
        {
            value: enum_1.VERSION_REACT.HOOK,
            name: "hook （表示 16.8 版本之后）",
        },
    ],
};
async function getApplicationAndVersion(inputValue) {
    const application = await promptList({
        enums: enum_1.APPLICATION,
        inputValue,
        defaultValue: enum_1.APPLICATION.VUE,
        ...applicationPromptOptions,
    });
    let version;
    if (application === enum_1.APPLICATION.VUE) {
        version = await promptList({
            enums: enum_1.VERSION_VUE,
            defaultValue: enum_1.VERSION_VUE.NEXT,
            ...vueVersionPromptOptions,
        });
    }
    if (application === enum_1.APPLICATION.REACT) {
        version = await promptList({
            enums: enum_1.VERSION_REACT,
            defaultValue: enum_1.VERSION_REACT.HOOK,
            ...reactVersionPromptOptions,
        });
    }
    return { application, version };
}
const libraryPromptOptions = {
    message: "库类型",
    choices: [
        {
            name: "Command-Line Interface Library",
            value: enum_1.LIBRARY.CLI,
        },
        {
            name: "Common JavaScript/TypeScript Library",
            value: enum_1.LIBRARY.COMMON,
        },
        {
            name: "React/Vue/Angular Component Library",
            value: enum_1.LIBRARY.COMPONENT,
        },
    ],
};
// 预设配置信息
async function default_1(options) {
    utils_1.info("在创建项目之前，我们想先征询您几个问题，旨在为您定制化生成所需！");
    // 项目类型：application | library
    const type = await promptList({
        enums: enum_1.APP_TYPE,
        inputValue: options.type,
        defaultValue: enum_1.APP_TYPE.LIB,
        ...typePromptOptions,
    });
    // 选择语言：JavaScript | TypeScript
    const lang = await promptList({
        enums: enum_1.LANG,
        inputValue: options.lang,
        defaultValue: enum_1.LANG.TS,
        ...langPromptOptions,
    });
    // 应用程序
    if (type === enum_1.APP_TYPE.APP) {
        // 选择应用类型/框架
        const { version, application } = await getApplicationAndVersion(options.application);
        return {
            type,
            lang,
            application,
            version,
            env: enum_1.ENV.BROWSER,
            projectPath: options.projectPath,
        };
    }
    if (type === enum_1.APP_TYPE.LIB) {
        // 选择库类型
        const library = await promptList({
            enums: enum_1.LIBRARY,
            inputValue: options.library,
            defaultValue: enum_1.LIBRARY.COMMON,
            ...libraryPromptOptions,
        });
        if (library === enum_1.LIBRARY.COMPONENT) {
            const { version, application } = await getApplicationAndVersion(options.application);
            return {
                type,
                lang,
                library,
                application,
                version,
                env: enum_1.ENV.BROWSER,
                projectPath: options.projectPath,
            };
        }
        return {
            type,
            lang,
            library,
            env: enum_1.LIBRARY.CLI ? enum_1.ENV.NODE : enum_1.ENV.COMMON,
            projectPath: options.projectPath,
        };
    }
    return options;
}
exports.default = default_1;
//# sourceMappingURL=presetOptions.js.map