import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The chosen pitch — exported for verification
export const ENTRY_TEXT =
  "I reverse-engineer the private API, ship the typed client, and leave a test that fails the moment the contract drifts.";

function main(): void {
  // Validate the entry text
  if (!ENTRY_TEXT || ENTRY_TEXT.trim().length === 0) {
    console.error("Error: Entry text is empty or whitespace only");
    process.exit(1);
  }
  if (ENTRY_TEXT.length > 200) {
    console.error(`Error: Entry text exceeds 200 characters (${ENTRY_TEXT.length})`);
    process.exit(1);
  }

  // Determine output directory: MAKEFUN_OUTPUT_DIR env var or /output relative to script
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR
    ? resolve(__dirname, process.env.MAKEFUN_OUTPUT_DIR)
    : resolve(__dirname, "output");

  // Create directory if missing
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = resolve(outputDir, "entry.txt");

  // Write the entry text as UTF-8
  writeFileSync(outputPath, ENTRY_TEXT, "utf8");

  // Compute byte length and SHA256 for verification output
  const bytes = Buffer.from(ENTRY_TEXT, "utf8");
  const sha256 = createHash("sha256").update(bytes).digest("hex");

  // Print single-line summary: path, byte length, sha256
  console.log(`${outputPath} ${bytes.length} ${sha256}`);
}

main();