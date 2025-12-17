# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChoreBoard-HA-Card is a Home Assistant custom card for managing and tracking household chores. It's built as a custom
Lovelace card using TypeScript, Lit web components, and Rollup for bundling.

**IMPORTANT**: This card requires
the [ChoreBoard Home Assistant Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration) to be installed
and configured. The card displays data from ChoreBoard sensor entities created by that integration.

## ChoreBoard Integration

### Overview

The card works exclusively with the ChoreBoard integration, which creates **aggregate "My Chores" sensors** for each
user:

**Supported Sensor Naming Patterns:**

- `sensor.choreboard_my_chores_{username}` (e.g., `sensor.choreboard_my_chores_ash`)
- `sensor.{username}_my_chores` (e.g., `sensor.ash_my_chores`)
- `sensor.choreboard_my_immediate_chores_{username}` (excludes chores marked "complete later")
- `sensor.{username}_my_immediate_chores`

The card's visual editor auto-detects all sensor patterns above.

- Each sensor contains a list of chores in its `attributes.chores` array
- Sensor state: Number of chores for that user

### Sensor Structure

Each My Chores sensor has these attributes:

```typescript
{
  "username": "ash",
  "count": 5,
  "chores": [
    {
      "id": 123,                    // Chore instance ID (number)
      "name": "Wash Dishes",
      "due_date": "2025-12-20",
      "points": "10.00",            // STRING (not number) - integration returns as string
      "is_overdue": false,
      "status": "assigned"          // "assigned", "pending", "completed", etc.
    },
    // ... more chores
  ]
}
```

**Important Data Type Notes:**

- `points`: Integration returns as **string** (e.g., "2.50", "10.00"), card parses to number for display
- `status`: Can be "assigned", "pending", "completed" - card treats non-"completed" as active/completable

### Integration Setup

Users must install and configure the ChoreBoard integration before using this card:

1. Install integration via HACS or manually
2. Configure with API key and URL in Settings → Devices & Services
3. Integration creates My Chores sensors for each user automatically
4. Card reads chore lists from sensor attributes
5. Card calls integration services to mark chores complete

### Service Calls

#### For Assigned Chores

Simple completion without user selection:

```typescript
await this.hass.callService('choreboard', 'complete_chore', {
  instance_id: chore.id,  // Not entity_id!
});
```

#### For Pool Chores (v1.1.0+)

**Claim Service:**

```typescript
await this.hass.callService('choreboard', 'claim_chore', {
  chore_id: chore.id,
  assign_to_user_id: userId,  // User ID who is claiming
});
```

**Complete Service (with user selection):**

```typescript
await this.hass.callService('choreboard', 'mark_complete', {
  chore_id: chore.id,
  completed_by_user_id: userId,    // User ID who completed
  helpers: [helperId1, helperId2], // Optional: User IDs who helped
});
```

### Data Flow

**Core Flow**: Integration → Sensor → Card → User Action → Service Call → Integration → API

1. **Integration** fetches chores from ChoreBoard API
2. **Integration** creates/updates sensors (My Chores or Pool Chores)
3. **Card** reads `sensor.attributes.chores[]`, filters by config
4. **Card** renders UI (Assigned: "Complete" button | Pool: "Claim" + "Complete" buttons)
5. **User** clicks button → Dialog (pool only) → Service call
   - Assigned: `complete_chore` with `instance_id`
   - Pool Claim: `claim_chore` with `chore_id` + `assign_to_user_id`
   - Pool Complete: `mark_complete` with `chore_id` + `completed_by_user_id` + `helpers[]`
6. **Integration** syncs to API, sensors update, card re-renders

