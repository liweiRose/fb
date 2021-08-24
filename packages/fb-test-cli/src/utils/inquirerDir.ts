import { prompt } from "inquirer";
import { removeSync, pathExistsSync, mkdirSync } from "fs-extra";
import { join } from "path";

export async function inquirerDir(name: string, context = process.cwd()) {
  const fullPath = join(context, name);

  if (pathExistsSync(fullPath)) {
    const { rewrite } = await prompt({
      type: "confirm",
      name: "rewrite",
      message: `路径 ${fullPath} 已存在, 是否将其覆盖？`,
    });
    if (rewrite) {
      removeSync(fullPath);
      mkdirSync(fullPath, {});
    }
  } else {
    mkdirSync(fullPath);
  }

  return { fullPath, name };
}
