#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("rtk-quickstart")
  .description(
    "Scaffold a production-ready React project with Redux Toolkit + RTK Query"
  )
  .version("1.0.0")
  .argument("<project-name>", "Name of the project to create")
  .option("--typescript, --ts", "Use TypeScript template")
  .option("--auth", "Include authentication module (token storage, auto headers, login/logout)")
  .option("--skip-install", "Skip npm install after scaffolding")
  .action(async (projectName, options) => {
    const targetDir = path.resolve(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.log(
        chalk.red(`\n✖ Directory "${projectName}" already exists. Aborting.\n`)
      );
      process.exit(1);
    }

    const useTS = options.typescript || options.ts;
    const useAuth = options.auth;
    const templateName = useTS ? "template-ts" : "template";
    const templateDir = path.resolve(__dirname, "..", templateName);

    console.log();
    console.log(
      chalk.bold.cyan("  rtk-quickstart") +
        chalk.gray(" — Production-ready RTK Query scaffold")
    );
    console.log();

    const spinner = ora("Scaffolding project...").start();

    try {
      fs.copySync(templateDir, targetDir);

      const pkgPath = path.join(targetDir, "package.json");
      const pkg = fs.readJsonSync(pkgPath);
      pkg.name = projectName;
      fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });

      if (useAuth) {
        const authTemplateSuffix = useTS ? "template-ts" : "template";
        const authSourceDir = path.resolve(
          __dirname,
          "..",
          authTemplateSuffix,
          "src",
          "features"
        );
        const authTargetDir = path.join(targetDir, "src", "features");
        fs.ensureDirSync(authTargetDir);

        const authSliceName = useTS ? "authSlice.ts" : "authSlice.js";
        const authSliceSrc = path.join(authSourceDir, authSliceName);
        if (fs.existsSync(authSliceSrc)) {
          fs.copySync(authSliceSrc, path.join(authTargetDir, authSliceName));
        }

        const authApiName = useTS ? "authApi.ts" : "authApi.js";
        const authApiSrc = path.join(
          __dirname,
          "..",
          authTemplateSuffix,
          "src",
          "services",
          authApiName
        );
        if (fs.existsSync(authApiSrc)) {
          const authApiTarget = path.join(
            targetDir,
            "src",
            "services",
            authApiName
          );
          fs.copySync(authApiSrc, authApiTarget);
        }
      } else {
        const ext = useTS ? ".ts" : ".js";
        const authSlice = path.join(targetDir, "src", "features", `authSlice${ext}`);
        const authApi = path.join(targetDir, "src", "services", `authApi${ext}`);
        fs.removeSync(authSlice);
        fs.removeSync(authApi);
      }

      spinner.succeed("Project scaffolded");

      if (!options.skipInstall) {
        const installSpinner = ora("Installing dependencies...").start();
        try {
          execSync("npm install", {
            cwd: targetDir,
            stdio: "pipe",
          });
          installSpinner.succeed("Dependencies installed");
        } catch {
          installSpinner.warn(
            "Could not install dependencies. Run `npm install` manually."
          );
        }
      } else {
        console.log(
          chalk.yellow("  ⚠  Skipped npm install. Run it manually when ready.")
        );
      }

      console.log();
      console.log(chalk.green.bold("  ✔ Project is ready!"));
      console.log();
      console.log("  Next steps:");
      console.log();
      console.log(chalk.cyan(`    cd ${projectName}`));
      if (options.skipInstall) {
        console.log(chalk.cyan("    npm install"));
      }
      console.log(chalk.cyan("    npm run dev"));
      console.log();
      console.log(chalk.gray("  Folder structure:"));
      console.log(chalk.gray("    src/"));
      console.log(chalk.gray("    ├── app/store" + (useTS ? ".ts" : ".js")));
      console.log(chalk.gray("    ├── services/"));
      console.log(chalk.gray("    │   ├── baseApi" + (useTS ? ".ts" : ".js")));
      console.log(chalk.gray("    │   └── userApi" + (useTS ? ".ts" : ".js")));
      console.log(chalk.gray("    ├── hooks/reduxHooks" + (useTS ? ".ts" : ".js")));
      if (useAuth) {
        console.log(
          chalk.gray("    ├── features/authSlice" + (useTS ? ".ts" : ".js"))
        );
      }
      console.log(chalk.gray("    └── App" + (useTS ? ".tsx" : ".jsx")));
      console.log();
      console.log(
        chalk.gray("  Happy building! 🚀 — Dhruv Johari")
      );
      console.log();
    } catch (err) {
      spinner.fail("Failed to scaffold project");
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  });

await program.parseAsync();
