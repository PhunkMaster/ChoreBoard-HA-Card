# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChoreBoard-HA-Card is a Home Assistant custom card for managing and tracking household chores. It's built as a custom Lovelace card using TypeScript, Lit web components, and Rollup for bundling.

**IMPORTANT**: This card requires the [ChoreBoard Home Assistant Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration) to be installed and configured. The card displays data from ChoreBoard sensor entities created by that integration.

## ChoreBoard Integration

### Overview

The card works exclusively with the ChoreBoard integration, which creates **aggregate "My Chores" sensors** for each user:
- Entity format: `sensor.choreboard_my_chores_{username}` (e.g., `sensor.choreboard_my_chores_ash`)
- Also available: `sensor.choreboard_my_immediate_chores_{username}` (excludes chores marked "complete later")
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
      "id": 123,                    // Chore instance ID
      "name": "Wash Dishes",
      "due_date": "2025-12-20",
      "points": 10,
      "is_overdue": false,
      "status": "pending"           // "pending", "completed", etc.
    },
    // ... more chores
  ]
}
```

### Integration Setup

Users must install and configure the ChoreBoard integration before using this card:

1. Install integration via HACS or manually
2. Configure with API key and URL in Settings → Devices & Services
3. Integration creates My Chores sensors for each user automatically
4. Card reads chore lists from sensor attributes
5. Card calls integration services to mark chores complete

### Service Calls

The card uses the `choreboard.complete_chore` service with the chore's instance ID:

```typescript
await this.hass.callService('choreboard', 'complete_chore', {
  instance_id: chore.id,  // Not entity_id!
});
```

### Data Flow

1. Integration fetches chore data from ChoreBoard API
2. Creates/updates My Chores sensors in Home Assistant (one per user)
3. Card reads sensor's `attributes.chores` array from `this.hass.states[entity]`
4. Card filters chores based on config (show_completed, show_overdue_only)
5. User clicks "Complete" button → Card calls `choreboard.complete_chore` with `instance_id`
6. Integration syncs changes back to ChoreBoard API
7. Sensor updates automatically, card re-renders

## Build Commands

### Development

```bash
# Install dependencies
npm install

# Development mode with hot reload (starts dev server on port 4000)
npm run watch

# Launch test Home Assistant Docker container
npm run start:hass

# Format code with Prettier
npm run format
```

### Production

```bash
# Build for production (includes minification)
npm run build:prod

# Standard build (development mode)
npm run build
```

## Development Workflow

1. **Initial Setup:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run watch
   ```
   This starts Rollup in watch mode and serves the compiled card at http://localhost:4000/choreboard-ha-card.js

3. **Launch Test Home Assistant Instance (optional):**
   ```bash
   npm run start:hass
   ```
   Launches a Docker container with Home Assistant at http://localhost:8123

4. **Development Cycle:**
   - Edit TypeScript files in `src/` directory
   - Changes automatically compile and reload
   - Refresh Home Assistant dashboard to see changes
   - View test examples in the ChoreBoard Dev dashboard

5. **Testing Changes:**
   - Access Home Assistant at http://localhost:8123
   - Navigate to ChoreBoard Dev dashboard (sidebar)
   - Test card with different configurations in `.hass-dev/views/choreboard-card-preview.yaml`

## Project Architecture

### Technology Stack

- **Lit 3.x**: Lightweight web component library for building the card and editor
- **TypeScript**: Provides type safety and enhanced developer experience
- **Rollup**: Bundles all source files into a single `dist/choreboard-ha-card.js` file
- **custom-card-helpers**: Helper library providing Home Assistant types and utilities

### Source Structure

```
src/
├── main.ts       - Entry point; registers custom elements with Home Assistant
├── card.ts       - Main card component (ChoreboardCard class)
├── editor.ts     - Configuration editor component (ChoreboardCardEditor class)
└── common.ts     - Shared TypeScript interfaces and constants
```

### Component Responsibilities

**main.ts:**
- Imports card and editor components
- Registers custom elements (`choreboard-card`, `choreboard-card-editor`)
- Registers card metadata with Home Assistant's card picker

**card.ts:**
- Implements `ChoreboardCard` as a Lit `LitElement`
- Required methods for Home Assistant cards:
  - `setConfig(config)` - Validates configuration (requires `entity` field)
  - `set hass(hass)` - Receives Home Assistant state updates
  - `getCardSize()` - Returns card height based on chore count
  - `getStubConfig()` - Provides default configuration for card picker
- Key methods:
  - `getChores()` - Reads chores from sensor's `attributes.chores` array
  - `completeChore(chore)` - Calls `choreboard.complete_chore` service with `instance_id`
  - `getChoreStateClass(chore)` - Determines CSS class based on status/overdue
  - `getUsername()` - Extracts username from sensor attributes
- Renders chore list with status indicators, points, due dates
- Filters chores by completion status and overdue state

**editor.ts:**
- Implements `ChoreboardCardEditor` as a Lit `LitElement`
- Provides visual UI for:
  - Selecting My Chores sensor from dropdown
  - Configuring title, header visibility
  - Show/hide completed chores
  - Show only overdue chores
  - Show/hide points
