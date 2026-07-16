#!/usr/bin/env node
/**
 * Compare an English source locale JSON file with an Arabic target.
 * Read-only — never mutates locale files.
 *
 * Usage:
 *   node skill/scripts/check-locale.mjs --source en.json --target ar.json
 *   node skill/scripts/check-locale.mjs --source en.json --target ar.json --check-extra --punctuation
 *   node skill/scripts/check-locale.mjs --source en.json --target ar.json --allowlist allow.json --format json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PLURAL_SUFFIXES = ["zero", "one", "two", "few", "many", "other"];
const ICU_SELECTORS = new Set([
  "zero",
  "one",
  "two",
  "few",
  "many",
  "other",
  "male",
  "female",
]);
const DEFAULT_ALLOWLIST = [
  "API",
  "GPS",
  "QR",
  "PDF",
  "Excel",
  "WhatsApp",
  "SaaS",
  "OK",
  "ID",
  "URL",
  "HTTP",
  "HTTPS",
  "SMS",
  "OTP",
];

function parseArgs(argv) {
  const opts = {
    source: null,
    target: null,
    checkExtra: false,
    punctuation: false,
    allowlist: null,
    format: "text",
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--source" || a === "-s") opts.source = argv[++i];
    else if (a === "--target" || a === "-t") opts.target = argv[++i];
    else if (a === "--check-extra") opts.checkExtra = true;
    else if (a === "--punctuation") opts.punctuation = true;
    else if (a === "--allowlist") opts.allowlist = argv[++i];
    else if (a === "--format") opts.format = argv[++i];
    else {
      console.error("Unknown argument: " + a);
      opts.help = true;
    }
  }
  return opts;
}

function printHelp() {
  console.log(`
check-locale — validate Arabic locale JSON against an English source

Usage
  node skill/scripts/check-locale.mjs --source <en.json> --target <ar.json> [options]

Options
  -s, --source <path>     English (source) locale JSON
  -t, --target <path>     Arabic (target) locale JSON
      --check-extra       Error on Arabic keys missing from English
      --punctuation       Warn on Western ? , ... in Arabic prose
      --allowlist <path>  JSON array of strings exempt from untranslated checks
      --format text|json  Output format (default: text)
  -h, --help              Show help
`);
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found: " + filePath);
  }
  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    throw new Error("Cannot read " + filePath + ": " + err.message);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error("Invalid JSON in " + filePath + ": " + err.message);
  }
}

function loadAllowlist(filePath) {
  const set = new Set(
    DEFAULT_ALLOWLIST.map(function (s) {
      return s.toLowerCase();
    })
  );
  if (!filePath) return set;
  const data = readJsonFile(filePath);
  if (!Array.isArray(data)) {
    throw new Error("Allowlist must be a JSON array of strings: " + filePath);
  }
  data.forEach(function (item) {
    if (typeof item === "string") set.add(item.toLowerCase());
  });
  return set;
}

function flatten(obj, prefix, out, unsupported) {
  if (obj === null || typeof obj !== "object") {
    out[prefix] = obj;
    return;
  }
  if (Array.isArray(obj)) {
    unsupported.push(prefix || "(root)");
    return;
  }
  const keys = Object.keys(obj).sort();
  if (keys.length === 0 && prefix) {
    out[prefix] = obj;
    return;
  }
  keys.forEach(function (key) {
    const next = prefix ? prefix + "." + key : key;
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, next, out, unsupported);
    } else if (Array.isArray(value)) {
      unsupported.push(next);
    } else {
      out[next] = value;
    }
  });
}

function flattenLocale(data) {
  const out = {};
  const unsupported = [];
  flatten(data, "", out, unsupported);
  return { flat: out, unsupported: unsupported };
}

function extractPlaceholders(str) {
  if (typeof str !== "string") return [];
  const found = new Set();

  // Collect mustache first, then remove so simple {name} does not double-count
  let working = str.replace(/\{\{\s*([a-zA-Z_][\w.]*)\s*\}\}/g, function (_full, name) {
    found.add("{{" + name + "}}");
    return "";
  });

  // Strip ICU plural/select blocks; keep named args and nested {arg}s
  working = working.replace(
    /\{[a-zA-Z_][\w]*\s*,\s*(?:plural|select|selectordinal)\s*,[\s\S]*?\}/g,
    function (block) {
      const named = block.match(/^\{([a-zA-Z_][\w]*)\s*,/);
      if (named) found.add("{" + named[1] + "}");
      const inner = block.matchAll(/\{([a-zA-Z_][\w]*)\}/g);
      for (const im of inner) {
        if (!ICU_SELECTORS.has(im[1])) found.add("{" + im[1] + "}");
      }
      return "";
    }
  );

  const simple = working.matchAll(/\{([a-zA-Z_][\w]*)\}/g);
  for (const m of simple) {
    if (!ICU_SELECTORS.has(m[1])) found.add("{" + m[1] + "}");
  }

  const printf = str.matchAll(/%(\d+\$)?[sdif]/g);
  for (const m of printf) found.add(m[0]);

  return Array.from(found).sort();
}

function setsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function looksLikeUrl(s) {
  return /^https?:\/\//i.test(s) || /^www\./i.test(s);
}

function looksLikeEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function looksLikeTechnical(s) {
  if (/^\.[a-z0-9]+$/i.test(s)) return true;
  if (/^[A-Z0-9._-]+$/.test(s) && s.length <= 32) return true;
  if (/^[0-9+().\s-]+$/.test(s)) return true;
  return false;
}

function latinRatio(s) {
  const letters = s.replace(/[^A-Za-z\u0600-\u06FF]/g, "");
  if (!letters.length) return 0;
  const latin = (letters.match(/[A-Za-z]/g) || []).length;
  return latin / letters.length;
}

function isSuspectedUntranslated(enVal, arVal, allowlist) {
  if (typeof arVal !== "string" || typeof enVal !== "string") return false;
  const arTrim = arVal.trim();
  const enTrim = enVal.trim();
  if (!arTrim) return false;

  if (allowlist.has(arTrim.toLowerCase())) return false;
  if (looksLikeUrl(arTrim) || looksLikeEmail(arTrim) || looksLikeTechnical(arTrim)) {
    return false;
  }

  if (arTrim === enTrim && /[A-Za-z]{3,}/.test(arTrim)) return true;

  if (
    latinRatio(arTrim) >= 0.85 &&
    /[A-Za-z]{4,}/.test(arTrim) &&
    arTrim.split(/\s+/).length >= 2
  ) {
    const words = arTrim.split(/\s+/);
    const allAllowed = words.every(function (w) {
      return allowlist.has(w.toLowerCase().replace(/[^\w]/g, ""));
    });
    if (!allAllowed) return true;
  }

  return false;
}

function hasIcuPlural(str) {
  return typeof str === "string" && /\{[a-zA-Z_][\w]*\s*,\s*plural\b/.test(str);
}

function icuPluralCategories(str) {
  if (!hasIcuPlural(str)) return null;
  const cats = [];
  PLURAL_SUFFIXES.forEach(function (cat) {
    const re = new RegExp("\\b" + cat + "\\s*\\{");
    if (re.test(str)) cats.push(cat);
  });
  return cats;
}

function collectSuffixFamilies(flat) {
  const families = {};
  Object.keys(flat).forEach(function (key) {
    const m = key.match(/^(.*)_([a-z]+)$/);
    if (!m) return;
    const base = m[1];
    const suffix = m[2];
    if (PLURAL_SUFFIXES.indexOf(suffix) === -1) return;
    if (!families[base]) families[base] = new Set();
    families[base].add(suffix);
  });
  return families;
}

function checkPunctuation(arVal) {
  if (typeof arVal !== "string") return [];
  if (!/[\u0600-\u06FF]/.test(arVal)) return [];
  const issues = [];
  if (/\?/.test(arVal)) issues.push("ASCII ? (prefer ؟)");
  if (/,/.test(arVal) && !/،/.test(arVal)) issues.push("ASCII , (prefer ،)");
  if (/\.\.\./.test(arVal)) issues.push("... (prefer …)");
  return issues;
}

function compareLocales(sourceFlat, targetFlat, options) {
  const errors = [];
  const warnings = [];
  const sourceKeys = Object.keys(sourceFlat).sort();
  const targetKeys = Object.keys(targetFlat).sort();
  const targetSet = new Set(targetKeys);
  const sourceSet = new Set(sourceKeys);

  sourceKeys.forEach(function (key) {
    if (!targetSet.has(key)) {
      errors.push({
        code: "missing_key",
        key: key,
        message: "Present in source, missing in target",
      });
    }
  });

  if (options.checkExtra) {
    targetKeys.forEach(function (key) {
      if (!sourceSet.has(key)) {
        errors.push({
          code: "extra_key",
          key: key,
          message: "Present in target, missing in source",
        });
      }
    });
  }

  sourceKeys.forEach(function (key) {
    if (!targetSet.has(key)) return;
    const enVal = sourceFlat[key];
    const arVal = targetFlat[key];

    const enPh = extractPlaceholders(String(enVal == null ? "" : enVal));
    const arPh = extractPlaceholders(String(arVal == null ? "" : arVal));
    if (!setsEqual(enPh, arPh)) {
      errors.push({
        code: "placeholder_mismatch",
        key: key,
        message: "Placeholders differ",
        source: enPh,
        target: arPh,
      });
    }

    if (
      isSuspectedUntranslated(
        String(enVal == null ? "" : enVal),
        String(arVal == null ? "" : arVal),
        options.allowlist
      )
    ) {
      errors.push({
        code: "untranslated",
        key: key,
        message: "Value looks untranslated (identical or mostly Latin)",
        value: arVal,
      });
    }

    if (options.punctuation) {
      checkPunctuation(String(arVal == null ? "" : arVal)).forEach(function (issue) {
        warnings.push({ code: "punctuation", key: key, message: issue });
      });
    }

    if (
      hasIcuPlural(String(enVal == null ? "" : enVal)) ||
      hasIcuPlural(String(arVal == null ? "" : arVal))
    ) {
      const cats = icuPluralCategories(String(arVal == null ? "" : arVal));
      if (!cats || cats.length === 0) {
        errors.push({
          code: "icu_plural_missing",
          key: key,
          message: "Expected ICU plural block in Arabic value",
        });
      } else {
        const missingCats = PLURAL_SUFFIXES.filter(function (c) {
          return cats.indexOf(c) === -1;
        });
        if (missingCats.length) {
          errors.push({
            code: "icu_plural_incomplete",
            key: key,
            message: "ICU plural missing categories: " + missingCats.join(", "),
            present: cats,
          });
        }
      }
    }
  });

  const sourceFamilies = collectSuffixFamilies(sourceFlat);
  const targetFamilies = collectSuffixFamilies(targetFlat);
  const allBases = new Set(
    Object.keys(sourceFamilies).concat(Object.keys(targetFamilies))
  );

  allBases.forEach(function (base) {
    const src = sourceFamilies[base];
    const tgt = targetFamilies[base];
    if (!src && !tgt) return;
    const present = tgt ? Array.from(tgt).sort() : [];
    const missing = PLURAL_SUFFIXES.filter(function (s) {
      return present.indexOf(s) === -1;
    });
    if (missing.length) {
      errors.push({
        code: "plural_family_incomplete",
        key: base,
        message: "Arabic plural family incomplete; missing: " + missing.join(", "),
        present: present,
      });
    }
  });

  return { errors: errors, warnings: warnings };
}

function formatTextReport(report) {
  const lines = [];
  lines.push("Locale check report");
  lines.push("===================");
  lines.push("Source keys: " + report.sourceKeyCount);
  lines.push("Target keys: " + report.targetKeyCount);
  lines.push("Errors: " + report.errors.length);
  lines.push("Warnings: " + report.warnings.length);
  lines.push("");

  if (report.unsupportedSource.length || report.unsupportedTarget.length) {
    lines.push("Unsupported structures (arrays)");
    lines.push("-------------------------------");
    report.unsupportedSource.forEach(function (k) {
      lines.push("  [source] " + k);
    });
    report.unsupportedTarget.forEach(function (k) {
      lines.push("  [target] " + k);
    });
    lines.push("");
  }

  function groupByCode(items) {
    const map = {};
    items.forEach(function (item) {
      if (!map[item.code]) map[item.code] = [];
      map[item.code].push(item);
    });
    return map;
  }

  const errGroups = groupByCode(report.errors);
  Object.keys(errGroups)
    .sort()
    .forEach(function (code) {
      lines.push("ERROR: " + code);
      errGroups[code].forEach(function (item) {
        let line = "  - " + item.key + ": " + item.message;
        if (item.source && item.target) {
          line +=
            " (source=" +
            JSON.stringify(item.source) +
            " target=" +
            JSON.stringify(item.target) +
            ")";
        }
        if (item.present) line += " (present=" + item.present.join(",") + ")";
        lines.push(line);
      });
      lines.push("");
    });

  const warnGroups = groupByCode(report.warnings);
  Object.keys(warnGroups)
    .sort()
    .forEach(function (code) {
      lines.push("WARNING: " + code);
      warnGroups[code].forEach(function (item) {
        lines.push("  - " + item.key + ": " + item.message);
      });
      lines.push("");
    });

  if (!report.errors.length && !report.warnings.length) {
    lines.push("All required checks passed.");
  }

  return lines.join("\n");
}

function runCheck(opts) {
  const allowlist = loadAllowlist(opts.allowlist);
  const sourceData = readJsonFile(path.resolve(opts.source));
  const targetData = readJsonFile(path.resolve(opts.target));

  const sourceFlatResult = flattenLocale(sourceData);
  const targetFlatResult = flattenLocale(targetData);

  const comparison = compareLocales(sourceFlatResult.flat, targetFlatResult.flat, {
    checkExtra: opts.checkExtra,
    punctuation: opts.punctuation,
    allowlist: allowlist,
  });

  sourceFlatResult.unsupported.forEach(function (k) {
    comparison.errors.push({
      code: "unsupported_array",
      key: k,
      message: "Array values are not supported — flatten or convert to objects",
    });
  });
  targetFlatResult.unsupported.forEach(function (k) {
    comparison.errors.push({
      code: "unsupported_array",
      key: k,
      message: "Array values are not supported — flatten or convert to objects",
    });
  });

  comparison.errors.sort(function (a, b) {
    return a.code.localeCompare(b.code) || a.key.localeCompare(b.key);
  });
  comparison.warnings.sort(function (a, b) {
    return a.code.localeCompare(b.code) || a.key.localeCompare(b.key);
  });

  return {
    source: opts.source,
    target: opts.target,
    sourceKeyCount: Object.keys(sourceFlatResult.flat).length,
    targetKeyCount: Object.keys(targetFlatResult.flat).length,
    unsupportedSource: sourceFlatResult.unsupported.slice().sort(),
    unsupportedTarget: targetFlatResult.unsupported.slice().sort(),
    errors: comparison.errors,
    warnings: comparison.warnings,
  };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.source || !opts.target) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }
  if (opts.format !== "text" && opts.format !== "json") {
    console.error('--format must be "text" or "json"');
    process.exit(1);
  }

  let report;
  try {
    report = runCheck(opts);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (opts.format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatTextReport(report));
  }

  process.exit(report.errors.length ? 1 : 0);
}

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main();
}

export {
  parseArgs,
  flattenLocale,
  extractPlaceholders,
  isSuspectedUntranslated,
  collectSuffixFamilies,
  icuPluralCategories,
  hasIcuPlural,
  compareLocales,
  runCheck,
  checkPunctuation,
  PLURAL_SUFFIXES,
  DEFAULT_ALLOWLIST,
};