## Build & Development

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run watch` | Dev mode + hot reload (localhost:4000) |
| `npm run start:hass` | Launch HA Docker (localhost:8123) |
| `npm run format` | Format code (Prettier) |
| `npm run build` | Build (development) |
| `npm run build:prod` | Build (production + minification) |

**Quick Start**: `npm install` → `npm run watch` → Edit `src/` → Refresh dashboard → Test at `.hass-dev/views/choreboard-card-preview.yaml`

## Project Architecture

### Technology Stack

- **Lit 3.x**: Lightweight web component library for building the card and editor
- **TypeScript**: Provides type safety and enhanced developer experience
- **Rollup**: Bundles all source files into a single `dist/choreboard-ha-card.js` file
- **custom-card-helpers**: Helper library providing Home Assistant types and utilities

### Source Structure

```
src/
├── main.ts            - Entry point; registers custom elements with Home Assistant
├── card.ts            - Main card component (ChoreboardCard class)
├── editor.ts          - Configuration editor component (ChoreboardCardEditor class)
├── claim-dialog.ts    - Claim chore dialog component (v1.1.0+)
├── complete-dialog.ts - Complete chore dialog component (v1.1.0+)
└── common.ts          - Shared TypeScript interfaces and constants
```

### Component Responsibilities

| Component | Purpose | Key Methods/Features |
|-----------|---------|----------------------|
| **main.ts** | Entry point | Registers `choreboard-card` and `choreboard-card-editor` custom elements, card metadata |
| **card.ts** | Main card UI | `setConfig()`, `set hass()`, `getChores()`, `completeChore()`, `isPoolChore()`, `getUsers()`, `claimChore()`, `completePoolChore()`. Renders chore list, filters by status/overdue, dynamically loads dialogs |
| **editor.ts** | Visual config | Auto-discovers My Chores sensors (4 patterns), provides UI for all config options, dispatches `config-changed` events |
| **claim-dialog.ts** | Pool claim UI | Props: `users`, `chore`. Events: `dialog-confirmed` (userId), `dialog-closed`. Single-select user list, lazy loaded |
| **complete-dialog.ts** | Pool complete UI | Props: `users`, `chore`. Events: `dialog-confirmed` (userId, helperIds), `dialog-closed`. Two-section: completer (required, single) + helpers (optional, multi) |
| **common.ts** | Type definitions | Interfaces: `ChoreboardCardConfig`, `Chore`, `MyChoresSensorAttributes`, `User`. Constants: `CARD_VERSION`, `CARD_NAME`, `ELEMENT_NAME` |

**Dialog Pattern** (claim & complete): Lit `LitElement`, lazy loaded via dynamic import, props set externally, fires custom events, removed after use, styled with HA theme variables

**Key Interfaces** (common.ts):
- `Chore`: `id` (number), `name`, `due_date`, `points` (string | number), `status`, `is_overdue` (bool), `complete_later` (bool)
- `User`: `id` (number), `username`, `display_name`, `can_be_assigned` (bool), `eligible_for_points` (bool), `weekly_points`, `all_time_points`

## Pool Chores Feature (v1.1.0+)

Pool chores are unassigned chores available in a shared pool that any user can claim and complete.

### Detection & UI

**Pool Chore Detection:**
- `chore.status === "pool"` OR sensor entity ends with `_chores` but not `_my_chores`
- See `card.ts:isPoolChore()` for implementation

**UI Differences:**

| Chore Type | Buttons | User Selection |
|------------|---------|----------------|
| Assigned | "Complete" | None required |
| Pool | "Claim", "Complete" | Required via dialogs |

### User Data & Dialogs

**User Lookup Priority** (see `card.ts:getUsers()`):
1. `sensor.users` (preferred)
2. `sensor.choreboard_users`
3. Any `sensor.choreboard_*` with users array

**Dialog Pattern** (both claim & complete):
1. Dynamic import: `await import("./claim-dialog")` or `"./complete-dialog"`
2. Create element and set properties (`users`, `chore`)
3. Listen for `dialog-confirmed` (includes userId/helperIds) and `dialog-closed` events
4. Append to DOM, handle service call, remove on completion
5. **Benefits**: Lazy loading, memory efficient, event-driven, decoupled

**Rollup Requirement**: `inlineDynamicImports: true` in rollup.config.mjs (bundles dialogs into single file for HACS compatibility)

### Service Calls

| Action | Service | Parameters |
|--------|---------|------------|
| Complete Assigned | `choreboard.complete_chore` | `instance_id: chore.id` |
| Claim Pool | `choreboard.claim_chore` | `chore_id: chore.id`, `assign_to_user_id: userId` |
| Complete Pool | `choreboard.mark_complete` | `chore_id: chore.id`, `completed_by_user_id: userId`, `helpers: [id1, id2]` (optional) |

**Key Differences**:
- Assigned chores use `instance_id`, pool chores use `chore_id`
- Pool completion supports helpers for point distribution
- Completer cannot be in helpers list (handled by complete dialog)

### Complete Dialog Logic

1. Required: Select who completed (single-select)
2. Optional: Select helpers (multi-select, excludes completer)
3. Switching completer removes them from helpers
4. Complete button disabled until completer selected
5. Empty helpers array is valid

### Testing

**Key Scenarios**:
- Pool chores show "Claim" + "Complete" buttons, assigned show only "Complete"
- Claim dialog: user selection, service call, chore moves to user's my_chores
- Complete dialog: completer selection, helper selection (optional), points awarded
- Dialog cancellation via Cancel button or backdrop click
- Error handling: toast shown if users unavailable or service fails

## Home Assistant Integration

### Card Registration

Cards register as `custom:choreboard-card` and appear in Home Assistant's card picker. The card implements the Lovelace
card interface with required methods.

### Configuration Storage

Card configuration is stored in dashboard YAML files. Users can configure via:

1. Visual editor (all options available)
2. YAML editor (for advanced configuration)

**Example Configuration:**

```yaml
type: custom:choreboard-card
title: "Ash's Chores"
entity: sensor.choreboard_my_chores_ash
show_completed: false
show_overdue_only: false
show_points: true
show_header: true
```

**Required Field:**

- `entity`: Single My Chores sensor entity ID

**Optional Fields:**

- `title`: Card title (auto-generated from username if not specified)
- `show_completed`: Show/hide completed chores (default: true)
- `show_overdue_only`: Filter to only overdue chores (default: false)
- `show_points`: Show/hide point values (default: true)
- `show_header`: Show/hide card header (default: true)

### Development Configuration

The `.hass-dev/` directory contains a complete Home Assistant configuration for testing:

- **configuration.yaml**: Loads the card from development server (localhost:4000)
- **views/choreboard-card-preview.yaml**: Example dashboard showcasing different card configurations

### Required Card Methods

All Home Assistant custom cards must implement:

- `setConfig(config)`: Called when card is created/updated. Validate config and throw errors for invalid configurations.
- `set hass(hass)`: Called on every state change. Update card content based on new state.
- `getCardSize()`: Return integer representing card height (1 unit ≈ 50px).
- `getStubConfig()` (optional): Return default configuration for card picker.
- `getConfigElement()` (optional): Return custom editor element.

## Build Configuration

### rollup.config.mjs

- **Entry**: `src/main.ts`
- **Output**: `dist/choreboard-ha-card.js`
- **Plugins**:
    - `@rollup/plugin-typescript` - Compiles TypeScript
    - `@rollup/plugin-node-resolve` - Resolves node_modules imports
    - `@rollup/plugin-commonjs` - Converts CommonJS to ES modules
    - `@rollup/plugin-json` - Imports JSON files
    - `@rollup/plugin-terser` - Minifies production builds
    - `rollup-plugin-serve` - Development server (watch mode only)

### tsconfig.json

- **Target**: ES2020 (modern JavaScript features)
- **Module**: ESNext (ES modules)
- **Decorators**: Enabled for Lit decorators (`@customElement`, `@property`, `@state`)
- **Strict Mode**: All TypeScript strict checks enabled
- **Source Maps**: Generated for debugging

## HACS Publishing

To publish this card to HACS (Home Assistant Community Store):

### Requirements

1. **Repository Structure**: JavaScript files must be in `dist/` directory
2. **File Naming**: `choreboard-ha-card.js` matches repository name (with optional `lovelace-` prefix stripped)
3. **GitHub Releases**: Required for version management
4. **hacs.json**: Metadata file in repository root
5. **README.md**: Installation and usage documentation

### hacs.json Configuration

```json
{
  "name": "ChoreBoard Card",
  "filename": "choreboard-ha-card.js",
  "render_readme": true,
  "content_in_root": false
}
```

### Release Process

1. Build production version: `npm run build:prod`
2. Commit changes and create git tag (e.g., `v0.1.0`)
3. Create GitHub release with tag
4. Attach `dist/choreboard-ha-card.js` to release (optional, HACS will fetch from dist/)
5. Submit to HACS default repository (optional, users can add as custom repository)

### HACS File Resolution

HACS searches for JavaScript files in this order:

1. `dist/` directory in latest release
2. Repository root in latest release
3. `dist/` directory on default branch
4. Repository root on default branch

Files must match the repository name (case-insensitive, with optional `lovelace-` prefix).

## CI/CD and Release Process

### GitHub Actions Workflows

| Workflow | Trigger | Purpose | Status |
|----------|---------|---------|--------|
| **ci.yml** | PRs, non-main pushes | Runs tests, formatting, builds, validation | Active |
| **auto-release.yml** | Push to main (semver branch merge) | Auto-creates releases from branch name | Active (Primary) |
| **release.yml** | Manual dispatch only | Manual version bump workflow | Deprecated |
| **hacs.yml** | PRs, pushes, daily | Validates HACS compatibility | Active |

### Version Management & Release Process

**Branch Naming** (required for auto-release):
- `feature/X.Y.Z` - New features (minor bump)
- `bugfix/X.Y.Z` - Bug fixes (patch bump)
- `hotfix/X.Y.Z` - Critical fixes (patch bump)

**Semver Guidelines**: Major (breaking), Minor (new features), Patch (bug fixes)

**Auto-Release Flow**:
1. Create semver branch: `git checkout -b feature/1.3.0`
2. Make changes and push
3. Create PR, get approval, merge to main
4. auto-release.yml extracts version, updates `package.json` + `src/common.ts`, builds, creates tag + GitHub release

**Result**: Release published at `releases/tag/vX.Y.Z` with `dist/choreboard-ha-card.js` attached for HACS and manual installation

## Common Development Tasks

### Adding Configuration Options

**Pattern** (see Pool Chores implementation for full example):
1. Add to `ChoreboardCardConfig` interface (`common.ts`)
2. Set default in `card.ts:setConfig()`
3. Use in `getChores()` or `render()`
4. Add UI control in `editor.ts` with event handler
5. Update README.md

### Working with Chore Data

```typescript
// Read chores
const chores = this.hass.states[this.config.entity].attributes.chores || [];

