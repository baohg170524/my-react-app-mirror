# Competition Registration — Real-API Rewire Plan

> Replaces the localStorage hybrid with real backend endpoints discovered in the live Swagger (`https://api.sealswp391.xyz/swagger/v1/swagger.json`), which is newer than repo `API_DOCS.md`.

**Goal:** Drive the student competition-registration flow with real APIs: read own approval state, submit student proof, admin approve/reject — no localStorage.

## Verified API contracts (live Swagger)
- `GET /api/Users/profile` → `UserModel` of the current logged-in user. Needs login (401 unauth). `UserModel = { id, schoolId, studentCode, email, fullName, isStudent, isAdmin, isApproved, isFpt, photoStudentCardUrl }`.
- `POST /api/Auth/student-profiles` body `UpdateStudentProfileCommand { schoolId?, studentCode?, photoStudentCardUrl?, isFpt, fullName? }` → `UserModel`. Needs login (401 unauth).
- `POST /api/Users/{id}/approve` (no body) → `UserModel`. Admin/EC.
- `POST /api/Users/{id}/reject` body `{ reason }` → `UserModel`. Admin/EC.
- `GET /api/UserRejections/user/{userId}` → rejection history (reason). Needs login.
- `DELETE /api/UserRejections/{id}` → soft-delete a rejection (for resubmit unstick).

Note: `UserModel` has NO status enum / reason field → "rejected" still derived from `UserRejections`.

## Global Constraints
- Test runner `npx jest <path>` (jsdom). tsc: `npx tsc --noEmit -p tsconfig.json`.
- `apiClient` response interceptor unwraps the envelope → `apiClient.get<T>(...)` resolves to `{ data: T }` where T is the inner `data`. Follow `usersApi.update` pattern.
- Vietnamese UI; reuse existing tokens/classes.
- No `Date.now()`/`new Date()` in pure libs.

---

## Task R1: API layer (types + clients)
**Files:** `src/services/api/types.ts`, `src/services/api/users.ts`, `src/services/api/auth.ts`, `src/services/api/index.ts`, `src/features/registration/api/userRejections.ts`. Tests: extend `src/features/registration/api/__tests__/userRejections.test.ts` and add `src/services/api/__tests__/usersProfile.test.ts`.

1. `types.ts`: add
```ts
export interface UpdateStudentProfileCommand {
  schoolId?: string | null;
  studentCode?: string | null;
  photoStudentCardUrl?: string | null;
  isFpt: boolean;
  fullName?: string | null;
}
```
2. `users.ts`: extend `UserSummary` with `photoStudentCardUrl?: string | null;`. Add:
```ts
  /** GET /api/Users/profile — the current logged-in user's profile. */
  getProfile: async (): Promise<UserSummary> => {
    const { data } = await apiClient.get<UserSummary>("/Users/profile");
    return data;
  },
  /** POST /api/Users/{id}/approve — approve a student profile (admin/EC). */
  approve: (id: string): Promise<void> =>
    apiClient.post(`/Users/${encodeURIComponent(id)}/approve`).then(() => undefined),
  /** POST /api/Users/{id}/reject — reject a student profile with a reason (admin/EC). */
  reject: (id: string, reason: string): Promise<void> =>
    apiClient.post(`/Users/${encodeURIComponent(id)}/reject`, { reason }).then(() => undefined),
```
3. `auth.ts`: add `submitStudentProfile`:
```ts
  /** POST /api/Auth/student-profiles — submit/update the caller's student proof. */
  submitStudentProfile: (payload: UpdateStudentProfileCommand): Promise<void> =>
    apiClient.post("/Auth/student-profiles", payload).then(() => undefined),
```
(import `UpdateStudentProfileCommand` type; re-export from `index.ts` alphabetically.)
4. `userRejections.ts`: add `remove(id)`:
```ts
  /** DELETE /api/UserRejections/{id} — soft-delete a rejection record. */
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/UserRejections/${encodeURIComponent(id)}`).then(() => undefined),
```
5. Tests (mock apiClient): `getProfile` GETs `/Users/profile` and returns data; `approve` POSTs `/Users/{id}/approve`; `reject` POSTs `/Users/{id}/reject` with `{reason}`; `userRejectionsApi.remove` DELETEs.

---

## Task R2: resolver + hook (drop localStorage)
**Files:** rewrite `src/features/registration/status.ts`, rewrite `src/features/registration/hooks/useRegistration.ts`. DELETE `src/features/registration/api/registrationStore.ts` + its test. Update `src/features/registration/__tests__/status.test.ts`, `src/features/registration/hooks/__tests__/useRegistration.test.tsx`. `types.ts` (registration) trim unused.

`status.ts` (profile-based, pure):
```ts
import type { UserSummary, UserRejectionModel } from '@/services/api';
import type { RegistrationStatus } from './types';

