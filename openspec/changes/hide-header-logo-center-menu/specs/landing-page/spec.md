## MODIFIED Requirements
### Requirement: Header Layout and Navigation
The Header component SHALL display navigation menu items centered horizontally without displaying a logo. The header SHALL use a centered flex layout for navigation items on desktop, with the mobile hamburger menu button appropriately positioned for mobile viewports.

#### Scenario: Header displays centered navigation menu without logo on desktop
- **WHEN** the user views the landing page on a desktop device (>=768px width)
- **THEN** the header displays navigation menu items (About us, Work, Expertise, Product & Services, Contact us) centered horizontally
- **AND** no logo image is displayed in the header
- **AND** menu items maintain proper spacing and hover states

#### Scenario: Header displays centered hamburger menu without logo on mobile
- **WHEN** the user views the landing page on a mobile device (<768px width)
- **THEN** the header displays a centered hamburger menu button
- **AND** no logo image is displayed in the header
- **AND** clicking the hamburger button opens the mobile menu dropdown with navigation items

#### Scenario: Header maintains background color transitions
- **WHEN** the user scrolls past the About section
- **THEN** the header background transitions from transparent to white with backdrop blur
- **AND** the centered navigation menu remains visible and functional
- **AND** menu item text colors change appropriately (white when transparent, dark when scrolled)

#### Scenario: Header alignment with content sections
- **WHEN** the user views the landing page at any viewport width
- **THEN** the header container padding and alignment matches all section containers
- **AND** navigation menu items are centered within the header container
- **AND** the header maintains consistent spacing across all breakpoints