- Auto-discovers available My Chores sensors
- Dispatches `config-changed` events when configuration updates

**common.ts:**
- TypeScript interfaces:
  - `ChoreboardCardConfig` - Card configuration (requires `entity`)
  - `Chore` - Individual chore from sensor's chores array
  - `MyChoresSensorAttributes` - Structure of sensor's attributes
  - `HomeAssistantExtended` - Extended Home Assistant type
- Constants: `CARD_VERSION`, `CARD_NAME`, `ELEMENT_NAME`

## Home Assistant Integration

### Card Registration

Cards register as `custom:choreboard-card` and appear in Home Assistant's card picker. The card implements the Lovelace card interface with required methods.

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

The project uses GitHub Actions for continuous integration and automated releases:

#### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on all pull requests and pushes to non-main branches:
- Installs dependencies
- Checks code formatting with Prettier
- Builds both development and production versions
- Validates build output exists
- Validates JSON configuration files (hacs.json, package.json)
- Checks for required files
- Uploads build artifacts for inspection

**Trigger**: Pull requests and pushes to any branch except main

#### 2. Release Workflow (`.github/workflows/release.yml`)

Automatically creates releases when code is merged to main:
- Builds production version
- Determines version bump type from commit message:
  - `major:` or `breaking:` → Major version bump (1.0.0 → 2.0.0)
  - `feat:` or `feature:` or `minor:` → Minor version bump (1.0.0 → 1.1.0)
  - All other commits → Patch version bump (1.0.0 → 1.0.1)
- Updates version in package.json and src/common.ts
- Creates git tag (e.g., v1.0.0)
- Generates changelog from commit messages
- Creates GitHub release with built files attached
- Attaches dist/choreboard-ha-card.js and source maps to release

**Trigger**: Push to main branch

#### 3. HACS Validation (`.github/workflows/hacs-validation.yml`)

Validates HACS compatibility:
- Runs HACS action to validate repository structure
- Checks plugin category requirements
- Runs daily to catch any issues

**Trigger**: Push, pull requests, and daily schedule

### Commit Message Convention

To control version bumping in releases, use these commit message prefixes:

- `major:` or `breaking:` - Breaking changes (1.0.0 → 2.0.0)
  ```
  major: remove deprecated configuration options
  ```

- `feat:` or `feature:` or `minor:` - New features (1.0.0 → 1.1.0)
  ```
  feat: add support for custom icons
  ```

- Any other prefix - Bug fixes and patches (1.0.0 → 1.0.1)
  ```
  fix: correct checkbox alignment issue
  chore: update dependencies
  docs: improve README examples
  ```

### Creating a Release

Releases are created automatically when merging to main:

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes and commit with appropriate prefix:**
   ```bash
   git commit -m "feat: add new chore filtering option"
   ```

3. **Push and create pull request:**
   ```bash
   git push origin feature/my-new-feature
   ```

4. **Merge to main:**
   - Once PR is approved and CI passes, merge to main
   - GitHub Actions automatically:
     - Bumps version based on commit message
     - Creates git tag
     - Builds production version
     - Creates GitHub release with artifacts

5. **Release is published:**
   - Available at: `https://github.com/yourusername/choreboard-ha-card/releases`
   - HACS users can update to the new version
   - dist/choreboard-ha-card.js is attached for manual installation

### Manual Release (if needed)

If you need to create a release manually:

1. Update version in package.json:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Update CARD_VERSION in src/common.ts to match

3. Build production version:
   ```bash
   npm run build:prod
   ```

4. Create and push tag:
   ```bash
   git add package.json src/common.ts
   git commit -m "chore: bump version to X.Y.Z"
   git tag vX.Y.Z
   git push && git push --tags
   ```

5. Create GitHub release manually with dist/choreboard-ha-card.js attached

### Build Artifacts

After every successful build on CI:
- Artifacts are uploaded with 7-day retention
- Can be downloaded from Actions tab → Workflow run → Artifacts section
- Useful for testing builds from pull requests

## Common Development Tasks

### Adding a New Configuration Option

1. Add property to `ChoreboardCardConfig` interface in `src/common.ts`
2. Update `card.ts`:
   - Add to `setConfig()` default values
   - Use in `getChores()` or `render()` method for filtering/display
   - Update `getStubConfig()` if needed
3. Update `editor.ts`:
   - Add input/checkbox/select for the option
   - Add event handler method (e.g., `showXxxChanged`)
   - Update render to include new option
4. Update README.md configuration documentation

**Example: Adding a "show_assignee" option:**

