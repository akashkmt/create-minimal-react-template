#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import copyTemplate from "../src/index.mjs";

async function getUserInputs() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your React project?",
      default: "minimal-react-app",
    },
  ]);

  return answers;
}

async function createTemplate() {
  console.log("Welcome to Create React Template!");

  try {
    const { projectName } = await getUserInputs();

    const TARGET_DIR = join(process.cwd(), projectName);

    if (!existsSync(TARGET_DIR)) {
      mkdirSync(TARGET_DIR, { recursive: true });
    }

    copyTemplate(TARGET_DIR);

    console.log("React project created successfully!");
    console.log(`cd ${projectName}`);
    console.log("npm install");
    console.log("npm run dev");
  } catch (error) {
    console.error(
      "An error occurred while creating the React project:",
      error.message
    );
  }
}

createTemplate();
