import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import {
  ChoreboardCardConfig,
  Chore,
  MyChoresSensorAttributes,
  User,
  CARD_NAME,
  CARD_VERSION,
  ArcadeSession,
  ChoreLeaderboard,
} from "./common";

@customElement("choreboard-card")
export class ChoreboardCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ChoreboardCardConfig;

  // Arcade mode state
  @state() private arcadeSession: ArcadeSession | null = null;
  @state() private expandedLeaderboards: Set<number> = new Set();
  private arcadeTimerInterval: number | null = null;

  public setConfig(config: ChoreboardCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    if (!config.entity) {
      throw new Error(
        'You must specify an "entity" (e.g., sensor.choreboard_my_chores_ash). Please configure the ChoreBoard integration first.',
      );
    }

    this.config = {
      show_header: true,
      show_points: true,
      show_completed: true,
      show_overdue_only: false,
      show_undo: false,
      show_user_points: false,
      show_arcade: true,
      show_arcade_leaderboards: true,
      show_judge_controls: true,
      arcade_poll_interval: 30,
      ...config,
    };
  }

  public getCardSize(): number {
    const chores = this.getChores();
    return Math.max(2, Math.ceil(chores.length / 2) + 1);
  }

  public static getStubConfig(): ChoreboardCardConfig {
    return {
      type: "custom:choreboard-card",
      title: "My Chores",
      entity: "sensor.choreboard_my_chores_ash",
      show_header: true,
      show_points: true,
      show_completed: true,
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("choreboard-card-editor");
  }

  // Lifecycle methods for arcade polling
  connectedCallback(): void {
    super.connectedCallback();
    this.startArcadePolling();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopArcadePolling();
  }

  private startArcadePolling(): void {
    if (!this.config?.show_arcade) {
      return;
    }

    this.stopArcadePolling(); // Clear existing interval
    this.arcadeTimerInterval = window.setInterval(
      () => this.fetchArcadeStatus(),
      (this.config.arcade_poll_interval || 30) * 1000,
    );

    // Fetch immediately on start
    this.fetchArcadeStatus();
  }

  private stopArcadePolling(): void {
    if (this.arcadeTimerInterval !== null) {
      clearInterval(this.arcadeTimerInterval);
      this.arcadeTimerInterval = null;
    }
  }

  private async fetchArcadeStatus(): Promise<void> {
    // This will fetch arcade session status from integration
    // For now, we'll implement a basic version that reads from sensor attributes
    // Later this can be enhanced to call the integration API directly
    if (!this.hass || !this.config.entity) {
      return;
    }

    // First check the configured entity (My Chores sensor)
    const configuredEntity = this.hass.states[this.config.entity];
    if (configuredEntity && configuredEntity.attributes.arcade_session) {
      this.arcadeSession = configuredEntity.attributes.arcade_session as ArcadeSession;
      return;
    }

    // If not found in the configured entity, try other ChoreBoard sensors
    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith("sensor.choreboard_")) {
        const state = this.hass.states[entityId];
        if (state.attributes.arcade_session) {
          this.arcadeSession = state.attributes.arcade_session as ArcadeSession;
          return;
        }
      }
    }

    // No active session found
    this.arcadeSession = null;
  }

  private getChores(): Chore[] {
    if (!this.hass || !this.config.entity) {
      return [];
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      console.warn(`ChoreBoard entity not found: ${this.config.entity}`);
      return [];
    }

    const attributes = stateObj.attributes as MyChoresSensorAttributes;
    const chores = attributes.chores || [];

    return chores.filter((chore) => {
      // Filter out completed chores if show_completed is false
      if (!this.config.show_completed && chore.status === "completed") {
        return false;
      }

      // Filter to only overdue if show_overdue_only is true
      // Treat missing is_overdue as false (not overdue)
      if (this.config.show_overdue_only && !chore.is_overdue) {
        return false;
      }

      return true;
    });
  }

  private async completeChore(chore: Chore): Promise<void> {
    if (!this.hass) return;

    if (chore.status === "completed") {
      this.showToast("This chore is already marked as completed");
      return;
    }

    try {
      await this.hass.callService("choreboard", "mark_complete", {
        instance_id: chore.id,
      });
      this.showToast(`Marked "${chore.name}" as complete`);
    } catch (error) {
      console.error("Error marking chore as complete:", error);
      this.showToast("Failed to mark chore as complete", true);
    }
  }

  private async undoCompletion(chore: Chore): Promise<void> {
    if (!this.hass) return;

    if (chore.status !== "completed") {
      this.showToast("This chore is not marked as completed");
      return;
    }

    // Show confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to undo completion of "${chore.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    try {
      await this.hass.callService("choreboard", "undo_completion", {
        chore_id: chore.id,
      });
      this.showToast(`Undid completion of "${chore.name}"`);
    } catch (error) {
      console.error("Error undoing chore completion:", error);
      this.showToast("Failed to undo completion", true);
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

  private getChoreStateClass(chore: Chore): string {
    if (chore.status === "completed") {
      return "state-completed";
    }
    if (chore.is_overdue) {
      return "state-overdue";
    }
    return "state-pending";
  }

  private getChoreStateIcon(chore: Chore): string {
    if (chore.status === "completed") {
      return "mdi:check-circle";
    }
    if (chore.is_overdue) {
      return "mdi:alert-circle";
    }
    return "mdi:circle-outline";
  }

  private getUsername(): string {
    if (!this.hass || !this.config.entity) {
      return "";
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return "";
    }

    const attributes = stateObj.attributes as MyChoresSensorAttributes;
    return attributes.username || "";
  }

  private getPointsName(): string {
    // Get custom points name from sensor attributes (e.g., "Stars", "Credits")
    // Falls back to "points" if not configured
    if (!this.hass || !this.config.entity) {
      return "points";
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return "points";
    }

    const attributes = stateObj.attributes as MyChoresSensorAttributes;
    return attributes.points_label || "points";
  }

  private getUserPoints(): {
    weekly: number | null;
    allTime: number | null;
  } {
    if (!this.hass || !this.config.entity) {
      return { weekly: null, allTime: null };
    }

    const username = this.getUsername();
    if (!username) {
      return { weekly: null, allTime: null };
    }

    // Try to find user points sensors
    const weeklyEntity = `sensor.${username}_weekly_points`;
    const allTimeEntity = `sensor.${username}_all_time_points`;

    const weeklyState = this.hass.states[weeklyEntity];
    const allTimeState = this.hass.states[allTimeEntity];

    return {
      weekly: weeklyState ? parseFloat(weeklyState.state) : null,
      allTime: allTimeState ? parseFloat(allTimeState.state) : null,
    };
  }

  private isPoolChore(chore: Chore): boolean {
    // Pool chores have status "pool" or the entity is a pool sensor
    return (
      chore.status === "pool" ||
      (this.config.entity.endsWith("_chores") &&
        !this.config.entity.includes("_my_chores"))
    );
  }

  private getUsers(): User[] {
    if (!this.hass) {
      return [];
    }

    // Try to get users from any ChoreBoard entity attributes
    // The coordinator stores users in the entity attributes
    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith("sensor.choreboard_")) {
        const state = this.hass.states[entityId];
        if (state.attributes.users && Array.isArray(state.attributes.users)) {
          return state.attributes.users as User[];
        }
      }
    }

    return [];
  }

  private async claimChore(chore: Chore): Promise<void> {
    if (!this.hass) return;

    const users = this.getUsers();
    if (users.length === 0) {
      this.showToast("Unable to load users list", true);
      return;
    }

    // Dynamically import and create dialog
    await import("./claim-dialog");
    const dialog = document.createElement(
      "claim-chore-dialog",
    ) as HTMLElement & {
      users: User[];
      chore: Chore;
    };
    dialog.users = users;
    dialog.chore = chore;

    dialog.addEventListener("dialog-confirmed", async (e: Event) => {
      const customEvent = e as CustomEvent;
      const userId = customEvent.detail.userId;

      try {
        await this.hass.callService("choreboard", "claim_chore", {
          chore_id: chore.id,
          assign_to_user_id: userId,
        });
        this.showToast(`Chore claimed successfully`);
      } catch (error) {
        console.error("Error claiming chore:", error);
        this.showToast("Failed to claim chore", true);
      } finally {
        dialog.remove();
      }
    });

    dialog.addEventListener("dialog-closed", () => {
      dialog.remove();
    });

    document.body.appendChild(dialog);
  }

  private async completePoolChore(chore: Chore): Promise<void> {
    if (!this.hass) return;

    const users = this.getUsers();
    if (users.length === 0) {
      this.showToast("Unable to load users list", true);
      return;
    }

    // Dynamically import and create dialog
    await import("./complete-dialog");
    const dialog = document.createElement(
      "complete-chore-dialog",
    ) as HTMLElement & {
      users: User[];
      chore: Chore;
    };
    dialog.users = users;
    dialog.chore = chore;

    dialog.addEventListener("dialog-confirmed", async (e: Event) => {
      const customEvent = e as CustomEvent;
      const completedByUserId = customEvent.detail.userId;
      const helperIds = customEvent.detail.helperIds || [];

      try {
        await this.hass.callService("choreboard", "mark_complete", {
          chore_id: chore.id,
          completed_by_user_id: completedByUserId,
          helpers: helperIds,
        });
        this.showToast(`Chore marked as complete`);
      } catch (error) {
        console.error("Error completing chore:", error);
        this.showToast("Failed to complete chore", true);
      } finally {
        dialog.remove();
      }
    });

    dialog.addEventListener("dialog-closed", () => {
      dialog.remove();
    });

    document.body.appendChild(dialog);
  }

  // Arcade mode methods
  private async startArcade(chore: Chore): Promise<void> {
    if (!this.hass) return;

    // Check if there's already an active arcade session
    if (this.arcadeSession && this.arcadeSession.status === "active") {
      this.showToast("An arcade session is already in progress", true);
      return;
    }

    try {
      await this.hass.callService("choreboard", "start_arcade", {
        instance_id: chore.id,
      });
      this.showToast(`Started arcade mode for "${chore.name}"`);
      // Fetch status immediately after starting
      await this.fetchArcadeStatus();
    } catch (error) {
      console.error("Error starting arcade mode:", error);
      this.showToast("Failed to start arcade mode", true);
    }
  }

  private async stopArcade(session: ArcadeSession): Promise<void> {
    if (!this.hass) return;

    try {
      await this.hass.callService("choreboard", "stop_arcade", {
        session_id: session.id,
      });
      this.showToast("Arcade session stopped - awaiting judge approval");
      // Fetch status immediately after stopping
      await this.fetchArcadeStatus();
    } catch (error) {
      console.error("Error stopping arcade mode:", error);
      this.showToast("Failed to stop arcade mode", true);
    }
  }

  private async cancelArcade(session: ArcadeSession): Promise<void> {
    if (!this.hass) return;

    const confirmed = confirm(
      `Are you sure you want to cancel the arcade session for "${session.chore_name}"?`,
    );
    if (!confirmed) {
      return;
    }

    try {
      await this.hass.callService("choreboard", "cancel_arcade", {
        session_id: session.id,
      });
      this.showToast("Arcade session cancelled");
      // Fetch status immediately after cancelling
      await this.fetchArcadeStatus();
    } catch (error) {
      console.error("Error cancelling arcade mode:", error);
      this.showToast("Failed to cancel arcade mode", true);
    }
  }

  private async continueArcade(session: ArcadeSession): Promise<void> {
    if (!this.hass) return;

    try {
      await this.hass.callService("choreboard", "continue_arcade", {
        session_id: session.id,
      });
      this.showToast("Arcade session resumed");
      // Fetch status immediately after continuing
      await this.fetchArcadeStatus();
    } catch (error) {
      console.error("Error continuing arcade mode:", error);
      this.showToast("Failed to continue arcade mode", true);
    }
  }

  private async showJudgeDialog(session: ArcadeSession): Promise<void> {
    if (!this.hass) return;

    const users = this.getUsers();

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
        await this.fetchArcadeStatus();
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
        await this.fetchArcadeStatus();
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

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  private getCurrentElapsedTime(session: ArcadeSession): number {
    // Calculate current elapsed time
    const startTime = new Date(session.start_time).getTime();
    const now = Date.now();
    const elapsedMs = now - startTime;
    return session.elapsed_seconds + Math.floor(elapsedMs / 1000);
  }

  private getLeaderboardForChore(choreId: number): ChoreLeaderboard | null {
    if (!this.hass) return null;

    // Try to get leaderboard from ChoreBoard sensor attributes
    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith("sensor.choreboard_")) {
        const state = this.hass.states[entityId];
        const leaderboards = state.attributes.chore_leaderboards;
        if (Array.isArray(leaderboards)) {
          const leaderboard = leaderboards.find(
            (lb: ChoreLeaderboard) => lb.chore_id === choreId,
          );
          if (leaderboard) {
            return leaderboard;
          }
        }
      }
    }

    // Try dedicated leaderboard sensor for this chore
    const leaderboardEntity = `sensor.arcade_${choreId}`;
    const state = this.hass.states[leaderboardEntity];
    if (state && state.attributes.high_scores) {
      return {
        chore_id: choreId,
        chore_name: state.attributes.chore_name || "",
        high_scores: state.attributes.high_scores,
      };
    }

    return null;
  }

  private toggleLeaderboard(choreId: number): void {
    if (this.expandedLeaderboards.has(choreId)) {
      this.expandedLeaderboards.delete(choreId);
    } else {
      this.expandedLeaderboards.add(choreId);
    }
    this.requestUpdate();
  }

  private getCurrentUserId(): number | null {
    const username = this.getUsername();
    if (!username) return null;

    const users = this.getUsers();
    const user = users.find((u) => u.username === username);
    return user ? user.id : null;
  }

  private renderLeaderboard(chore: Chore): TemplateResult {
    if (!this.config.show_arcade_leaderboards) {
      return html``;
    }

    const leaderboard = this.getLeaderboardForChore(chore.id);
    if (!leaderboard || leaderboard.high_scores.length === 0) {
      return html``;
    }

    const expanded = this.expandedLeaderboards.has(chore.id);
    const displayScores = expanded
      ? leaderboard.high_scores
      : leaderboard.high_scores.slice(0, 3);
    const currentUserId = this.getCurrentUserId();

    return html`
      <div class="leaderboard-section">
        <div
          class="leaderboard-header"
          @click=${() => this.toggleLeaderboard(chore.id)}
        >
          <ha-icon icon="mdi:trophy"></ha-icon>
          <span>High Scores (${leaderboard.high_scores.length})</span>
          <ha-icon
            icon="${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}"
          ></ha-icon>
        </div>
        ${expanded
          ? html`
              <div class="leaderboard-list">
                ${displayScores.map(
                  (score, idx) => html`
                    <div
                      class="leaderboard-entry ${currentUserId === score.user_id
                        ? "current-user"
                        : ""}"
                    >
                      <span class="rank">#${idx + 1}</span>
                      <span class="user-name">${score.display_name}</span>
                      <span class="time"
                        >${this.formatTime(score.time_seconds)}</span
                      >
                    </div>
                  `,
                )}
                ${leaderboard.high_scores.length > 3 && !expanded
                  ? html`
                      <div class="leaderboard-more">
                        +${leaderboard.high_scores.length - 3} more
                      </div>
                    `
                  : ""}
              </div>
            `
          : ""}
      </div>
    `;
  }

  private renderArcadeControls(chore: Chore): TemplateResult {
    if (!this.config.show_arcade) {
      return html``;
    }

    // Check if this chore has an active arcade session
    const session = this.arcadeSession;
    const isActiveForThisChore = session && session.chore_id === chore.id;

    // Hide arcade controls for completed chores UNLESS there's an active session needing judgment
    if (chore.status === "completed" && !isActiveForThisChore) {
      return html``;
    }

    if (isActiveForThisChore && session) {
      const username = this.getUsername();
      const isCurrentUserSession = session.user_name === username;
      const elapsedSeconds = this.getCurrentElapsedTime(session);

      if (session.status === "active") {
        return html`
          <div class="arcade-controls active">
            <div class="arcade-timer">
              <ha-icon icon="mdi:timer"></ha-icon>
              <span class="timer-text">${this.formatTime(elapsedSeconds)}</span>
              ${isCurrentUserSession
                ? html`<span class="timer-label">(You)</span>`
                : html`<span class="timer-label">(${session.user_name})</span>`}
            </div>
            ${isCurrentUserSession
              ? html`
                  <div class="arcade-buttons">
                    <mwc-button
                      class="arcade-button stop"
                      @click=${() => this.stopArcade(session)}
                    >
                      Stop
                    </mwc-button>
                    <mwc-button
                      class="arcade-button cancel"
                      @click=${() => this.cancelArcade(session)}
                    >
                      Cancel
                    </mwc-button>
                  </div>
                `
              : html` <div class="arcade-status">Session in progress...</div> `}
          </div>
        `;
      } else if (session.status === "stopped" || session.status === "judging") {
        return html`
          <div class="arcade-controls judging">
            <div class="arcade-status">
              <ha-icon icon="mdi:gavel"></ha-icon>
              <span>Awaiting judge approval</span>
            </div>
            <div class="arcade-timer">
              Final time: ${this.formatTime(elapsedSeconds)}
            </div>
            ${this.config.show_judge_controls
              ? html`
                  <mwc-button
                    class="arcade-button judge"
                    @click=${() => this.showJudgeDialog(session)}
                  >
                    <ha-icon icon="mdi:gavel"></ha-icon>
                    Judge
                  </mwc-button>
                `
              : ""}
          </div>
        `;
      } else if (session.status === "denied") {
        return html`
          <div class="arcade-controls denied">
            <div class="arcade-status">
              <ha-icon icon="mdi:close-circle"></ha-icon>
              <span>Judge denied - improvements needed</span>
            </div>
            ${isCurrentUserSession
              ? html`
                  <mwc-button
                    class="arcade-button continue"
                    @click=${() => this.continueArcade(session)}
                  >
                    Continue Arcade
                  </mwc-button>
                `
              : ""}
          </div>
        `;
      }
    }

    // No active session - show start button
    return html`
      <div class="arcade-controls idle">
        <mwc-button
          class="arcade-button start"
          @click=${() => this.startArcade(chore)}
        >
          <ha-icon icon="mdi:play-circle"></ha-icon>
          Start Arcade
        </mwc-button>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const username = this.getUsername();
    const title = this.config.title || `${username}'s Chores` || "Chores";
    const chores = this.getChores();

    if (chores.length === 0) {
      return html`
        <ha-card>
          ${this.config.show_header
            ? html`
                <div class="card-header">
                  <div class="name">${title}</div>
                </div>
              `
            : ""}
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert"></ha-icon>
              <div>
                <strong>No chores found</strong>
                <p>
                  ${username
                    ? `${username} has no chores matching the current filters.`
                    : "Please ensure the ChoreBoard integration is installed and configured."}
                  Visit the
                  <a
                    href="https://github.com/PhunkMaster/ChoreBoard-HA-Integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    >ChoreBoard Integration</a
                  >
                  for setup instructions.
                </p>
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    const userPoints = this.config.show_user_points
      ? this.getUserPoints()
      : { weekly: null, allTime: null };

    return html`
      <ha-card>
        ${this.config.show_header
          ? html`
              <div class="card-header">
                <div class="name">${title}</div>
                <div class="header-badges">
                  <div class="badge">${chores.length} chores</div>
                  ${this.config.show_user_points && userPoints.weekly !== null
                    ? html`<div class="badge points-badge">
                        ${userPoints.weekly} ${this.getPointsName()} this week
                      </div>`
                    : ""}
                  ${this.config.show_user_points && userPoints.allTime !== null
                    ? html`<div class="badge points-badge">
                        ${userPoints.allTime} ${this.getPointsName()} total
                      </div>`
                    : ""}
                </div>
              </div>
            `
          : ""}
        <div class="card-content">
          <div class="chore-list">
            ${chores.map(
              (chore) => html`
                <div class="chore-item ${this.getChoreStateClass(chore)}">
                  <div class="chore-status">
                    <ha-icon icon="${this.getChoreStateIcon(chore)}"></ha-icon>
                  </div>
                  <div class="chore-details">
                    <div class="chore-header">
                      <div class="chore-name">${chore.name}</div>
                      ${this.config.show_points && chore.points
                        ? html`<div class="chore-points">
                            ${typeof chore.points === "string"
                              ? parseFloat(chore.points)
                              : chore.points}
                            ${this.getPointsName()}
                          </div>`
                        : ""}
                    </div>
                    <div class="chore-meta">
                      ${chore.due_date
                        ? html`<span class="meta-item"
                            ><ha-icon icon="mdi:calendar"></ha-icon
                            >${chore.due_date}</span
                          >`
                        : ""}
                      ${chore.is_overdue
                        ? html`<span class="meta-item overdue"
                            ><ha-icon icon="mdi:clock-alert"></ha-icon
                            >Overdue</span
                          >`
                        : ""}
                    </div>
                    ${this.renderArcadeControls(chore)}
                    ${this.renderLeaderboard(chore)}
                  </div>
                  <div class="chore-action">
                    ${chore.status === "completed"
                      ? html`
                          <div class="completed-actions">
                            <div class="completed-badge">✓ Done</div>
                            ${this.config.show_undo
                              ? html`
                                  <mwc-button
                                    class="undo-button"
                                    @click=${() => this.undoCompletion(chore)}
                                  >
                                    Undo
                                  </mwc-button>
                                `
                              : ""}
                          </div>
                        `
                      : this.isPoolChore(chore)
                        ? html`
                            <div class="pool-actions">
                              <mwc-button
                                @click=${() => this.claimChore(chore)}
                              >
                                Claim
                              </mwc-button>
                              <mwc-button
                                @click=${() => this.completePoolChore(chore)}
                              >
                                Complete
                              </mwc-button>
                            </div>
                          `
                        : html`
                            <mwc-button
                              @click=${() => this.completeChore(chore)}
                            >
                              Complete
                            </mwc-button>
                          `}
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

      .header-badges {
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: flex-end;
      }

      .badge {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .points-badge {
        background: var(--info-color, #2196f3);
      }

      .card-content {
        padding: 0;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        background: var(--warning-color, #ff9800);
        color: var(--text-primary-color, white);
        border-radius: 8px;
      }

      .warning ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }

      .warning strong {
        display: block;
        margin-bottom: 4px;
      }

      .warning p {
        margin: 4px 0 0 0;
        font-size: 14px;
      }

      .warning a {
        color: var(--text-primary-color, white);
        text-decoration: underline;
      }

      .chore-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chore-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .chore-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .chore-item.state-completed {
        opacity: 0.7;
        border-color: var(--success-color, #4caf50);
      }

      .chore-item.state-overdue {
        border-color: var(--error-color, #f44336);
        background: rgba(244, 67, 54, 0.05);
      }

      .chore-item.state-pending {
        border-color: var(--info-color, #2196f3);
      }

      .chore-status {
        flex-shrink: 0;
      }

      .chore-status ha-icon {
        --mdc-icon-size: 28px;
      }

      .state-completed .chore-status ha-icon {
        color: var(--success-color, #4caf50);
      }

      .state-overdue .chore-status ha-icon {
        color: var(--error-color, #f44336);
      }

      .state-pending .chore-status ha-icon {
        color: var(--info-color, #2196f3);
      }

      .chore-details {
        flex: 1;
        min-width: 0;
      }

      .chore-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .chore-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .state-completed .chore-name {
        text-decoration: line-through;
        opacity: 0.7;
      }

      .chore-points {
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      .chore-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .chore-meta {
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

      .meta-item.overdue {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .chore-action {
        flex-shrink: 0;
      }

      .pool-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .completed-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-end;
      }

      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }

      .undo-button {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .completed-badge {
        background: var(--success-color, #4caf50);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
      }

      /* Arcade mode styles */
      .arcade-controls {
        margin-top: 12px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        border-left: 4px solid var(--info-color, #2196f3);
      }

      .arcade-controls.active {
        border-left-color: var(--success-color, #4caf50);
        background: rgba(76, 175, 80, 0.1);
      }

      .arcade-controls.judging {
        border-left-color: var(--warning-color, #ff9800);
        background: rgba(255, 152, 0, 0.1);
      }

      .arcade-controls.denied {
        border-left-color: var(--error-color, #f44336);
        background: rgba(244, 67, 54, 0.1);
      }

      .arcade-controls.idle {
        border-left-color: var(--primary-color);
        background: rgba(3, 155, 229, 0.05);
        padding: 8px;
      }

      .arcade-timer {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .arcade-controls.active .arcade-timer {
        color: var(--success-color, #4caf50);
      }

      .arcade-timer ha-icon {
        --mdc-icon-size: 20px;
      }

      .timer-text {
        font-family: monospace;
        font-size: 18px;
      }

      .timer-label {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .arcade-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .arcade-button {
        min-width: 80px;
      }

      .arcade-button.start {
        --mdc-theme-primary: var(--primary-color);
      }

      .arcade-button.stop {
        --mdc-theme-primary: var(--warning-color, #ff9800);
      }

      .arcade-button.cancel {
        --mdc-theme-primary: var(--error-color, #f44336);
      }

      .arcade-button.continue {
        --mdc-theme-primary: var(--success-color, #4caf50);
      }

      .arcade-button.judge {
        --mdc-theme-primary: var(--warning-color, #ff9800);
        margin-top: 8px;
        width: 100%;
      }

      .arcade-button ha-icon {
        --mdc-icon-size: 18px;
        margin-right: 4px;
      }

      .arcade-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
      }

      .arcade-status ha-icon {
        --mdc-icon-size: 18px;
      }

      .arcade-controls.judging .arcade-status {
        color: var(--warning-color, #ff9800);
        font-weight: 600;
      }

      .arcade-controls.denied .arcade-status {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      /* Leaderboard styles */
      .leaderboard-section {
        margin-top: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .leaderboard-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: var(--secondary-background-color, #f5f5f5);
        cursor: pointer;
        transition: background 0.2s ease;
        user-select: none;
      }

      .leaderboard-header:hover {
        background: var(--divider-color);
      }

      .leaderboard-header ha-icon:first-child {
        --mdc-icon-size: 18px;
        color: var(--warning-color, #ff9800);
      }

      .leaderboard-header ha-icon:last-child {
        --mdc-icon-size: 20px;
        margin-left: auto;
        color: var(--secondary-text-color);
      }

      .leaderboard-header span {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
      }

      .leaderboard-list {
        display: flex;
        flex-direction: column;
        background: var(--card-background-color);
      }

      .leaderboard-entry {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-top: 1px solid var(--divider-color);
        transition: background 0.2s ease;
      }

      .leaderboard-entry:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .leaderboard-entry.current-user {
        background: rgba(3, 155, 229, 0.1);
        font-weight: 600;
      }

      .leaderboard-entry.current-user:hover {
        background: rgba(3, 155, 229, 0.15);
      }

      .leaderboard-entry .rank {
        font-size: 16px;
        font-weight: 700;
        color: var(--warning-color, #ff9800);
        min-width: 32px;
      }

      .leaderboard-entry:nth-child(1) .rank {
        color: #ffd700; /* Gold */
      }

      .leaderboard-entry:nth-child(2) .rank {
        color: #c0c0c0; /* Silver */
      }

      .leaderboard-entry:nth-child(3) .rank {
        color: #cd7f32; /* Bronze */
      }

      .leaderboard-entry .user-name {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .leaderboard-entry .time {
        font-size: 14px;
        font-weight: 600;
        font-family: monospace;
        color: var(--success-color, #4caf50);
      }

      .leaderboard-more {
        padding: 8px 12px;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
        border-top: 1px solid var(--divider-color);
        font-style: italic;
      }
    `;
  }
}

console.info(
  `%c ${CARD_NAME} %c ${CARD_VERSION} `,
  "color: white; background: #039be5; font-weight: 700;",
  "color: #039be5; background: white; font-weight: 700;",
);
