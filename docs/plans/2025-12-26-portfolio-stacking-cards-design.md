# Portfolio Stacking Cards Design

**Date:** 2025-12-26
**Status:** Approved
**Implementation:** Pending

## Overview

Transform the Portfolio Section into an immersive stacking card experience where cards appear to stack and scale as the user scrolls, creating a showcase effect for selected works.

## Requirements Summary

- **Visual Effect:** Vertical stack with scale - cards layer on top of each other with scaling animation
- **Scroll Behavior:** Section pins for 3 viewport heights (one per card), then unpins to continue
- **Initial State:** All cards visible in compressed stack, animate to full size one by one
- **Card Sizing:** Large and prominent (90vw × 85vh with max constraints)
- **Interactivity:** Purely presentational (no click/hover actions)
- **Responsive:** Same effect on all screen sizes
- **Content:** Keep existing project data and card layout

## Architecture

### Section Structure

```
PortfolioSection (main component)
├── Section wrapper (pinned container, min-h-screen)
│   ├── Title ("Selected Works")
│   └── Cards container (relative positioning, centered)
│       ├── Card 0 (absolute, z-10 → z-30)
│       ├── Card 1 (absolute, z-20 → z-30)
│       └── Card 2 (absolute, z-30)
```

### Scroll Pinning Setup

- **Pin trigger:** Section reaches top of viewport
- **Pin duration:** `(number of cards) × 100vh` = 300vh for 3 cards
- **Mechanism:** ScrollTrigger creates "virtual scroll" - section appears fixed while scroll progress continues
- **Unpin:** After all cards revealed, section unpins and normal scrolling resumes

### Card Animation States

Each card transitions through:

1. **Initial (compressed):**
   - Card 0: `scale(0.7), translateY(-40px), z-index: 10`
   - Card 1: `scale(0.8), translateY(-20px), z-index: 20`
   - Card 2: `scale(0.9), translateY(0px), z-index: 30`

2. **Animating:** Scales from initial → `scale(1.0)`, moves to `translateY(0)`

3. **Final (revealed):** `scale(1.0), translateY(0), z-index: 30`

### Z-Index Strategy

- Cards start with increasing z-index (10, 20, 30)
- As each card animates to full size, it receives highest z-index (30)
- Previous cards remain visible underneath at smaller scale
- Creates layering effect with newest card always on top

## Implementation Approach

### Technology: GSAP ScrollTrigger with Timeline

**Why GSAP ScrollTrigger:**
- Project already uses GSAP and ScrollTrigger
- Precise control over scroll-to-animation mapping
- Elegant section pinning support
- Smooth, performant, well-tested
- Easy to sync card scaling with z-index changes

### Animation Timeline

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    pin: true,              // Pin section during scroll
    start: 'top top',       // Pin when section top hits viewport top
    end: '+=300%',          // Stay pinned for 300vh scroll
    scrub: 1,               // Smooth scroll-linked animation
    anticipatePin: 1,       // Prevent jump on pin
  }
});

// Animate each card sequentially
cards.forEach((card, index) => {
  tl.to(card, {
    scale: 1,
    y: 0,
    zIndex: 30,
    duration: 1,            // 1 timeline unit = 100vh scroll
    ease: 'power2.out'
  }, index);                // Stagger by index
});
```

### Key Parameters

- `scrub: 1` - Links animation to scroll with 1s smoothing
- `pin: true` - Keeps section fixed during animation
- `end: '+=300%'` - Pin for 3× section height
- `duration: 1` per card - Each card animates over 100vh of scroll
- `ease: 'power2.out'` - Smooth deceleration

## Layout Details

### Card Container Dimensions

- Desktop: `w-[90vw] max-w-[900px] h-[85vh] max-h-[700px]`
- Mobile: `w-[95vw] h-[80vh]` (optimized for smaller screens)
- Position: Centered in viewport using flexbox

### Card Content Adjustments

For larger card format:
- Title: `text-3xl` → `text-4xl`
- Internal padding: `p-6` → `p-8` or `p-10`
- Keep existing structure: image area, users badge, title, labels, description
- Ensure content is readable at 90vw scale

### Positioning

- All cards absolutely positioned at same center point
- Layered with z-index
- Container uses `relative` positioning for absolute children
- Centered using flexbox: `flex items-center justify-center`

## Edge Cases & Considerations

### Dynamic Card Count

- Animation adapts to `projects.length`
- Pin duration: `+=${projects.length * 100}%`
- Timeline loops through all projects dynamically

### Initial Load

- Set initial transform values before GSAP runs
- Prevents flash of unstyled content (FOUC)
- Use inline styles or CSS classes for initial state

### Accessibility

- Respect `prefers-reduced-motion`:
  ```tsx
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scrub: prefersReducedMotion ? 0 : 1
  ```
- Maintain semantic HTML structure
- Ensure content is keyboard accessible

### Performance

- `will-change: transform` on cards for GPU acceleration
- GSAP automatically optimizes for 60fps
- No React re-renders during animation (pure GSAP)
- ScrollTrigger handles resize automatically

### Cleanup

- Kill all ScrollTriggers in useEffect cleanup
- GSAP auto-cleans tweens
- Proper unmount prevents memory leaks

## Testing Checklist

- [ ] Smooth scrolling through all 3 cards
- [ ] Section pins correctly at top
- [ ] Section unpins after last card
- [ ] Cards scale smoothly from initial to final state
- [ ] Z-index layering works correctly
- [ ] Mobile performance is smooth
- [ ] Works with different numbers of projects
- [ ] Respects reduced motion preference
- [ ] No layout shift on initial load
- [ ] Cleanup on unmount (no memory leaks)

## Optional Future Enhancements

- Subtle parallax effect on card backgrounds
- Staggered content animation (labels, description fade-in)
- Progress indicator showing active card
- Card content animation on reveal
- Touch/swipe gestures for mobile
- Keyboard navigation between cards

## References

- Current implementation: `src/app/components/PortfolioSection.tsx`
- GSAP ScrollTrigger docs: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Existing GSAP usage in project: Already registered in PortfolioSection.tsx
