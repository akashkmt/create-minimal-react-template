#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import _default from "../src/index.mjs";
const { copyTemplates } = _default; // Import your copy logic

async function getUserInputs() {
  // Step 1: Prompt the user for inputs
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your React project?",
      default: "my-react-app", // Default value if the user presses Enter
    },
    {
      type: "confirm",
      name: "addReadme",
      message: "Would you like to include a README file?",
      default: true, // Default value for yes/no questions
    },
  ]);

  return answers;
}

async function main() {
  console.log("Welcome to Create React Template!");

  try {
    // Step 2: Get user inputs
    const { projectName, addReadme } = await getUserInputs();

    // Step 3: Create the target directory
    const TARGET_DIR = join(process.cwd(), projectName);
    if (!existsSync(TARGET_DIR)) {
      mkdirSync(TARGET_DIR, { recursive: true });
    }

    console.log(`Generating React project in: ${TARGET_DIR}`);

    // Step 4: Copy templates
    copyTemplates(TARGET_DIR);

    // Step 5: Optionally add a README file
    if (addReadme) {
      const readmePath = join(TARGET_DIR, "README.md");
      writeFileSync(
        readmePath,
        `# ${projectName}\n\nGenerated with Create React Template.`
      );
      console.log("README file added.");
    }

    console.log("React project created successfully!");
  } catch (error) {
    console.error(
      "An error occurred while creating the React project:",
      error.message
    );
  }
}

main();
