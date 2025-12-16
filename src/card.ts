import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import {
  ChoreboardCardConfig,
  Chore,
  MyChoresSensorAttributes,
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

    if (!config.entity) {
      throw new Error(
        'You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.',
      );
    }

    this.config = {
      show_header: true,
      show_points: true,
      show_completed: true,
      show_overdue_only: false,
      ...config,
    };
  }

  public getCardSize(): number {
    const chores = this.getChores();
    return Math.max(2, Math.ceil(chores.length / 2) + 1);
  }

  public static getStubConfig(): ChoreboardCardConfig {
    return {
      type: "custom:choreboard-card",
      title: "My Chores",
      entity: "sensor.choreboard_my_chores_ash",
      show_header: true,
      show_points: true,
      show_completed: true,
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("choreboard-card-editor");
  }

  private getChores(): Chore[] {
    if (!this.hass || !this.config.entity) {
      return [];
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      console.warn(`ChoreBoard entity not found: ${this.config.entity}`);
      return [];
    }

    const attributes = stateObj.attributes as MyChoresSensorAttributes;
    const chores = attributes.chores || [];

    return chores.filter((chore) => {
      // Filter out completed chores if show_completed is false
      if (!this.config.show_completed && chore.status === "completed") {
        return false;
      }

      // Filter to only overdue if show_overdue_only is true
      // Treat missing is_overdue as false (not overdue)
      if (this.config.show_overdue_only && !chore.is_overdue) {
        return false;
      }

      return true;
    });
  }

  private async completeChore(chore: Chore): Promise<void> {
    if (!this.hass) return;

    if (chore.status === "completed") {
      this.showToast("This chore is already marked as completed");
      return;
    }

    try {
      await this.hass.callService("choreboard", "complete_chore", {
        instance_id: chore.id,
      });
      this.showToast(`Marked "${chore.name}" as complete`);
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

  private getChoreStateClass(chore: Chore): string {
    if (chore.status === "completed") {
      return "state-completed";
    }
    if (chore.is_overdue) {
      return "state-overdue";
    }
    return "state-pending";
  }

  private getChoreStateIcon(chore: Chore): string {
    if (chore.status === "completed") {
      return "mdi:check-circle";
    }
    if (chore.is_overdue) {
      return "mdi:alert-circle";
    }
    return "mdi:circle-outline";
  }

  private getUsername(): string {
    if (!this.hass || !this.config.entity) {
      return "";
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return "";
    }

    const attributes = stateObj.attributes as MyChoresSensorAttributes;
    return attributes.username || "";
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const username = this.getUsername();
    const title = this.config.title || `${username}'s Chores` || "Chores";
    const chores = this.getChores();

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
                <strong>No chores found</strong>
                <p>
                  ${username
                    ? `${username} has no chores matching the current filters.`
                    : "Please ensure the ChoreBoard integration is installed and configured."}
                  Visit the
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
                <div class="chore-item ${this.getChoreStateClass(chore)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(chore)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${chore.name}</div>
                      ${this.config.show_points && chore.points
                        ? html`<div class="chore-points">
                            ${typeof chore.points === "string" ? parseFloat(chore.points) : chore.points} pts
                          </div>`
                        : ""}
                    </div>
                    <div class="chore-meta">
                      ${chore.due_date
                        ? html`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${chore.due_date}</span
                          >`
                        : ""}
                      ${chore.is_overdue
                        ? html`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`
                        : ""}
                    </div>
                  </div>
                  <div class="chore-action">
                    ${chore.status !== "completed"
                      ? html`
                          <mwc-button @click=${() => this.completeChore(chore)}>
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

      .meta-item.overdue {
        color: var(--error-color, #f44336);
        font-weight: 600;
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
