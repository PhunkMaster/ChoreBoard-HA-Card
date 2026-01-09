// Import card and editor modules - the @customElement decorators handle registration
import "./card";
import "./editor";

// Register the card with Home Assistant
declare global {
  interface Window {
    customCards: any[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "choreboard-card",
  name: "ChoreBoard Card",
  description:
    "A custom card for managing and tracking chores in Home Assistant",
  preview: true,
  documentationURL: "https://github.com/yourusername/choreboard-ha-card",
});

// Custom elements are already defined by @customElement decorators in card.ts and editor.ts
// Importing those files above triggers the registration

console.info("ChoreBoard Card has been loaded");
