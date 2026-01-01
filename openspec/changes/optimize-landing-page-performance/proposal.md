# Change: Optimize Landing Page Performance

## Why
The performance analysis report identifies critical optimization opportunities that are impacting page load times and bandwidth usage. Images account for 79% of total page weight (1.45 MB), with the largest file (`porto-cuanx.png`) being 875 KB. The JavaScript bundle includes potentially unused Radix UI components, and images lack lazy loading. These issues result in slow initial page loads, high bandwidth usage, and poor mobile performance. Optimizing these areas will reduce page weight by ~70%, improve load times by 50-60%, and significantly reduce hosting costs.

## What Changes
- **MODIFIED** Image optimization: All images SHALL be optimized using modern formats (WebP/AVIF) and compression tools (Squoosh, ImageOptim, or Sharp)
  - `porto-cuanx.png` (875 KB) → WebP/AVIF target <200 KB (77% reduction)
  - `porto-footballmoney.jpeg` (284 KB) → WebP target <150 KB (47% reduction)
  - Profile images (144 KB + 99 KB) → WebP target <80 KB each
  - PNG icons → SVG where possible (35 KB + 17 KB → ~5 KB total)
- **ADDED** Image lazy loading: All below-fold images SHALL use `loading="lazy"` attribute and Intersection Observer for progressive loading
- **ADDED** Responsive images: Images SHALL use `srcset` for different screen sizes to serve appropriate sizes on mobile devices
- **MODIFIED** JavaScript bundle optimization: Unused Radix UI components and dependencies SHALL be removed via tree-shaking and dependency audit
- **ADDED** Brotli compression: CDN SHALL serve assets with Brotli compression enabled (additional 10-15% savings vs gzip)
- **ADDED** Resource hints: HTML SHALL include `preconnect` and `dns-prefetch` for external resources (Google Fonts)
- **MODIFIED** CSS optimization: Unused Tailwind classes SHALL be purged at build time

## Impact
- Affected specs: `landing-page`
- Affected code: 
  - `public/images/` - All image files
  - `src/app/components/` - Components using images (PortfolioSection, TeamSection, Header, Footer)
  - `index.html` - Resource hints
  - `vite.config.ts` - Build optimizations
  - `package.json` - Dependency cleanup
- Performance: 70% reduction in bandwidth usage, 50-60% faster initial page load
- Mobile experience: Significantly improved load times and reduced memory footprint
- Hosting costs: Reduced bandwidth usage enables staying on free tiers longer
- User experience: Faster page loads, especially on mobile devices and slower connections

