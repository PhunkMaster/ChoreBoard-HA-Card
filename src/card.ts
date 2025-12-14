import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { ChoreboardCardConfig, CARD_NAME, CARD_VERSION } from './common';

@customElement('choreboard-card')
export class ChoreboardCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  public setConfig(config: ChoreboardCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this.config = {
      show_header: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getStubConfig(): ChoreboardCardConfig {
    return {
      type: 'custom:choreboard-card',
      title: 'Chores',
      show_header: true,
      chores: [
        {
          name: 'Take out trash',
          assignee: 'John',
          completed: false,
        },
        {
          name: 'Wash dishes',
          assignee: 'Jane',
          completed: false,
        },
      ],
    };
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const title = this.config.title || 'Chores';
    const chores = this.config.chores || [];

    return html`
      <ha-card>
        ${this.config.show_header
          ? html`
              <div class="card-header">
                <div class="name">${title}</div>
              </div>
            `
          : ''}
        <div class="card-content">
          ${chores.length === 0
            ? html`<div class="no-chores">No chores configured</div>`
            : html`
                <div class="chore-list">
                  ${chores.map(
                    (chore) => html`
                      <div class="chore-item ${chore.completed ? 'completed' : ''}">
                        <div class="chore-checkbox">
                          <input
                            type="checkbox"
                            ?checked=${chore.completed}
                            @change=${() => this.toggleChore(chore)}
                          />
                        </div>
                        <div class="chore-details">
                          <div class="chore-name">${chore.name}</div>
                          ${chore.assignee
                            ? html`<div class="chore-assignee">Assigned to: ${chore.assignee}</div>`
                            : ''}
                          ${chore.due_date
                            ? html`<div class="chore-due">Due: ${chore.due_date}</div>`
                            : ''}
                        </div>
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
      </ha-card>
    `;
  }

  private toggleChore(chore: any): void {
    chore.completed = !chore.completed;
    this.requestUpdate();
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

      .card-content {
        padding: 0;
      }

      .no-chores {
        text-align: center;
        color: var(--secondary-text-color);
        padding: 20px;
      }

      .chore-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chore-item {
        display: flex;
        align-items: flex-start;
        padding: 12px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .chore-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .chore-item.completed {
        opacity: 0.6;
      }

      .chore-item.completed .chore-name {
        text-decoration: line-through;
      }

      .chore-checkbox {
        margin-right: 12px;
        margin-top: 2px;
      }

      .chore-checkbox input[type='checkbox'] {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .chore-details {
        flex: 1;
      }

      .chore-name {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .chore-assignee,
      .chore-due {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
    `;
  }
}

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  'color: white; background: #039be5; font-weight: 700;',
  'color: #039be5; background: white; font-weight: 700;'
);
