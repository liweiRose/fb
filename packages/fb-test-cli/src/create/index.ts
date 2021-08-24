import { LANG, APP_TYPE, LIBRARY, APPLICATION, ENV } from "../common/enum";

import presetOptions from "./presetOptions";
import structure from "./structure";

export * from "./generateProjectDir";

export interface CreateOption {
  // 语言
  lang?: LANG;
  // 类型
  type?: APP_TYPE;
  // 库类型
  library?: LIBRARY;
  // 应用类型
  application?: APPLICATION;
  // version
  version?: any;
  // 环境
  env?: ENV;
}

export interface CreatorOption extends CreateOption {
  // 项目路径
  projectPath: string;
}

export async function creator(options: CreatorOption) {
  // 预处理配置
  options = await presetOptions(options);

  // 构造模板文件
  await structure(options);
}
