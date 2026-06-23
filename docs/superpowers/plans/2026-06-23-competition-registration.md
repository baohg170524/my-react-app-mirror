# Competition Registration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cho student một tab "Đăng ký thi đấu" theo từng sự kiện: gửi thông tin + ảnh thẻ, xem trạng thái (chờ/đã duyệt/bị từ chối), và chỉ khi được duyệt mới mở tab "Tạo đội".

**Architecture:** Module mới `src/features/registration/`. Hybrid dữ liệu: "từ chối" đọc/ghi thật qua `/api/UserRejections`; bản ghi đăng ký + trạng thái chờ/đã-duyệt lưu localStorage (`registrationStore`); ảnh thẻ upload qua Storage API thật. Một pure resolver gộp record + rejections thành trạng thái hiển thị. Tab + gating tích hợp vào `getEventTabs`, `Sidebar`, `EventDashboard`. Admin "Từ chối" (AccountApprovalTab) bổ sung `POST /UserRejections`.

**Tech Stack:** Next.js 16, React 19, TypeScript, @tanstack/react-query v5, axios, lucide-react, Jest + React Testing Library.

## Global Constraints

- Test runner: `npx jest <path>` (config: `jest.config.js`, env jsdom).
- Mọi text UI bằng tiếng Việt, theo giọng các component hiện có.
- Dùng design tokens CSS sẵn có (`var(--color-*)`, class `t-*`, `Card`, `Badge`) — không thêm màu hard-code mới.
- KHÔNG gọi `Date.now()`/`new Date()` trong lib thuần (`status.ts`, `registrationStore.ts`); thời gian truyền từ hook/component (để test ổn định).
- SSR-safe: mọi truy cập `localStorage`/`window` phải guard `typeof window === 'undefined'`.
- `apiClient` (axios) đã tự đính Bearer token — dùng `import apiClient from '@/services/api/client'`.
- Theo pattern repo: API trả envelope `PagedResult<T>` cho list; lấy `data.data`.

---

### Task 1: UserRejections — types + API client (backend thật)

**Files:**
- Modify: `src/services/api/types.ts` (thêm `UserRejectionModel`)
- Create: `src/features/registration/api/userRejections.ts`
- Test: `src/features/registration/api/__tests__/userRejections.test.ts`

**Interfaces:**
- Consumes: `apiClient` (axios), `PagedResult<T>` từ `@/services/api`.
- Produces:
  - `interface UserRejectionModel { id: string; userId: string; rejectedBy: string; reason: string | null; createdTime: string }`
  - `userRejectionsApi.listForUser(userId: string): Promise<UserRejectionModel[]>`
  - `userRejectionsApi.create(payload: { userId: string; rejectedBy: string; reason?: string }): Promise<void>`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/registration/api/__tests__/userRejections.test.ts
import { userRejectionsApi } from '../userRejections';
import apiClient from '@/services/api/client';

jest.mock('@/services/api/client');
const mocked = apiClient as jest.Mocked<typeof apiClient>;

