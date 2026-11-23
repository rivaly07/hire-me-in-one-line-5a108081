#!/usr/bin/env node
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The entry text constant (must match main.ts)
const ENTRY_TEXT =
  "I reverse-engineer the private API, ship the typed client, and leave a test that fails the moment the contract drifts.";

function runMain(outputDir) {
  const result = spawnSync("node", ["--experimental-strip-types", "main.ts"], {
    cwd: __dirname,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outputDir },
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(`main.ts exited with code ${result.status}: ${result.stderr}`);
  }

  // Parse the output line: path length sha256
  const stdout = result.stdout.trim();
  const [path, lengthStr, sha256] = stdout.split(" ");
  const length = parseInt(lengthStr, 10);

  if (!path || !length || !sha256) {
    throw new Error(`Unexpected output from main.ts: ${stdout}`);
  }

  return { path, bytes: length, sha256 };
}

function sha256File(filePath) {
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

function main() {
  const tmpBase = join(__dirname, ".verify_tmp");

  // Clean up any previous run
  if (existsSync(tmpBase)) {
    rmSync(tmpBase, { recursive: true, force: true });
  }
  mkdirSync(tmpBase, { recursive: true });

  const dir1 = join(tmpBase, "run1");
  const dir2 = join(tmpBase, "run2");
  mkdirSync(dir1, { recursive: true });
  mkdirSync(dir2, { recursive: true });

  console.log("Running main.ts in first temp directory...");
  const run1 = runMain(dir1);

  console.log("Running main.ts in second temp directory...");
  const run2 = runMain(dir2);

  // Read both entry.txt files
  const file1 = join(dir1, "entry.txt");
  const file2 = join(dir2, "entry.txt");

  if (!existsSync(file1) || !existsSync(file2)) {
    throw new Error("entry.txt not created in one or both runs");
  }

  const content1 = readFileSync(file1, "utf8");
  const content2 = readFileSync(file2, "utf8");

  const bytes1 = Buffer.byteLength(content1, "utf8");
  const bytes2 = Buffer.byteLength(content2, "utf8");

  const sha1 = sha256File(file1);
  const sha2 = sha256File(file2);

  // Assertions
  console.log("\n--- Verification Results ---");
  console.log(`Run 1: ${bytes1} bytes, sha256: ${sha1}`);
  console.log(`Run 2: ${bytes2} bytes, sha256: ${sha2}`);

  // 1. Byte-for-byte identical
  if (content1 !== content2) {
    throw new Error("FAIL: Output files differ byte-for-byte");
  }
  console.log("✓ Output files are byte-for-byte identical");

  // 2. Length 1-200 characters
  const charCount = content1.length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`FAIL: Character count ${charCount} not in range 1-200`);
  }
  console.log(`✓ Character count: ${charCount} (1-200)`);

  // 3. Not only whitespace
  if (content1.trim().length === 0) {
    throw new Error("FAIL: Output is only whitespace");
  }
  console.log("✓ Output contains non-whitespace characters");

  // 4. Matches the constant
  if (content1 !== ENTRY_TEXT) {
    throw new Error("FAIL: Output does not match ENTRY_TEXT constant");
  }
  console.log("✓ Output matches ENTRY_TEXT constant");

  // 5. SHA256 matches reported
  if (sha1 !== run1.sha256 || sha2 !== run2.sha256) {
    throw new Error("FAIL: Computed SHA256 differs from main.ts reported SHA256");
  }
  console.log("✓ SHA256 matches main.ts reported values");

  // Cleanup
  rmSync(tmpBase, { recursive: true, force: true });

  console.log("\n✅ All verifications passed");
}

main();