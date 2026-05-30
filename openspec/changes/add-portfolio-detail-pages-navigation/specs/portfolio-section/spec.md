## ADDED Requirements
### Requirement: Portfolio Cards Navigate to Detail Pages
The portfolio section SHALL allow users to navigate to a dedicated detail page by clicking each project card.

#### Scenario: User opens a project detail page from card click
- **WHEN** the user clicks a project card in the portfolio stack
- **THEN** the app navigates to that project's detail route
- **AND** the opened route corresponds to the clicked card slug

#### Scenario: User opens a project detail page with keyboard
- **WHEN** a project card receives focus and the user presses Enter or Space
- **THEN** the app navigates to that project's detail route

### Requirement: Portfolio Detail Pages Exist for Each Project
The app SHALL provide dedicated portfolio detail pages for CuanX, Football Money, and IPTV using adapted content structure based on archived case-study templates.

#### Scenario: CuanX detail route is available
- **WHEN** the user navigates to the CuanX portfolio route
- **THEN** the app renders a CuanX detail page with hero, content sections, features, tech stack, results, and CTA blocks

#### Scenario: Football Money detail route is available
- **WHEN** the user navigates to the Football Money portfolio route
- **THEN** the app renders a Football Money detail page with hero, content sections, features, tech stack, results, and CTA blocks

#### Scenario: IPTV detail route is available
- **WHEN** the user navigates to the IPTV portfolio route
- **THEN** the app renders an IPTV detail page with hero, content sections, features, tech stack, results, and CTA blocks

### Requirement: CuanX Uses Provided Image Replacements
The CuanX detail page SHALL replace specified placeholders with provided images while leaving all unspecified placeholders unchanged.

#### Scenario: App Interface placeholder uses provided image
- **WHEN** the CuanX detail page renders the App Interface visual
- **THEN** it displays `cuanx_sanded.png`

#### Scenario: Development Roadmap placeholder uses provided image
- **WHEN** the CuanX detail page renders the Development Roadmap visual
- **THEN** it displays `cuanx_jira.png`

#### Scenario: Location & Tracking visual shows two images in a row
- **WHEN** the CuanX detail page renders the Location & Tracking visual
- **THEN** it displays `cuanx_light.png` and `cuanx_dark_map.png` side by side in a single row

#### Scenario: Unspecified placeholders remain placeholders
- **WHEN** any detail page renders visuals not mapped to explicit replacement assets
- **THEN** those visuals remain placeholder blocks
