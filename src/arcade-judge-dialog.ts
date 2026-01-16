import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { User, ArcadeSession } from "./common";

@customElement("arcade-judge-dialog")
export class ArcadeJudgeDialog extends LitElement {
  @property({ type: Array }) public users: User[] = [];
  @property({ type: Object }) public session!: ArcadeSession;

  @state() private selectedJudgeId: number | null = null;
  @state() private notes: string = "";
  @state() private action: "approve" | "deny" | null = null;

  protected render(): TemplateResult {
    const elapsedTime = this.formatTime(this.session.elapsed_seconds);

    return html`
      <ha-dialog open @closed=${this._handleClosed}>
        <div slot="heading">Judge Arcade Session</div>

        <div class="dialog-content">
          <!-- Session details -->
          <div class="session-info">
            <h3>Session Details</h3>
            <div class="info-row">
              <span class="label">Chore:</span>
              <span class="value">${this.session.chore_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Completed by:</span>
              <span class="value">${this.session.user_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value time">${elapsedTime}</span>
            </div>
          </div>

          <!-- Judge selection -->
          <div class="section">
            <h3>Who is judging? <span class="required">*</span></h3>
            <div class="user-list">
              ${this.users.map(
                (user) => html`
                  <div
                    class="user-option ${this.selectedJudgeId === user.id
                      ? "selected"
                      : ""}"
                    @click=${() => this._selectJudge(user.id)}
                  >
                    <ha-icon icon="mdi:account"></ha-icon>
                    <span>${user.display_name}</span>
                    ${this.selectedJudgeId === user.id
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

          <!-- Notes section -->
          <div class="section">
            <h3>Judge Notes <span class="optional">(optional)</span></h3>
            <textarea
              class="notes-textarea"
              placeholder="Add notes about the completion quality, issues found, etc."
              .value=${this.notes}
              @input=${this._notesChanged}
              rows="4"
            ></textarea>
          </div>

          <!-- Action buttons -->
          <div class="action-section">
            <mwc-button
              class="approve-button"
              @click=${() => this._setAction("approve")}
              ?disabled=${!this.selectedJudgeId}
              raised
            >
              <ha-icon icon="mdi:check-circle"></ha-icon>
              Approve
            </mwc-button>
            <mwc-button
              class="deny-button"
              @click=${() => this._setAction("deny")}
              ?disabled=${!this.selectedJudgeId}
              raised
            >
              <ha-icon icon="mdi:close-circle"></ha-icon>
              Deny
            </mwc-button>
          </div>
        </div>

        <mwc-button slot="secondaryAction" @click=${this._cancel}>
          Cancel
        </mwc-button>
      </ha-dialog>
    `;
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  private _selectJudge(userId: number): void {
    this.selectedJudgeId = userId;
  }

  private _notesChanged(e: Event): void {
    this.notes = (e.target as HTMLTextAreaElement).value;
  }

  private _setAction(action: "approve" | "deny"): void {
    this.action = action;
    this._confirm();
  }

  private _handleClosed(): void {
    this._cancel();
  }

  private _cancel(): void {
    this.dispatchEvent(new CustomEvent("dialog-closed"));
  }

  private _confirm(): void {
    if (!this.action) {
      return;
    }

    const eventName =
      this.action === "approve" ? "judge-approved" : "judge-denied";

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          judgeId: this.selectedJudgeId,
          notes: this.notes || undefined,
        },
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return css`
      .dialog-content {
        padding: 16px 24px;
        max-height: 70vh;
        overflow-y: auto;
      }

      .session-info {
        background: var(--secondary-background-color, #f5f5f5);
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .session-info h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .info-row:last-child {
        border-bottom: none;
      }

      .info-row .label {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .info-row .value {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 600;
      }

      .info-row .value.time {
        font-family: monospace;
        font-size: 16px;
        color: var(--success-color, #4caf50);
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

      .optional {
        color: var(--secondary-text-color);
        font-weight: 400;
        font-size: 12px;
      }

      .required {
        color: var(--error-color, #f44336);
        font-weight: 700;
        margin-left: 4px;
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

      .notes-textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        resize: vertical;
        min-height: 80px;
      }

      .notes-textarea:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .notes-textarea::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .action-section {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }

      .approve-button {
        flex: 1;
        --mdc-theme-primary: var(--success-color, #4caf50);
      }

      .approve-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }

      .deny-button {
        flex: 1;
        --mdc-theme-primary: var(--error-color, #f44336);
      }

      .deny-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }
    `;
  }
}
