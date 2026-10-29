export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function portfolioScrollUnits(count: number) {
  return 1.7 + Math.max(0, count - 1) * 1.2;
}

/**
 * Offer frames reuse the portfolio card travel, but the scene opens on the
 * first offer already seated. Later offers rise in and the previous one
 * leaves upward — the same replacement, without a blank pinned frame.
 * Settle time 0.9 is when card 0's entrance has finished.
 */
const OFFER_SETTLE = 0.9;

export function offerScrollUnits(count = 3) {
  return Math.max(0.4, portfolioScrollUnits(count) - OFFER_SETTLE);
}

export function offerFramePose(progress: number, index: number, count = 3) {
  const units = portfolioScrollUnits(count);
  const start = OFFER_SETTLE / units;
  const mapped = start + clamp01(progress) * (1 - start);
  return portfolioCardPose(mapped, index, count);
}

/**
 * Mobile featured cards skip the blank opening. Time 0.86 leaves card 0
 * about 6svh below its rest position, so the gap under the intro is small,
 * then it settles. Desktop keeps the full portfolio timeline.
 */
const FEATURED_MOBILE_SETTLE = 0.86;

export function featuredMobileScrollUnits(count = 3) {
  return Math.max(0.4, portfolioScrollUnits(count) - FEATURED_MOBILE_SETTLE);
}

export function featuredMobileCardPose(progress: number, index: number, count = 3) {
  const units = portfolioScrollUnits(count);
  const start = FEATURED_MOBILE_SETTLE / units;
  const mapped = start + clamp01(progress) * (1 - start);
  return portfolioCardPose(mapped, index, count);
}

export function featuredMobileFocus(index: number, count = 3) {
  const units = portfolioScrollUnits(count);
  const time = Math.min(units, 1.02 + Math.max(0, index) * 1.2);
  return clamp01((time - FEATURED_MOBILE_SETTLE) / (units - FEATURED_MOBILE_SETTLE));
}

/** Sideways wordplay drift in vw. Even words and odd words travel opposite ways. */
export function wordDrift(progress: number, index: number) {
  const direction = index % 2 === 0 ? 1 : -1;
  return direction * (clamp01(progress) - 0.5) * 16;
}

/** Scene progress where offer `index` is readable, before the next one covers it. */
export function offerFrameFocus(index: number, count = 3) {
  const units = portfolioScrollUnits(count);
  const time = Math.min(units, 1.06 + Math.max(0, index) * 1.2);
  return clamp01((time - OFFER_SETTLE) / (units - OFFER_SETTLE));
}

export function portfolioCardPose(progress: number, index: number, count = 3) {
  const time = clamp01(progress) * portfolioScrollUnits(count);
  const enter = clamp01((time - 0.18 - index * 1.2) / 0.72);
  const leave = index === count - 1 ? 0 : clamp01((time - 1.22 - index * 1.2) / 0.72);

  return {
    y: (1 - enter) * 100 - leave * 100,
    opacity: clamp01(enter * 2) * (1 - clamp01((leave - 0.68) / 0.32)),
    scale: 0.96 + 0.04 * Math.min(enter, 1 - leave),
  };
}

/**
 * Sticky process sequence: frame 1 is always in place; each later frame
 * travels up over the previous one during an equal slice of progress.
 * Pure function of scroll progress — reverses naturally.
 */
export function frameProgress(progress: number, panel: number, count = 3) {
  if (panel < 1 || count < 2) return 1;
  const window = 1 / (count - 1);
  const start = (panel - 1 + 0.18) * window;
  const end = (panel - 0.12) * window;
  return clamp01((progress - start) / (end - start));
}

/**
 * Wordplay emphasis: words peak at 0 / .25 / .5 / .75, blend across their
 * neighbors, and hold the final word through the end. Pure and reversible.
 */
export function wordEmphasis(progress: number, index: number, count = 4) {
  if (count < 2) return 1;
  const peak = index / count;
  const lastPeak = (count - 1) / count;
  if ((index === 0 && progress <= 0) || (index === count - 1 && progress >= lastPeak)) {
    return 1;
  }
  return clamp01(1 - Math.abs(progress - peak) / (1 / count));
}
