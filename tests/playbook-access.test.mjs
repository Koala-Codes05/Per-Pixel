import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import robots, { PLAYBOOK_PATH } from "../src/app/robots.ts";

test("the playbook stays reachable and out of search", () => {
  const page = readFileSync(new URL("../src/app/(site)/playbook/page.tsx", import.meta.url), "utf8");
  assert.equal(page.includes("notFound("), false);
  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*false/);

  const rules = robots().rules;
  const rule = Array.isArray(rules) ? rules[0] : rules;
  assert.equal(PLAYBOOK_PATH, "/playbook");
  assert.equal(rule.userAgent, "*");
  assert.equal(rule.allow, "/");
  assert.equal(rule.disallow, "/playbook");
  assert.equal(robots().sitemap, undefined);
});
