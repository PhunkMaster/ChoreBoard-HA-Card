# Integration Users Array Debugging Guide

**For**: ChoreBoard Card v1.1.0+
**Integration**: ChoreBoard HA Integration v1.2.1+
**Issue**: "Unable to load users list" error when clicking Claim/Complete buttons

## Overview

The ChoreBoard Card's pool chores feature requires users data from the Home Assistant integration. This guide helps debug why the card can't find the users array.

## How User Discovery Works

The card's `getUsers()` method (card.ts:162-179) searches for users as follows:

```typescript
private getUsers(): User[] {
  if (!this.hass) return [];

  // Search ALL entities in Home Assistant
  for (const entityId of Object.keys(this.hass.states)) {
    // Only check ChoreBoard sensors
    if (entityId.startsWith("sensor.choreboard_")) {
      const state = this.hass.states[entityId];

      // Check if this sensor has users array in attributes
      if (state.attributes.users && Array.isArray(state.attributes.users)) {
        return state.attributes.users as User[];
      }
    }
  }

  return [];
}
```

## Expected Integration Behavior

The ChoreBoard Integration v1.2.1+ should provide users in **ALL 12 sensors**:

1. `sensor.choreboard_outstanding` - ✅ Has users
2. `sensor.choreboard_late` - ✅ Has users
3. `sensor.choreboard_pool` - ✅ Has users (CRITICAL for pool chores)
4. `sensor.choreboard_chore_breakdown` - ✅ Has users
5. `sensor.choreboard_completion_history` - ✅ Has users
6. `sensor.<username>_my_chores` - ✅ Has users
7. `sensor.<username>_my_immediate_chores` - ✅ Has users
8. `sensor.choreboard_leaderboard_<type>` - ✅ Has `all_users`
9. `sensor.choreboard_arcade_<chore>` - ✅ Has users
10. `sensor.<username>_weekly_points` - ✅ Has users
11. `sensor.<username>_alltime_points` - ✅ Has users
12. `sensor.choreboard_users` - ✅ Dedicated users sensor

## User Data Structure

Each user object should match the `User` interface (common.ts:39-49):

```typescript
interface User {
  id: number;                    // REQUIRED for service calls
  username: string;
  display_name: string;
  first_name: string;
  can_be_assigned: boolean;
  eligible_for_points: boolean;
  weekly_points: string | number;
  all_time_points: string | number;
  claims_today?: number;         // Optional
}
```

## Debugging Steps

### 1. Check Home Assistant States

Open browser DevTools (F12) and run:

```javascript
// Get the hass object
const hass = document.querySelector("home-assistant").hass;

// List all ChoreBoard sensors
Object.keys(hass.states)
  .filter(id => id.startsWith("sensor.choreboard_"))
  .forEach(id => {
    const state = hass.states[id];
    const hasUsers = state.attributes.users ?
      `✅ ${state.attributes.users.length} users` :
      '❌ No users array';
    console.log(`${id}: ${hasUsers}`);
  });
```

**Expected output**:
```
sensor.choreboard_pool: ✅ 3 users
sensor.choreboard_users: ✅ 3 users
sensor.choreboard_outstanding: ✅ 3 users
...
```

### 2. Inspect a Specific Sensor

Check the pool chores sensor attributes:

```javascript
const hass = document.querySelector("home-assistant").hass;
const poolSensor = hass.states["sensor.choreboard_pool"];

console.log("Pool sensor attributes:", poolSensor.attributes);
console.log("Users array:", poolSensor.attributes.users);
```

**Expected output**:
```json
{
  "chores": [...],
  "count": 3,
  "users": [
    {
      "id": 1,
      "username": "ash",
      "display_name": "Ash",
      ...
    }
  ]
}
```

### 3. Test getUsers() Directly

If you can access the card component:

```javascript
// Find the ChoreBoard card element
const card = document.querySelector("choreboard-card");

// Call getUsers() method (if exposed)
// Note: This won't work if getUsers() is private
// You'll need to check the card's _users property instead
console.log("Card users:", card._users);
```

### 4. Check Service Call Parameters

When you click Claim, check the network tab:

1. Open DevTools (F12) → **Network** tab
2. Click **Claim** button on a pool chore
3. Look for a service call to `choreboard.claim_chore`
4. Check the payload for `assign_to_user_id`

**Expected payload**:
```json
{
  "chore_id": 42,
  "assign_to_user_id": 1
}
```

## Common Issues

### Issue 1: No ChoreBoard Sensors Found

**Symptom**: No sensors starting with `sensor.choreboard_`

**Cause**: Integration not loaded or configured incorrectly

**Solution**:
1. Check **Settings → Devices & Services**
2. Verify ChoreBoard integration is configured
3. Check integration version (should be v1.2.1+)

### Issue 2: Sensors Exist But No Users Array

**Symptom**: Sensors found but `attributes.users` is undefined

