# ChoreBoard Card for Home Assistant

A custom Lovelace card for Home Assistant to manage and track household chores.

## Features

- Display a list of chores with assignees and due dates
- Interactive checkboxes to mark chores as complete
- Customizable title and header visibility
- Clean, modern UI that matches Home Assistant's design language
- Visual configuration editor
- HACS compatible

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button
4. Search for "ChoreBoard Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `choreboard-card.js` from the [latest release](https://github.com/yourusername/choreboard-ha-card/releases)
2. Copy it to `config/www/` directory
3. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/choreboard-card.js
      type: module
```

4. Restart Home Assistant

## Configuration

### Visual Editor

The card includes a visual editor accessible through the Home Assistant UI. Click "Edit" on your dashboard, then add a new card and search for "ChoreBoard Card".

### YAML Configuration

```yaml
type: custom:choreboard-card
title: Weekly Chores
show_header: true
chores:
  - name: Take out trash
    assignee: John
    due_date: Monday
    completed: false
  - name: Wash dishes
    assignee: Jane
    due_date: Every day
    completed: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:choreboard-card` |
| `title` | string | `"Chores"` | Card title |
| `show_header` | boolean | `true` | Show/hide the card header |
| `entity` | string | optional | Home Assistant entity to sync with (future feature) |
| `chores` | list | `[]` | List of chore items |

### Chore Item Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | **Required** - Chore name |
| `assignee` | string | Person assigned to the chore |
| `due_date` | string | When the chore is due |
| `completed` | boolean | Completion status |
| `entity` | string | Home Assistant entity (future feature) |

## Examples

### Basic Usage

```yaml
type: custom:choreboard-card
title: Daily Chores
chores:
  - name: Water plants
    completed: false
  - name: Check mail
    completed: true
```

### With Assignees and Due Dates

```yaml
type: custom:choreboard-card
title: Weekend Chores
chores:
  - name: Mow the lawn
    assignee: Dad
    due_date: Saturday
    completed: false
  - name: Grocery shopping
    assignee: Mom
    due_date: Sunday morning
    completed: false
```

### Without Header

```yaml
type: custom:choreboard-card
show_header: false
chores:
  - name: Feed the dog
    assignee: Kids
    completed: false
```

## Development

See [CLAUDE.md](./CLAUDE.md) for development instructions.

## Support

If you have issues or questions, please:
1. Check the [documentation](https://github.com/yourusername/choreboard-ha-card)
2. Search existing [issues](https://github.com/yourusername/choreboard-ha-card/issues)
3. Create a new issue if needed

## License

MIT License - see LICENSE file for details

## Credits

Built with:
- [Lit](https://lit.dev/) - Web Components library
- [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers) - Helper library for custom cards
