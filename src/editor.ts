import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { ChoreboardCardConfig } from "./common";

@customElement("choreboard-card-editor")
export class ChoreboardCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  public setConfig(config: ChoreboardCardConfig): void {
    this.config = config;
  }

  private getMyChoresSensors(): string[] {
    if (!this.hass) return [];

    // Get sensors that follow the my_chores pattern
    // Supports both sensor.choreboard_my_chores_* and sensor.*_my_chores patterns
    return Object.keys(this.hass.states).filter(
      (entityId) =>
        entityId.startsWith("sensor.choreboard_my_chores_") ||
        entityId.startsWith("sensor.choreboard_my_immediate_chores_") ||
        (entityId.startsWith("sensor.") && entityId.endsWith("_my_chores")) ||
        (entityId.startsWith("sensor.") && entityId.endsWith("_my_immediate_chores")),
    );
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const myChoresSensors = this.getMyChoresSensors();

    return html`
      <div class="card-config">
        ${myChoresSensors.length === 0
          ? html`
              <div class="warning">
                <ha-icon icon="mdi:alert"></ha-icon>
                <div>
                  <strong>No ChoreBoard sensors found</strong>
                  <p>
                    Please install and configure the
                    <a
                      href="https://github.com/PhunkMaster/ChoreBoard-HA-Integration"
                      target="_blank"
                      rel="noopener noreferrer"
                      >ChoreBoard Integration</a
                    >
                    first.
                  </p>
                </div>
              </div>
            `
          : ""}

        <div class="option">
          <label for="title">Title:</label>
          <input
            id="title"
            type="text"
            .value=${this.config.title || ""}
            @input=${this.titleChanged}
            placeholder="My Chores"
          />
        </div>

        <div class="option">
          <label for="entity">ChoreBoard Sensor:</label>
          <select
            id="entity"
            .value=${this.config.entity || ""}
            @change=${this.entityChanged}
          >
            <option value="">Select a sensor...</option>
            ${myChoresSensors.map(
              (entityId) => html`
                <option
                  value=${entityId}
                  ?selected=${this.config.entity === entityId}
                >
                  ${this.getEntityDisplayName(entityId)}
                </option>
              `,
            )}
          </select>
          <p class="hint">
            Select the "My Chores" sensor for the user you want to display. The
            card will show all chores from that sensor.
          </p>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_header !== false}
              @change=${this.showHeaderChanged}
            />
            Show Header
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_points !== false}
              @change=${this.showPointsChanged}
            />
            Show Points
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_completed !== false}
              @change=${this.showCompletedChanged}
            />
            Show Completed Chores
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              ?checked=${this.config.show_overdue_only === true}
              @change=${this.showOverdueOnlyChanged}
            />
            Show Only Overdue Chores
          </label>
        </div>

        <div class="info">
          <ha-icon icon="mdi:information"></ha-icon>
          <div>
            <strong>About ChoreBoard Card</strong>
            <p>
              This card displays chores from the ChoreBoard integration's "My
              Chores" sensors. Each user has their own sensor containing their
              assigned chores.
            </p>
            <p>
              Mark chores as complete directly from the card using the
              "Complete" button.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private getEntityDisplayName(entityId: string): string {
    const stateObj = this.hass?.states[entityId];
    if (stateObj?.attributes?.friendly_name) {
      return stateObj.attributes.friendly_name;
    }

    // Extract from entity_id
    const parts = entityId.split(".");
    if (parts.length === 2 && parts[1].startsWith("choreboard_")) {
      const name = parts[1].replace("choreboard_", "").replace(/_/g, " ");
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return entityId;
  }

  private entityChanged(ev: Event): void {
    const target = ev.target as HTMLSelectElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, entity: target.value };
    this.configChanged();
  }

  private titleChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, title: target.value };
    this.configChanged();
  }

  private showHeaderChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, show_header: target.checked };
    this.configChanged();
  }

  private showPointsChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, show_points: target.checked };
    this.configChanged();
  }

  private showCompletedChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, show_completed: target.checked };
    this.configChanged();
  }

  private showOverdueOnlyChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, show_overdue_only: target.checked };
    this.configChanged();
  }

  private configChanged(): void {
    const event = new CustomEvent("config-changed", {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option > label {
        font-weight: 500;
        font-size: 14px;
      }

      .option input[type="text"],
      .option select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .option select {
        width: 100%;
        cursor: pointer;
      }

      .option input[type="checkbox"] {
        margin-right: 8px;
      }

      .option label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .hint {
        color: var(--secondary-text-color);
        font-size: 13px;
        margin: 4px 0 0 0;
        line-height: 1.4;
      }

      .info {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        font-size: 14px;
      }

      .info ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-color);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .info strong {
        display: block;
        margin-bottom: 4px;
      }

      .info p {
        margin: 4px 0;
        line-height: 1.4;
      }

      .info ul {
        margin: 8px 0;
        padding-left: 20px;
      }

      .info li {
        margin: 4px 0;
        line-height: 1.4;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 14px;
      }

      .warning ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
      }

      .warning strong {
        display: block;
        margin-bottom: 4px;
      }

      .warning p {
        margin: 4px 0;
      }

      .warning a {
        color: var(--text-primary-color, white);
        text-decoration: underline;
      }
    `;
  }
}
