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
- Mark chores as complete directly from the card with one click
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
| `show_header` | boolean | `true` | Show/hide the card header |
| `show_points` | boolean | `true` | Show/hide point values |
| `show_completed` | boolean | `true` | Show/hide completed chores |
| `show_overdue_only` | boolean | `false` | Show only overdue chores |

### Entity Format

The card works with ChoreBoard "My Chores" sensors created by the integration:
- **Format**: `sensor.choreboard_my_chores_{username}`
- **Example**: `sensor.choreboard_my_chores_ash`

Each sensor contains a list of chores in its `chores` attribute with these fields:
- `id`: Chore instance ID (used for API calls)
- `name`: Chore name
- `due_date`: When the chore is due
- `points`: Point value of the chore
- `is_overdue`: Boolean indicating if the chore is overdue
- `status`: Current status (`pending`, `completed`, etc.)

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

## Usage

### Marking Chores Complete

Click the "Complete" button on any pending or overdue chore to mark it as complete. This calls the `choreboard.complete_chore` service from the integration using the chore's instance ID.

Completed chores are indicated with:
- Green checkmark icon
- "✓ Done" badge
- Reduced opacity
- Strike-through name

### Status Indicators

The card uses color-coding to show chore status:
- **Blue border**: Pending chores (not overdue)
- **Green border**: Completed chores
- **Red border**: Overdue chores
- **Alert icon**: Appears next to overdue chores with due date

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
