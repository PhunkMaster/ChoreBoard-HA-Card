import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { User, Chore } from "./common";

@customElement("claim-chore-dialog")
export class ClaimChoreDialog extends LitElement {
  @property({ type: Array }) public users: User[] = [];
  @property({ type: Object }) public chore!: Chore;

  @state() private selectedUserId: number | null = null;

  protected render(): TemplateResult {
    return html`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Claim: ${this.chore.name}</div>

        <div class="dialog-content">
          <div class="section">
            <h3>Who is claiming this chore?</h3>
            <div class="user-list">
              ${this.users.map(
                (user) => html`
                  <div
                    class="user-option ${this.selectedUserId === user.id
                      ? "selected"
                      : ""}"
                    @click=${() => this._selectUser(user.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${user.display_name}</span>
                    ${this.selectedUserId === user.id
                      ? html`<ha-icon
                          icon="mdi:check"
                          class="check-icon"
                        ></ha-icon>`
                      : ""}
                  </div>
                `,
              )}
            </div>
          </div>
        </div>

        <div slot="secondaryAction">
          <button
            class="dialog-button dialog-button--text"
            @click=${this._cancel}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
        <div slot="primaryAction">
          <button
            class="dialog-button dialog-button--primary"
            @click=${this._confirm}
            ?disabled=${!this.selectedUserId}
            aria-label="Claim this chore"
          >
            <ha-icon icon="mdi:check"></ha-icon>
            <span>Claim</span>
          </button>
        </div>
      </ha-dialog>
    `;
  }

  private _selectUser(userId: number): void {
    this.selectedUserId = userId;
  }

  private _handleClosed(): void {
    this._cancel();
  }

  private _cancel(): void {
    this.dispatchEvent(new CustomEvent("dialog-closed"));
  }

  private _confirm(): void {
    if (!this.selectedUserId) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("dialog-confirmed", {
        detail: {
          userId: this.selectedUserId,
        },
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-dialog {
        --dialog-content-padding: 24px;
        --dialog-border-radius: 12px;
      }

      .dialog-content {
        min-width: 300px;
        max-width: 500px;
      }

      .section {
        margin-bottom: 24px;
      }

      .section:last-child {
        margin-bottom: 0;
      }

      .section h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        position: relative;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 2px 8px rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
      }

      .user-option.selected:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--rgb-primary-color, 3, 169, 244), 0.4);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 24px;
        animation: checkmark 0.2s ease-in-out;
      }

      @keyframes checkmark {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }

      .user-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
      }

      /* Dialog Buttons */
      .dialog-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 24px;
        min-height: 40px;
        min-width: 80px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.15s ease;
        border: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .dialog-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .dialog-button ha-icon {
        --mdc-icon-size: 18px;
      }

      /* Primary Dialog Button */
      .dialog-button--primary {
        background: var(--primary-color);
        color: var(--text-primary-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:hover:not(:disabled) {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .dialog-button--primary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      }

      .dialog-button--primary:disabled {
        background: var(--disabled-text-color);
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Text Dialog Button (Cancel) */
      .dialog-button--text {
        background: transparent;
        color: var(--primary-color);
        box-shadow: none;
      }

      .dialog-button--text:hover {
        background: var(--secondary-background-color);
      }

      .dialog-button--text:active {
        background: var(--divider-color);
      }
    `;
  }
}
