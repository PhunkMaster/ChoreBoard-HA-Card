import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import {
  ChoreboardArcadeJudgeCardConfig,
  ArcadeSession,
  User,
  CARD_NAME,
  CARD_VERSION,
} from "./common";

@customElement("choreboard-arcade-judge-card")
export class ChoreboardArcadeJudgeCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardArcadeJudgeCardConfig;

  public setConfig(config: ChoreboardArcadeJudgeCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    if (!config.entity) {
      throw new Error(
        'You must specify an "entity" (e.g., sensor.pending_arcade_sessions)',
      );
    }

    this.config = {
      show_header: true,
      auto_refresh: true,
      refresh_interval: 30,
      judge_mode: "ask",
      ...config,
    };
  }

  public getCardSize(): number {
    const sessions = this.getSessions();
    return Math.max(2, Math.ceil(sessions.length / 2) + 2);
  }

  public static getStubConfig(): ChoreboardArcadeJudgeCardConfig {
    return {
      type: "custom:choreboard-arcade-judge-card",
      title: "Arcade Judge Panel",
      entity: "sensor.pending_arcade_sessions",
      show_header: true,
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("choreboard-arcade-judge-card-editor");
  }

  private getSessions(): ArcadeSession[] {
    if (!this.hass || !this.config.entity) {
      return [];
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      console.warn(
        `ChoreBoard Pending Arcade entity not found: ${this.config.entity}. ` +
        `Make sure the ChoreBoard integration is installed and the pending arcade sensor exists.`,
      );
      return [];
    }

    const attributes = stateObj.attributes as {
      sessions?: ArcadeSession[];
      count?: number;
    };
    return attributes.sessions || [];
  }

  private getUsers(): User[] {
    if (!this.hass) {
      return [];
    }

    // Try to get users from any ChoreBoard entity attributes
    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith("sensor.choreboard_") || entityId.includes("pending_arcade")) {
        const state = this.hass.states[entityId];
        if (state.attributes.users && Array.isArray(state.attributes.users)) {
          console.log(`Arcade Judge: Found users in ${entityId}:`, state.attributes.users);
          return state.attributes.users as User[];
        }
      }
    }

    console.warn("Arcade Judge: No users found in any ChoreBoard sensor attributes");
    return [];
  }

  private getCurrentJudgeId(): number | null {
    if (!this.hass || !this.hass.user) {
      return null;
    }

    // Get current Home Assistant user
    const haUser = this.hass.user;
    const haUsername = haUser.name?.toLowerCase();

    if (!haUsername) {
      return null;
    }

    // Find matching ChoreBoard user by username
    const users = this.getUsers();
    const choregboardUser = users.find(
      (u) => u.username.toLowerCase() === haUsername,
    );

    if (choregboardUser) {
      console.log(
        `Arcade Judge: Mapped HA user "${haUsername}" to ChoreBoard user ID ${choregboardUser.id}`,
      );
      return choregboardUser.id;
    }

    console.warn(
      `Arcade Judge: Could not find ChoreBoard user matching HA username "${haUsername}"`,
    );
    return null;
  }

  private async showJudgeDialog(session: ArcadeSession): Promise<void> {
    if (!this.hass) return;

    const users = this.getUsers();
    console.log("Arcade Judge: Retrieved users for dialog:", users);

    // Check if users are available
    if (users.length === 0) {
      console.error("Arcade Judge: No users found for judge selection");
      this.showToast(
        "No users available. Make sure ChoreBoard integration is properly configured.",
        true,
      );
      return;
    }

    // In auto mode, use the logged-in HA user without showing dialog
    if (this.config.judge_mode === "auto") {
      const judgeId = this.getCurrentJudgeId();
      if (!judgeId) {
        this.showToast(
          "Cannot determine current user. Please select a judge manually.",
          true,
        );
        // Fall through to show dialog
      } else {
        // Show quick action selection without user selector
        await this.showQuickJudgeDialog(session, judgeId);
        return;
      }
    }

    // Ask mode - show full dialog with user selector
    // Dynamically import and create dialog
    await import("./arcade-judge-dialog");
    const dialog = document.createElement(
      "arcade-judge-dialog",
    ) as HTMLElement & {
      users: User[];
      session: ArcadeSession;
    };
    dialog.users = users;
    dialog.session = session;
    console.log("Arcade Judge: Created dialog with", users.length, "users");

    dialog.addEventListener("judge-approved", async (e: Event) => {
      const customEvent = e as CustomEvent;
      const judgeId = customEvent.detail.judgeId;
      const notes = customEvent.detail.notes;

      try {
        const serviceData: Record<string, any> = {
          session_id: session.id,
        };
        if (judgeId) {
          serviceData.judge_id = judgeId;
        }
        if (notes) {
          serviceData.notes = notes;
        }

        await this.hass.callService(
          "choreboard",
          "approve_arcade",
          serviceData,
        );
        this.showToast("Arcade session approved - points awarded!");
      } catch (error) {
        console.error("Error approving arcade session:", error);
        this.showToast("Failed to approve arcade session", true);
      } finally {
        dialog.remove();
      }
    });

    dialog.addEventListener("judge-denied", async (e: Event) => {
      const customEvent = e as CustomEvent;
      const judgeId = customEvent.detail.judgeId;
      const notes = customEvent.detail.notes;

      try {
        const serviceData: Record<string, any> = {
          session_id: session.id,
        };
        if (judgeId) {
          serviceData.judge_id = judgeId;
        }
        if (notes) {
          serviceData.notes = notes;
        }

        await this.hass.callService("choreboard", "deny_arcade", serviceData);
        this.showToast("Arcade session denied - user can continue");
      } catch (error) {
        console.error("Error denying arcade session:", error);
        this.showToast("Failed to deny arcade session", true);
      } finally {
        dialog.remove();
      }
    });

    dialog.addEventListener("dialog-closed", () => {
      dialog.remove();
    });

    document.body.appendChild(dialog);
  }

  private async showQuickJudgeDialog(
    session: ArcadeSession,
    judgeId: number,
  ): Promise<void> {
    if (!this.hass) return;

    // Get judge user info for display
    const users = this.getUsers();
    const judge = users.find((u) => u.id === judgeId);
    const judgeName = judge
      ? judge.display_name || judge.username
      : "Current User";

    // Create simple confirmation dialog
    const action = confirm(
      `Judge arcade session for "${session.chore_name}" by ${session.user_display_name || session.user_name}?\n\n` +
        `Time: ${this.formatTime(session.elapsed_seconds)}\n` +
        `Judge: ${judgeName}\n\n` +
        `Click OK to APPROVE or Cancel to DENY.`,
    );

    try {
      const serviceData: Record<string, any> = {
        session_id: session.id,
        judge_id: judgeId,
      };

      if (action) {
        // Approved
        await this.hass.callService(
          "choreboard",
          "approve_arcade",
          serviceData,
        );
        this.showToast("Arcade session approved - points awarded!");
      } else {
        // Denied
        await this.hass.callService("choreboard", "deny_arcade", serviceData);
        this.showToast("Arcade session denied - user can continue");
      }
    } catch (error) {
      console.error("Error judging arcade session:", error);
      this.showToast("Failed to judge arcade session", true);
    }
  }

  private showToast(message: string, isError = false): void {
    const event = new CustomEvent("hass-notification", {
      detail: {
        message,
        duration: isError ? 5000 : 3000,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
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

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const title = this.config.title || "Arcade Judge Panel";
    const sessions = this.getSessions();

    if (sessions.length === 0) {
      return html`
        <ha-card>
          ${this.config.show_header
            ? html`
                <div class="card-header">
                  <div class="name">${title}</div>
                  <div class="badge success">All clear!</div>
                </div>
              `
            : ""}
          <div class="card-content">
            <div class="empty-state">
              <ha-icon icon="mdi:check-circle"></ha-icon>
              <div>
                <strong>No pending arcade sessions</strong>
                <p>All arcade sessions have been judged or completed.</p>
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this.config.show_header
          ? html`
              <div class="card-header">
                <div class="name">${title}</div>
                <div class="badge">${sessions.length} pending</div>
              </div>
            `
          : ""}
        <div class="card-content">
          <div class="session-list">
            ${sessions.map(
              (session) => html`
                <div class="session-item">
                  <div class="session-icon">
                    <ha-icon icon="mdi:gavel"></ha-icon>
                  </div>
                  <div class="session-details">
                    <div class="session-header">
                      <div class="session-chore">${session.chore_name}</div>
                      <div class="session-time">
                        ${this.formatTime(session.elapsed_seconds)}
                      </div>
                    </div>
                    <div class="session-meta">
                      <span class="meta-item">
                        <ha-icon icon="mdi:account"></ha-icon>
                        ${session.user_display_name || session.user_name}
                      </span>
                      <span class="meta-item status">
                        <ha-icon icon="mdi:clock-alert"></ha-icon>
                        Awaiting Approval
                      </span>
                    </div>
                  </div>
                  <div class="session-action">
                    <mwc-button
                      class="judge-button"
                      @click=${() => this.showJudgeDialog(session)}
                      raised
                    >
                      <ha-icon icon="mdi:gavel"></ha-icon>
                      Judge
                    </mwc-button>
                  </div>
                </div>
              `,
            )}
          </div>
        </div>
      </ha-card>
    `;
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

      .badge {
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .badge.success {
        background: var(--success-color, #4caf50);
      }

      .card-content {
        padding: 0;
      }

      .empty-state {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--success-color, #4caf50);
        color: var(--text-primary-color, white);
        border-radius: 8px;
      }

      .empty-state ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .empty-state strong {
        display: block;
        margin-bottom: 4px;
      }

      .empty-state p {
        margin: 4px 0 0 0;
        font-size: 14px;
      }

      .session-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .session-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--warning-color, #ff9800);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .session-item:hover {
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        transform: translateY(-2px);
      }

      .session-icon {
        flex-shrink: 0;
      }

      .session-icon ha-icon {
        --mdc-icon-size: 28px;
        color: var(--warning-color, #ff9800);
      }

      .session-details {
        flex: 1;
        min-width: 0;
      }

      .session-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .session-chore {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .session-time {
        font-family: monospace;
        font-size: 18px;
        font-weight: 700;
        color: var(--success-color, #4caf50);
        white-space: nowrap;
      }

      .session-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .meta-item ha-icon {
        --mdc-icon-size: 16px;
      }

      .meta-item.status {
        color: var(--warning-color, #ff9800);
        font-weight: 600;
      }

      .session-action {
        flex-shrink: 0;
      }

      .judge-button {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .judge-button ha-icon {
        --mdc-icon-size: 20px;
        margin-right: 8px;
      }
    `;
  }
}

console.info(
  `%c ${CARD_NAME} - Arcade Judge %c ${CARD_VERSION} `,
  "color: white; background: #ff9800; font-weight: 700;",
  "color: #ff9800; background: white; font-weight: 700;",
);
