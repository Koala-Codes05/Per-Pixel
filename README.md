# PerPixel --- Motion & Interaction Reference

> Master implementation brief for PerPixel's animations, interactions,
> responsive behavior, and visual motion language.

## Purpose

This README is the working reference for implementing PerPixel's motion
system.

The supplied screenshots and references represent **design intent**, not
merely static screenshots. The goal is to recreate the intended
experience while preserving PerPixel's existing visual identity, layout,
typography, assets, and responsive structure.

### Core principle

**Design intent \> animation complexity.**

PerPixel should feel:

-   Minimal
-   Editorial
-   Premium
-   Experimental but controlled
-   Typography-driven
-   Physical
-   Intentional
-   Fast and responsive

Avoid turning the website into an animation showcase. Motion should
support composition and hierarchy.

------------------------------------------------------------------------

# 1. Global Motion Language

Use animation to make the interface feel alive without distracting from
the work.

### Preferred techniques

-   `transform`
-   `opacity`
-   `clip-path`
-   CSS masking where appropriate
-   Sticky positioning
-   Scroll progress interpolation
-   Staggered reveals
-   Subtle image scaling
-   Viewport-triggered reveals

### Preferred easing

Use smooth editorial easing rather than bouncy UI easing.

Recommended:

``` css
cubic-bezier(0.22, 1, 0.36, 1)
```

for entrances and:

``` css
cubic-bezier(0.16, 1, 0.3, 1)
```

for larger movement.

Scroll-linked animations should generally use continuous interpolation
rather than easing that fights the user's scroll.

### Avoid

-   Bounce
-   Excessive elastic easing
-   Random parallax
-   Large rotations
-   Generic fade-up on every element
-   Animating layout properties unnecessarily
-   Long delays that make the site feel slow
-   Animation that changes the meaning or readability of content

------------------------------------------------------------------------

# 2. Initial Preloader

The initial page load should have a distinctive PerPixel preloader.

## Sequence

``` text
WHITE SCREEN
     ↓
OVERSIZED WORD
     ↓
WORD TRANSITION
     ↓
NEXT WORD
     ↓
NEXT WORD
     ↓
LARGE X
     ↓
X EXPANDS
     ↓
HOMEPAGE REVEAL
```

The preloader is a **brand transition**, not a conventional loading
spinner.

## Typography

Use extremely large black typography on a white/off-white background.

Possible words:

-   Branding
-   Design
-   Editorial
-   Motion

The words may intentionally extend beyond the viewport.

Do not shrink them simply to make the complete word visible.

## Word animation

Each word should:

1.  Enter or become visible.
2.  Hold briefly.
3.  Transition into the next word.
4.  Maintain a clean editorial composition.

Suggested timing:

-   Word duration: `400–700ms`
-   Word transition: `250–450ms`

The exact timing should be tuned visually.

## X transition

The final X is the dominant preloader element.

It should appear centered and clean.

Then:

``` text
X
↓
scale dramatically
↓
X fills viewport
↓
site revealed
```

The expansion should feel cinematic and intentional, not like a normal
logo scaling animation.

Suggested duration:

`600–900ms`

## Requirements

The preloader must:

-   Prevent interaction with the page underneath.
-   Prevent page scrolling while active.
-   Release scrolling after completion.
-   Avoid replaying unnecessarily.
-   Handle failed assets gracefully.
-   Have a fallback timeout.
-   Never leave the user stuck indefinitely.
-   Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 3. Homepage Typography / Wordplay Section

The homepage contains large pale-gray words such as:

``` text
Branding
Design
Editorial
Motion
```

This section should be **scroll-driven**.

It is not a normal entrance animation.

## Behavior

As the user scrolls:

``` text
Branding → Design → Editorial → Motion
```

The active word becomes darker/more prominent while the others remain
pale.

Example conceptual mapping:

``` text
0.00  Branding active
0.25  Design active
0.50  Editorial active
0.75  Motion active
1.00  Motion complete
```

Use interpolation so the transition can blend smoothly.

Possible subtle effects:

-   Opacity
-   Color/value transition
-   Small vertical movement
-   Very subtle scale

Do not over-animate the words.

