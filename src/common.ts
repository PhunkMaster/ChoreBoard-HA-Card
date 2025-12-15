import { HomeAssistant } from "custom-card-helpers";

export const CARD_VERSION = "0.1.0";
export const CARD_NAME = "ChoreBoard Card";
export const ELEMENT_NAME = "choreboard-card";

export interface ChoreboardCardConfig {
  type: string;
  title?: string;
  entities?: string[]; // List of ChoreBoard sensor entity IDs
  filter_assignee?: string; // Filter chores by assignee (e.g., "ash")
  show_header?: boolean;
  show_points?: boolean;
  show_description?: boolean;
  show_completed?: boolean; // Show completed chores (default: true)
}

export interface ChoreboardEntityAttributes {
  assignee: string;
  due_date: string;
  points: number;
  description: string;
  friendly_name?: string;
}

export interface ChoreboardEntity {
  entity_id: string;
  state: "pending" | "completed" | "overdue";
  attributes: ChoreboardEntityAttributes;
  last_changed?: string;
}

export interface HomeAssistantExtended extends HomeAssistant {
  [key: string]: any;
}
