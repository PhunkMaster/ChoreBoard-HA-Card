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

- Display chores from ChoreBoard integration with status indicators
- Mark chores as complete directly from the card
- Show assignee, due date, points, and descriptions
- Color-coded status (pending, completed, overdue)
- Visual configuration editor for easy setup
- Customizable display options
- HACS compatible

## Screenshots

![Card Preview](https://via.placeholder.com/800x400/1c1c1c/ffffff?text=ChoreBoard+Card+Preview+%7C+Screenshots+Coming+Soon)

> **Note**: This is a pre-release version. Screenshots of the card in action will be added once the first version is deployed and tested in a live Home Assistant environment.

The card displays:
- Chore name and status badge (pending, completed, overdue)
- Assignee and due date information
- Optional point values and descriptions
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
4. Select which ChoreBoard entities to display
5. Configure display options

### YAML Configuration

```yaml
type: custom:choreboard-card
title: Weekly Chores
entities:
  - sensor.choreboard_wash_dishes
  - sensor.choreboard_take_out_trash
  - sensor.choreboard_vacuum_living_room
show_header: true
show_points: true
show_description: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:choreboard-card` |
| `title` | string | `"Chores"` | Card title |
| `entities` | list | **Required** | List of ChoreBoard sensor entity IDs |
| `show_header` | boolean | `true` | Show/hide the card header |
| `show_points` | boolean | `true` | Show/hide point values |
| `show_description` | boolean | `false` | Show/hide chore descriptions |

### Entity Format

Entities must be ChoreBoard sensors created by the integration. They follow the format:
- `sensor.choreboard_[chore_name]`

Each entity includes these attributes:
- `assignee`: Person assigned to the chore
- `due_date`: When the chore is due
- `points`: Point value of the chore
- `description`: Chore description

Entity states:
- `pending`: Chore needs to be done
- `completed`: Chore is finished
- `overdue`: Chore is past due date

## Examples

### Basic Usage

```yaml
type: custom:choreboard-card
title: Chores
entities:
  - sensor.choreboard_wash_dishes
  - sensor.choreboard_take_out_trash
```

### Show All Details

```yaml
type: custom:choreboard-card
title: Weekly Chores
entities:
  - sensor.choreboard_wash_dishes
  - sensor.choreboard_take_out_trash
  - sensor.choreboard_vacuum_living_room
  - sensor.choreboard_clean_bathroom
show_header: true
show_points: true
show_description: true
```

### Minimal Display

```yaml
type: custom:choreboard-card
title: Quick Chores
entities:
  - sensor.choreboard_water_plants
  - sensor.choreboard_check_mail
show_header: false
show_points: false
show_description: false
```

## Usage

### Marking Chores Complete

Click the "Complete" button on any pending or overdue chore to mark it as complete. This calls the `choreboard.mark_complete` service from the integration.

Completed chores are indicated with:
- Green checkmark icon
- "✓ Done" badge
- Reduced opacity
- Strike-through name

### Status Indicators

The card uses color-coding to show chore status:
- **Blue border**: Pending chores
- **Green border**: Completed chores
- **Red border**: Overdue chores

## Troubleshooting

### "No ChoreBoard entities found" Warning

This means the ChoreBoard integration is not installed or configured. To resolve:

1. Verify the integration is installed in HACS or `custom_components/`
2. Configure the integration in Settings → Devices & Services
3. Check that chore entities exist in Developer Tools → States
4. Look for entities starting with `sensor.choreboard_`

### Entities Not Showing

If specific entities don't appear:

1. Check entity IDs in Developer Tools → States
2. Verify entities start with `sensor.choreboard_`
3. Ensure the integration has successfully fetched chore data
4. Check integration logs for errors

### "Complete" Button Not Working

If marking chores complete fails:

1. Check Home Assistant logs for errors
2. Verify the `choreboard.mark_complete` service exists
3. Test the service in Developer Tools → Services
4. Ensure the integration API connection is working

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
