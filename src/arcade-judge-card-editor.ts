import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { ChoreboardArcadeJudgeCardConfig } from "./common";

@customElement("choreboard-arcade-judge-card-editor")
export class ChoreboardArcadeJudgeCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardArcadeJudgeCardConfig;

  public setConfig(config: ChoreboardArcadeJudgeCardConfig): void {
    this.config = config;
  }

  private entityChanged(ev: Event): void {
    const target = ev.target as HTMLSelectElement;
    this.config = { ...this.config, entity: target.value };
    this.configChanged();
  }

  private titleChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    this.config = { ...this.config, title: target.value };
    this.configChanged();
  }

  private showHeaderChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    this.config = { ...this.config, show_header: target.checked };
    this.configChanged();
  }

  private autoRefreshChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    this.config = { ...this.config, auto_refresh: target.checked };
    this.configChanged();
  }

  private refreshIntervalChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (value > 0) {
      this.config = { ...this.config, refresh_interval: value };
      this.configChanged();
    }
  }

  private configChanged(): void {
    const event = new CustomEvent("config-changed", {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private getAvailableEntities(): string[] {
    if (!this.hass) {
      return [];
    }

    const entities: string[] = [];

    // Find pending arcade sensor
    for (const entityId of Object.keys(this.hass.states)) {
      if (
        entityId.startsWith("sensor.choreboard_pending_arcade") ||
        entityId === "sensor.choreboard_pending_arcade"
      ) {
        entities.push(entityId);
      }
    }

    return entities;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const entities = this.getAvailableEntities();

    return html`
      <div class="card-config">
        <div class="option">
          <label for="entity">Pending Arcade Sensor (Required)</label>
          <select id="entity" @change=${this.entityChanged}>
            <option value="" ?selected=${!this.config.entity}>
              Select a sensor...
            </option>
            ${entities.map(
              (entity) => html`
                <option value="${entity}" ?selected=${this.config.entity === entity}>
                  ${entity}
                </option>
              `,
            )}
          </select>
          ${entities.length === 0
            ? html`
                <div class="warning">
                  <ha-icon icon="mdi:alert"></ha-icon>
                  <span>
                    No pending arcade sensor found. Make sure the ChoreBoard
                    integration is installed and configured.
                  </span>
                </div>
              `
            : ""}
        </div>

        <div class="option">
          <label for="title">Card Title (Optional)</label>
          <input
            type="text"
            id="title"
            .value=${this.config.title || ""}
            @input=${this.titleChanged}
            placeholder="Arcade Judge Panel"
          />
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input
              type="checkbox"
              ?checked=${this.config.show_header !== false}
              @change=${this.showHeaderChanged}
            />
            <span>Show card header</span>
          </label>
        </div>

        <div class="option">
          <label class="checkbox-label">
            <input
              type="checkbox"
              ?checked=${this.config.auto_refresh !== false}
              @change=${this.autoRefreshChanged}
            />
            <span>Auto-refresh pending sessions</span>
          </label>
        </div>

        ${this.config.auto_refresh !== false
          ? html`
              <div class="option">
                <label for="refresh_interval">Refresh Interval (seconds)</label>
                <input
                  type="number"
                  id="refresh_interval"
                  min="10"
                  max="300"
                  .value=${(this.config.refresh_interval || 30).toString()}
                  @input=${this.refreshIntervalChanged}
                />
              </div>
            `
          : ""}
      </div>
    `;
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

      .option label {
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .option select,
      .option input[type="text"],
      .option input[type="number"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: 14px;
      }

      .option select:focus,
      .option input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .checkbox-label span {
        font-weight: normal;
      }

      .warning {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 13px;
      }

      .warning ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
      }
    `;
  }
}