```typescript
// src/common.ts
export interface ChoreboardCardConfig {
  // ... existing fields
  show_assignee?: boolean; // Show assignee name
}

// src/card.ts - setConfig
this.config = {
  show_assignee: true, // default value
  ...config,
};

// src/card.ts - render
${chore.assignee && this.config.show_assignee
  ? html`<span class="meta-item">
      <ha-icon icon="mdi:account"></ha-icon>${chore.assignee}
    </span>`
  : ""}

// src/editor.ts - render
<div class="option">
  <label>
    <input
      type="checkbox"
      ?checked=${this.config.show_assignee !== false}
      @change=${this.showAssigneeChanged}
    />
    Show Assignee
  </label>
</div>

// src/editor.ts - event handler
private showAssigneeChanged(ev: Event): void {
  const target = ev.target as HTMLInputElement;
  if (!this.config || !this.hass) return;
  this.config = { ...this.config, show_assignee: target.checked };
  this.configChanged();
}
```

### Adding a New Feature

1. Design feature requirements
2. Update TypeScript interfaces in `src/common.ts` (e.g., add to `Chore` interface)
3. Implement in `card.ts`:
   - Add methods for new functionality
   - Update `getChores()` for filtering logic
   - Update `render()` for display
   - Add event handlers for user interactions
4. Add visual editor controls in `editor.ts` (if applicable)
5. Add test cases to `.hass-dev/views/choreboard-card-preview.yaml`
6. Update README.md with examples
7. Run tests and verify in development Home Assistant instance

### Working with Chore Data

**Reading chores from sensor:**
```typescript
const stateObj = this.hass.states[this.config.entity];
const attributes = stateObj.attributes as MyChoresSensorAttributes;
const chores = attributes.chores || [];
```

**Filtering chores:**
```typescript
return chores.filter((chore) => {
  // Hide completed if configured
  if (!this.config.show_completed && chore.status === "completed") {
    return false;
  }
  // Only show overdue if configured
  if (this.config.show_overdue_only && !chore.is_overdue) {
    return false;
  }
  return true;
});
```

**Calling integration service:**
```typescript
await this.hass.callService("choreboard", "complete_chore", {
  instance_id: chore.id, // Use chore's instance ID, not entity_id
});
```

### Debugging

1. **TypeScript Errors**: Check `tsconfig.json` and run `npm run build`
2. **Runtime Errors**: Check browser console in Home Assistant frontend
3. **Card Not Loading**: Verify development server is running and configuration.yaml has correct URL
4. **Styles Not Applying**: Check CSS in `card.ts` static styles getter

### Rollup Issues

If Rollup watch mode stops working or shows errors:
- Restart `npm run watch`
- Check for syntax errors in TypeScript files
- Verify all imports are correct

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

## Architecture Changes (v1.0.2)

### Breaking Changes from v1.0.0

Version 1.0.2 introduced a complete redesign to match the ChoreBoard integration's actual architecture. The integration provides aggregate "My Chores" sensors, not individual chore entities as originally assumed.

**Old Architecture (v1.0.0 - DEPRECATED):**
- Card expected individual chore entities: `sensor.choreboard_wash_dishes`
- Configuration used `entities` array or `filter_assignee` string
- Called `choreboard.mark_complete` service with `entity_id`
- Each chore was a separate Home Assistant entity

**New Architecture (v1.0.2+):**
- Card uses aggregate My Chores sensors: `sensor.choreboard_my_chores_ash`
- Configuration uses single `entity` field
- Calls `choreboard.complete_chore` service with `instance_id`
- All user's chores are in sensor's `attributes.chores` array

### Migration Guide for Developers

If you're updating code from v1.0.0:

1. **Configuration Changes:**
   ```typescript
   // OLD
   interface ChoreboardCardConfig {
     entities?: string[];
     filter_assignee?: string;
   }

   // NEW
   interface ChoreboardCardConfig {
     entity: string; // Single sensor entity
   }
   ```

2. **Data Access:**
   ```typescript
   // OLD - Reading individual entities
   const entities = this.config.entities.map(id => this.hass.states[id]);

   // NEW - Reading from sensor attributes
   const sensor = this.hass.states[this.config.entity];
   const chores = sensor.attributes.chores || [];
   ```

3. **Service Calls:**
   ```typescript
   // OLD
   await this.hass.callService('choreboard', 'mark_complete', {
     entity_id: 'sensor.choreboard_wash_dishes'
   });

   // NEW
   await this.hass.callService('choreboard', 'complete_chore', {
     instance_id: chore.id  // Chore's instance ID from attributes
   });
   ```

4. **Chore Data Structure:**
   ```typescript
   // OLD - From entity attributes
   interface ChoreboardEntity {
     entity_id: string;
     state: string;
     attributes: {
       assignee: string;
       due_date: string;
       points: number;
       description: string;
     };
   }

   // NEW - From sensor's chores array
   interface Chore {
     id: number;              // Instance ID for API calls
     name: string;
     due_date: string;
     points: number;
     is_overdue: boolean;
     status: string;
   }
   ```

### Key Architecture Principles

1. **Single Source of Truth**: Each user has one My Chores sensor containing all their chores
2. **Attribute-Based Data**: Chores are stored in sensor's `attributes.chores` array, not as separate entities
3. **Instance ID for Actions**: Use chore's `id` field (instance_id) for service calls, not entity_id
4. **Client-Side Filtering**: Card filters chores by status/overdue on the client side
5. **Auto-Discovery**: Editor auto-discovers My Chores sensors by prefix match

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