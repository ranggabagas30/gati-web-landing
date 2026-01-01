## ADDED Requirements

### Requirement: Optimized Image Assets
The landing page SHALL use optimized image formats (WebP/AVIF) for all images, with file sizes reduced by at least 50% compared to original formats while maintaining visual quality acceptable for web display.

Portfolio images SHALL be optimized to <200 KB each (down from 875 KB and 284 KB).

Profile images SHALL be optimized to <80 KB each (down from 144 KB and 99 KB).

Icons and logos SHALL use SVG format when possible, with file sizes <5 KB each (down from 35 KB and 17 KB for PNG versions).

#### Scenario: Optimized portfolio images load faster
- **WHEN** the user visits the landing page
- **THEN** portfolio images are served in WebP format
- **AND** `porto-cuanx.webp` is <200 KB (down from 875 KB)
- **AND** `porto-footballmoney.webp` is <150 KB (down from 284 KB)
- **AND** images maintain acceptable visual quality
- **AND** page load time is reduced by at least 50% for image assets

#### Scenario: Optimized profile images load efficiently
- **WHEN** the user views the team section
- **THEN** profile images are served in WebP format
- **AND** each profile image is <80 KB (down from 144 KB and 99 KB)
- **AND** images maintain acceptable visual quality for profile photos
- **AND** mobile devices experience faster load times

#### Scenario: SVG icons reduce file size
- **WHEN** the user views the page
- **THEN** icons and logos use SVG format where possible
- **AND** `ic_linkedin.svg` is <2 KB (down from 35 KB PNG)
- **AND** `gati_logo_white.svg` is <3 KB (down from 17 KB PNG)
- **AND** icons display correctly at all sizes

### Requirement: Image Lazy Loading
All images below the initial viewport (below-fold) SHALL use lazy loading to defer loading until they are about to enter the viewport, reducing initial page load time and bandwidth usage.

#### Scenario: Below-fold images load on scroll
- **WHEN** the user visits the landing page
- **THEN** images in the initial viewport load immediately
- **AND** portfolio images below the fold do not load until user scrolls near them
- **AND** profile images in team section load only when section is about to be visible
- **AND** initial page load time is reduced by at least 1.2 MB

#### Scenario: Lazy loading uses native browser support
- **WHEN** images are configured for lazy loading
- **THEN** `loading="lazy"` attribute is used on `<img>` tags
- **AND** Intersection Observer is used for additional progressive loading where needed
- **AND** images load smoothly as user scrolls

### Requirement: Responsive Images
Images SHALL use responsive image techniques (`srcset` and `sizes` attributes) to serve appropriately sized images based on device screen size and pixel density, reducing bandwidth usage on mobile devices by 30-50%.

#### Scenario: Mobile devices receive smaller images
- **WHEN** the user views the page on a mobile device (390px width)
- **THEN** portfolio images are served at smaller sizes optimized for mobile
- **AND** profile images are served at sizes appropriate for mobile viewport
- **AND** bandwidth usage is reduced by 30-50% compared to serving full-size images
- **AND** image quality remains acceptable for mobile displays

#### Scenario: Desktop devices receive full-size images
- **WHEN** the user views the page on a desktop device (1920px width)
- **THEN** portfolio images are served at full resolution
- **AND** high-DPI displays receive appropriately sized images
- **AND** image quality is optimal for large screens

## MODIFIED Requirements

### Requirement: Landing Page Performance
The landing page SHALL load with optimized performance metrics: total page weight <500 KB for first-time visitors (down from ~1.86 MB), initial page load time <2 seconds on 4G connection, and bandwidth usage reduced by at least 70% compared to pre-optimization state.

The landing page SHALL use optimized image formats, lazy loading, and responsive images to achieve these performance targets.

#### Scenario: Optimized page loads quickly
- **WHEN** a first-time visitor loads the landing page
- **THEN** total page weight is <500 KB (down from ~1.86 MB)
- **AND** initial page load time is <2 seconds on 4G connection
- **AND** core assets (HTML/CSS/JS) load in <1 second
- **AND** images load progressively

#### Scenario: Bandwidth usage is reduced
- **WHEN** the landing page is accessed
- **THEN** monthly bandwidth usage for 10,000 visits is <5 GB (down from ~15.7 GB)
- **AND** bandwidth reduction is at least 70% compared to pre-optimization
- **AND** hosting costs are reduced or free tier limits are not exceeded

### Requirement: JavaScript Bundle Size
The JavaScript bundle SHALL be optimized by removing unused dependencies and tree-shaking unused code, resulting in a bundle size reduction of at least 20-30 KB (gzipped).

#### Scenario: Unused dependencies are removed
- **WHEN** the build process runs
- **THEN** unused Radix UI components are not included in the bundle
- **AND** unused Material UI components are tree-shaken
- **AND** other unused dependencies are removed from package.json
- **AND** JavaScript bundle size is reduced by at least 20-30 KB (gzipped)

## ADDED Requirements

### Requirement: Resource Hints for External Assets
The HTML document SHALL include resource hints (`preconnect` and `dns-prefetch`) for external resources to improve loading performance of third-party assets like Google Fonts.

#### Scenario: Google Fonts load faster
- **WHEN** the page loads
- **THEN** HTML includes `<link rel="preconnect" href="https://fonts.googleapis.com">`
- **AND** HTML includes `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
- **AND** Google Fonts load faster due to early connection establishment
- **AND** font loading does not block initial page render

### Requirement: CSS Optimization
Unused Tailwind CSS classes SHALL be purged at build time to reduce CSS bundle size by at least 10-20 KB.

#### Scenario: Unused CSS is removed
- **WHEN** the build process runs
- **THEN** Tailwind CSS purges unused classes
- **AND** CSS bundle size is reduced by at least 10-20 KB
- **AND** only CSS classes actually used in components are included in the final bundle

