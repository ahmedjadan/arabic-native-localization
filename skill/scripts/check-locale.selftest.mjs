#!/usr/bin/env node
/**
 * Lightweight self-test for check-locale.mjs (no Jest/Vitest).
 * Run: node skill/scripts/check-locale.selftest.mjs
 */

import assert from "assert";
import path from "path";
import { fileURLToPath } from "url";
import {
  flattenLocale,
  extractPlaceholders,
  isSuspectedUntranslated,
  runCheck,
  DEFAULT_ALLOWLIST,
} from "./check-locale.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(__dirname, "fixtures");

function fixture(name, file) {
  return path.join(fixtures, name, file);
}

function assertHasCode(report, code) {
  const hit = report.errors.some(function (e) {
    return e.code === code;
  });
  assert.ok(hit, "expected error code " + code + " in " + JSON.stringify(report.errors));
}

function assertNoErrors(report) {
  assert.strictEqual(
    report.errors.length,
    0,
    "expected no errors, got " + JSON.stringify(report.errors, null, 2)
  );
}

function testFlattenNested() {
  const { flat, unsupported } = flattenLocale({
    a: { b: { c: "x" } },
    list: [1, 2],
  });
  assert.strictEqual(flat["a.b.c"], "x");
  assert.deepStrictEqual(unsupported, ["list"]);
}

function testPlaceholders() {
  assert.deepStrictEqual(extractPlaceholders("Hi {{name}}"), ["{{name}}"]);
  assert.deepStrictEqual(extractPlaceholders("Hi {name} and {project}"), [
    "{name}",
    "{project}",
  ]);
  assert.deepStrictEqual(extractPlaceholders("%s then %1$s"), ["%1$s", "%s"]);
  // Reordered same set
  const a = extractPlaceholders("{{a}} {{b}}");
  const b = extractPlaceholders("{{b}} {{a}}");
  assert.deepStrictEqual(a, b);
}

function testUntranslatedAllowlist() {
  const allow = new Set(
    DEFAULT_ALLOWLIST.map(function (s) {
      return s.toLowerCase();
    }).concat(["acme cloud"])
  );
  assert.strictEqual(
    isSuspectedUntranslated("Get started now", "Get started now", allow),
    true
  );
  assert.strictEqual(isSuspectedUntranslated("API", "API", allow), false);
  assert.strictEqual(
    isSuspectedUntranslated("Acme Cloud", "Acme Cloud", allow),
    false
  );
}

function testValid() {
  const report = runCheck({
    source: fixture("valid", "en.json"),
    target: fixture("valid", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertNoErrors(report);
}

function testMissingKeys() {
  const report = runCheck({
    source: fixture("missing-keys", "en.json"),
    target: fixture("missing-keys", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(report, "missing_key");
  const keys = report.errors
    .filter(function (e) {
      return e.code === "missing_key";
    })
    .map(function (e) {
      return e.key;
    })
    .sort();
  assert.ok(keys.indexOf("common.delete") !== -1);
  assert.ok(keys.indexOf("nested.deep.title") !== -1);
}

function testPlaceholderMismatch() {
  const report = runCheck({
    source: fixture("placeholder-mismatch", "en.json"),
    target: fixture("placeholder-mismatch", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(report, "placeholder_mismatch");
}

function testPlaceholderReorder() {
  const report = runCheck({
    source: fixture("placeholder-reorder", "en.json"),
    target: fixture("placeholder-reorder", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertNoErrors(report);
}

function testIncompletePlural() {
  const report = runCheck({
    source: fixture("incomplete-plural", "en.json"),
    target: fixture("incomplete-plural", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(report, "plural_family_incomplete");
}

function testExtraKeys() {
  const without = runCheck({
    source: fixture("extra-keys", "en.json"),
    target: fixture("extra-keys", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assert.ok(
    !without.errors.some(function (e) {
      return e.code === "extra_key";
    })
  );

  const withFlag = runCheck({
    source: fixture("extra-keys", "en.json"),
    target: fixture("extra-keys", "ar.json"),
    checkExtra: true,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(withFlag, "extra_key");
}

function testUntranslated() {
  const report = runCheck({
    source: fixture("untranslated", "en.json"),
    target: fixture("untranslated", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(report, "untranslated");
  const titleHit = report.errors.some(function (e) {
    return e.code === "untranslated" && e.key === "title";
  });
  assert.ok(titleHit);
  const apiHit = report.errors.some(function (e) {
    return e.code === "untranslated" && e.key === "api";
  });
  assert.ok(!apiHit, "API should not be flagged");
}

function testAllowlist() {
  const report = runCheck({
    source: fixture("allowlist", "en.json"),
    target: fixture("allowlist", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: fixture("allowlist", "allowlist.json"),
  });
  assertNoErrors(report);
}

function testPunctuationWarning() {
  const report = runCheck({
    source: fixture("punctuation", "en.json"),
    target: fixture("punctuation", "ar.json"),
    checkExtra: false,
    punctuation: true,
    allowlist: null,
  });
  assert.strictEqual(report.errors.length, 0);
  assert.ok(
    report.warnings.some(function (w) {
      return w.code === "punctuation";
    })
  );
}

function testIcuComplete() {
  const report = runCheck({
    source: fixture("icu-complete", "en.json"),
    target: fixture("icu-complete", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertNoErrors(report);
}

function testIcuIncomplete() {
  const report = runCheck({
    source: fixture("icu-incomplete", "en.json"),
    target: fixture("icu-incomplete", "ar.json"),
    checkExtra: false,
    punctuation: false,
    allowlist: null,
  });
  assertHasCode(report, "icu_plural_incomplete");
}

function testInvalidJson() {
  let threw = false;
  try {
    runCheck({
      source: fixture("invalid-json", "en.json"),
      target: fixture("invalid-json", "ar.json"),
      checkExtra: false,
      punctuation: false,
      allowlist: null,
    });
  } catch (err) {
    threw = true;
    assert.ok(/Invalid JSON/.test(err.message));
  }
  assert.ok(threw, "expected invalid JSON to throw");
}

const tests = [
  ["flatten nested + arrays", testFlattenNested],
  ["extract placeholders", testPlaceholders],
  ["untranslated / allowlist helpers", testUntranslatedAllowlist],
  ["valid fixture", testValid],
  ["missing keys", testMissingKeys],
  ["placeholder mismatch", testPlaceholderMismatch],
  ["placeholder reorder", testPlaceholderReorder],
  ["incomplete plural family", testIncompletePlural],
  ["extra keys", testExtraKeys],
  ["untranslated values", testUntranslated],
  ["allowlist file", testAllowlist],
  ["punctuation warnings", testPunctuationWarning],
  ["ICU complete", testIcuComplete],
  ["ICU incomplete", testIcuIncomplete],
  ["invalid JSON", testInvalidJson],
];

let failed = 0;
tests.forEach(function (pair) {
  const name = pair[0];
  const fn = pair[1];
  try {
    fn();
    console.log("ok - " + name);
  } catch (err) {
    failed += 1;
    console.error("not ok - " + name);
    console.error("  " + (err && err.stack ? err.stack : err));
  }
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll " + tests.length + " tests passed");
