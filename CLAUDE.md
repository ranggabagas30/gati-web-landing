# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
npm i                # Install dependencies
npm run dev          # Start Vite development server (http://localhost:5173)
npm run build        # Build production bundle
```

### OpenSpec Workflow
This project uses OpenSpec for spec-driven development:

```bash
openspec list                  # List active changes
openspec list --specs          # List specifications
openspec show [item]           # Display change or spec details
openspec validate [item]       # Validate changes or specs
openspec archive <change-id>   # Archive after deployment
```

**When to create proposals:** See `openspec/AGENTS.md` - required for new features, breaking changes, architecture changes, or performance/security work. Bug fixes and typos can skip proposals.

**Important:** Always check `openspec/AGENTS.md` when planning or proposing changes. The workflow requires reading `project.md`, creating proposals with deltas, and validating strictly before implementation.

## Architecture Overview

### Tech Stack
- **React 18.3.1** with TypeScript
- **Vite 6.3.5** for build and dev server
- **Tailwind CSS 4.1.12** for styling
- **GSAP** for animations and scroll triggers
- **Radix UI** for accessible component primitives
- **Material UI 7.3.5** for additional components

### Project Structure
```
src/
├── app/
│   ├── App.tsx                    # Main app component - sections rendered in order
│   └── components/
│       ├── Header.tsx             # Navigation and hero
│       ├── ManifestoSection.tsx   # Company manifesto
│       ├── ServicesSection.tsx    # Services overview
│       ├── TeamSection.tsx        # Team members
│       ├── PortfolioSection.tsx   # Portfolio/work examples
│       ├── ExpertiseSection.tsx   # Areas of expertise
│       ├── ServicesListSection.tsx # Detailed services list
│       ├── PricingSection.tsx     # Pricing information
│       ├── Footer.tsx             # Footer with links
│       └── ui/                    # Reusable UI components (shadcn/ui style)
├── assets/                        # Images, fonts, static assets
├── styles/
│   ├── index.css                  # Global styles
│   └── theme.css                  # Theme configuration
└── main.tsx                       # React app entry point
```

### Key Patterns

**Component Architecture:**
- Each landing page section is a separate component in `src/app/components/`
- Reusable UI primitives are in `src/app/components/ui/` (accordion, button, dialog, etc.)
- All components are functional components using React hooks
- Named exports: `export function ComponentName()`

**Styling:**
- Tailwind CSS utility classes for all styling
- Use `cn()` utility from `@/app/components/ui/utils.ts` for conditional/merged classNames
- Mobile-first responsive design with breakpoints (md:, lg:)
- Global theme colors defined in `src/styles/theme.css`

**Path Aliases:**
- `@/` maps to `src/` directory (configured in `vite.config.ts`)
- Import example: `import { Button } from "@/app/components/ui/button"`

**Animations:**
- GSAP with ScrollTrigger for scroll-based animations
- Register ScrollTrigger plugin before use
- Clean up ScrollTrigger instances in useEffect cleanup functions

**Figma Integration:**
- Assets imported via `import name from 'figma:asset/...'`
- Original design: https://www.figma.com/design/tai0EnSVMtozMoDTQeOmYB/GATI-Website-Landing-Page

## Important Conventions

### Code Style
- Use `.tsx` for React components, `.ts` for utilities
- PascalCase for components, camelCase for variables/functions
- Functional components with React hooks (useState, useEffect, useRef)
- Destructure props in function parameters

### State Management
- Local component state using React hooks
- No global state management library currently configured

### Responsive Design
- All sections must be responsive (mobile, tablet, desktop)
- Test breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px)
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

### Brand Guidelines
- Primary accent color: `#f05123` (orange)
- Text color: `#0f0f0f` (dark)
- Background: White with transparency effects
- Maintain professional, modern aesthetic

## Common Tasks

### Adding a New Section
1. Create component in `src/app/components/NewSection.tsx`
2. Follow existing section patterns (see ManifestoSection, ServicesSection)
3. Import and add to `src/app/App.tsx` in appropriate order
4. Use Tailwind for styling, GSAP for animations if needed
5. Ensure responsive design across all breakpoints

### Modifying UI Components
- UI components are in `src/app/components/ui/`
- Follow shadcn/ui patterns (Radix UI + Tailwind variants)
- Use `class-variance-authority` for component variants
- Maintain accessibility features from Radix UI

### Working with Animations
- Import GSAP: `import gsap from 'gsap'`
- Import ScrollTrigger: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
- Register: `gsap.registerPlugin(ScrollTrigger)`
- Clean up in useEffect return: `() => ScrollTrigger.getAll().forEach(st => st.kill())`

## Important Constraints

- **No Backend:** This is a static landing page with no API integration
- **Modern Browsers:** Requires ES6+ support
- **Performance:** Optimize images and animations for smooth scrolling
- **Accessibility:** Maintain Radix UI accessibility features, ensure semantic HTML
- **Figma Assets:** Asset imports require Figma plugin/configuration

## OpenSpec Integration

This project follows OpenSpec conventions documented in `openspec/AGENTS.md`:

- **Specs Directory** (`openspec/specs/`): Current truth - what IS built
- **Changes Directory** (`openspec/changes/`): Proposals - what SHOULD change
- **Archives** (`openspec/changes/archive/`): Completed changes

Before making significant changes, check `openspec/AGENTS.md` for guidance on:
- When to create proposals vs. direct fixes
- How to structure proposals with deltas
- Validation requirements
- Implementation workflow

See `openspec/project.md` for project-specific context and conventions.