describe('userRejectionsApi', () => {
  afterEach(() => jest.resetAllMocks());

  test('listForUser unwraps PagedResult.data', async () => {
    mocked.get.mockResolvedValue({
      data: { data: [{ id: 'r1', userId: 'u1', rejectedBy: 'a1', reason: 'thiếu ảnh', createdTime: '2026-06-23T00:00:00Z' }] },
    } as never);
    const rows = await userRejectionsApi.listForUser('u1');
    expect(mocked.get).toHaveBeenCalledWith('/UserRejections/user/u1');
    expect(rows).toHaveLength(1);
    expect(rows[0].reason).toBe('thiếu ảnh');
  });

  test('listForUser returns [] when data missing', async () => {
    mocked.get.mockResolvedValue({ data: {} } as never);
    expect(await userRejectionsApi.listForUser('u1')).toEqual([]);
  });

  test('create posts the payload', async () => {
    mocked.post.mockResolvedValue({ data: {} } as never);
    await userRejectionsApi.create({ userId: 'u1', rejectedBy: 'a1', reason: 'sai MSSV' });
    expect(mocked.post).toHaveBeenCalledWith('/UserRejections', { userId: 'u1', rejectedBy: 'a1', reason: 'sai MSSV' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/api/__tests__/userRejections.test.ts`
Expected: FAIL — `Cannot find module '../userRejections'`.

- [ ] **Step 3: Add the model type**

Thêm vào cuối phần "User" trong `src/services/api/types.ts`:

```ts
// ─── User Rejections (backend UserRejectionModel) ─────────────────────────────

export interface UserRejectionModel {
  id: string;
  userId: string;
  rejectedBy: string;
  reason: string | null;
  createdTime: string;
}
```

- [ ] **Step 4: Implement the client**

```ts
// src/features/registration/api/userRejections.ts
import apiClient from '@/services/api/client';
import type { PagedResult, UserRejectionModel } from '@/services/api';

export const userRejectionsApi = {
  /** GET /api/UserRejections/user/{userId} — rejections recorded against a user. */
  listForUser: async (userId: string): Promise<UserRejectionModel[]> => {
    const { data } = await apiClient.get<PagedResult<UserRejectionModel>>(
      `/UserRejections/user/${encodeURIComponent(userId)}`,
    );
    return data.data ?? [];
  },

  /** POST /api/UserRejections — record a rejection (admin action). */
  create: (payload: { userId: string; rejectedBy: string; reason?: string }): Promise<void> =>
    apiClient.post('/UserRejections', payload).then(() => undefined),
};
```

Re-export type mới từ `src/services/api/index.ts`: thêm `UserRejectionModel` vào khối `export type { ... } from "./types";` đang có (giữ thứ tự alphabet, ngay sau `SchoolModel`). Bắt buộc — vì `userRejections.ts`, `status.ts` và các test import `UserRejectionModel` từ `@/services/api`.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/features/registration/api/__tests__/userRejections.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/services/api/types.ts src/services/api/index.ts src/features/registration/api/userRejections.ts src/features/registration/api/__tests__/userRejections.test.ts
git commit -m "feat(registration): UserRejections API client + model type"
```

---

### Task 2: Registration types + localStorage store

**Files:**
- Create: `src/features/registration/types.ts`
- Create: `src/features/registration/api/registrationStore.ts`
- Test: `src/features/registration/api/__tests__/registrationStore.test.ts`

**Interfaces:**
- Produces:
  - `type RegistrationStatus = 'pending' | 'approved' | 'rejected'`
  - `interface RegistrationRecord { userId; eventId; fullName; email; schoolChoice: 'FPT'|'OTHER'; schoolName: string|null; studentCode; photoStudentCardUrl: string|null; note: string|null; status: 'pending'|'approved'; submittedAt: string; decidedAt: string|null }`
  - `type RegistrationFormValues = Omit<RegistrationRecord, 'userId'|'eventId'|'status'|'submittedAt'|'decidedAt'>`
  - `registrationStore.get(userId, eventId): RegistrationRecord | null`
  - `registrationStore.save(record: RegistrationRecord): void`
  - `registrationStore.setStatus(userId, eventId, status: 'pending'|'approved', decidedAt: string|null): void`
  - `registrationStore.remove(userId, eventId): void`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/registration/api/__tests__/registrationStore.test.ts
import { registrationStore } from '../registrationStore';
import type { RegistrationRecord } from '../../types';

const rec = (over: Partial<RegistrationRecord> = {}): RegistrationRecord => ({
  userId: 'u1', eventId: 'e1', fullName: 'Nguyễn Văn A', email: 'a@e.com',
  schoolChoice: 'FPT', schoolName: null, studentCode: 'SE123', photoStudentCardUrl: null,
  note: null, status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null, ...over,
});

describe('registrationStore', () => {
  beforeEach(() => localStorage.clear());

  test('get returns null when nothing saved', () => {
    expect(registrationStore.get('u1', 'e1')).toBeNull();
  });

  test('save then get round-trips, scoped by user+event', () => {
    registrationStore.save(rec());
    expect(registrationStore.get('u1', 'e1')?.studentCode).toBe('SE123');
    expect(registrationStore.get('u1', 'e2')).toBeNull();
  });

  test('setStatus updates status + decidedAt', () => {
    registrationStore.save(rec());
    registrationStore.setStatus('u1', 'e1', 'approved', '2026-06-24T00:00:00Z');
    const got = registrationStore.get('u1', 'e1');
    expect(got?.status).toBe('approved');
    expect(got?.decidedAt).toBe('2026-06-24T00:00:00Z');
  });

  test('remove deletes the record', () => {
    registrationStore.save(rec());
    registrationStore.remove('u1', 'e1');
    expect(registrationStore.get('u1', 'e1')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/api/__tests__/registrationStore.test.ts`
Expected: FAIL — cannot find module `../registrationStore`.

- [ ] **Step 3: Implement types**

```ts
// src/features/registration/types.ts
export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRecord {
  userId: string;
  eventId: string;
  fullName: string;
  email: string;
  schoolChoice: 'FPT' | 'OTHER';
  schoolName: string | null;
  studentCode: string;
  photoStudentCardUrl: string | null;
  note: string | null;
  /** 'rejected' không lưu ở store — suy từ UserRejections. */
  status: 'pending' | 'approved';
  submittedAt: string;
  decidedAt: string | null;
}

export type RegistrationFormValues = Omit<
  RegistrationRecord,
  'userId' | 'eventId' | 'status' | 'submittedAt' | 'decidedAt'
>;
```

- [ ] **Step 4: Implement the store**

```ts
// src/features/registration/api/registrationStore.ts
import type { RegistrationRecord } from '../types';

const key = (userId: string, eventId: string) => `reg:${userId}:${eventId}`;

function read(userId: string, eventId: string): RegistrationRecord | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(key(userId, eventId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegistrationRecord;
  } catch {
    return null;
  }
}

function write(record: RegistrationRecord): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key(record.userId, record.eventId), JSON.stringify(record));
}

export const registrationStore = {
  get: read,
  save: write,
  setStatus(
    userId: string,
    eventId: string,
    status: 'pending' | 'approved',
    decidedAt: string | null,
  ): void {
    const current = read(userId, eventId);
    if (!current) return;
    write({ ...current, status, decidedAt });
  },
  remove(userId: string, eventId: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key(userId, eventId));
  },
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/features/registration/api/__tests__/registrationStore.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/features/registration/types.ts src/features/registration/api/registrationStore.ts src/features/registration/api/__tests__/registrationStore.test.ts
git commit -m "feat(registration): types + localStorage store"
```

---

### Task 3: Pure status resolver

**Files:**
- Create: `src/features/registration/status.ts`
- Test: `src/features/registration/__tests__/status.test.ts`

**Interfaces:**
- Consumes: `RegistrationRecord` (Task 2), `UserRejectionModel` (Task 1).
- Produces:
  - `interface ResolvedRegistration { status: RegistrationStatus | null; reason: string | null }` (`status === null` ⇒ chưa đăng ký)
  - `resolveRegistrationStatus(record: RegistrationRecord | null, rejections: UserRejectionModel[]): ResolvedRegistration`

- [ ] **Step 1: Write the failing test**

```ts
// src/features/registration/__tests__/status.test.ts
import { resolveRegistrationStatus } from '../status';
import type { RegistrationRecord } from '../types';
import type { UserRejectionModel } from '@/services/api';

const record = (over: Partial<RegistrationRecord> = {}): RegistrationRecord => ({
  userId: 'u1', eventId: 'e1', fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT',
  schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null,
  status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null, ...over,
});
const rej = (over: Partial<UserRejectionModel> = {}): UserRejectionModel => ({
  id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'thiếu ảnh thẻ',
  createdTime: '2026-06-24T00:00:00Z', ...over,
});

describe('resolveRegistrationStatus', () => {
  test('no record, no rejection → not registered (null)', () => {
    expect(resolveRegistrationStatus(null, [])).toEqual({ status: null, reason: null });
  });

  test('record pending → pending', () => {
    expect(resolveRegistrationStatus(record(), [])).toEqual({ status: 'pending', reason: null });
  });

  test('record approved → approved', () => {
    expect(resolveRegistrationStatus(record({ status: 'approved' }), []))
      .toEqual({ status: 'approved', reason: null });
  });

  test('rejection newer than submission → rejected with reason', () => {
    expect(resolveRegistrationStatus(record(), [rej()]))
      .toEqual({ status: 'rejected', reason: 'thiếu ảnh thẻ' });
  });

  test('resubmit: rejection OLDER than new submission → not rejected (pending)', () => {
    const r = record({ submittedAt: '2026-06-25T00:00:00Z' });
    expect(resolveRegistrationStatus(r, [rej({ createdTime: '2026-06-24T00:00:00Z' })]))
      .toEqual({ status: 'pending', reason: null });
  });

  test('multiple rejections → uses the latest', () => {
    const out = resolveRegistrationStatus(record(), [
      rej({ id: 'old', reason: 'cũ', createdTime: '2026-06-23T12:00:00Z' }),
      rej({ id: 'new', reason: 'mới', createdTime: '2026-06-24T12:00:00Z' }),
    ]);
    expect(out).toEqual({ status: 'rejected', reason: 'mới' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/__tests__/status.test.ts`
Expected: FAIL — cannot find module `../status`.

- [ ] **Step 3: Implement resolver**

```ts
// src/features/registration/status.ts
import type { RegistrationRecord, RegistrationStatus } from './types';
import type { UserRejectionModel } from '@/services/api';

export interface ResolvedRegistration {
  /** null ⇒ chưa đăng ký (hiện form). */
  status: RegistrationStatus | null;
  reason: string | null;
}

export function resolveRegistrationStatus(
  record: RegistrationRecord | null,
  rejections: UserRejectionModel[],
): ResolvedRegistration {
  const latest = rejections.length
    ? [...rejections].sort((a, b) => b.createdTime.localeCompare(a.createdTime))[0]
    : null;

  // Bị từ chối nếu có rejection và nó KHÔNG cũ hơn lần gửi gần nhất.
  if (latest && (!record || latest.createdTime >= record.submittedAt)) {
    return { status: 'rejected', reason: latest.reason };
  }
  if (!record) return { status: null, reason: null };
  if (record.status === 'approved') return { status: 'approved', reason: null };
  return { status: 'pending', reason: null };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/features/registration/__tests__/status.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/features/registration/status.ts src/features/registration/__tests__/status.test.ts
git commit -m "feat(registration): pure status resolver (hybrid local + UserRejections)"
```

---

### Task 4: `getEventTabs` — add register tab + gate createTeam

**Files:**
- Modify: `src/lib/events/getEventTabs.ts`
- Modify (update existing): `src/lib/events/__tests__/getEventTabs.test.ts`

**Interfaces:**
- Consumes: `RegistrationStatus` (Task 2), `AppRole`.
- Produces:
  - `EventTabId` now includes `'register'`.
  - `getEventTabs(args: { role: AppRole | null; hasTeam: boolean; registrationStatus?: RegistrationStatus | null }): EventTab[]`

- [ ] **Step 1: Update the test (it will fail against current impl)**

Thay toàn bộ nội dung `src/lib/events/__tests__/getEventTabs.test.ts`:

```ts
import { getEventTabs } from '../getEventTabs';

describe('getEventTabs', () => {
  test('guest → detail only', () => {
    expect(getEventTabs({ role: null, hasTeam: false }).map((t) => t.id)).toEqual(['detail']);
  });

  test('student not approved → detail + register (no createTeam)', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'pending' }).map((t) => t.id))
      .toEqual(['detail', 'register']);
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: null }).map((t) => t.id))
      .toEqual(['detail', 'register']);
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'rejected' }).map((t) => t.id))
      .toEqual(['detail', 'register']);
  });

  test('student approved without team → detail + register + createTeam + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'approved' }).map((t) => t.id))
      .toEqual(['detail', 'register', 'createTeam', 'leaderboard']);
  });

  test('student with team → detail + register + myTeam + submission + results + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: true, registrationStatus: 'approved' }).map((t) => t.id))
      .toEqual(['detail', 'register', 'myTeam', 'submission', 'results', 'leaderboard']);
  });

  test('judge → detail + judgeAssigned + leaderboard', () => {
    expect(getEventTabs({ role: 'judge', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'judgeAssigned', 'leaderboard']);
  });

  test('admin → detail only (admins are redirected to the manage page)', () => {
    expect(getEventTabs({ role: 'admin', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/lib/events/__tests__/getEventTabs.test.ts`
Expected: FAIL — `register` not produced / `registrationStatus` unknown.

- [ ] **Step 3: Implement the change**

Thay `src/lib/events/getEventTabs.ts`:

```ts
import type { AppRole } from '@/hooks/useUserRole';
import type { RegistrationStatus } from '@/features/registration/types';

export type EventTabId =
  | 'detail' | 'register' | 'createTeam' | 'myTeam' | 'submission'
  | 'results' | 'leaderboard' | 'judgeAssigned' | 'manage';

export interface EventTab { id: EventTabId; label: string; }

const TAB: Record<EventTabId, EventTab> = {
  detail:        { id: 'detail',        label: 'Chi tiết sự kiện' },
  register:      { id: 'register',      label: 'Đăng ký thi đấu' },
  createTeam:    { id: 'createTeam',    label: 'Tạo đội' },
  myTeam:        { id: 'myTeam',        label: 'Đội của tôi' },
  submission:    { id: 'submission',    label: 'Nộp bài' },
  results:       { id: 'results',       label: 'Kết quả' },
  leaderboard:   { id: 'leaderboard',   label: 'Bảng xếp hạng' },
  judgeAssigned: { id: 'judgeAssigned', label: 'Đội được phân công' },
  manage:        { id: 'manage',        label: 'Quản lý' },
};

export function getEventTabs(args: {
  role: AppRole | null;
  hasTeam: boolean;
  registrationStatus?: RegistrationStatus | null;
}): EventTab[] {
  const { role, hasTeam, registrationStatus = null } = args;
  if (role === 'admin') return [TAB.detail];
  if (role === 'judge') return [TAB.detail, TAB.judgeAssigned, TAB.leaderboard];
  if (role === 'student') {
    if (hasTeam) {
      return [TAB.detail, TAB.register, TAB.myTeam, TAB.submission, TAB.results, TAB.leaderboard];
    }
    // Tạo đội chỉ mở khi đã được duyệt.
    return registrationStatus === 'approved'
      ? [TAB.detail, TAB.register, TAB.createTeam, TAB.leaderboard]
      : [TAB.detail, TAB.register];
  }
  return [TAB.detail];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/lib/events/__tests__/getEventTabs.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/events/getEventTabs.ts src/lib/events/__tests__/getEventTabs.test.ts
git commit -m "feat(events): add register tab + gate createTeam behind approval"
```

---

### Task 5: `useRegistration` hook

**Files:**
- Create: `src/features/registration/hooks/useRegistration.ts`
- Test: `src/features/registration/hooks/__tests__/useRegistration.test.tsx`

**Interfaces:**
- Consumes: `registrationStore` (Task 2), `userRejectionsApi` (Task 1), `resolveRegistrationStatus` (Task 3), react-query.
- Produces:
  - `useRegistration(eventId: string, userId: string)` returns:
    `{ status: RegistrationStatus | null; reason: string | null; record: RegistrationRecord | null; isLoading: boolean; submit: (values: RegistrationFormValues, submittedAt: string) => void; resubmit: () => void }`

> Note: `submit` nhận `submittedAt` (ISO) từ component để lib không gọi `new Date()`. Component truyền `new Date().toISOString()`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/registration/hooks/__tests__/useRegistration.test.tsx
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRegistration } from '../useRegistration';
import { registrationStore } from '../../api/registrationStore';
import { userRejectionsApi } from '../../api/userRejections';

jest.mock('../../api/userRejections');
const mockRejections = userRejectionsApi as jest.Mocked<typeof userRejectionsApi>;

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useRegistration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    mockRejections.listForUser.mockResolvedValue([]);
  });

  test('no record → status null (chưa đăng ký)', async () => {
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.status).toBeNull();
  });

  test('submit saves a pending record', async () => {
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => {
      result.current.submit(
        { fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT', schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null },
        '2026-06-23T00:00:00Z',
      );
    });
    await waitFor(() => expect(result.current.status).toBe('pending'));
    expect(registrationStore.get('u1', 'e1')?.studentCode).toBe('SE1');
  });

  test('rejection from API → status rejected with reason', async () => {
    registrationStore.save({
      userId: 'u1', eventId: 'e1', fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT',
      schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null,
      status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null,
    });
    mockRejections.listForUser.mockResolvedValue([
      { id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'sai MSSV', createdTime: '2026-06-24T00:00:00Z' },
    ]);
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('rejected'));
    expect(result.current.reason).toBe('sai MSSV');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/hooks/__tests__/useRegistration.test.tsx`
Expected: FAIL — cannot find module `../useRegistration`.

- [ ] **Step 3: Implement the hook**

```ts
// src/features/registration/hooks/useRegistration.ts
'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { registrationStore } from '../api/registrationStore';
import { userRejectionsApi } from '../api/userRejections';
import { resolveRegistrationStatus } from '../status';
import type { RegistrationFormValues } from '../types';

export const REGISTRATION_KEYS = {
  record: (userId: string, eventId: string) => ['registration', userId, eventId] as const,
  rejections: (userId: string) => ['userRejections', userId] as const,
};

export function useRegistration(eventId: string, userId: string) {
  const qc = useQueryClient();
  const enabled = !!eventId && !!userId;

  const recordQ = useQuery({
    queryKey: REGISTRATION_KEYS.record(userId, eventId),
    queryFn: async () => registrationStore.get(userId, eventId),
    enabled,
    staleTime: 0,
  });

  const rejectionsQ = useQuery({
    queryKey: REGISTRATION_KEYS.rejections(userId),
    queryFn: () => userRejectionsApi.listForUser(userId),
    enabled,
    staleTime: 60_000,
  });

  const resolved = resolveRegistrationStatus(recordQ.data ?? null, rejectionsQ.data ?? []);

  const submit = (values: RegistrationFormValues, submittedAt: string) => {
    registrationStore.save({
      ...values,
      userId,
      eventId,
      status: 'pending',
      submittedAt,
      decidedAt: null,
    });
    qc.invalidateQueries({ queryKey: REGISTRATION_KEYS.record(userId, eventId) });
  };

  const resubmit = () => {
    registrationStore.remove(userId, eventId);
    qc.invalidateQueries({ queryKey: REGISTRATION_KEYS.record(userId, eventId) });
  };

  return {
    status: resolved.status,
    reason: resolved.reason,
    record: recordQ.data ?? null,
    isLoading: recordQ.isLoading || rejectionsQ.isLoading,
    submit,
    resubmit,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/features/registration/hooks/__tests__/useRegistration.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/features/registration/hooks/useRegistration.ts src/features/registration/hooks/__tests__/useRegistration.test.tsx
git commit -m "feat(registration): useRegistration hook"
```

---

### Task 6: `RegistrationForm` component

**Files:**
- Create: `src/features/registration/components/RegistrationForm.tsx`
- Test: `src/features/registration/components/__tests__/RegistrationForm.test.tsx`

**Interfaces:**
- Consumes: `storageApi.upload` (real, từ `@/services/api`), `RegistrationFormValues`.
- Produces: `RegistrationForm({ defaults, onSubmit }: { defaults: { fullName: string; email: string }; onSubmit: (values: RegistrationFormValues) => void })` — uploads card (if any) before calling `onSubmit` with the resolved `photoStudentCardUrl`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/registration/components/__tests__/RegistrationForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';

describe('RegistrationForm', () => {
  test('prefills name/email and submits FPT values without upload', async () => {
    const onSubmit = jest.fn();
    render(<RegistrationForm defaults={{ fullName: 'Nguyễn Văn A', email: 'a@e.com' }} onSubmit={onSubmit} />);

    expect((screen.getByLabelText(/Họ và tên/i) as HTMLInputElement).value).toBe('Nguyễn Văn A');

    fireEvent.change(screen.getByLabelText(/Mã số sinh viên/i), { target: { value: 'SE123' } });
    fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      fullName: 'Nguyễn Văn A', email: 'a@e.com', schoolChoice: 'FPT', studentCode: 'SE123',
      photoStudentCardUrl: null,
    }));
  });

  test('blocks submit when MSSV empty', () => {
    const onSubmit = jest.fn();
    render(<RegistrationForm defaults={{ fullName: 'A', email: 'a@e.com' }} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Vui lòng nhập mã số sinh viên/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/components/__tests__/RegistrationForm.test.tsx`
Expected: FAIL — cannot find module `../RegistrationForm`.

- [ ] **Step 3: Implement the component**

```tsx
// src/features/registration/components/RegistrationForm.tsx
'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { storageApi } from '@/services/api';
import type { RegistrationFormValues } from '../types';

interface Props {
  defaults: { fullName: string; email: string };
  onSubmit: (values: RegistrationFormValues) => void;
}

export function RegistrationForm({ defaults, onSubmit }: Props) {
  const [fullName, setFullName] = useState(defaults.fullName);
  const [email, setEmail] = useState(defaults.email);
  const [schoolChoice, setSchoolChoice] = useState<'FPT' | 'OTHER'>('FPT');
  const [schoolName, setSchoolName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [note, setNote] = useState('');
  const [card, setCard] = useState<{ preview: string; file: File } | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const needsCard = schoolChoice === 'OTHER';

  function selectCard(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Vui lòng chọn một file ảnh hợp lệ.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Ảnh thẻ không được vượt quá 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setError(''); setCard({ preview: reader.result as string, file }); };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!studentCode.trim()) { setError('Vui lòng nhập mã số sinh viên.'); return; }
    if (needsCard && !schoolName.trim()) { setError('Vui lòng nhập tên trường của bạn.'); return; }
    if (needsCard && !card) { setError('Vui lòng tải ảnh thẻ sinh viên.'); return; }

    let photoStudentCardUrl: string | null = null;
    if (card) {
      try {
        setUploading(true);
        photoStudentCardUrl = await storageApi.upload(card.file);
      } catch {
        setUploading(false);
        setError('Không tải được ảnh thẻ. Vui lòng thử lại.');
        return;
      }
      setUploading(false);
    }

    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      schoolChoice,
      schoolName: needsCard ? schoolName.trim() : null,
      studentCode: studentCode.trim(),
      photoStudentCardUrl,
      note: note.trim() || null,
    });
  }

  const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-mute)' };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-[36rem]">
      {error && <p className="t-caption-sm" style={{ color: 'var(--color-error)', margin: 0 }}>{error}</p>}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Họ và tên</span>
        <input className="text-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Email</span>
        <input className="text-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Trường</span>
        <select
          className="text-input"
          value={schoolChoice}
          onChange={(e) => setSchoolChoice(e.target.value as 'FPT' | 'OTHER')}
        >
          <option value="FPT">FPT</option>
          <option value="OTHER">Khác</option>
        </select>
      </label>

      {needsCard && (
        <label className="flex flex-col gap-1.5">
          <span style={labelStyle}>Tên trường</span>
          <input className="text-input" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="VD: Đại học Bách Khoa" />
        </label>
      )}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Mã số sinh viên</span>
        <input className="text-input" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} placeholder="VD: SE123456" />
      </label>

      {needsCard && (
        <div className="flex flex-col gap-1.5">
          <span style={labelStyle}>Ảnh thẻ sinh viên</span>
          {card ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.preview} alt="Ảnh thẻ sinh viên" className="w-24 h-16 object-cover rounded-sm border border-hairline" />
              <button type="button" className="t-caption-sm font-bold" style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setCard(null)}>Xóa</button>
            </div>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm w-fit" onClick={() => fileRef.current?.click()}>Tải ảnh thẻ</button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={selectCard} style={{ display: 'none' }} />
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Ghi chú (tùy chọn)</span>
        <textarea className="text-input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>

      <button type="submit" className="btn btn-primary w-fit" disabled={uploading}>
        {uploading ? 'Đang tải ảnh…' : 'Gửi đăng ký'}
      </button>
    </form>
  );
}
```

> The form's `<input>`/`<select>` are associated to their labels via wrapping `<label>`, so `getByLabelText` matches. If the repo's `getByLabelText` needs `htmlFor`/`id`, switch to wrapping (already wrapping here).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/features/registration/components/__tests__/RegistrationForm.test.tsx`
Expected: PASS (2 tests). If `storageApi` import pulls a real network in tests, it is not called for the FPT path (no card) — fine.

- [ ] **Step 5: Commit**

```bash
git add src/features/registration/components/RegistrationForm.tsx src/features/registration/components/__tests__/RegistrationForm.test.tsx
git commit -m "feat(registration): RegistrationForm with student-card upload"
```

---

### Task 7: `RegistrationStatusCard` component

**Files:**
- Create: `src/features/registration/components/RegistrationStatusCard.tsx`
- Test: `src/features/registration/components/__tests__/RegistrationStatusCard.test.tsx`

**Interfaces:**
- Consumes: `RegistrationRecord`, `RegistrationStatus`.
- Produces: `RegistrationStatusCard({ status, reason, record, onRegisterTeam, onResubmit }: { status: 'pending'|'approved'|'rejected'; reason: string | null; record: RegistrationRecord | null; onRegisterTeam: () => void; onResubmit: () => void })`

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/registration/components/__tests__/RegistrationStatusCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationStatusCard } from '../RegistrationStatusCard';
import type { RegistrationRecord } from '../../types';

const rec: RegistrationRecord = {
  userId: 'u1', eventId: 'e1', fullName: 'Nguyễn Văn A', email: 'a@e.com', schoolChoice: 'FPT',
  schoolName: null, studentCode: 'SE123', photoStudentCardUrl: null, note: null,
  status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null,
};

describe('RegistrationStatusCard', () => {
  test('pending shows chờ xét duyệt + submitted info', () => {
    render(<RegistrationStatusCard status="pending" reason={null} record={rec} onRegisterTeam={jest.fn()} onResubmit={jest.fn()} />);
    expect(screen.getByText(/Chờ xét duyệt/i)).toBeInTheDocument();
    expect(screen.getByText('SE123')).toBeInTheDocument();
  });

  test('approved shows CTA that calls onRegisterTeam', () => {
    const onRegisterTeam = jest.fn();
    render(<RegistrationStatusCard status="approved" reason={null} record={rec} onRegisterTeam={onRegisterTeam} onResubmit={jest.fn()} />);
    expect(screen.getByText(/Đã được duyệt/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Đăng ký đội/i }));
    expect(onRegisterTeam).toHaveBeenCalled();
  });

  test('rejected shows reason + resubmit', () => {
    const onResubmit = jest.fn();
    render(<RegistrationStatusCard status="rejected" reason="Ảnh thẻ không rõ" record={rec} onRegisterTeam={jest.fn()} onResubmit={onResubmit} />);
    expect(screen.getByText(/Tài khoản bị từ chối/i)).toBeInTheDocument();
    expect(screen.getByText(/Ảnh thẻ không rõ/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gửi lại/i }));
    expect(onResubmit).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/features/registration/components/__tests__/RegistrationStatusCard.test.tsx`
Expected: FAIL — cannot find module `../RegistrationStatusCard`.

- [ ] **Step 3: Implement the component**

```tsx
// src/features/registration/components/RegistrationStatusCard.tsx
'use client';

import type { RegistrationRecord } from '../types';

interface Props {
  status: 'pending' | 'approved' | 'rejected';
  reason: string | null;
  record: RegistrationRecord | null;
  onRegisterTeam: () => void;
  onResubmit: () => void;
}

const BADGE: Record<Props['status'], { label: string; bg: string; fg: string; bd: string }> = {
  pending:  { label: 'Chờ xét duyệt',      bg: 'var(--color-surface-soft)', fg: 'var(--color-stone)',   bd: 'var(--color-hairline-strong)' },
  approved: { label: 'Đã được duyệt',      bg: 'rgba(118,185,0,0.1)',       fg: 'var(--color-primary)', bd: 'var(--color-primary)' },
  rejected: { label: 'Tài khoản bị từ chối', bg: 'rgba(229,32,32,0.08)',     fg: 'var(--color-error)',   bd: 'var(--color-error)' },
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-hairline last:border-b-0">
      <span className="t-caption-sm text-mute">{label}</span>
      <span className="t-body-sm text-ink font-bold text-right">{value}</span>
    </div>
  );
}

export function RegistrationStatusCard({ status, reason, record, onRegisterTeam, onResubmit }: Props) {
  const badge = BADGE[status];
  return (
    <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-xl)', maxWidth: '40rem' }}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="t-heading-md m-0">Đăng ký thi đấu</h2>
        <span className="badge-tag" style={{ background: badge.bg, color: badge.fg, border: `1px solid ${badge.bd}` }}>
          {badge.label}
        </span>
      </div>

      {status === 'rejected' && reason && (
        <p className="t-body-sm m-0" style={{ color: 'var(--color-error)' }}>Lý do: {reason}</p>
      )}

      {record && (
        <div className="flex flex-col">
          <Row label="Họ và tên" value={record.fullName || '—'} />
          <Row label="Email" value={record.email || '—'} />
          <Row label="Trường" value={record.schoolChoice === 'FPT' ? 'FPT University' : record.schoolName || '—'} />
          <Row label="MSSV" value={record.studentCode || '—'} />
          {record.note && <Row label="Ghi chú" value={record.note} />}
          {record.photoStudentCardUrl && (
            <div className="py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={record.photoStudentCardUrl} alt="Ảnh thẻ sinh viên" className="w-40 h-28 object-cover rounded-sm border border-hairline" />
            </div>
          )}
        </div>
      )}

      {status === 'approved' && (
        <button type="button" className="btn btn-primary w-fit" onClick={onRegisterTeam}>Đăng ký đội</button>
      )}
      {status === 'rejected' && (
        <button type="button" className="btn btn-secondary w-fit" onClick={onResubmit}>Gửi lại</button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/features/registration/components/__tests__/RegistrationStatusCard.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/features/registration/components/RegistrationStatusCard.tsx src/features/registration/components/__tests__/RegistrationStatusCard.test.tsx
git commit -m "feat(registration): RegistrationStatusCard (3 states)"
```

---

### Task 8: `CompetitionRegistrationTab` orchestrator + wire into dashboard

**Files:**
- Create: `src/features/registration/components/CompetitionRegistrationTab.tsx`
- Modify: `src/features/events/components/EventDashboard/Sidebar.tsx`
- Modify: `src/features/events/components/EventDashboard/EventDashboard.tsx`

**Interfaces:**
- Consumes: `useRegistration` (Task 5), `RegistrationForm` (Task 6), `RegistrationStatusCard` (Task 7), `useCurrentUser`, `useEventDashboard` (for `setActiveTab`).
- Produces: `CompetitionRegistrationTab({ eventId, userId }: { eventId: string; userId: string })`.

- [ ] **Step 1: Implement the orchestrator**

```tsx
// src/features/registration/components/CompetitionRegistrationTab.tsx
'use client';

import { useRegistration } from '../hooks/useRegistration';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationStatusCard } from './RegistrationStatusCard';
import { useCurrentUser } from '@/hooks/useAuth';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

interface Props { eventId: string; userId: string; }

export function CompetitionRegistrationTab({ eventId, userId }: Props) {
  const { data: user } = useCurrentUser();
  const { setActiveTab } = useEventDashboard();
  const { status, reason, record, isLoading, submit, resubmit } = useRegistration(eventId, userId);

  if (isLoading) return <div className="t-body-md text-mute p-6">Đang tải…</div>;

  // Chưa đăng ký → hiện form.
  if (status === null) {
    return (
      <div className="p-1 md:p-2">
        <h2 className="t-heading-md mb-4">Đăng ký thi đấu</h2>
        <RegistrationForm
          defaults={{ fullName: user?.fullName ?? '', email: user?.email ?? '' }}
          onSubmit={(values) => submit(values, new Date().toISOString())}
        />
      </div>
    );
  }

  return (
    <div className="p-1 md:p-2">
      <RegistrationStatusCard
        status={status}
        reason={reason}
        record={record}
        onRegisterTeam={() => setActiveTab('createTeam')}
        onResubmit={resubmit}
      />
    </div>
  );
}
```

- [ ] **Step 2: Wire the Sidebar (icon + pass registrationStatus)**

Sửa `src/features/events/components/EventDashboard/Sidebar.tsx`:

1. Thêm import icon + hook:
```tsx
import {
  BarChart3, Upload, Trophy, Users, UserPlus, ClipboardList, FileText, Settings, ClipboardCheck,
} from 'lucide-react';
import { useRegistration } from '@/features/registration/hooks/useRegistration';
```
2. Thêm vào `ICON`:
```tsx
  register:      ClipboardCheck,
```
3. Trong body, sau `const { data: team } = ...`:
```tsx
  const { status: registrationStatus } = useRegistration(eventId, user?.id ?? '');
  const tabs = getEventTabs({ role, hasTeam: !!team, registrationStatus });
```
(thay dòng `const tabs = getEventTabs({ role, hasTeam: !!team });`)

- [ ] **Step 3: Wire EventDashboard render**

Sửa `src/features/events/components/EventDashboard/EventDashboard.tsx`:

1. Import:
```tsx
import { CompetitionRegistrationTab } from '@/features/registration/components/CompetitionRegistrationTab';
```
2. Thêm case trong `renderTabContent` switch (ngay sau `case 'detail'`):
```tsx
      case 'register':      return <CompetitionRegistrationTab eventId={eventId} userId={userId} />;
```

- [ ] **Step 4: Type-check + run full suite**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors.

Run: `npx jest src/features/registration src/lib/events`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/registration/components/CompetitionRegistrationTab.tsx src/features/events/components/EventDashboard/Sidebar.tsx src/features/events/components/EventDashboard/EventDashboard.tsx
git commit -m "feat(registration): tab orchestrator wired into student event dashboard"
```

---

### Task 9: Defensive gate on CreateTeam tab

**Files:**
- Modify: `src/features/events/components/EventDashboard/tabs/CreateTeam.tsx`

**Interfaces:**
- Consumes: `useRegistration` (Task 5), `useEventDashboard`.

- [ ] **Step 1: Add the guard**

Sửa `CreateTeamTab` trong `src/features/events/components/EventDashboard/tabs/CreateTeam.tsx`:

1. Import:
```tsx
import { useRegistration } from '@/features/registration/hooks/useRegistration';
```
2. Đầu component (sau `const create = useCreateTeam(...)`):
```tsx
  const { status: registrationStatus } = useRegistration(eventId, userId);
```
3. Ngay trước `return (` chính, thêm chặn:
```tsx
  if (registrationStatus !== 'approved') {
    return (
      <div className="p-6 max-w-[36rem] mx-auto border border-hairline rounded-sm bg-canvas flex flex-col gap-3">
        <h2 className="t-heading-md m-0">Tạo đội</h2>
        <p className="t-body-sm text-mute m-0">
          Bạn cần được duyệt đăng ký thi đấu trước khi tạo đội.
        </p>
        <button type="button" className="btn btn-primary w-fit" onClick={() => setActiveTab('register')}>
          Tới đăng ký thi đấu
        </button>
      </div>
    );
  }
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/events/components/EventDashboard/tabs/CreateTeam.tsx
git commit -m "feat(registration): defensive approval gate on CreateTeam tab"
```

---

### Task 10: Admin "Từ chối" records a UserRejection

**Files:**
- Modify: `src/features/events/components/AdminEventDashboard/tabs/AccountApprovalTab.tsx`

**Interfaces:**
- Consumes: `userRejectionsApi.create` (Task 1), `useCurrentUser`.

- [ ] **Step 1: Implement the change**

Sửa `AccountApprovalTab.tsx`:

1. Import:
```tsx
import { useCurrentUser } from '@/hooks/useAuth';
import { userRejectionsApi } from '@/features/registration/api/userRejections';
```
2. Trong component, thêm:
```tsx
  const { data: admin } = useCurrentUser();
```
3. Đổi `rejectMutation` để ghi UserRejection (kèm lý do) TRƯỚC khi xóa role. `mutationFn` nhận thêm `reason`:
```tsx
  const rejectMutation = useMutation({
    mutationFn: async ({ r, reason }: { r: Registrant; reason: string }) => {
      if (admin?.id) {
        await userRejectionsApi.create({ userId: r.userId, rejectedBy: admin.id, reason });
      }
      await Promise.all(r.roleIds.map((id) => manageApi.removeRole(id)));
    },
    onSuccess: () => {
      setActionError(null);
      invalidate();
    },
    onError: onErr,
  });
```
4. Sửa `pendingUserId` để đọc đúng biến mới:
```tsx
  const pendingUserId = approveMutation.isPending
    ? approveMutation.variables?.userId
    : rejectMutation.isPending
      ? rejectMutation.variables?.r.userId
      : undefined;
```
5. Sửa nút "Từ chối" onClick để hỏi lý do và truyền vào:
```tsx
                              onClick={() => {
                                if (typeof window === 'undefined') return;
                                const reason = window.prompt(
                                  `Lý do từ chối đăng ký của ${r.user.fullName || r.user.email || 'tài khoản này'}:`,
                                  '',
                                );
                                if (reason === null) return; // hủy
                                setActionError(null);
                                rejectMutation.mutate({ r, reason: reason.trim() });
                              }}
```
6. Sửa nhãn busy của nút "Từ chối" (đang dùng `rejectMutation.isPending`) — giữ nguyên, vẫn hợp lệ.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors.

- [ ] **Step 3: Manual smoke (optional, documented)**

Đăng nhập admin → mở 1 sự kiện → `/events/[id]/manage` → tab "Xét duyệt tài khoản" → "Từ chối" một tài khoản → nhập lý do. Kỳ vọng: gọi `POST /UserRejections` (kiểm tra Network) + tài khoản biến mất khỏi danh sách chờ.

- [ ] **Step 4: Commit**

```bash
git add src/features/events/components/AdminEventDashboard/tabs/AccountApprovalTab.tsx
git commit -m "feat(events): admin reject records a UserRejection with reason"
```

---

### Task 11: Final verification

- [ ] **Step 1: Full test suite**

Run: `npx jest`
Expected: all green (incl. updated `getEventTabs` + new registration tests).

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit -p tsconfig.json && npx eslint src/features/registration src/lib/events/getEventTabs.ts src/features/events/components/EventDashboard src/features/events/components/AdminEventDashboard/tabs/AccountApprovalTab.tsx`
Expected: no errors.

- [ ] **Step 3: Commit any lint fixes**

```bash
git add -A
git commit -m "chore(registration): lint + type fixes"
```

---

## Self-Review (author notes)

**Spec coverage:**
- §3.1/§3.2 tab + gating → Task 4, 8. §3.3 module → Tasks 1–8. §4 data model → Task 1, 2. §5 resolver → Task 3, 5. §6 UI → Task 6, 7. §7 gate Tạo đội → Task 4 (ẩn tab) + Task 9 (defensive). §8 admin reject → Task 10. §10 testing → mỗi task có test; Task 11 chạy toàn bộ. §9 hạn chế: ghi trong spec, không cần code (approved cross-device là future backend work).
- Gap đã biết & chấp nhận: "approved" phía student vẫn dựa store (không sync thật khi admin duyệt máy khác) — đúng theo §9 spec.

**Type consistency:** `RegistrationFormValues`, `RegistrationRecord`, `RegistrationStatus`, `UserRejectionModel`, `resolveRegistrationStatus`, `useRegistration` signatures khớp giữa các task. `getEventTabs` thêm `registrationStatus?` optional — các caller cũ (test judge/admin/guest) vẫn hợp lệ.

**Placeholder scan:** không có TODO/TBD; mọi step có code/lệnh cụ thể.