## Important

This should be controlled by **scroll progress**, not by a one-time
`IntersectionObserver`.

The user must be able to scroll backward and see the sequence reverse
naturally.

------------------------------------------------------------------------

# 4. Homepage Process Section --- 1 / 2 / 3

The process section contains:

``` text
1   Start
2   Ready
3   Takeoff
```

Each frame contains:

-   Huge number
-   Small label
-   Description
-   Image
-   Divider line

## Required behavior

This is a **sticky scroll sequence**.

Conceptually:

``` text
Outer section
    ↓
Sticky viewport
    ↓
Frame 1
    ↓
Frame 2 moves upward over Frame 1
    ↓
Frame 3 moves upward over Frame 2
    ↓
Sticky section releases
```

Do not implement these as three independent sticky rows.

## Recommended structure

``` text
process-section
    └── sticky-process-viewport
          ├── frame-1
          ├── frame-2
          └── frame-3
```

The outer section provides enough scroll distance for the sequence.

The inner viewport remains sticky.

Example conceptual setup:

``` css
.process-section {
  position: relative;
  height: 300vh;
}

.process-viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
```

Adjust the actual height based on the content and viewport.

## Frame movement

Frame 1 starts at the active position.

Frame 2 begins below the viewport and travels upward.

Frame 3 begins below the viewport and travels upward after Frame 2.

Use scroll progress to calculate their positions.

Do not use arbitrary timers.

## Direction

Scrolling down:

``` text
1 → 2 → 3
```

Scrolling back:

``` text
3 → 2 → 1
```

The sequence must reverse naturally.

------------------------------------------------------------------------

# 5. Process Micro-Animations

Within each frame:

## Number

The huge number can have a subtle:

-   translate
-   opacity
-   scale

Do not make it bounce.

## Label

Use a small fade/translate reveal.

## Description

Reveal with a slight upward movement and opacity.

## Image

Animate the image **inside** its container.

Suggested:

``` text
scale 1.03 → 1.00
```

Optional:

``` text
slight blur → sharp
```

Only use blur if performance remains good.

The image container itself should remain stable.

------------------------------------------------------------------------

# 6. Navbar

The navbar should remain visually quiet.

Typical structure:

``` text
LEFT                  CENTER                  RIGHT
PerPixel              Brand mark              Projects / About / Contact
```

## Center icon

The small center PerPixel mark is a brand signature.

Possible states:

``` text
Idle
  ↓
Hover
  ↓
Active / navigation
  ↓
X or menu state
```

Use a clean transform/morph.

Suggested duration:

`300–450ms`

Do not use:

-   Bounce
-   Generic hamburger animation
-   Large rotation
-   Excessive scaling

## Navigation links

Use subtle hover behavior.

Possible:

-   small translation
-   opacity transition
-   underline/indicator reveal

Keep it restrained.

------------------------------------------------------------------------

# 7. Works Page

The Works page uses:

1.  Hero
2.  Selected Work
3.  Project grid/cards
4.  Larger project/detail content
5.  Footer

The overall style should remain clean and editorial.

## Project card hover

Suggested behavior:

``` text
Image scale: 1.00 → 1.03–1.06
```

The image must remain clipped inside its container.

Optional:

-   Small text translation
-   Button/arrow movement
-   Subtle overlay transition

Do not use exaggerated card animations.

------------------------------------------------------------------------

# 8. Work Detail / Long Media Sections

For long project pages, images should reveal progressively.

Recommended:

``` text
opacity: 0 → 1
translateY: 20px → 0
scale: 1.02 → 1
```

Suggested duration:

`700–1000ms`

Use viewport-triggered animation for normal content.

Use `IntersectionObserver` or an equivalent motion library.

Do not attach expensive scroll handlers to every image.

## Stagger

Related elements may stagger:

``` text
Image
↓ ~100ms
Heading
↓ ~75ms
Supporting text
```

Do not create large cascading delays.

------------------------------------------------------------------------

# 9. Editorial Statement Sections

Large statements should behave like visual compositions.

The typography can be:

-   Extremely large
-   Pale gray
-   Black when active
-   Partially clipped
-   Responsive
-   Oversized beyond the viewport