export interface ResolvedRegistration { status: RegistrationStatus; reason: string | null; }

/** approved if isApproved; else rejected if any rejection exists; else pending. */
export function resolveRegistrationStatus(
  profile: UserSummary | null,
  rejections: UserRejectionModel[],
): ResolvedRegistration {
  if (profile?.isApproved) return { status: 'approved', reason: null };
  if (rejections.length) {
    const latest = [...rejections].sort((a, b) => b.createdTime.localeCompare(a.createdTime))[0];
    return { status: 'rejected', reason: latest.reason };
  }
  return { status: 'pending', reason: null };
}
```
`types.ts` (registration): keep `RegistrationStatus = 'pending'|'approved'|'rejected'`. Remove `RegistrationRecord`/`RegistrationFormValues` (replaced by `UpdateStudentProfileCommand`). Keep nothing localStorage-related.

`useRegistration.ts`:
```ts
'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, authApi, type UserSummary, type UpdateStudentProfileCommand } from '@/services/api';
import { userRejectionsApi } from '../api/userRejections';
import { resolveRegistrationStatus } from '../status';

export const REGISTRATION_KEYS = {
  profile: ['users', 'profile'] as const,
  rejections: (userId: string) => ['userRejections', userId] as const,
};

export function useRegistration(userId: string) {
  const qc = useQueryClient();
  const enabled = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  const profileQ = useQuery({
    queryKey: REGISTRATION_KEYS.profile,
    queryFn: () => usersApi.getProfile(),
    enabled,
    staleTime: 30_000,
  });
  const rejectionsQ = useQuery({
    queryKey: REGISTRATION_KEYS.rejections(userId),
    queryFn: () => userRejectionsApi.listForUser(userId),
    enabled: enabled && !!userId,
    staleTime: 30_000,
  });

  const { status, reason } = resolveRegistrationStatus(profileQ.data ?? null, rejectionsQ.data ?? []);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: REGISTRATION_KEYS.profile });
    qc.invalidateQueries({ queryKey: REGISTRATION_KEYS.rejections(userId) });
  };

  const submit = async (cmd: UpdateStudentProfileCommand) => {
    await authApi.submitStudentProfile(cmd);
    invalidate();
  };

  /** Re-apply after a rejection: clear prior rejection records (best-effort) then invalidate. */
  const clearRejections = async () => {
    const rows = rejectionsQ.data ?? [];
    await Promise.allSettled(rows.map((r) => userRejectionsApi.remove(r.id)));
    invalidate();
  };

  return {
    profile: (profileQ.data ?? null) as UserSummary | null,
    status,
    reason,
    isLoading: profileQ.isLoading || rejectionsQ.isLoading,
    submit,
    clearRejections,
  };
}
```
Tests:
- `status.test.ts`: 3 cases (approved when isApproved; rejected when rejection present + latest reason; pending otherwise).
- `useRegistration.test.tsx`: mock `@/services/api` (usersApi.getProfile, authApi.submitStudentProfile) and `../api/userRejections`. Cases: approved profile → 'approved'; not-approved + rejection → 'rejected' + reason; not-approved no rejection → 'pending'; `submit` calls `authApi.submitStudentProfile`.

---

## Task R3: Form + orchestrator + status card
**Files:** rewrite `src/features/registration/components/RegistrationForm.tsx`, update `src/features/registration/components/CompetitionRegistrationTab.tsx`, update `RegistrationStatusCard.tsx`. Update their tests.

`RegistrationForm` now resolves `schoolId` and emits `UpdateStudentProfileCommand`:
- Props: `{ defaults: { fullName: string }, onSubmit: (cmd: UpdateStudentProfileCommand) => void | Promise<void> }`.
- Fields: fullName, trường (FPT/Khác + tên trường nếu Khác), MSSV, ảnh thẻ (upload Storage thật; required for Khác).
- On submit: resolve `schoolId` — FPT → look up via `schoolsApi.list()` the school whose name includes "FPT"; OTHER → `schoolsApi.create({schoolName})` (fallback: find existing by name) like `src/app/auth/page.tsx`. Upload card (Khác) → `storageApi.upload`. Then `onSubmit({ schoolId, studentCode, photoStudentCardUrl, isFpt: choice==='FPT', fullName })`.
- Validation: MSSV required; Khác → tên trường + ảnh required; image ≤5MB.

`CompetitionRegistrationTab`:
- `const { profile, status, reason, isLoading, submit, clearRejections } = useRegistration(userId);`
- `const [editing, setEditing] = useState(false);`
- isLoading → spinner text.
- Show form when `editing`. onSubmit async: `await submit(cmd); setEditing(false);`
- Else show `RegistrationStatusCard` with `status`, `reason`, `profile`, and:
  - `onRegisterTeam={() => setActiveTab('createTeam')}` (approved)
  - `onEdit={() => setEditing(true)}` (pending → "Cập nhật hồ sơ")
  - `onResubmit={async () => { await clearRejections(); setEditing(true); }}` (rejected → "Gửi lại")
- Default heading + prefill form from `profile` (fullName).

`RegistrationStatusCard`: take `profile: UserSummary | null` instead of the old record; render fullName/email/studentCode/trường(isFpt? 'FPT University' : schoolId via schools lookup or '—')/photo. Buttons per status: pending → "Cập nhật hồ sơ" (onEdit); approved → "Đăng ký đội" (onRegisterTeam); rejected → reason + "Gửi lại" (onResubmit). (Drop the old record-based fields.)

Tests: form submits a resolved command for FPT (mock schoolsApi.list returning an FPT school; assert onSubmit called with isFpt:true + that schoolId); blocks when MSSV empty. StatusCard: each status renders label + correct button/callback.

---

## Task R4: Admin approve/reject via real endpoints
**File:** `src/features/events/components/AdminEventDashboard/tabs/AccountApprovalTab.tsx`.
- `approveMutation.mutationFn`: replace `usersApi.update(...)` with `usersApi.approve(r.userId)`.
- `rejectMutation.mutationFn`: replace `userRejectionsApi.create(...)` with `usersApi.reject(r.userId, reason)`; keep `Promise.all(r.roleIds.map(removeRole))` afterwards so the rejected user leaves the pending list. Keep the `window.prompt` reason + the `!admin?.id` fast-fail guard is no longer needed (reject endpoint records `RejectedBy` server-side) — but keep prompting for reason.
- Remove now-unused imports (`userRejectionsApi`, possibly `useCurrentUser` if unused).
- Verify `npx tsc`.

---

## Task R5: Cleanup + verify
- Ensure deleted `registrationStore` has no dangling imports (grep `registrationStore`).
- `npx tsc --noEmit -p tsconfig.json` clean.
- `npx jest src/features/registration src/services/api src/lib/events src/features/events/__tests__/components/accessibility.test.tsx` green.
- Update spec §9 (remove the "can't read isApproved" limitation; document real endpoints).
