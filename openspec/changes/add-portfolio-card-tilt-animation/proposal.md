# Change: Add Portfolio Card Tilt Animation

## Why
The current portfolio card animation moves cards vertically (peek → active → archived) but lacks visual depth and dynamism. Based on the reference design, cards should tilt/rotate during the transition to create a more engaging 3D effect. The purple card example shows the card tilting with rotation on the Y-axis and Z-axis as the user scrolls, adding visual interest and depth to the stacking animation.

This change adds a tilting transformation to portfolio cards during scroll, creating a more dynamic and visually appealing transition effect.

## What Changes
- **ADDED** Card tilt animation: Cards SHALL rotate on Y-axis and Z-axis in parallel BEFORE vertical translation begins
- **MODIFIED** GSAP timeline: The existing timeline SHALL include rotation transformations (rotateY, rotateZ) that complete before Y position changes
- **ADDED** 3D perspective: Cards SHALL have CSS 3D transforms enabled to support rotation effects
- **MODIFIED** Animation timing: Rotation SHALL occur at the START with sufficient duration tied to scroll distance, completing before Y translation phase
- **MODIFIED** Rotation persistence: Cards SHALL maintain their rotated state (NOT revert to 0°) and remain rotated during and after Y translation
- **CRITICAL** Animation sequence: 
  1. Rotation (Y-axis and Z-axis in parallel) executes first with sufficient duration
  2. Rotation completes and is maintained
  3. Y translation follows with the card staying in rotated state

## Impact
- Affected specs: `portfolio-section`
- Affected code: `src/app/components/PortfolioSection.tsx` (GSAP timeline configuration, lines 219-233)
- Visual design: Cards will tilt/rotate during scroll, creating a 3D effect
- Animation complexity: Adds rotateY and rotateZ properties to GSAP timeline
- Performance: Minimal impact, using GPU-accelerated CSS transforms

