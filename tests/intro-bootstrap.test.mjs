import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { INTRO_BOOTSTRAP } from "../src/lib/intro.ts";

function bootstrap({ seen = false, search = "", blockedStorage = false } = {}) {
  const classes = new Set();
  const root = {
    classList: {
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
      contains: (value) => classes.has(value),
    },
  };
  runInNewContext(INTRO_BOOTSTRAP, {
    URLSearchParams,
    document: {
      documentElement: root,
      readyState: "loading",
      addEventListener() {},
      removeEventListener() {},
      querySelectorAll: () => [],
    },
    window: {
      location: { search },
      addEventListener() {},
      removeEventListener() {},
    },
    sessionStorage: {
      getItem() {
        if (blockedStorage) throw new Error("Storage disabled");
        return seen ? "1" : null;
      },
    },
    performance: { now: () => 100 },
    setTimeout: () => 1,
    clearTimeout() {},
  });
  return classes;
}

test("fresh visits play the intro", () => {
  assert(bootstrap().has("pp-intro-pending"));
});

test("repeat visits skip the intro within the session", () => {
  const classes = bootstrap({ seen: true });
  assert(classes.has("pp-intro-seen"));
  assert(!classes.has("pp-intro-pending"));
});

test("intro=1 explicitly replays the intro in a returning session", () => {
  const classes = bootstrap({ seen: true, search: "?intro=1" });
  assert(classes.has("pp-intro-pending"));
  assert(!classes.has("pp-intro-seen"));
});

test("unrelated query parameters preserve once-per-session behavior", () => {
  assert(bootstrap({ seen: true, search: "?intro=0" }).has("pp-intro-seen"));
});

test("blocked session storage still allows the intro to start", () => {
  assert(bootstrap({ blockedStorage: true }).has("pp-intro-pending"));
});
