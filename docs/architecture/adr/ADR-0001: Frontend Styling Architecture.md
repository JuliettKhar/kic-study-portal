# ADR-0001: Frontend Styling Architecture

## Status

Accepted

## Context

The project needs a consistent styling approach that keeps design values reusable, component styles isolated, and allows the design system to evolve without unnecessary complexity.

The current design system is based on Academic Clarity V2.

## Decision

The project uses SCSS with design tokens and CSS custom properties.

Structure:

```text
app/assets/styles/
├── base/
│   └── _global.scss
├── themes/
│   └── _academic-clarity.scss
├── tokens/
│   ├── _breakpoints.scss
│   ├── _index.scss
│   └── _variables.scss
└── main.scss
```

### Design Tokens

Raw design values such as colors, spacing, typography, and border radii are stored as SCSS variables in `tokens/_variables.scss`.

Compile-time values such as breakpoints remain SCSS variables.

The active theme exposes design tokens as semantic CSS custom properties:

```scss
:root {
  --color-primary: #{tokens.$primary};
  --space-md: #{tokens.$space-md};
  --radius-lg: #{tokens.$radius-lg};
}
```

Vue components consume these properties instead of importing raw design tokens:

```scss
.course-card {
  padding: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}
```

### Component Styles

Component-specific styles should live inside Vue components using `<style scoped lang="scss">`.

Global styles are limited to application-wide defaults and normalization.

Reusable mixins should only be introduced when actual repeated patterns appear.

## Rules

- Use existing design tokens instead of duplicating design values.
- Components must not import raw color or spacing tokens directly.
- Prefer semantic tokens such as `--color-error` over raw colors.
- Keep component-specific styles inside the component.
- Do not introduce global styles, tokens, or mixins for speculative future use.

## Consequences

This provides a single source of truth for the design system while keeping components isolated from its implementation details.

It also leaves room for future themes without requiring a theme system now.
