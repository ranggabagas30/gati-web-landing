# Change: Update Manifesto Texts Styling

## Why
The manifesto section currently has plain text styling for items at index 1 and 2. To maintain visual consistency with the first manifesto text (index 0) and create a cohesive, branded experience, these texts need to be updated with:
- Updated content matching the design reference
- Special formatting with bold keywords, orange accent colors, and responsive typography
- Consistent styling pattern across all manifesto texts

## What Changes
- **MODIFIED** Manifesto text at index 1: Content SHALL be updated to "GATI's Creativity speaks with purpose, guided by clarity and responsibility —Every solution honors People, Business, and the Future."
- **MODIFIED** Manifesto text at index 1 styling: SHALL apply special formatting with "GATI's" in bold white, "purpose", "clarity", and "responsibility" in orange bold, and a smaller tagline
- **MODIFIED** Manifesto text at index 2: Content SHALL be updated to "GATI provide clear direction and build efficient, scalable systems that help businesses grow safely and sustainably"
- **MODIFIED** Manifesto text at index 2 styling: SHALL apply special formatting with "GATI" in bold white, "efficient", "scalable", "safely" in bold white, and "sustainably" in orange bold
- **MODIFIED** ManifestoSection component: SHALL extend the special styling logic to handle index 1 and 2 with the same responsive typography pattern as index 0

## Impact
- Affected specs: `landing-page` (new capability)
- Affected code: `src/app/components/ManifestoSection.tsx`
- Visual design: Enhanced typography and color hierarchy for manifesto texts 1 and 2
- User experience: More consistent and branded visual presentation across all manifesto texts