**Cause**: Integration version is too old (< v1.2.1)

**Solution**:
1. Update integration via HACS to v1.2.1+
2. Restart Home Assistant
3. Hard refresh browser (Ctrl + F5)

### Issue 3: Users Array Exists But getUsers() Returns Empty

**Symptom**: Can see users in DevTools but card shows error

**Possible causes**:
1. **Card cached**: Hard refresh browser (Ctrl + F5)
2. **Users array malformed**: Check if users have `id` field
3. **Card version too old**: Update to v1.1.0+

**Debug**:
```javascript
const hass = document.querySelector("home-assistant").hass;

// Check if any sensor has users
const sensorsWithUsers = Object.keys(hass.states)
  .filter(id => id.startsWith("sensor.choreboard_"))
  .filter(id => hass.states[id].attributes.users)
  .map(id => ({
    id,
    userCount: hass.states[id].attributes.users.length,
    firstUser: hass.states[id].attributes.users[0]
  }));

console.log("Sensors with users:", sensorsWithUsers);
```

### Issue 4: Users Missing id Field

**Symptom**: Users array exists but objects missing `id` field

**Cause**: Backend API not returning `id` (should not happen in ChoreBoard v1.0+)

**Solution**: Update ChoreBoard backend to latest version

**Verify**:
```javascript
const hass = document.querySelector("home-assistant").hass;
const poolSensor = hass.states["sensor.choreboard_pool"];
const firstUser = poolSensor.attributes.users[0];

console.log("First user has ID:", firstUser.id !== undefined);
console.log("First user:", firstUser);
```

## Implementation Verification

### Card Side (This Repository)

File: `src/card.ts` (lines 162-179)

**Current implementation**:
```typescript
private getUsers(): User[] {
  if (!this.hass) return [];

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
```

**✅ This is correct** - searches all ChoreBoard sensors for users array

### Integration Side (ChoreBoard-HA-Integration)

File: `custom_components/choreboard/sensor.py`

**Helper function** (lines 20-51):
```python
def format_users_for_attributes(
    coordinator_data: dict[str, Any],
) -> list[dict[str, Any]]:
    """Format users data for sensor attributes."""
    users = coordinator_data.get("users", [])
    user_list = []

    for user in users:
        user_info = {
            "id": user.get("id"),
            "username": user.get("username", "Unknown"),
            "display_name": user.get("display_name", ...),
            "first_name": user.get("first_name", ""),
            "can_be_assigned": user.get("can_be_assigned", True),
            "eligible_for_points": user.get("eligible_for_points", True),
            "weekly_points": str(user.get("weekly_points", 0)),
            "all_time_points": str(user.get("all_time_points", 0)),
        }
        if "claims_today" in user:
            user_info["claims_today"] = user.get("claims_today", 0)
        user_list.append(user_info)

    return user_list
```

**Usage in sensors**:
```python
return {
    "chores": chore_list,
    "count": len(chores),
    "users": format_users_for_attributes(self.coordinator.data),
}
```

**✅ All 12 sensors use this pattern**

## Testing Checklist

Before reporting an issue, verify:

- [ ] Home Assistant is running and accessible
- [ ] ChoreBoard integration is configured (v1.2.1+)
- [ ] ChoreBoard backend API is running and accessible
- [ ] At least one ChoreBoard sensor exists in HA
- [ ] Browser cache cleared (hard refresh with Ctrl + F5)
- [ ] Card version is v1.1.0 or later
- [ ] Checked browser console for errors (F12 → Console)
- [ ] Ran debugging commands in browser DevTools
- [ ] Verified users array exists in sensor attributes
- [ ] Verified users have `id` field

## Expected Behavior

When clicking **Claim** on a pool chore:
1. Card calls `getUsers()` method
2. Searches all `sensor.choreboard_*` entities
3. Finds first sensor with users array (e.g., `sensor.choreboard_pool`)
4. Returns users array
5. Shows dialog with user selection list
6. User selects a user
7. Card calls `choreboard.claim_chore` service with `assign_to_user_id`

When clicking **Complete** on a pool chore:
1. Card calls `getUsers()` method (same as above)
2. Shows dialog with two sections:
   - "Who completed?" (required, single select)
   - "Who helped?" (optional, multi-select)
3. User selects completer and optionally helpers
4. Card calls `choreboard.mark_complete` service with `completed_by_user_id` and `helpers`

## If Still Broken

If you've verified all of the above and it still doesn't work:

1. **Collect debug output** from browser console
2. **Copy sensor state JSON** from Developer Tools → States
3. **Check Home Assistant logs** for errors
4. **Report issue** with all collected information

The integration is confirmed working (all tests pass, all sensors have users array). The issue is likely:
- Home Assistant not reloaded properly
- Browser cache not cleared
- Integration not updated to v1.2.1
- Card not updated to v1.1.0
