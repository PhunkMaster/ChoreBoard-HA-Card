import "./card";
import "./editor";
import "./arcade-judge-card";
import "./arcade-judge-card-editor";
import { ChoreboardCard } from "./card";
import { ChoreboardCardEditor } from "./editor";
import { ChoreboardArcadeJudgeCard } from "./arcade-judge-card";
import { ChoreboardArcadeJudgeCardEditor } from "./arcade-judge-card-editor";

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

window.customCards.push({
  type: "choreboard-arcade-judge-card",
  name: "ChoreBoard Arcade Judge Card",
  description:
    "A custom card for judging pending arcade sessions in ChoreBoard",
  preview: true,
  documentationURL: "https://github.com/yourusername/choreboard-ha-card",
});

// Make sure the custom elements are defined (only if not already defined)
if (!customElements.get("choreboard-card")) {
  customElements.define("choreboard-card", ChoreboardCard);
}
if (!customElements.get("choreboard-card-editor")) {
  customElements.define("choreboard-card-editor", ChoreboardCardEditor);
}
if (!customElements.get("choreboard-arcade-judge-card")) {
  customElements.define("choreboard-arcade-judge-card", ChoreboardArcadeJudgeCard);
}
if (!customElements.get("choreboard-arcade-judge-card-editor")) {
  customElements.define("choreboard-arcade-judge-card-editor", ChoreboardArcadeJudgeCardEditor);
}

console.info("ChoreBoard Card has been loaded");
console.info("ChoreBoard Arcade Judge Card has been loaded");
