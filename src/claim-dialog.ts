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

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._confirm}
          .disabled=${!this.selectedUserId}
        >
          Claim
        </mwc-button>
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
      .dialog-content {
        padding: 16px 24px;
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
    `;
  }
}
