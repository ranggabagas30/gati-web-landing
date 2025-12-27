# Project Context

## Purpose
GATI Website Landing Page is a modern, responsive marketing website showcasing GATI's services, expertise, portfolio, and team. The project serves as the primary landing page for the company, featuring multiple sections including manifesto, services, team, portfolio, expertise, and pricing. The site is designed with smooth animations, responsive layouts, and a professional aesthetic to effectively communicate GATI's brand and offerings.

## Tech Stack
- **React** 18.3.1 - UI framework
- **TypeScript** - Type safety and development experience
- **Vite** 6.3.5 - Build tool and development server
- **Tailwind CSS** 4.1.12 - Utility-first CSS framework
- **GSAP** (GreenSock Animation Platform) - Advanced animations and scroll triggers
- **Radix UI** - Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Material UI** 7.3.5 - Additional UI components and icons
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Utility for merging Tailwind classes

## Project Conventions

### Code Style
- **File Extensions**: Use `.tsx` for React components, `.ts` for utilities
- **Component Structure**: Functional components using React hooks
- **Exports**: Use named exports for components (e.g., `export function Header()`)
- **Naming**: PascalCase for components, camelCase for variables and functions
- **Styling**: Tailwind CSS utility classes for all styling
- **Class Management**: Use `cn()` utility function (from `@/app/components/ui/utils.ts`) for conditional and merged className strings
- **Path Aliases**: Use `@/` alias to reference the `src/` directory (configured in `vite.config.ts`)
- **Asset Imports**: Use Figma asset imports (e.g., `import logoImage from 'figma:asset/...'`)

### Architecture Patterns
- **Component-Based Architecture**: Each section is a separate component in `src/app/components/`
- **UI Components**: Reusable UI components (shadcn/ui style) located in `src/app/components/ui/`
- **Section Components**: Main page sections are top-level components (Header, Footer, ManifestoSection, etc.)
- **Styling Organization**: 
  - Global styles in `src/styles/`
  - Component-specific styles via Tailwind classes
  - Theme configuration in `src/styles/theme.css`
- **State Management**: Local component state using React hooks (useState, useEffect, useRef)
- **Animation Strategy**: GSAP with ScrollTrigger for scroll-based animations
  - Portfolio section uses advanced scroll-triggered card stacking animation
  - Cards animate from peek state → active (centered) → archived (above viewport)
  - Uses GSAP timeline with ScrollTrigger pinning for smooth scroll-linked animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (md:, lg:)

### Testing Strategy
Currently no testing framework is configured. Testing strategy to be determined based on project needs.

### Git Workflow
Git workflow conventions to be established. Consider standard practices like:
- Feature branches for new work
- Descriptive commit messages
- Regular commits

## Domain Context
- **GATI** is a company offering digital services including:
  - MVP App Development
  - Web Applications
  - Website Landing Pages
  - Digital Marketing
  - Branding
- The landing page includes sections for:
  - Company manifesto and values
  - Services offered
  - Team members
  - Portfolio/work examples (stacking card animation with scroll-triggered reveal)
  - Areas of expertise
  - Pricing information
- Brand colors include:
  - Primary accent: `#f05123` (orange)
  - Text: `#0f0f0f` (dark)
  - Background: White with transparency effects
  - Portfolio cards alternate between white and orange backgrounds (even index: white, odd index: orange)

## Important Constraints
- **Figma Integration**: Project uses Figma asset imports, requiring Figma plugin/configuration
- **Browser Support**: Modern browsers (ES6+ support required)
- **Performance**: Optimize animations and images for smooth scrolling and fast load times
- **Responsive Design**: Must work across mobile, tablet, and desktop viewports
- **Accessibility**: Components should follow accessibility best practices (Radix UI helps with this)

## External Dependencies
- **Figma Assets**: Images and assets imported from Figma design file
  - Original design: https://www.figma.com/design/tai0EnSVMtozMoDTQeOmYB/GATI-Website-Landing-Page
- **GSAP ScrollTrigger**: Requires registration and cleanup to prevent memory leaks
- **No external APIs**: Currently a static landing page with no backend integration
