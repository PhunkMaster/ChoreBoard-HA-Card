# ChoreBoard Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release](https://img.shields.io/github/v/release/PhunkMaster/ChoreBoard-HA-Card)](https://github.com/PhunkMaster/ChoreBoard-HA-Card/releases)
[![License](https://img.shields.io/github/license/PhunkMaster/ChoreBoard-HA-Card)](LICENSE)

A custom Lovelace card for Home Assistant to display and manage chores from the [ChoreBoard Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration).

## Prerequisites

**⚠️ IMPORTANT**: This card requires the [ChoreBoard Home Assistant Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration) to be installed and configured first.

The card displays chore data from ChoreBoard sensor entities created by the integration. Without the integration, this card will not function.

### Install ChoreBoard Integration

1. Install via HACS (recommended):
   - Go to HACS → Integrations
   - Search for "ChoreBoard"
   - Click Install

2. Or install manually:
   - Download the integration from the [repository](https://github.com/PhunkMaster/ChoreBoard-HA-Integration)
   - Copy to `custom_components/choreboard/`

3. Configure the integration:
   - Go to Settings → Devices & Services
   - Click "Add Integration"
   - Search for "ChoreBoard"
   - Enter your API Key and API URL

For detailed integration setup instructions, see the [ChoreBoard Integration documentation](https://github.com/PhunkMaster/ChoreBoard-HA-Integration).

## Features

- Display chores from ChoreBoard integration's "My Chores" sensors
- Automatically shows all chores for a specific user
- **Actor Configuration (v1.5.0+)**: Configure which user completes chores from this card
- **Pool Chores Support (v1.1.0+)**: Claim and complete shared chores with user selection
- Mark chores as complete directly from the card with one click
- Select who completed pool chores and who helped for accurate point distribution
- Visual indicator when acting as a different user than the sensor owner
- Color-coded status indicators (pending, completed, overdue)
- Show/hide completed chores
- Filter to show only overdue chores
- Visual configuration editor for easy setup
- Real-time updates from the ChoreBoard integration
- HACS compatible

## Screenshots

![Card Preview](https://via.placeholder.com/800x400/1c1c1c/ffffff?text=ChoreBoard+Card+Preview+%7C+Screenshots+Coming+Soon)

> **Note**: This is a pre-release version. Screenshots of the card in action will be added once the first version is deployed and tested in a live Home Assistant environment.

The card displays:
- Chore name and status indicator (pending, completed, overdue)
- Due date information
- Point values (optional)
- Overdue indicators with alert icons
- Complete button for pending/overdue chores
- Color-coded borders based on status

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button
4. Search for "ChoreBoard Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `choreboard-ha-card.js` from the [latest release](https://github.com/yourusername/choreboard-ha-card/releases)
2. Copy it to `config/www/` directory
3. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/choreboard-ha-card.js
      type: module
```

4. Restart Home Assistant

## Configuration

### Visual Editor

The card includes a visual editor accessible through the Home Assistant UI:

1. Edit your dashboard
2. Click "Add Card"
3. Search for "ChoreBoard Card"
4. Select the "My Chores" sensor for the user you want to display
5. Configure display options (show completed, show only overdue, etc.)

### YAML Configuration

**Basic Example - Show Ash's Chores:**
```yaml
type: custom:choreboard-card
title: "Ash's Chores"
entity: sensor.choreboard_my_chores_ash
```

**Hide Completed Chores:**
```yaml
type: custom:choreboard-card
title: "My Active Chores"
entity: sensor.choreboard_my_chores_ash
show_completed: false
```

**Show Only Overdue:**
```yaml
type: custom:choreboard-card
title: "Overdue Chores"
entity: sensor.choreboard_my_chores_ash
show_overdue_only: true
show_completed: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:choreboard-card` |
| `entity` | string | **Required** | ChoreBoard "My Chores" sensor entity ID (e.g., `sensor.choreboard_my_chores_ash`) |
| `title` | string | `"{username}'s Chores"` | Card title (auto-generated from username if not specified) |
| `actor_user_id` | number | Auto-detect | ChoreBoard user ID who completes chores from this card. Leave unset to auto-detect from sensor (v1.5.0+) |
| `show_header` | boolean | `true` | Show/hide the card header |
| `show_points` | boolean | `true` | Show/hide point values |
| `show_completed` | boolean | `true` | Show/hide completed chores |
| `show_overdue_only` | boolean | `false` | Show only overdue chores |

### Entity Format

The card works with ChoreBoard sensors created by the integration:

**My Chores Sensors (per user):**
- **Format**: `sensor.choreboard_my_chores_{username}` or `sensor.{username}_my_chores`
- **Example**: `sensor.choreboard_my_chores_ash` or `sensor.ash_my_chores`

**Pool Chores Sensors (shared chores):**
- **Format**: `sensor.pool_chores` or `sensor.choreboard_pool_chores`
- **Contains**: Chores available in the shared pool that can be claimed by any user

Each sensor contains a list of chores in its `chores` attribute with these fields:
- `id`: Chore instance ID (used for API calls)
- `name`: Chore name
- `due_date`: When the chore is due
- `points`: Point value of the chore
- `is_overdue`: Boolean indicating if the chore is overdue
- `status`: Current status (`assigned`, `pending`, `completed`, `pool`, etc.)

## Examples

### Example 1: Show All of Ash's Chores

```yaml
type: custom:choreboard-card
title: "Ash's Chores"
entity: sensor.choreboard_my_chores_ash
```

This displays all chores assigned to Ash, including completed ones.

### Example 2: Active Chores Only (Hide Completed)

```yaml
type: custom:choreboard-card
title: "Active Chores"
entity: sensor.choreboard_my_chores_ash
show_completed: false
```

Perfect for focusing on what still needs to be done.

### Example 3: Overdue Chores Alert

```yaml
type: custom:choreboard-card
title: "⚠️ Overdue!"
entity: sensor.choreboard_my_chores_ash
show_overdue_only: true
show_completed: false
```

Shows only overdue chores that need immediate attention.

### Example 4: Minimal Display (No Header or Points)

```yaml
type: custom:choreboard-card
entity: sensor.choreboard_my_chores_ash
show_header: false
show_points: false
show_completed: false
```

Clean, minimal view showing only active chores.

### Example 5: Using Immediate Chores Sensor

```yaml
type: custom:choreboard-card
title: "Do Now"
entity: sensor.choreboard_my_immediate_chores_ash
```

Uses the "immediate chores" sensor which excludes chores marked as "complete later".

### Example 6: Pool Chores (v1.1.0+)

```yaml
type: custom:choreboard-card
title: "Available Chores"
entity: sensor.pool_chores
show_completed: false
```

Displays shared pool chores that anyone can claim. Each pool chore shows "Claim" and "Complete" buttons.

### Example 7: Actor Configuration - Parent Completing Child's Chores (v1.5.0+)

```yaml
type: custom:choreboard-card
title: "Alex's Chores"
entity: sensor.choreboard_my_chores_alex
actor_user_id: 5  # Mom's ChoreBoard user ID
```

Shows Alex's chores, but when the "Complete" button is clicked, the completion is recorded as done by Mom (user ID 5). The card displays an orange "Acting as: Mom" badge in the header to indicate this configuration.

**Use cases:**
- Parents marking chores complete on behalf of children
- Guardians or caretakers managing chores
- Shared household kiosk displays
- Multi-user tablet interfaces

To find user IDs, check the integration's sensor attributes in Developer Tools → States → `sensor.users` or any `sensor.choreboard_*` entity's `users` attribute.

## Usage

### Assigned Chores

**Marking Chores Complete:**

Click the "Complete" button on any assigned chore to mark it as complete. This calls the `choreboard.complete_chore` service from the integration using the chore's instance ID.

Completed chores are indicated with:
- Green checkmark icon
- "✓ Done" badge
- Reduced opacity
- Strike-through name

### Pool Chores (v1.1.0+)

Pool chores are shared chores that anyone can claim or complete. The card automatically detects pool chores and displays different action buttons.

**Claiming Pool Chores:**

1. Click the "Claim" button on a pool chore
2. A dialog appears showing all available users
3. Select who is claiming the chore
4. Click "Claim" to assign the chore to the selected user
5. The chore moves from the pool to the user's assigned chores

**Completing Pool Chores:**

1. Click the "Complete" button on a pool chore
2. A dialog appears with two sections:
   - **Who completed this chore?** (required) - Select the person who did the work
   - **Who helped?** (optional) - Select any helpers who assisted
3. Click "Complete" to finish
4. Points are distributed to the completer and helpers based on ChoreBoard configuration

**Pool Chore Detection:**

The card automatically identifies pool chores by:
- Chores with `status: "pool"`
- Chores from pool sensor entities (e.g., `sensor.pool_chores`)

Pool chores display two buttons:
- **Claim**: Assign the chore to someone
- **Complete**: Mark complete with user selection and optional helpers

### Actor Configuration (v1.5.0+)

**What is Actor Configuration?**

Actor configuration allows you to specify which ChoreBoard user will be recorded as completing chores when you click the "Complete" button on assigned chores. This is useful when one person is managing chores on behalf of another.

**How to Configure:**

1. **Visual Editor Method:**
   - Edit your dashboard and open the card configuration
   - Find the "Who completes chores from this card?" dropdown
   - Select a specific user or leave as "Auto-detect from sensor (default)"
   - Save the card

2. **YAML Method:**
   ```yaml
   type: custom:choreboard-card
   entity: sensor.choreboard_my_chores_child
   actor_user_id: 12  # Parent's user ID
   ```

**Visual Indicators:**

When actor configuration is active (actor is different from the sensor owner):
- **Orange badge** appears in the card header: "🔄 Acting as: [Name]"
- **Enhanced completion messages**: "Marked 'Dishes' as complete (by Mom)"

**Important Notes:**

- Actor configuration only affects **assigned chores**, not pool chores
- Pool chores always prompt for user selection regardless of this setting
- If the configured actor user is deleted, the card automatically falls back to the sensor's user
- Validation warnings appear in the editor if the selected user no longer exists

### Status Indicators

The card uses color-coding to show chore status:
- **Blue border**: Pending chores (not overdue)
- **Green border**: Completed chores
- **Red border**: Overdue chores
- **Alert icon**: Appears next to overdue chores with due date
- **Orange badge**: Actor configuration active (completion by different user)

## Troubleshooting

### "No ChoreBoard sensors found" Warning

This means the ChoreBoard integration is not installed or configured. To resolve:

1. Verify the integration is installed in HACS or `custom_components/`
2. Configure the integration in Settings → Devices & Services
3. Check that "My Chores" sensors exist in Developer Tools → States
4. Look for entities starting with `sensor.choreboard_my_chores_` or `sensor.choreboard_my_immediate_chores_`

### "No chores found" Message

If the card shows no chores for a user:

1. Check that the selected entity exists in Developer Tools → States
2. Verify the `chores` attribute contains data
3. Check your filter settings (show_completed, show_overdue_only)
4. Ensure the integration has successfully fetched chore data from the ChoreBoard API
5. Check integration logs for errors

### "Complete" Button Not Working

If marking chores complete fails:

1. Check Home Assistant logs for errors
2. Verify the `choreboard.complete_chore` service exists in Developer Tools → Services
3. Test the service manually with a chore instance_id
4. Ensure the integration API connection is working
5. Check that the chore's `id` field is present and valid

### Pool Chores Not Showing Claim/Complete Buttons

If pool chores show a single "Complete" button instead of "Claim" and "Complete":

1. Check that the chore's `status` field is set to `"pool"`
2. Verify the sensor entity name contains "chores" but not "my_chores"
3. Check in Developer Tools → States that the entity's chores have `status: "pool"`
4. Ensure you're using integration version that supports pool chores

### User Selection Dialog Not Appearing

If clicking "Claim" or "Complete" on pool chores doesn't show a dialog:

1. Check browser console for JavaScript errors
2. Verify the integration has user data in sensor attributes
3. Look for `users` array in any `sensor.choreboard_*` entity attributes
4. Clear browser cache and refresh Home Assistant
5. Check that you're using card version 1.1.0 or later

### Actor Configuration Not Working (v1.5.0+)

If the configured actor is not being used when completing chores:

1. **Verify user ID is correct**: Check `sensor.users` or any `sensor.choreboard_*` entity in Developer Tools → States for the `users` array
2. **Check for validation warning**: Open the card editor - if a warning appears, the selected user no longer exists
3. **Look for fallback message**: Check Home Assistant logs or browser console for "Configured actor not found" warnings
4. **Verify card version**: Ensure you're using version 1.5.0 or later
5. **Check actor badge**: The card header should show an orange "Acting as: [Name]" badge if actor differs from sensor owner

### Actor Badge Not Appearing

If you configured an actor but don't see the orange badge:

1. The actor badge only appears when the configured actor is **different** from the sensor's user
2. Check if `actor_user_id` matches the sensor's username's user ID
3. If they match, this is expected behavior (no badge needed)
4. Verify `show_header: true` in your configuration (badge only shows in header)

## Development

See [CLAUDE.md](./CLAUDE.md) for development instructions.

## Support

If you have issues or questions:
1. Check the [ChoreBoard Integration documentation](https://github.com/PhunkMaster/ChoreBoard-HA-Integration)
2. Search existing [issues](https://github.com/yourusername/choreboard-ha-card/issues)
3. Create a new issue if needed

## Related Projects

- [ChoreBoard Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration) - Required Home Assistant integration

## License

MIT License - see LICENSE file for details

## Credits

Built with:
- [Lit](https://lit.dev/) - Web Components library
- [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers) - Helper library for custom cards
- [ChoreBoard Integration](https://github.com/PhunkMaster/ChoreBoard-HA-Integration) - Data source
