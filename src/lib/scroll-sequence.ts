export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function portfolioScrollUnits(count: number) {
  return 1.7 + Math.max(0, count - 1) * 1.2;
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
/** Pinned Sorso flavour scene: copy lines travel in/out while the viewport stays fixed. */
export function flavourSceneCopyOffset(progress: number, index: number, count = 3) {
  if (count < 2) return 0;
  const unit = 1 / count;
  const trans = unit * 0.26;
  const enterStart = index * unit - trans * 0.35;
  const enterEnd = index * unit + trans * 0.65;
  const exitStart = (index + 1) * unit - trans * 0.85;
  const exitEnd = (index + 1) * unit + trans * 0.45;

  if (progress <= enterStart) return 110;
  if (progress >= exitEnd) return -110;
  if (progress < enterEnd) {
    const p = clamp01((progress - enterStart) / (enterEnd - enterStart));
    return 110 * (1 - p);
  }
  if (progress > exitStart) {
    const p = clamp01((progress - exitStart) / (exitEnd - exitStart));
    return -110 * p;
  }
  return 0;
}

export function wordEmphasis(progress: number, index: number, count = 4) {
  if (count < 2) return 1;
  const peak = index / count;
  const lastPeak = (count - 1) / count;
  if ((index === 0 && progress <= 0) || (index === count - 1 && progress >= lastPeak)) {
    return 1;
  }
  return clamp01(1 - Math.abs(progress - peak) / (1 / count));
}
