import type { CreatorOption } from ".";
import { prompt } from "inquirer";
import { cyan, red } from "chalk";
import {
  APP_TYPE,
  LANG,
  APPLICATION,
  VERSION_REACT,
  VERSION_VUE,
  ENV,
  LIBRARY,
} from "../common/enum";
import { enumContains, warn, info } from "../utils";

// 交互选择 写的有点啰嗦 可以抽象成配置，进行组合
async function promptList<E>({
  enums,
  inputValue,
  defaultValue,
  message,
  choices,
}: {
  enums: Record<string, any>;
  inputValue?: E;
  defaultValue: E;
  message: string;
  choices: Record<string, any>[];
}) {
  if (!enumContains(enums, inputValue)) {
    if (!inputValue) {
      const { answer } = await prompt<{ answer: E }>({
        type: "list",
        name: "answer",
        message: `${message}:`,
        choices,
        default: defaultValue,
      });
      return answer;
    } else {
      warn(
        `无效的输入 ${red(inputValue)}，系统已重置为默认值 ${cyan(
          defaultValue
        )}`
      );
      return defaultValue;
    }
  }
  return inputValue;
}

const typePromptOptions = {
  message: "要创建项目的类型",
  choices: [
    {
      value: APP_TYPE.APP,
      name: "Application (集成 Vue/React/Angular 之一前端框架的最佳实践，生成符合 nut 规范的应用程序)",
    },
    {
      value: APP_TYPE.LIB,
      name: "Library     (集成 JS/TS 基础库的最佳实践，生成符合 nut 规范的库)",
    },
  ],
};

const langPromptOptions = {
  message: "所想使用的语言",
  choices: [
    {
      value: LANG.JS,
      name: "JavaScript (我们推荐您使用 TypeScript 虽然我们提供了 JavaScript 选择)",
    },
    {
      value: LANG.TS,
      name: "TypeScript",
    },
  ],
};

const applicationPromptOptions = {
  message: "所想使用的框架:",
  choices: [
    {
      value: APPLICATION.VUE,
      name: "Vue.js",
    },
    {
      value: APPLICATION.REACT,
      name: "React.js",
    },
    {
      value: APPLICATION.ANGULAR,
      name: "Angular (尚未支持，敬请期待！)",
      disabled: true,
    },
  ],
};

const vueVersionPromptOptions = {
  message: "对应框架版本",
  choices: [
    {
      value: VERSION_VUE.OLD,
      name: "2.x",
    },
    {
      value: VERSION_VUE.NEXT,
      name: "3.x",
    },
  ],
};

const reactVersionPromptOptions = {
  message: "对应框架版本",
  choices: [
    {
      value: VERSION_REACT.CLASS,
      name: "class （表示 16.7 版本之前）",
    },
    {
      value: VERSION_REACT.HOOK,
      name: "hook （表示 16.8 版本之后）",
    },
  ],
};

async function getApplicationAndVersion(inputValue?: APPLICATION) {
  const application = await promptList<APPLICATION>({
    enums: APPLICATION,
    inputValue,
    defaultValue: APPLICATION.VUE,
    ...applicationPromptOptions,
  });

  let version;
  if (application === APPLICATION.VUE) {
    version = await promptList<VERSION_VUE>({
      enums: VERSION_VUE,
      defaultValue: VERSION_VUE.NEXT,
      ...vueVersionPromptOptions,
    });
  }
  if (application === APPLICATION.REACT) {
    version = await promptList<VERSION_REACT>({
      enums: VERSION_REACT,
      defaultValue: VERSION_REACT.HOOK,
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
      value: LIBRARY.CLI,
    },
    {
      name: "Common JavaScript/TypeScript Library",
      value: LIBRARY.COMMON,
    },
    {
      name: "React/Vue/Angular Component Library",
      value: LIBRARY.COMPONENT,
    },
  ],
};
// 预设配置信息
export default async function (options: CreatorOption) {
  info("在创建项目之前，我们想先征询您几个问题，旨在为您定制化生成所需！");

  // 项目类型：application | library
  const type = await promptList<APP_TYPE>({
    enums: APP_TYPE,
    inputValue: options.type,
    defaultValue: APP_TYPE.LIB,
    ...typePromptOptions,
  });

  // 选择语言：JavaScript | TypeScript
  const lang = await promptList<LANG>({
    enums: LANG,
    inputValue: options.lang,
    defaultValue: LANG.TS,
    ...langPromptOptions,
  });

  // 应用程序
  if (type === APP_TYPE.APP) {
    // 选择应用类型/框架
    const { version, application } = await getApplicationAndVersion(
      options.application
    );

    return {
      type,
      lang,
      application,
      version,
      env: ENV.BROWSER,
      projectPath: options.projectPath,
    };
  }

  if (type === APP_TYPE.LIB) {
    // 选择库类型
    const library = await promptList<LIBRARY>({
      enums: LIBRARY,
      inputValue: options.library,
      defaultValue: LIBRARY.COMMON,
      ...libraryPromptOptions,
    });

    if (library === LIBRARY.COMPONENT) {
      const { version, application } = await getApplicationAndVersion(
        options.application
      );
      return {
        type,
        lang,
        library,
        application,
        version,
        env: ENV.BROWSER,
        projectPath: options.projectPath,
      };
    }
    return {
      type,
      lang,
      library,
      env: LIBRARY.CLI ? ENV.NODE : ENV.COMMON,
      projectPath: options.projectPath,
    };
  }

  return options;
}