Line breaks should be intentional.

Do not automatically shrink typography to prevent every possible crop.

The large text itself is part of the visual identity.

------------------------------------------------------------------------

# 10. Horizontal Media Strips

Some reference designs use rows of large rounded images.

If a PerPixel section uses this concept:

-   Keep images horizontally aligned.
-   Use rounded containers.
-   Allow subtle card differences where intentional.
-   Use internal image scaling on hover.
-   Consider scroll-linked horizontal movement.

If horizontal movement is implemented:

``` text
Vertical scroll
      ↓
Scroll progress
      ↓
Horizontal media translation
```

Do not introduce a separate horizontal scrollbar.

------------------------------------------------------------------------

# 11. Asymmetric Project Grids

Future portfolio sections may use an irregular editorial grid.

Do not force every card into identical dimensions.

Possible characteristics:

-   Different image sizes
-   Different vertical positions
-   Different aspect ratios
-   Intentional empty spaces
-   Text positioned independently

There should still be an underlying grid so the asymmetry feels designed
rather than random.

------------------------------------------------------------------------

# 12. Image Behavior

Images are structural elements, not decorations.

Use stable containers.

Recommended:

``` css
.image-container {
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

When animating:

``` text
container stays fixed
       ↓
image scales/moves inside
```

Do not move the container when only the image should move.

## Important

Preserve intended image focal points.

Do not let responsive cropping accidentally cut off important subjects.

------------------------------------------------------------------------

# 13. Rounded Corners

Rounded image corners are part of PerPixel's visual language.

Maintain consistent radius across:

-   Project cards
-   Media strips
-   Case studies
-   Mobile layouts

Animations must not temporarily break the clipping/radius.

------------------------------------------------------------------------

# 14. Whitespace

Large empty areas are intentional.

Do not compress whitespace simply because a section looks sparse.

Whitespace creates:

-   Pacing
-   Anticipation
-   Hierarchy
-   Editorial rhythm
-   Separation between major visual moments

Treat whitespace as part of the design.

------------------------------------------------------------------------

# 15. Contact Page

The Contact page contains:

``` text
Let's talk.
↓
Contact form
↓
Clear answers,
before we begin.
↓
FAQ
↓
CTA
↓
Footer
```

The page should remain mostly calm.

## Form

Inputs should have subtle focus transitions.

On focus:

-   Slight border/background transition
-   No excessive glow
-   No large movement

Submit button:

-   Subtle hover
-   Optional arrow/indicator movement
-   `200–300ms`

------------------------------------------------------------------------

# 16. FAQ Accordion

Closed:

``` text
Question                         +
```

Hover:

-   Small visual transition

Open:

``` text
Question                         ×
Answer content
```

Animation:

-   Height/grid expansion
-   Plus rotates into X
-   Content fades/slides slightly

Suggested duration:

`350–450ms`

Avoid abrupt:

``` text
display: none → block
```

when an animated expansion is intended.

If appropriate, allow only one FAQ item open at a time.

------------------------------------------------------------------------

# 17. Footer

The footer uses the coral/pink PerPixel treatment.

The giant:

``` text
PERPIXEL
```

wordmark is intentionally oversized and can extend beyond the viewport.

Do not resize it to fit perfectly.

Possible entrance:

``` text
Footer enters
    ↓
large word reveals
    ↓
slight upward movement
```

Keep this subtle.

Footer links should have clean hover transitions.

------------------------------------------------------------------------

# 18. Responsive Design

Desktop, tablet, and mobile are **art-directed layouts**.

Do not simply scale the desktop version down.

## Desktop

The process section can use:

``` text
NUMBER | TEXT | IMAGE
```

with generous whitespace.

## Tablet

Maintain the same hierarchy but adjust:

-   Typography
-   Gaps
-   Image dimensions
-   Grid proportions
-   Sticky behavior where practical

## Mobile

Convert complex horizontal layouts into vertical compositions.

Example:

``` text
Desktop:

1 | text | image


Mobile:

