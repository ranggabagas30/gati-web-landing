---
description: "Use when writing, editing, or reviewing React components, hooks, styles, or utilities. Enforces KISS, SOLID, design system separation of concerns. Always compile and run the project after edits to verify no build errors."
applyTo: "src/**/*.{ts,tsx}"
---

# React Frontend Best Practices

## 1. KISS — Keep It Simple

- Prefer the simplest implementation that satisfies the requirement. Do not over-engineer.
- One function, one job. If a function is doing more than one thing, split it.
- Avoid premature abstractions. Only create a reusable helper when the pattern appears **at least twice**.
- Prefer readability over cleverness. Clear variable names beat terse one-liners.
- Do not add features, comments, error handling, or abstractions that were not explicitly requested.

## 2. Separation of Concerns (SoC)

- **UI components** (`src/app/components/`) render markup and handle user interaction only. They do not fetch data or own business logic.
- **Hooks** (`src/app/hooks/`) encapsulate all stateful logic, side effects, and data transformations.
- **Utilities** (`src/app/utils/` or `src/lib/`) contain pure, framework-agnostic helper functions with no React imports.
- **Styles** live in Tailwind utility classes applied in JSX, or in `src/styles/` for global tokens. No inline `style={}` objects except for dynamic values that cannot be expressed as Tailwind classes.
- **Assets** live in `src/assets/` or `public/`; never import assets inside logic files.

## 3. Open/Closed Principle

- Components must be **open for extension via props, not modification of internals**.
- Expose a `className` prop on every reusable UI component so consumers can augment styles without editing the component:
  ```tsx
  export function Card({ className, children }: CardProps) {
    return <div className={cn("rounded-lg p-4", className)}>{children}</div>;
  }
  ```
- Use `children` and render props / slot props to let consumers inject arbitrary content without touching the component.
- Never hard-code values that a consumer might legitimately need to change (colors, labels, sizes). Parameterize them as typed props with sensible defaults.

## 4. Liskov Substitution Principle

- If a component wraps a native HTML element, it **must forward all native props** via spread and use `forwardRef` when applicable:
  ```tsx
  export const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants
  >(({ className, variant, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props} />
  ));
  ```
- A component that accepts the same prop interface as another must behave consistently — do not silently change semantics (e.g., an `<IconButton>` that accepts `onClick` must actually call `onClick`).
- Variant and sub-components must be consumable anywhere the base component is expected.

## 5. Interface Segregation Principle

- Define **narrow, focused TypeScript prop interfaces** — do not combine unrelated concerns in one props type.
- Split large prop objects with `Pick<>`, `Omit<>`, or separate interfaces when consumers only use a subset.
- Avoid `any` and loosely typed `object`. Prefer explicit union types and discriminated unions.
- Example: a `Button` should not receive data-fetching props; a `DataTable` should not receive animation props.

  ```ts
  // Bad
  interface CardProps {
    onClick: () => void;
    fetchUrl: string;
    animationDuration: number;
  }

  // Good — segregated
  interface CardInteractionProps { onClick: () => void; }
  interface CardAnimationProps { animationDuration?: number; }
  type CardProps = CardInteractionProps & CardAnimationProps;
  ```

## 6. Dependency Inversion Principle

- Components and hooks must **depend on abstractions (prop callbacks, context values, hook interfaces), not on concrete implementations**.
- Never import a specific data-fetching library, API client, or side-effect driver directly inside a UI component. Pass callbacks or data as props.
- Use React Context to inject cross-cutting dependencies (theme, locale, auth) rather than importing singletons.
- When a hook depends on an external service, inject it as a parameter or via context so it can be swapped in tests.

## 7. Design System Conventions

- Use `cn()` from `@/app/components/ui/utils.ts` for all conditional or merged Tailwind class strings. Never concatenate class strings manually.
- All spacing, color, and typography values must come from theme tokens defined in `src/styles/theme.css`. Do not hard-code hex values or pixel values outside the token system.
- Follow the component variant pattern using `class-variance-authority` (CVA) for any component that has multiple visual states.
- Reusable primitives live in `src/app/components/ui/`. Section-level components live in `src/app/components/`. Never mix these.
- Maintain Radix UI accessibility props (`aria-*`, `role`, keyboard handlers) — do not strip them when wrapping primitives.

## 8. Component Authoring Rules

- Use functional components exclusively. No class components.
- Named exports only: `export function MyComponent()`. Default exports only in `src/main.tsx` and `src/app/App.tsx`.
- Destructure all props in the function signature.
- Keep components under ~150 lines. If longer, extract sub-components or hooks.
- Clean up all GSAP `ScrollTrigger` instances in `useEffect` return functions to prevent memory leaks.

## 9. Post-Edit Verification — MANDATORY

After every code change, **always run the build to verify the project compiles without errors**:

```bash
npm run build
```

- If the build fails, fix all TypeScript and Vite errors **before** considering the task complete.
- After a successful build, start the dev server to visually verify the change:

```bash
npm run dev
```

- Do not report a task as done until `npm run build` exits with code 0.
