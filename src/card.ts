import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import {
  ChoreboardCardConfig,
  ChoreboardEntity,
  ChoreboardEntityAttributes,
  CARD_NAME,
  CARD_VERSION,
} from "./common";

@customElement("choreboard-card")
export class ChoreboardCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  public setConfig(config: ChoreboardCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    // Require either entities or filter_assignee
    if (
      !config.filter_assignee &&
      (!config.entities || config.entities.length === 0)
    ) {
      throw new Error(
        'You must specify either "entities" or "filter_assignee". Please configure the ChoreBoard integration first.',
      );
    }

    this.config = {
      show_header: true,
      show_points: true,
      show_description: false,
      show_completed: true,
      ...config,
    };
  }

  public getCardSize(): number {
    const entityCount = this.config?.entities?.length || 0;
    return Math.max(2, Math.ceil(entityCount / 2) + 1);
  }

  public static getStubConfig(): ChoreboardCardConfig {
    return {
      type: "custom:choreboard-card",
      title: "Chores",
      entities: [
        "sensor.choreboard_wash_dishes",
        "sensor.choreboard_take_out_trash",
      ],
      show_header: true,
      show_points: true,
      show_description: false,
    };
  }

  private getAllChoreboardEntities(): string[] {
    if (!this.hass) {
      return [];
    }

    // Get all entities that start with sensor.choreboard_
    return Object.keys(this.hass.states).filter((entityId) =>
      entityId.startsWith("sensor.choreboard_"),
    );
  }

  private getChoreEntities(): ChoreboardEntity[] {
    if (!this.hass) {
      return [];
    }

    let entityIds: string[];

    // If filter_assignee is set, discover all ChoreBoard entities
    if (this.config.filter_assignee) {
      entityIds = this.getAllChoreboardEntities();
    } else if (this.config.entities) {
      entityIds = this.config.entities;
    } else {
      return [];
    }

    const entities: ChoreboardEntity[] = [];

    for (const entityId of entityIds) {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) {
        console.warn(`ChoreBoard entity not found: ${entityId}`);
        continue;
      }

      const entity: ChoreboardEntity = {
        entity_id: entityId,
        state: stateObj.state as "pending" | "completed" | "overdue",
        attributes: stateObj.attributes as ChoreboardEntityAttributes,
        last_changed: stateObj.last_changed,
      };

      // Filter by assignee if configured
      if (
        this.config.filter_assignee &&
        entity.attributes.assignee?.toLowerCase() !==
          this.config.filter_assignee.toLowerCase()
      ) {
        continue;
      }

      // Filter out completed chores if show_completed is false
      if (!this.config.show_completed && entity.state === "completed") {
        continue;
      }

      entities.push(entity);
    }

    return entities;
  }

  private async toggleChore(entity: ChoreboardEntity): Promise<void> {
    if (!this.hass) return;

    if (entity.state === "completed") {
      // If already completed, show info message
      this.showToast("This chore is already marked as completed");
      return;
    }

    try {
      await this.hass.callService("choreboard", "mark_complete", {
        entity_id: entity.entity_id,
      });
      this.showToast(
        `Marked "${this.getChoreDisplayName(entity)}" as complete`,
      );
    } catch (error) {
      console.error("Error marking chore as complete:", error);
      this.showToast("Failed to mark chore as complete", true);
    }
  }

  private showToast(message: string, isError = false): void {
    const event = new CustomEvent("hass-notification", {
      detail: {
        message,
        duration: isError ? 5000 : 3000,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private getChoreDisplayName(entity: ChoreboardEntity): string {
    // Use friendly_name if available, otherwise extract from entity_id
    if (entity.attributes.friendly_name) {
      return entity.attributes.friendly_name;
    }

    // Extract chore name from entity_id (e.g., sensor.choreboard_wash_dishes -> Wash Dishes)
    const parts = entity.entity_id.split(".");
    if (parts.length === 2 && parts[1].startsWith("choreboard_")) {
      const name = parts[1].replace("choreboard_", "").replace(/_/g, " ");
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return entity.entity_id;
  }

  private getStateClass(state: string): string {
    switch (state) {
      case "completed":
        return "state-completed";
      case "overdue":
        return "state-overdue";
      case "pending":
      default:
        return "state-pending";
    }
  }

  private getStateIcon(state: string): string {
    switch (state) {
      case "completed":
        return "mdi:check-circle";
      case "overdue":
        return "mdi:alert-circle";
      case "pending":
      default:
        return "mdi:circle-outline";
    }
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const title = this.config.title || "Chores";
    const chores = this.getChoreEntities();

    if (chores.length === 0) {
      return html`
        <ha-card>
          ${this.config.show_header
            ? html`
                <div class="card-header">
                  <div class="name">${title}</div>
                </div>
              `
            : ""}
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <div>
                <strong>No ChoreBoard entities found</strong>
                <p>
                  Please ensure the ChoreBoard integration is installed and
                  configured. Visit the
                  <a
                    href="https://github.com/PhunkMaster/ChoreBoard-HA-Integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    >ChoreBoard Integration</a
                  >
                  for setup instructions.
                </p>
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this.config.show_header
          ? html`
              <div class="card-header">
                <div class="name">${title}</div>
                <div class="badge">${chores.length} chores</div>
              </div>
            `
          : ""}
        <div class="card-content">
          <div class="chore-list">
            ${chores.map(
              (chore) => html`
                <div class="chore-item ${this.getStateClass(chore.state)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getStateIcon(chore.state)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">
                        ${this.getChoreDisplayName(chore)}
                      </div>
                      ${this.config.show_points && chore.attributes.points
                        ? html`<div class="chore-points">
                            ${chore.attributes.points} pts
                          </div>`
                        : ""}
                    </div>
                    ${this.config.show_description &&
                    chore.attributes.description
                      ? html`<div class="chore-description">
                          ${chore.attributes.description}
                        </div>`
                      : ""}
                    <div class="chore-meta">
                      ${chore.attributes.assignee
                        ? html`<span class="meta-item"
                            ><ha-icon icon="mdi:account"></ha-icon>${chore
                              .attributes.assignee}</span
                          >`
                        : ""}
                      ${chore.attributes.due_date
                        ? html`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon>${chore
                              .attributes.due_date}</span
                          >`
                        : ""}
                    </div>
                  </div>
                  <div class="chore-action">
                    ${chore.state !== "completed"
                      ? html`
                          <mwc-button @click=${() => this.toggleChore(chore)}>
                            Complete
                          </mwc-button>
                        `
                      : html`<div class="completed-badge">✓ Done</div>`}
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-header .name {
        font-size: 24px;
        font-weight: 500;
      }

      .badge {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .card-content {
        padding: 0;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 8px;
      }

      .warning ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .warning strong {
        display: block;
        margin-bottom: 4px;
      }

      .warning p {
        margin: 4px 0 0 0;
        font-size: 14px;
      }

      .warning a {
        color: var(--text-primary-color, white);
        text-decoration: underline;
      }

      .chore-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chore-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .chore-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .chore-item.state-completed {
        opacity: 0.7;
        border-color: var(--success-color, #4caf50);
      }

      .chore-item.state-overdue {
        border-color: var(--error-color, #f44336);
        background: rgba(244, 67, 54, 0.05);
      }

      .chore-item.state-pending {
        border-color: var(--info-color, #2196f3);
      }

      .chore-status {
        flex-shrink: 0;
      }

      .chore-status ha-icon {
        --mdc-icon-size: 28px;
      }

      .state-completed .chore-status ha-icon {
        color: var(--success-color, #4caf50);
      }

      .state-overdue .chore-status ha-icon {
        color: var(--error-color, #f44336);
      }

      .state-pending .chore-status ha-icon {
        color: var(--info-color, #2196f3);
      }

      .chore-details {
        flex: 1;
        min-width: 0;
      }

      .chore-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .chore-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .state-completed .chore-name {
        text-decoration: line-through;
        opacity: 0.7;
      }

      .chore-points {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      .chore-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .chore-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .meta-item ha-icon {
        --mdc-icon-size: 16px;
      }

      .chore-action {
        flex-shrink: 0;
      }

      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }

      .completed-badge {
        background: var(--success-color, #4caf50);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
      }
    `;
  }
}

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  "color: white; background: #039be5; font-weight: 700;",
  "color: #039be5; background: white; font-weight: 700;",
);
