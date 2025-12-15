import { HomeAssistant } from "custom-card-helpers";

export const CARD_VERSION = "0.1.0";
export const CARD_NAME = "ChoreBoard Card";
export const ELEMENT_NAME = "choreboard-card";

export interface ChoreboardCardConfig {
  type: string;
  title?: string;
  entity: string; // ChoreBoard my_chores sensor entity ID (e.g., sensor.choreboard_my_chores_ash)
  show_header?: boolean;
  show_points?: boolean;
  show_completed?: boolean; // Show completed chores (default: true)
  show_overdue_only?: boolean; // Show only overdue chores (default: false)
}

// Chore object from the sensor's attributes.chores list
export interface Chore {
  id: number; // Instance ID for API calls
  name: string;
  due_date: string;
  points: string | number; // Integration may return string or number
  is_overdue: boolean;
  status: string; // "pending", "completed", "assigned", etc.
  complete_later?: boolean; // Available in my_immediate_chores sensor
}

// Attributes structure of the my_chores sensor
export interface MyChoresSensorAttributes {
  username: string;
  chores: Chore[];
  count: number;
  total_chores?: number; // For immediate_chores sensor
  complete_later_chores?: number; // For immediate_chores sensor
}

export interface HomeAssistantExtended extends HomeAssistant {
  [key: string]: any;
}
