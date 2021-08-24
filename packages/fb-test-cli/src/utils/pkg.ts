import { existsSync } from "fs";
import { join } from "path";
import readPackage from "read-pkg";

// read-pkg 7.0.0 版本 Pure ESM
export function resolvePkg(context: string) {
  if (existsSync(join(context, "package.json"))) {
    return readPackage({ cwd: context });
  }
  return {};
}
