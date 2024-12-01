import { cp } from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyTemplates(targetDir) {
  const templateDir = path.join(__dirname, "templates");
  try {
    await cp(templateDir, targetDir, { recursive: true });
    console.log(`Templates copied to ${targetDir}`);
  } catch (error) {
    console.error("Failed to copy templates:", error);
  } finally {
    console.log("Template generation complete!");
  }
}

export default { copyTemplates };
