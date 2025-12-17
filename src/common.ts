import { HomeAssistant } from "custom-card-helpers";

export const CARD_VERSION = "1.2.0";
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
  is_overdue?: boolean; // Optional - some sensors may not include this field
  status: string; // "pending", "completed", "assigned", "pool", etc.
  complete_later?: boolean; // Available in my_immediate_chores sensor
  description?: string; // Optional description field
}

// Attributes structure of the my_chores sensor
export interface MyChoresSensorAttributes {
  username?: string; // Optional - some sensors may not have a username
  chores: Chore[];
  count: number;
  total_chores?: number; // For immediate_chores sensor
  complete_later_chores?: number; // For immediate_chores sensor
  points_label?: string; // Custom label for points (e.g., "Stars", "Credits") - defaults to "points"
}

// User object from ChoreBoard integration
export interface User {
  id: number;
  username: string;
  display_name: string;
  first_name: string;
  can_be_assigned: boolean;
  eligible_for_points: boolean;
  weekly_points: string | number;
  all_time_points: string | number;
  claims_today?: number;
}

export interface HomeAssistantExtended extends HomeAssistant {
  [key: string]: any;
}
