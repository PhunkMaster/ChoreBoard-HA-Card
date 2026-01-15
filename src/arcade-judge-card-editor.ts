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
    const target = ev.target as HTMLSelectElement | HTMLInputElement;
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
      console.warn("ChoreBoard Arcade Judge Editor: hass not available yet");
      return [];
    }

    const entities: string[] = [];

    // Find pending arcade sensor - try multiple naming patterns
    for (const entityId of Object.keys(this.hass.states)) {
      if (
        entityId === "sensor.pending_arcade_sessions" ||
        entityId === "sensor.choreboard_pending_arcade" ||
        entityId.startsWith("sensor.choreboard_pending_arcade") ||
        entityId.includes("pending_arcade")
      ) {
        console.log("ChoreBoard Arcade Judge Editor: Found pending arcade sensor:", entityId);
        entities.push(entityId);
      }
    }

    if (entities.length === 0) {
      console.warn("ChoreBoard Arcade Judge Editor: No pending arcade sensors found in", Object.keys(this.hass.states).length, "entities");
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
          ${entities.length > 0
            ? html`
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
              `
            : html`
                <input
                  type="text"
                  id="entity"
                  .value=${this.config.entity || ""}
                  @input=${this.entityChanged}
                  placeholder="sensor.pending_arcade_sessions"
                />
                <div class="info">
                  <ha-icon icon="mdi:information"></ha-icon>
                  <span>
                    Enter the entity ID manually. The sensor should be named
                    <code>sensor.pending_arcade_sessions</code> if the ChoreBoard
                    integration is properly installed.
                  </span>
                </div>
              `}
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

      .info {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
        background: var(--info-color, #2196f3);
        color: var(--text-primary-color, white);
        border-radius: 4px;
        font-size: 13px;
      }

      .info ha-icon {
        --mdc-icon-size: 20px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .info code {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
        font-size: 12px;
      }
    `;
  }
}
