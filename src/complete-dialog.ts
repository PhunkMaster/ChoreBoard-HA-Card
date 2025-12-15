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

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._confirm}
          .disabled=${!this.selectedUserId}
        >
          Complete
        </mwc-button>
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
      .dialog-content {
        padding: 16px 24px;
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
        margin: 0 0 12px 0;
        font-size: 14px;
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
        font-size: 12px;
      }

      .user-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .user-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .user-option:hover {
        border-color: var(--primary-color);
        background: var(--secondary-background-color);
      }

      .user-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .user-option ha-icon {
        --mdc-icon-size: 24px;
      }

      .user-option .check-icon {
        margin-left: auto;
        --mdc-icon-size: 20px;
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
        padding: 8px 12px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .helper-option:hover {
        background: var(--secondary-background-color);
      }

      .helper-option span {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      ha-checkbox {
        --mdc-checkbox-size: 20px;
      }
    `;
  }
}
