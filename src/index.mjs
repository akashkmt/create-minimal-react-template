import { cp } from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyTemplate(targetDir) {
  const templateDir = path.join(__dirname, "template");
  try {
    await cp(templateDir, targetDir, { recursive: true });
  } catch (error) {
    console.error("Failed to copy templates:", error);
  }
}

export default copyTemplate;
