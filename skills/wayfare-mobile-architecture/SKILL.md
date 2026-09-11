---
name: wayfare-mobile-architecture
description: Build and evolve the Wayfare Expo app with screen-owned modules, React Navigation, reusable UI, typed imports, and consistent React Native quality standards. Use for application architecture, screens, components, hooks, navigation, and styling.
---

# Wayfare mobile architecture

Build a maintainable TypeScript React Native app. Prefer small, screen-owned modules over a global collection of unrelated files. Preserve this project's Expo SDK 57 compatibility; consult the versioned Expo documentation before adding or changing Expo integrations.

## Navigation

- Use React Navigation. Configure navigators in `src/navigation/` and mount one `NavigationContainer` at the application root.
- Define and export a typed param list for every navigator. Type screen and navigation props; do not pass untyped navigation objects or route parameters.
- Keep navigation declarations free of screen UI and business logic. Screens own their presentation; navigators own route registration, headers, and transition options.
- When migrating from Expo Router, update the entry point, remove file-based route conventions, install only Expo-compatible React Navigation packages, and verify native and web startup before removing dependencies.

## Directory boundaries

Use this layout as the app grows. Do not create a folder until it has a clear owner or more than one related module.

```text
src/
  app/                 # Root composition: providers and the mounted navigator
  navigation/          # Navigator definitions, route param types, linking
  screens/
    <feature>/
      <Feature>Screen.tsx
      <Feature>Screen.styles.ts
      components/      # Used only by this screen or feature
      hooks/           # Used only by this screen or feature
      types.ts
  components/          # Shared, feature-agnostic reusable UI
    ui/                # Primitives: Button, Text, Screen, Input
  hooks/               # Shared custom hooks
  services/            # API clients, storage, device integrations
  store/               # Shared application state
  theme/               # Tokens, typography, spacing, palette
  types/               # Shared domain and utility types
  utils/               # Pure, feature-agnostic helpers
```

- A screen is the route-level composition boundary. Keep its screen component, styles, local hooks, and private subcomponents together under `src/screens/<feature>/`.
- Place a component in `src/components/` only after it is reused by two or more features, or it is intentionally a shared primitive. Do not make a component shared merely because it might be reused later.
- Put every custom hook in a `hooks/` directory: screen-local hooks beside their screen and app-wide hooks in `src/hooks/`.
- Keep data access and side effects in `services/` or focused hooks, not in presentational components.
- Avoid barrel (`index.ts`) files unless they define a deliberate public module API. Import internal files directly.

## Naming and TypeScript

- Use `PascalCase` for React component files, component names, screens, and types: `TripCard.tsx`, `HomeScreen.tsx`, `TripStatus`.
- Use `camelCase` for functions, variables, hooks, and non-component files: `useTrips.ts`, `formatDate.ts`.
- Use `kebab-case` only for non-code asset names. Do not use `snake_case` in application code; preserve an API's wire-format keys only at its serialization boundary.
- Name hooks with `use` and make their return values explicit when inference would hide a public contract.
- Prefer `type` for object shapes and unions. Use `interface` only when declaration merging or extension is intentional.
- Do not use `any`, broad casts, or non-null assertions to silence errors. Model absence with optional fields, unions, and runtime guards.
- Use `import type` for type-only imports. Prefer configured aliases such as `@/components/...` for cross-module imports; use relative imports only within the same feature or screen folder.

## Components and styling

- Do not use JSX inline style objects. Define styles with `StyleSheet.create` in a colocated `*.styles.ts` file; a very small private component may keep its `StyleSheet` in the same file.
- Use theme tokens for colors, spacing, radii, shadows, and typography. Do not introduce unexplained raw visual values in screen components.
- Keep components focused: props in, UI out. Extract repeated view groups, interaction logic, and nontrivial formatting into named modules.
- Use accessible labels, roles, and hit targets for interactive controls. Support loading, empty, error, and disabled states where a component has asynchronous or user-driven behavior.
- Use platform-specific files only when behavior genuinely differs (`.ios.tsx`, `.android.tsx`, `.web.tsx`); keep the public API identical across variants.

## Imports

Keep imports grouped in this order, separated by one blank line:

1. React and React Native.
2. External packages.
3. Aliased application modules (`@/...`).
4. Relative modules.
5. Type-only imports may stay with their source group using `import type`.

Remove unused imports. Never rely on import side effects except for documented framework setup at the application root.

## Quality gate

Before declaring a change complete:

- Confirm the code respects these ownership boundaries and has no dead template UI.
- Run the relevant formatter, linter, and TypeScript check; add focused tests for logic, state transitions, and reusable components when the project has a test setup.
- Verify navigation behavior for every changed route and verify iOS, Android, and web implications when platform code or navigation changes.
- Keep changes small and cohesive. Do not mix refactors, dependency upgrades, and feature work without a concrete reason.