// Filter chores
chores.filter(c => this.config.show_completed || c.status !== "completed")

// Complete chore (assigned)
await this.hass.callService("choreboard", "complete_chore", { instance_id: chore.id });

// Complete chore (pool)
await this.hass.callService("choreboard", "mark_complete", {
  chore_id: chore.id, completed_by_user_id: userId, helpers: []
});
```

### Debugging

- **TypeScript errors**: `npm run build` and check `tsconfig.json`
- **Runtime errors**: Browser console in Home Assistant
- **Card not loading**: Verify `npm run watch` running, check `configuration.yaml`
- **Rollup issues**: Restart watch, check syntax, verify imports

## Code Style

- Use Prettier for formatting: `npm run format`
- Follow TypeScript strict mode conventions
- Use Lit decorators for reactive properties
- Prefer functional programming patterns
- Keep components focused and single-responsibility

## Home Assistant Specific Notes

### Lazy Loading

Home Assistant doesn't load all custom cards at startup. Cards are loaded on-demand when dashboards are accessed.

### State Management

- Card receives Home Assistant state via `hass` property
- State updates trigger `set hass(hass)` method
- Use Lit's `@state` decorator for internal component state
- Use `@property` decorator for properties passed from configuration

### Styling

- Use CSS custom properties (CSS variables) for theming
- Home Assistant provides theme variables: `--primary-color`, `--secondary-text-color`, etc.
- Card should work with both light and dark themes
- Avoid hardcoded colors

## Testing

Manual testing workflow:

1. Start watch mode: `npm run watch`
2. Start HA instance: `npm run start:hass`
3. Complete initial HA setup wizard (first run only)
4. Navigate to ChoreBoard Dev dashboard
5. Test each example configuration
6. Verify card behavior with different configurations
7. Test in both light and dark themes

## Architecture Evolution

### v1.0.2: Major Redesign (Breaking Changes)

**Migration Summary:**

| Aspect | v1.0.0 (Deprecated) | v1.0.2+ (Current) |
|--------|---------------------|-------------------|
| Data Source | Individual chore entities | Aggregate My Chores sensors |
| Config | `entities: string[]` | `entity: string` (single sensor) |
| Service Call | `mark_complete` with `entity_id` | `complete_chore` with `instance_id` |
| Data Structure | Each chore = separate entity | Chores in `sensor.attributes.chores[]` |

**Key Principles** (still relevant):
1. Single source of truth: One sensor per user with all their chores
2. Attribute-based data: Chores in `attributes.chores` array, not separate entities
3. Instance ID for actions: Use `chore.id` for service calls, not `entity_id`
4. Client-side filtering: Card filters by status/overdue locally
5. Auto-discovery: Editor finds My Chores sensors via pattern matching

### v1.0.3: Sensor Pattern Flexibility

**Added Support for Multiple Naming Patterns:**
- v1.0.2: `sensor.choreboard_my_chores_{username}`
- v1.0.3+: Also supports `sensor.{username}_my_chores`

**Data Type Handling:**
- `points`: Integration returns string ("2.50"), card accepts string | number
- `status`: "assigned" (not "pending") for active chores, card treats all non-"completed" as active
- Visual editor enabled via `getConfigElement()` static method

## Additional Resources

- [Home Assistant Custom Card Documentation](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
- [Lit Documentation](https://lit.dev/docs/)
- [HACS Plugin Publishing](https://www.hacs.xyz/docs/publish/plugin/)
- [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers)
- [ChoreBoard Integration Source](https://github.com/PhunkMaster/ChoreBoard-HA-Integration)

## Development Best Practices

- **Always use semver branches** for feature development (e.g., `feature/1.2.3`, `bugfix/1.0.2`)
- Commit with semantic prefixes: `feat:`, `fix:`, `breaking:` to control version bumping
- Test with actual ChoreBoard integration sensors, not mock data
- Verify complete button calls correct service with instance_id
- Test filtering options: show_completed, show_overdue_only
- Ensure card works with both light and dark themes
- Always let me know if a something needs to be fixed or implemented to accplish a goal in either the backend or the
  integration


- When a change is required upstream write the implementation plan to the upstream directory under a folder called "
  downstream_card_needs"
- Do not work on other projects, only create implementation documentation in those projects.