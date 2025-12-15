import "./card";
import "./editor";
import { ChoreboardCard } from "./card";
import { ChoreboardCardEditor } from "./editor";

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

// Make sure the custom elements are defined
customElements.define("choreboard-card", ChoreboardCard);
customElements.define("choreboard-card-editor", ChoreboardCardEditor);

console.info("ChoreBoard Card has been loaded");