1
text
image
```

The experience should remain equivalent even though the geometry
changes.

## Requirements

-   No accidental horizontal overflow
-   No typography causing page-width overflow
-   No broken sticky behavior
-   No layout jumps
-   Use `clamp()` where appropriate
-   Keep touch interactions usable

------------------------------------------------------------------------

# 19. Page Transitions

If internal page transitions are implemented, they should feel related
to the PerPixel preloader.

Potential concept:

``` text
Current page
     ↓
Transition layer
     ↓
X / brand transition
     ↓
New page reveal
```

Do not use a generic slow crossfade.

Navigation should remain fast.

------------------------------------------------------------------------

# 20. Loading and Layout Stability

Because PerPixel is highly visual, loading behavior matters.

Prevent:

-   Layout shifts
-   Images suddenly changing section height
-   Blank space suddenly collapsing
-   Images popping into place
-   Sticky sections changing dimensions after loading

Reserve media dimensions before loading.

The initial preloader can handle major initial loading, but lazy-loaded
assets later in the page still need stable containers.

If an asset fails:

-   preserve layout;
-   use a graceful fallback;
-   never block the entire site indefinitely.

------------------------------------------------------------------------

# 21. Cursor Interactions

A custom cursor may be used selectively.

Possible behavior:

``` text
Normal
   ↓
Hover project
   ↓
Cursor subtly enlarges
   ↓
Optional "VIEW" indicator
```

Use smooth interpolation.

Do not replace the cursor everywhere with a giant animated object.

Disable cursor-specific effects on touch devices.

------------------------------------------------------------------------

# 22. Hover Rules

Hover should enhance interaction, not hide essential information.

Good hover targets:

-   Project cards
-   Images
-   Buttons
-   Navigation

Important information must remain accessible without hover.

------------------------------------------------------------------------

# 23. Scroll Animation Architecture

Use two categories.

## Triggered animations

For simple reveals:

-   IntersectionObserver
-   Viewport-based motion
-   Opacity + transform
-   Trigger once when appropriate

Good for:

-   Images
-   Normal headings
-   Supporting text
-   Cards

## Scroll-linked animations

For major sequences:

-   Scroll progress
-   Sticky sections
-   Typography wordplay
-   Horizontal media
-   Process 1 → 2 → 3
-   Pinned compositions

These should use continuous scroll progress.

Do not use `setTimeout()` chains to simulate scroll-driven movement.

------------------------------------------------------------------------

# 24. Performance

Animation should remain smooth.

Prefer:

``` text
transform
opacity
clip-path
```

Avoid repeatedly animating:

``` text
top
left
width
height
margin
```

For scroll-driven motion:

-   Use requestAnimationFrame where necessary.
-   Or use a suitable motion/scroll library.
-   Avoid unnecessary React state updates every scroll frame.
-   Keep animation logic isolated.
-   Avoid expensive effects on large numbers of elements.

------------------------------------------------------------------------

# 25. Accessibility

Implement:

``` css
@media (prefers-reduced-motion: reduce)
```

Reduced-motion mode should:

-   Remove large scroll transformations.
-   Simplify the preloader.
-   Reduce or remove word transitions.
-   Use simple opacity/instant state changes.
-   Preserve content order.
-   Preserve usability.

Interactive elements must remain:

-   Keyboard accessible
-   Focusable
-   Screen-reader compatible

Animation must never interfere with form input or navigation.

------------------------------------------------------------------------

# 26. Animation Rhythm

Do not make every section use the same animation.

Avoid:

``` text
section 1 → fade up
section 2 → fade up
section 3 → fade up
section 4 → fade up
```

Instead create rhythm:

``` text
PRELOADER
    ↓
Typography transition
    ↓
Quiet reveal
    ↓
Sticky process
    ↓
Image interaction
    ↓
Large typography
    ↓
Case-study media
    ↓
FAQ interaction
    ↓
