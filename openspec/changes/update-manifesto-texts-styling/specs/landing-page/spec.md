## MODIFIED Requirements

### Requirement: Manifesto Section Text Content and Styling
The ManifestoSection SHALL display four manifesto texts with special formatting applied to the first three texts (indices 0, 1, and 2). Each styled text SHALL use responsive typography, bold keywords, and orange accent colors for emphasis.

#### Scenario: Manifesto text at index 1 displays with special formatting
- **WHEN** the user scrolls to the second manifesto text (index 1)
- **THEN** the text displays "GATI's Creativity speaks with purpose, guided by clarity and responsibility —Every solution honors People, Business, and the Future."
- **AND** "GATI's" is styled with bold white (fontWeight: 700, color: '#ffffff')
- **AND** "speaks" is styled with white color (color: '#ffffff')
- **AND** "purpose", "clarity", and "responsibility" are styled with orange bold (color: '#f05123', fontWeight: 700)
- **AND** the tagline "—Every solution honors People, Business, and the Future." is displayed in smaller responsive text (text-xs md:text-base xl:text-lg 2xl:text-xl)
- **AND** the main text uses responsive typography classes (text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl)

#### Scenario: Manifesto text at index 2 displays with special formatting
- **WHEN** the user scrolls to the third manifesto text (index 2)
- **THEN** the text displays "GATI provide clear direction and build efficient, scalable systems that help businesses grow safely and sustainably"
- **AND** "GATI" is styled with bold white (fontWeight: 700, color: '#ffffff')
- **AND** "efficient", "scalable", and "safely" are styled with bold white (fontWeight: 700, color: '#ffffff')
- **AND** "sustainably" is styled with orange bold (color: '#f05123', fontWeight: 700)
- **AND** the text uses responsive typography classes (text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl)
- **AND** there is no tagline for this text

### Requirement: Manifesto Section Responsive Typography
All styled manifesto texts (indices 0, 1, and 2) SHALL use consistent responsive typography that adapts to different viewport sizes:
- Mobile (390px): text-2xl
- Tablet (768px): text-4xl
- Desktop (1280px, 1440px): text-5xl
- Large Desktop (1920px): text-6xl

#### Scenario: Responsive typography on different devices
- **WHEN** the manifesto section is viewed on mobile (390px)
- **THEN** styled texts display at text-2xl size
- **WHEN** viewed on tablet (768px)
- **THEN** styled texts display at text-4xl size
- **WHEN** viewed on desktop (1280px, 1440px)
- **THEN** styled texts display at text-5xl size
- **WHEN** viewed on large desktop (1920px)
- **THEN** styled texts display at text-6xl size

### Requirement: Manifesto Section Color and Font Weight Styling
Manifesto texts SHALL use consistent color and font weight styling:
- Brand name "GATI" or "GATI's" SHALL be displayed in bold white (fontWeight: 700, color: '#ffffff')
- Key concepts and important words SHALL be displayed in orange bold (color: '#f05123', fontWeight: 700) or bold white depending on the text
- Regular text SHALL use normal font weight (fontWeight: 400) and appropriate text color
- Taglines (when present) SHALL use smaller responsive text sizes

#### Scenario: Color and font weight application
- **WHEN** a styled manifesto text is displayed
- **THEN** the brand name appears in bold white
- **AND** emphasized keywords appear in orange bold or bold white as specified
- **AND** regular text appears in normal font weight
- **AND** taglines (when present) appear in smaller text sizes

