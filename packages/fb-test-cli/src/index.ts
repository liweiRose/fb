import { cac } from "cac";
import { version } from "../package.json";
import { creator, ensureProjectDir } from "./create";
import type { CreateOption } from "./create";
import { CLI_CREATE_DESCRIPTION } from "./common/constant";

const cli = cac("fb-create-app");

cli
  .command("create [root]")
  .option(
    "-t, --type",
    `[library | application] 创建项目的类型 (默认: library )`
  )
  .option(
    "-lang, --language",
    `[typescript | javascript] 创建项目的语言 (默认: typescript )`
  )
  .option(
    "-lib, --library",
    `[cli | common | component] 库项目的类型 (默认: common )`
  )
  .option(
    "-app, --application",
    `[vue | react | angular] 应用项目的类型/框架 (默认: Vue )`
  )
  .option(
    "-env, --environment",
    `['browser' | 'node' | 'common'] 项目所属环境 (默认: common )`
  )
  .action(async (root: string, options: CreateOption) => {
    const { fullPath } = await ensureProjectDir(root);
    creator({
      ...options,
      projectPath: fullPath,
    });
  }).description = CLI_CREATE_DESCRIPTION;

cli.help();
cli.version(version);
cli.parse();
