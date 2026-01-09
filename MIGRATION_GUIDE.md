# ChoreBoard-HA-Card Migration Guide

This guide documents major architectural changes and migration steps for developers working with older versions of the card.

## v1.0.0 → v1.0.2: Architecture Redesign

### Breaking Changes

Version 1.0.2 introduced a complete redesign to match the ChoreBoard integration's actual architecture. The integration provides aggregate "My Chores" sensors, not individual chore entities as originally assumed.

### Old Architecture (v1.0.0 - DEPRECATED)

- Card expected individual chore entities: `sensor.choreboard_wash_dishes`
- Configuration used `entities` array or `filter_assignee` string
- Called `choreboard.mark_complete` service with `entity_id`
- Each chore was a separate Home Assistant entity

### New Architecture (v1.0.2+)

- Card uses aggregate My Chores sensors: `sensor.choreboard_my_chores_ash`
- Configuration uses single `entity` field
- Calls `choreboard.complete_chore` service with `instance_id`
- All user's chores are in sensor's `attributes.chores` array

### Migration Steps

#### 1. Configuration Changes

```typescript
// OLD (v1.0.0)
interface ChoreboardCardConfig {
  entities?: string[];
  filter_assignee?: string;
}

// NEW (v1.0.2+)
interface ChoreboardCardConfig {
  entity: string; // Single sensor entity
}
```

**Example YAML:**
```yaml
# OLD
type: custom:choreboard-card
entities:
  - sensor.choreboard_wash_dishes
  - sensor.choreboard_vacuum
filter_assignee: "ash"

# NEW
type: custom:choreboard-card
entity: sensor.choreboard_my_chores_ash
```

#### 2. Data Access

```typescript
// OLD - Reading individual entities
const entities = this.config.entities.map(id => this.hass.states[id]);

// NEW - Reading from sensor attributes
const sensor = this.hass.states[this.config.entity];
const chores = sensor.attributes.chores || [];
```

#### 3. Service Calls

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

#### 4. Chore Data Structure

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
  points: string | number; // Integration returns string, card handles both
  is_overdue: boolean;
  status: string;          // "assigned", "pending", "completed", etc.
}
```

## v1.0.2 → v1.0.3: Sensor Pattern Flexibility

### Sensor Naming Patterns

Version 1.0.3 added support for multiple sensor naming patterns to accommodate different integration configurations.

**Original Expected Pattern (v1.0.2):**
- `sensor.choreboard_my_chores_{username}`
- `sensor.choreboard_my_immediate_chores_{username}`

**Additional Patterns (v1.0.3+):**
- `sensor.{username}_my_chores` (e.g., `sensor.ash_my_chores`)
- `sensor.{username}_my_immediate_chores`

The editor now detects all patterns automatically using flexible filtering logic in `getMyChoresSensors()`:

```typescript
return Object.keys(this.hass.states).filter(
  (entityId) =>
    entityId.startsWith("sensor.choreboard_my_chores_") ||
    entityId.startsWith("sensor.choreboard_my_immediate_chores_") ||
    (entityId.startsWith("sensor.") && entityId.endsWith("_my_chores")) ||
    (entityId.startsWith("sensor.") && entityId.endsWith("_my_immediate_chores")),
);
```

### Data Type Compatibility

**Points Field:**

The integration returns `points` as a **string** (e.g., "2.50", "10.00", "50.00"), not a number. The card handles both types:

```typescript
// Interface allows both types
interface Chore {
  points: string | number;
  // ... other fields
}

// Display logic parses strings to numbers
${typeof chore.points === "string" ? parseFloat(chore.points) : chore.points} pts
```

**Status Field:**

The integration uses "assigned" for active chores, not "pending". The card treats all non-"completed" statuses as active/completable:

```typescript
// Only "completed" gets special treatment
if (chore.status === "completed") {
  // Show as completed
} else {
  // Show as active (includes "assigned", "pending", or any other status)
}
```

### Visual Editor Support

Version 1.0.3 added `getConfigElement()` static method to enable Home Assistant's visual configuration editor:

```typescript
// src/card.ts
public static getConfigElement(): HTMLElement {
  return document.createElement("choreboard-card-editor");
}
```

This allows users to configure the card through the Home Assistant UI without writing YAML.

## Key Differences Summary

| Aspect | v1.0.0 | v1.0.2+ |
|--------|--------|---------|
| Data Source | Individual chore entities | Aggregate My Chores sensor |
| Config Field | `entities[]` or `filter_assignee` | `entity` |
| Service Name | `mark_complete` | `complete_chore` |
| Service Param | `entity_id` | `instance_id` |
| Chore Location | Separate entities | `sensor.attributes.chores[]` |
| Points Type | `number` | `string \| number` |
| Status Values | "pending" | "assigned", "pending", "completed", etc. |

## Why These Changes?

The v1.0.2 redesign was necessary because:

1. **Integration Reality**: The ChoreBoard integration never created individual chore entities. It always used aggregate sensors with chores as attributes.

2. **Efficiency**: Aggregate sensors reduce entity count and improve Home Assistant performance.

3. **Simplicity**: Single sensor per user is easier to configure and manage than tracking multiple individual chore entities.

4. **API Alignment**: Service calls now match the integration's actual API structure.

## Getting Help

For questions or issues with migration:

- **Card Issues**: https://github.com/PhunkMaster/ChoreBoard-HA-Card/issues
- **Integration Issues**: https://github.com/PhunkMaster/ChoreBoard-HA-Integration/issues
- **Documentation**: See CLAUDE.md for current architecture principles
