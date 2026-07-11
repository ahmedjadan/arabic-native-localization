#!/usr/bin/env node
"use strict";

/**
 * Installer for the `arabic-native-localization` skill.
 *
 * Copies the bundled `skill/` folder into a Claude skills directory so that
 * Claude Code (and other Claude Agent SDK hosts) can discover and load it.
 *
 * Usage:
 *   npx arabic-native-localization            # install to ~/.claude/skills
 *   npx arabic-native-localization --project  # install to ./.claude/skills
 *   npx arabic-native-localization --dir <p>  # install into <p>/<skill-name>
 *   npx arabic-native-localization --force    # overwrite an existing copy
 *   npx arabic-native-localization --help
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_NAME = "arabic-native-localization";
const PKG_ROOT = path.resolve(__dirname, "..");
const SKILL_SRC = path.join(PKG_ROOT, "skill");

// Small ANSI helpers — degrade gracefully when output is not a TTY.
const useColor = process.stdout.isTTY && process.env.NO_COLOR === undefined;
const paint = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = (s) => paint("1", s);
const green = (s) => paint("32", s);
const yellow = (s) => paint("33", s);
const red = (s) => paint("31", s);
const dim = (s) => paint("2", s);

function parseArgs(argv) {
  const opts = { target: "global", dir: null, force: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--force" || a === "-f") opts.force = true;
    else if (a === "--project" || a === "--local" || a === "-p") opts.target = "project";
    else if (a === "--global" || a === "-g") opts.target = "global";
    else if (a === "--dir" || a === "-d") opts.dir = argv[++i];
    else {
      console.error(red(`Unknown argument: ${a}`));
      opts.help = true;
    }
  }
  return opts;
}

function printHelp() {
  console.log(`
${bold("arabic-native-localization")} — install the Arabic UI-copy skill for Claude

${bold("Usage")}
  npx arabic-native-localization [options]

${bold("Options")}
  -p, --project      Install into ./.claude/skills (this project only)
  -g, --global       Install into ~/.claude/skills (default, all projects)
  -d, --dir <path>   Install into <path>/${SKILL_NAME}
  -f, --force        Overwrite an existing installation
  -h, --help         Show this help

${bold("Examples")}
  npx arabic-native-localization           ${dim("# ~/.claude/skills/" + SKILL_NAME)}
  npx arabic-native-localization --project ${dim("# ./.claude/skills/" + SKILL_NAME)}
`);
}

// Recursive copy that works on any Node >= 12 (no fs.cpSync dependency).
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function resolveSkillsDir(opts) {
  if (opts.dir) return path.resolve(opts.dir);
  if (opts.target === "project") return path.resolve(process.cwd(), ".claude", "skills");
  return path.join(os.homedir(), ".claude", "skills");
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) return printHelp();

  if (!fs.existsSync(path.join(SKILL_SRC, "SKILL.md"))) {
    console.error(red("Bundled skill files are missing — the package looks corrupt."));
    process.exit(1);
  }

  const skillsDir = resolveSkillsDir(opts);
  const dest = path.join(skillsDir, SKILL_NAME);

  if (fs.existsSync(dest) && !opts.force) {
    console.error(
      yellow(`\nAlready installed at:\n  ${dest}\n`) +
        `Re-run with ${bold("--force")} to overwrite.\n`
    );
    process.exit(1);
  }

  try {
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    copyDir(SKILL_SRC, dest);
  } catch (err) {
    console.error(red(`\nInstall failed: ${err.message}`));
    if (err.code === "EACCES") {
      console.error(dim(`No write permission for ${skillsDir}. Try a different --dir.`));
    }
    process.exit(1);
  }

  console.log(
    `\n${green("✓")} Installed ${bold(SKILL_NAME)}\n` +
      `  ${dim("→")} ${dest}\n\n` +
      `Restart Claude Code (or start a new session) and it will load automatically\n` +
      `whenever you work on Arabic locale text. Invoke it directly with:\n` +
      `  ${bold("/" + SKILL_NAME)}\n`
  );
}

main();
