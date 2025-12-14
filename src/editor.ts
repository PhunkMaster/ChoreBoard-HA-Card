import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { ChoreboardCardConfig } from './common';

@customElement('choreboard-card-editor')
export class ChoreboardCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  public setConfig(config: ChoreboardCardConfig): void {
    this.config = {
      entities: [],
      ...config,
    };
  }

  private getChoreboardEntities(): string[] {
    if (!this.hass) return [];

    return Object.keys(this.hass.states).filter((entityId) =>
      entityId.startsWith('sensor.choreboard_')
    );
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const choreboardEntities = this.getChoreboardEntities();
    const selectedEntities = this.config.entities || [];

    return html`
      <div class="card-config">
        ${choreboardEntities.length === 0
          ? html`
              <div class="warning">
                <ha-icon icon="mdi:alert"></ha-icon>
                <div>
                  <strong>No ChoreBoard entities found</strong>
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
          : ''}

        <div class="option">
          <label for="title">Title:</label>
          <input
            id="title"
            type="text"
            .value=${this.config.title || ''}
            @input=${this.titleChanged}
            placeholder="Chores"
          />
        </div>

        <div class="option">
          <label>Entities:</label>
          <div class="entity-list">
            ${choreboardEntities.length > 0
              ? choreboardEntities.map(
                  (entityId) => html`
                    <label class="entity-item">
                      <input
                        type="checkbox"
                        .checked=${selectedEntities.includes(entityId)}
                        @change=${() => this.toggleEntity(entityId)}
                      />
                      <span>${this.getEntityDisplayName(entityId)}</span>
                      <span class="entity-id">${entityId}</span>
                    </label>
                  `
                )
              : html`<p class="hint">No ChoreBoard entities available</p>`}
          </div>
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
              ?checked=${this.config.show_description === true}
              @change=${this.showDescriptionChanged}
            />
            Show Description
          </label>
        </div>

        <div class="info">
          <ha-icon icon="mdi:information"></ha-icon>
          <div>
            <strong>About ChoreBoard Card</strong>
            <p>
              This card displays chores from the ChoreBoard integration. Select which chore entities
              you want to display above.
            </p>
            <p>
              You can mark chores as complete directly from the card using the "Complete" button.
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
    const parts = entityId.split('.');
    if (parts.length === 2 && parts[1].startsWith('choreboard_')) {
      const name = parts[1].replace('choreboard_', '').replace(/_/g, ' ');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return entityId;
  }

  private toggleEntity(entityId: string): void {
    if (!this.config) return;

    const entities = this.config.entities || [];
    const index = entities.indexOf(entityId);

    if (index >= 0) {
      // Remove entity
      this.config = {
        ...this.config,
        entities: entities.filter((e) => e !== entityId),
      };
    } else {
      // Add entity
      this.config = {
        ...this.config,
        entities: [...entities, entityId],
      };
    }

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

  private showDescriptionChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, show_description: target.checked };
    this.configChanged();
  }

  private configChanged(): void {
    const event = new CustomEvent('config-changed', {
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

      .option input[type='text'] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .option input[type='checkbox'] {
        margin-right: 8px;
      }

      .option label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .entity-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 300px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
      }

      .entity-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 4px;
        transition: background 0.2s;
      }

      .entity-item:hover {
        background: var(--secondary-background-color);
      }

      .entity-item input[type='checkbox'] {
        margin: 0;
      }

      .entity-item span:first-of-type {
        flex: 1;
        font-weight: 500;
      }

      .entity-id {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-family: monospace;
      }

      .hint {
        color: var(--secondary-text-color);
        font-size: 14px;
        margin: 8px;
        text-align: center;
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
