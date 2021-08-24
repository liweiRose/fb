import { inquirerDir } from "../utils";
import { prompt } from "inquirer";

export async function ensureProjectDir(projectName: string) {
  if (!projectName) {
    const { name } = await prompt({
      type: "input",
      name: "name",
      message: "To continue, you must enter a project name：",
    });
    projectName = name;
  }
  return await inquirerDir(projectName);
}
