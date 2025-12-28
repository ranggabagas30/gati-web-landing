# Change: Make Manifesto Section Responsive

## Why
The ManifestoSection component currently uses fixed font sizes (76px for main text, 24px for subtitle) for the first manifesto text, which causes layout issues on smaller screens like mobile devices (e.g., 430 x 932 pixels). The text overflows or becomes too large for the viewport, breaking the centered layout and readability. Other manifesto texts use responsive Tailwind classes but may not scale optimally across all device sizes. The section must adapt seamlessly from desktop to tablet to mobile while maintaining centered alignment and appropriate text scaling.

## What Changes
- **MODIFIED** First manifesto text font sizing: Replace fixed pixel values (76px, 24px) with responsive Tailwind classes or viewport-relative units (vw/vh/rem) that scale appropriately across screen sizes
- **MODIFIED** First manifesto text line height: Update line height to use responsive units that maintain proper proportions at all screen sizes
- **MODIFIED** Manifesto text container: Ensure text remains centered and properly constrained with appropriate padding/margins at all viewport sizes
- **MODIFIED** Font size scaling strategy: Implement a responsive typography scale targeting 1920x1080px as primary resolution, with breakpoints at 1440px (adaptive container padding + relaxed spacing), 1280px (tighter vertical spacing), 768px (tablet - fully stacked layout), and 390px (mobile - fully stacked layout)
- **ADDED** Mobile-first responsive typography: All manifesto texts SHALL use responsive font sizing that scales down appropriately on mobile devices while maintaining readability
- **MODIFIED** Text wrapping and overflow: Ensure long text lines wrap properly and do not overflow the viewport width on any device size
- **ADDED** Consistent scaling across all manifesto texts: All four manifesto texts SHALL use consistent responsive font sizing patterns

## Impact
- Affected specs: `landing-page`
- Affected code: `src/app/components/ManifestoSection.tsx` (lines 122-128 for first manifesto, lines 151 for other manifestos, lines 109-111 for container)
- Visual design: Text will scale appropriately from 390px (mobile) to 1920x1080px (primary desktop) while maintaining centered alignment
- User experience: Improved readability and layout across all breakpoints (390px, 768px, 1280px, 1440px, 1920px)
- Maintainability: Consistent responsive typography approach across all manifesto texts following project layout standards

