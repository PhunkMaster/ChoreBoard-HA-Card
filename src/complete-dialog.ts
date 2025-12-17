import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { User, Chore } from "./common";

@customElement("complete-chore-dialog")
export class CompleteChoreDialog extends LitElement {
  @property({ type: Array }) public users: User[] = [];
  @property({ type: Object }) public chore!: Chore;

  @state() private selectedUserId: number | null = null;
  @state() private selectedHelperIds: number[] = [];

  protected render(): TemplateResult {
    const availableHelpers = this.users.filter(
      (user) => user.id !== this.selectedUserId,
    );

    return html`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Complete: ${this.chore.name}</div>

        <div class="dialog-content">
          <!-- Who completed section -->
          <div class="section">
            <h3>Who completed this chore? <span class="required">*</span></h3>
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

          <!-- Helpers section -->
          ${this.selectedUserId && availableHelpers.length > 0
            ? html`
                <div class="section">
                  <h3>Who helped? <span class="optional">(optional)</span></h3>
                  <div class="helper-list">
                    ${availableHelpers.map(
                      (user) => html`
                        <label class="helper-option">
                          <ha-checkbox
                            .checked=${this.selectedHelperIds.includes(user.id)}
                            @change=${(e: Event) =>
                              this._toggleHelper(
                                user.id,
                                (e.target as HTMLInputElement).checked,
                              )}
                          ></ha-checkbox>
                          <span>${user.display_name}</span>
                        </label>
                      `,
                    )}
                  </div>
                </div>
              `
            : ""}
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
            aria-label="Mark chore as complete"
          >
            <ha-icon icon="mdi:check"></ha-icon>
            <span>Complete</span>
          </button>
        </div>
      </ha-dialog>
    `;
  }

  private _selectUser(userId: number): void {
    // If selecting a different user, remove them from helpers if they were selected
    if (this.selectedUserId !== userId) {
      this.selectedHelperIds = this.selectedHelperIds.filter(
        (id) => id !== userId,
      );
    }
    this.selectedUserId = userId;
  }

  private _toggleHelper(userId: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedHelperIds.includes(userId)) {
        this.selectedHelperIds = [...this.selectedHelperIds, userId];
      }
    } else {
      this.selectedHelperIds = this.selectedHelperIds.filter(
        (id) => id !== userId,
      );
    }
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
          helperIds: this.selectedHelperIds,
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
        max-height: 60vh;
        overflow-y: auto;
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

      .required {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .optional {
        color: var(--secondary-text-color);
        font-weight: 400;
        font-size: 14px;
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 300px;
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

      .helper-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .helper-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .helper-option:hover {
        background: var(--secondary-background-color);
        border-color: var(--primary-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .helper-option span {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      ha-checkbox {
        --mdc-checkbox-size: 24px;
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
