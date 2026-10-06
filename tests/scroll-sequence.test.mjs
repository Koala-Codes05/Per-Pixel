import assert from "node:assert/strict";
import test from "node:test";
import { frameProgress, portfolioCardPose, portfolioScrollUnits, wordEmphasis } from "../src/lib/scroll-sequence.ts";

test("process starts with later frames below the viewport", () => {
  assert.equal(frameProgress(0, 1), 0);
  assert.equal(frameProgress(0, 2), 0);
});

test("second frame arrives before the third frame starts", () => {
  assert.equal(frameProgress(0.5, 1), 1);
  assert.equal(frameProgress(0.5, 2), 0);
  assert.equal(frameProgress(1, 2), 1);
});

test("frame movement interpolates and reverses without stored state", () => {
  const forward = [0, 0.2, 0.35, 0.5, 0.7, 1].map((p) => frameProgress(p, 1));
  const backward = [1, 0.7, 0.5, 0.35, 0.2, 0].map((p) => frameProgress(p, 1));
  assert.deepEqual(forward.toReversed(), backward);
  assert.ok(frameProgress(0.3, 1) > 0 && frameProgress(0.3, 1) < 1);
});

test("overscroll never moves process frames beyond their endpoints", () => {
  for (const frame of [1, 2]) {
    assert.equal(frameProgress(-1, frame), 0);
    assert.equal(frameProgress(2, frame), 1);
  }
});

test("process gives the first, second, and final frames reading time", () => {
  assert.equal(frameProgress(0.05, 1), 0);
  assert.equal(frameProgress(0.48, 1), 1);
  assert.equal(frameProgress(0.55, 2), 0);
  assert.equal(frameProgress(0.97, 2), 1);
});

test("process timing also supports two and four frames", () => {
  for (const count of [2, 4]) {
    assert.equal(frameProgress(0, 0, count), 1);
    for (let panel = 1; panel < count; panel++) {
      assert.equal(frameProgress(0, panel, count), 0);
      assert.equal(frameProgress(1, panel, count), 1);
    }
  }
});

test("each word peaks at the brief's quarter-progress positions", () => {
  for (let index = 0; index < 4; index++) {
    assert.equal(wordEmphasis(index / 4, index), 1);
  }
});

test("adjacent words blend without dead zones", () => {
  for (let index = 0; index < 3; index++) {
    const halfway = (index + 0.5) / 4;
    assert.equal(wordEmphasis(halfway, index), 0.5);
    assert.equal(wordEmphasis(halfway, index + 1), 0.5);
  }
  for (let step = 0; step <= 100; step++) {
    const sum = [0, 1, 2, 3].reduce((total, index) => total + wordEmphasis(step / 100, index), 0);
    assert.ok(Math.abs(sum - 1) < 0.00001);
  }
});

test("word emphasis holds the endpoints and reverses exactly", () => {
  assert.equal(wordEmphasis(-1, 0), 1);
  assert.equal(wordEmphasis(1, 3), 1);
  assert.equal(wordEmphasis(2, 3), 1);
  const positions = [0, 0.125, 0.25, 0.4, 0.5, 0.7, 0.75, 1];
  for (let index = 0; index < 4; index++) {
    const forward = positions.map((p) => wordEmphasis(p, index));
    const backward = positions.toReversed().map((p) => wordEmphasis(p, index));
    assert.deepEqual(forward.toReversed(), backward);
  }
});

test("portfolio arrives through one pinned scene and holds its last card", () => {
  const units = portfolioScrollUnits(3);
  assert.equal(portfolioCardPose(0, 0, 3).y, 100);
  assert.equal(portfolioCardPose(0, 0, 3).opacity, 0);
  assert.equal(portfolioCardPose(1 / units, 0, 3).y, 0);
  assert.equal(portfolioCardPose(1 / units, 1, 3).y, 100);
  const entering = portfolioCardPose(0.5 / units, 0, 3);
  assert.ok(entering.y > 0 && entering.y < 100);
  assert.ok(entering.opacity > 0 && entering.opacity < 1);
  assert.ok(portfolioCardPose(1.7 / units, 0, 3).y < 0);
  assert.ok(portfolioCardPose(1.7 / units, 1, 3).y > 0);
  assert.equal(portfolioCardPose(2.2 / units, 1, 3).y, 0);
  assert.deepEqual(portfolioCardPose(1, 2, 3), { y: 0, opacity: 1, scale: 1 });
});

test("portfolio motion is continuous, reversible, and bounded for any card count", () => {
  for (const count of [1, 3, 4]) {
    const positions = [0, 0.08, 0.25, 0.43, 0.65, 0.82, 1];
    for (let index = 0; index < count; index++) {
      const forward = positions.map((p) => portfolioCardPose(p, index, count));
      const backward = positions.toReversed().map((p) => portfolioCardPose(p, index, count));
      assert.deepEqual(forward.toReversed(), backward);
      assert.deepEqual(portfolioCardPose(-1, index, count), forward[0]);
      assert.deepEqual(portfolioCardPose(2, index, count), forward.at(-1));
      for (const pose of forward) {
        assert.ok(pose.y >= -100 && pose.y <= 100);
        assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
        assert.ok(pose.scale >= 0.96 && pose.scale <= 1);
      }
    }
    assert.deepEqual(portfolioCardPose(1, count - 1, count), { y: 0, opacity: 1, scale: 1 });
  }
});
