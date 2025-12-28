## MODIFIED Requirements
### Requirement: Manifesto Section Responsive Typography
The ManifestoSection component SHALL display all manifesto texts with responsive font sizing that adapts to screen size, ensuring text remains centered, readable, and properly scaled across all breakpoints: 390px (mobile), 768px (tablet), 1280px, 1440px, and 1920x1080px (primary desktop resolution).

The first manifesto text (index 0) SHALL use responsive font sizing instead of fixed pixel values, scaling appropriately from 390px to 1920px while maintaining visual hierarchy with its subtitle text.

All manifesto texts SHALL maintain centered alignment and proper text wrapping without horizontal overflow at any viewport size.

Container padding and spacing SHALL adapt per breakpoint: relaxed spacing at 1440px+, tighter vertical spacing at 1280px, and appropriate mobile padding at 768px and 390px.

#### Scenario: First manifesto text displays with responsive font sizes on mobile (390px)
- **WHEN** the user views the landing page on a mobile device (390px width)
- **THEN** the first manifesto text displays with font size appropriate for mobile (e.g., text-2xl or text-3xl, approximately 24-30px)
- **AND** the subtitle text displays with proportionally scaled font size (e.g., text-xs or text-sm, approximately 12-14px)
- **AND** the text remains centered within the viewport
- **AND** no horizontal overflow occurs
- **AND** container uses appropriate mobile padding for fully stacked layout

#### Scenario: First manifesto text displays with responsive font sizes on tablet (768px)
- **WHEN** the user views the landing page on a tablet device (768px width)
- **THEN** the first manifesto text displays with font size appropriate for tablet (e.g., text-4xl or text-5xl, approximately 36-48px)
- **AND** the subtitle text displays with proportionally scaled font size (e.g., text-base or text-lg, approximately 16-18px)
- **AND** the text remains centered within the viewport
- **AND** layout uses fully stacked layout appropriate for tablet

#### Scenario: First manifesto text displays with responsive font sizes at 1280px
- **WHEN** the user views the landing page at 1280px width
- **THEN** the first manifesto text displays with font size appropriate for 1280px (e.g., text-5xl or text-6xl, approximately 48-60px)
- **AND** the subtitle text displays with proportionally scaled font size (e.g., text-lg or text-xl, approximately 18-20px)
- **AND** vertical spacing is tightened appropriately
- **AND** the text remains centered within the viewport

#### Scenario: First manifesto text displays with responsive font sizes at 1440px
- **WHEN** the user views the landing page at 1440px width
- **THEN** the first manifesto text displays with font size appropriate for 1440px (e.g., text-6xl, approximately 60px)
- **AND** the subtitle text displays with proportionally scaled font size (e.g., text-xl, approximately 20px)
- **AND** container uses adaptive padding with relaxed spacing
- **AND** the text remains centered within the viewport

#### Scenario: First manifesto text displays with responsive font sizes on primary desktop (1920x1080px)
- **WHEN** the user views the landing page on a desktop device at primary resolution (1920x1080px)
- **THEN** the first manifesto text displays with font size appropriate for primary desktop (e.g., text-6xl or text-7xl, approximately 60-72px)
- **AND** the subtitle text displays with proportionally scaled font size (e.g., text-xl or text-2xl, approximately 20-24px)
- **AND** the text remains centered within the viewport
- **AND** container uses relaxed spacing optimized for 1920px width

#### Scenario: All manifesto texts use consistent responsive scaling
- **WHEN** the user views the ManifestoSection at any breakpoint (390px, 768px, 1280px, 1440px, 1920px)
- **THEN** all four manifesto texts use responsive font sizing that scales appropriately from 390px to 1920px
- **AND** font sizes maintain visual hierarchy and readability at all breakpoints
- **AND** line heights scale proportionally with font sizes
- **AND** text remains properly centered and constrained within the viewport
- **AND** container padding and spacing adapt per breakpoint (relaxed at 1440px+, tighter at 1280px, mobile-appropriate at 768px and 390px)

