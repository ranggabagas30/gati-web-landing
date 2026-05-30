# Change: Add Portfolio Detail Pages and Card Navigation

## Why
The portfolio section currently presents projects as animated cards inside a single landing page but does not provide dedicated detail views for each project. Users need a clear way to click a project card and explore a full case-study page.

This change introduces route-based portfolio detail pages and card click navigation while preserving the existing GSAP stack animation behavior on the landing page.

## What Changes
- **ADDED** Route-based portfolio detail pages: The app SHALL provide dedicated detail routes for CuanX, Football Money, and IPTV.
- **ADDED** Card click navigation: Each portfolio card SHALL be clickable and navigate to its corresponding detail route.
- **ADDED** Shared portfolio detail content model: Detail pages SHALL render from a structured project data source keyed by slug.
- **MODIFIED** App shell routing: The app entry SHALL support hash-based routing suitable for static hosting.
- **ADDED** CuanX placeholder image replacements: CuanX detail page SHALL replace specified placeholders with provided assets:
  - App Interface -> `cuanx_sanded.png`
  - Development Roadmap -> `cuanx_jira.png`
  - Location & Tracking -> `cuanx_light.png` and `cuanx_dark_map.png` side by side
- **ADDED** Placeholder preservation: Unspecified placeholders in all detail pages SHALL remain as placeholders.

## Impact
- Affected specs: `portfolio-section`
- Affected code:
  - `src/main.tsx`
  - `src/app/App.tsx`
  - `src/app/components/PortfolioSection.tsx`
  - new route/detail page components and shared portfolio data under `src/app/`
- User experience:
  - Users can open project-specific pages from cards.
  - Landing page GSAP card stack remains intact.
- Deployment/runtime:
  - Hash routing avoids server-side rewrite requirements for static hosting.
