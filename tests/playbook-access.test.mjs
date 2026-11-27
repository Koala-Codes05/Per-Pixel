import assert from "node:assert/strict";
import { test } from "node:test";
import { isInternalPlaybookServed } from "../src/lib/playbook-access.ts";

test("the playbook renders in local development only", () => {
  assert.equal(isInternalPlaybookServed("development"), true);
  assert.equal(isInternalPlaybookServed("test"), false);
  assert.equal(isInternalPlaybookServed("production"), false);
  assert.equal(isInternalPlaybookServed(undefined), false);
});
