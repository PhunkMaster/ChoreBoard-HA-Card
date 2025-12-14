import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { ChoreboardCardConfig } from './common';

@customElement('choreboard-card-editor')
export class ChoreboardCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  public setConfig(config: ChoreboardCardConfig): void {
    this.config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
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
          <label for="show_header">
            <input
              id="show_header"
              type="checkbox"
              ?checked=${this.config.show_header !== false}
              @change=${this.showHeaderChanged}
            />
            Show Header
          </label>
        </div>

        <div class="option">
          <label for="entity">Entity (optional):</label>
          <input
            id="entity"
            type="text"
            .value=${this.config.entity || ''}
            @input=${this.entityChanged}
            placeholder="sensor.choreboard"
          />
        </div>

        <div class="info">
          <p>Configure chores in the YAML editor for more advanced options.</p>
        </div>
      </div>
    `;
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

  private entityChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    if (!this.config || !this.hass) {
      return;
    }
    this.config = { ...this.config, entity: target.value };
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
        gap: 4px;
      }

      .option label {
        font-weight: 500;
      }

      .option input[type='text'] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 14px;
      }

      .option input[type='checkbox'] {
        margin-right: 8px;
      }

      .info {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .info p {
        margin: 0;
      }
    `;
  }
}