Footer reveal
```

At any moment, one or two major things should command attention.

------------------------------------------------------------------------

# 27. Important Reference-Inference Rule

When new reference images are supplied, do not wait for the
developer/user to describe every important detail.

Analyze the references for:

-   Spatial relationships
-   Layering
-   Clipping
-   Typography behavior
-   Image cropping
-   Navigation
-   Hover states
-   Scroll sequencing
-   Responsive behavior
-   Oversized elements
-   Partial viewport cropping
-   Visual transitions
-   Whitespace
-   Asymmetry
-   Depth
-   Media behavior

If a visual behavior is clearly implied by a reference, include it in
the implementation.

However, do not invent unrelated animations simply because they are
technically impressive.

------------------------------------------------------------------------

# 28. Reference-Inspired Section Types

Future PerPixel sections can use these reusable concepts:

1.  **Editorial Statement**
2.  **Horizontal Media Strip**
3.  **Asymmetric Project Grid**
4.  **Sticky Process Sequence**
5.  **Large Typography Transition**
6.  **Case Study Media Stack**
7.  **Connected Process / Diagram**
8.  **Full-screen Brand Transition**

Each section should have an appropriate motion identity.

------------------------------------------------------------------------

# 29. Implementation Rules for Astra

Before modifying code:

1.  Inspect the existing PerPixel implementation.
2.  Identify existing components and sections.
3.  Reuse existing assets.
4.  Do not rebuild the website from scratch.
5.  Do not replace working layouts just to add animation.
6.  Add animation around the existing structure.
7.  Preserve desktop/tablet/mobile behavior.
8.  Add structural wrappers only when required for the animation.
9.  Keep animation logic maintainable.
10. Prefer reusable animation utilities/components.
11. Test forward and backward scrolling.
12. Test different viewport sizes.
13. Test slow scrolling and fast scrolling.
14. Test refresh/initial loading.
15. Test reduced-motion mode.

------------------------------------------------------------------------

# 30. Priority Order

Implement in this order:

### Priority 1

**Preloader** - Word sequence - X - X expansion - Homepage reveal

### Priority 2

**Homepage typography** - Scroll-linked word emphasis

### Priority 3

**Process** - Sticky viewport - 1 → 2 → 3 frame movement - Reverse
scrolling

### Priority 4

**Navbar** - Center brand icon - Hover/navigation states

### Priority 5

**Works** - Project hover - Media reveals - Case-study motion

### Priority 6

**Contact** - Form focus - FAQ accordion - CTA interactions

### Priority 7

**Footer** - Large PERPIXEL reveal

### Priority 8

**Responsive tuning**

### Priority 9

**Reduced motion**

### Priority 10

**Performance cleanup**

------------------------------------------------------------------------

# 31. Final Quality Checklist

Before considering the implementation complete:

-   [ ] Preloader feels like a brand experience rather than a spinner.
-   [ ] Wordplay transitions are smooth.
-   [ ] X expands into the homepage naturally.
-   [ ] Preloader does not trap the user.
-   [ ] Homepage wordplay follows scroll progress.
-   [ ] Wordplay reverses correctly when scrolling upward.
-   [ ] Process section pins correctly.
-   [ ] Frame 2 travels over Frame 1.
-   [ ] Frame 3 travels over Frame 2.
-   [ ] Process sequence reverses correctly.
-   [ ] Images animate internally rather than moving their containers.
-   [ ] Navbar center mark has a meaningful interaction.
-   [ ] Works cards have restrained hover motion.
-   [ ] Contact FAQ opens/closes smoothly.
-   [ ] Footer typography remains intentionally oversized.
-   [ ] Desktop and tablet are not simply scaled versions.
-   [ ] Mobile has no accidental horizontal overflow.
-   [ ] Images do not cause layout shifts.
-   [ ] Reduced-motion mode works.
-   [ ] Keyboard/focus behavior remains usable.
-   [ ] No unnecessary React re-renders occur during scrolling.
-   [ ] No major section relies on arbitrary animation timers.
-   [ ] Animations remain smooth at normal and fast scroll speeds.
-   [ ] The site still feels like PerPixel rather than a copy of any
    reference.

------------------------------------------------------------------------

# 32. North Star

PerPixel should feel like a **designed experience**, not a collection of
animated components.

The strongest moments should come from:

**Typography + whitespace + composition + scroll + timing.**

Motion should make the existing design feel inevitable.

When unsure between a complicated animation and a simple one:

**Choose the simpler animation if it communicates the same design
intent.**
