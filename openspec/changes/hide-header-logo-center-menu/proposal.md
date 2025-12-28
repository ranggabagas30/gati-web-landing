# Change: Hide Header Logo and Center Menu

## Why
The current header displays the GATI logo on the left side with the navigation menu on the right. To simplify the header design and focus attention on navigation, we want to remove the logo completely and center the menu items for a cleaner, more minimalist header layout.

## What Changes
- **REMOVED** GATI logo: The logo image and its container SHALL be completely removed from the header
- **MODIFIED** Header layout: Change flex layout from `justify-between` to `justify-center` to center the navigation menu
- **MODIFIED** Desktop menu alignment: Navigation menu items SHALL be centered horizontally within the header container
- **ADDED** Centered menu layout: Both desktop and mobile menu layouts SHALL maintain centered alignment without logo presence

## Impact
- Affected specs: `landing-page`
- Affected code: `src/app/components/Header.tsx` (lines 60-68 for logo removal, line 59 for layout change, lines 70-83 for menu centering)
- Visual design: Header will have a cleaner, minimalist appearance with centered navigation
- User experience: Navigation becomes the primary focus, simpler header design
- Accessibility: Logo removal does not impact accessibility as navigation items remain accessible

