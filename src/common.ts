import { HomeAssistant } from 'custom-card-helpers';

export const CARD_VERSION = '0.1.0';
export const CARD_NAME = 'ChoreBoard Card';
export const ELEMENT_NAME = 'choreboard-card';

export interface ChoreboardCardConfig {
  type: string;
  title?: string;
  entity?: string;
  show_header?: boolean;
  chores?: ChoreItem[];
}

export interface ChoreItem {
  name: string;
  assignee?: string;
  due_date?: string;
  completed?: boolean;
  entity?: string;
}

export interface HomeAssistantExtended extends HomeAssistant {
  [key: string]: any;
}
