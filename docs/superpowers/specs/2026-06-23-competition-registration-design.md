# Đăng ký thi đấu (Competition Registration) — Student flow

**Date:** 2026-06-23
**Status:** Draft → awaiting user review
**Scope:** Frontend. Một endpoint backend (`/api/UserRejections`) được dùng thật; phần còn lại lưu ở frontend store vì backend chưa có API self-service cho đăng ký sự kiện.

---

## 1. Goal

Thêm cho **role student** một màn hình **"Đăng ký thi đấu"** theo **từng sự kiện**:

1. Sinh viên gửi thông tin đăng ký + **chứng minh là học sinh** (ảnh thẻ sinh viên).
2. Sau khi gửi, hiển thị **toàn bộ thông tin đã gửi** kèm **trạng thái**:
   - **Chờ xét duyệt** (vừa gửi)
   - **Đã được duyệt**
   - **Tài khoản bị từ chối** (kèm lý do)
3. **Chỉ tài khoản đã được duyệt mới được "Đăng ký đội"** (tạo đội) trong sự kiện đó.

Admin duyệt/từ chối **tái dùng** phần "Xét duyệt tài khoản" đã có, có bổ sung ghi `UserRejections`.

## 2. Ràng buộc backend (đã rà API_DOCS.md)

| Nhu cầu | Endpoint | Khả thi từ phiên student? |
|---|---|---|
| Trạng thái "từ chối" + lý do | `/api/UserRejections` (`GET /user/{userId}`, `POST /`, `PUT /{id}`) | ✅ Đọc/ghi thật |
| Ghi bản ghi đăng ký | (không có endpoint self-service) | ❌ → frontend store |
| Đọc trạng thái duyệt (`isApproved`) | `/api/Users` chỉ **admin**; login **không** trả `isApproved` | ❌ → suy ra ở frontend |
| Tự gán role vào sự kiện | `/api/EventRoles/assign` chỉ **EventCoordinator** | ❌ |

⇒ **Hướng dữ liệu: hybrid.** "Từ chối" làm **thật** qua `UserRejections`; bản ghi đăng ký + trạng thái chờ/đã-duyệt lưu ở **frontend store (localStorage)**. Ảnh thẻ upload qua **Storage API thật**.

## 3. Kiến trúc & vị trí

### 3.1 Điều hướng (tab trong menu sự kiện của student)
- `/events/[id]` dùng tab điều khiển bởi `getEventTabs({ role, hasTeam })` (xem [getEventTabs.ts](../../../src/lib/events/getEventTabs.ts)).
- Thêm tab id `register` nhãn **"Đăng ký thi đấu"**, đặt **ngay sau `detail`**.
- `getEventTabs` nhận thêm tham số `registrationStatus: RegistrationStatus | null` để **gate `createTeam`**:

| Tình huống student | Tabs |
|---|---|
| Chưa duyệt (pending/rejected/chưa đăng ký) | `detail, register` |
| Đã duyệt, chưa có đội | `detail, register, createTeam, leaderboard` |
| Có đội | `detail, register, myTeam, submission, results, leaderboard` |

> Lưu ý: `judge`/`admin` không đổi. Admin vẫn redirect sang `/events/[id]/manage`.

### 3.2 Điểm sửa
- [getEventTabs.ts](../../../src/lib/events/getEventTabs.ts): thêm `register` vào `EventTabId` + `TAB`; thêm tham số `registrationStatus`; logic gate ở trên.
- [Sidebar.tsx](../../../src/features/events/components/EventDashboard/Sidebar.tsx): thêm `register` vào `ICON` (icon `ClipboardCheck`); truyền `registrationStatus` vào `getEventTabs` (đọc qua `useRegistration`).
- [EventDashboard.tsx](../../../src/features/events/components/EventDashboard/EventDashboard.tsx): thêm `case 'register': return <CompetitionRegistrationTab eventId={eventId} userId={userId} />`.

### 3.3 Module mới `src/features/registration/`
```
src/features/registration/
  types.ts                              # RegistrationRecord, RegistrationStatus
  api/registrationStore.ts              # localStorage CRUD, key reg:{userId}:{eventId}
  api/userRejections.ts                 # client thật: /api/UserRejections
  hooks/useRegistration.ts              # react-query: hợp nhất store + rejection
  components/CompetitionRegistrationTab.tsx   # orchestrator: form ↔ status
  components/RegistrationForm.tsx
  components/RegistrationStatusCard.tsx
  __tests__/useRegistration.test.ts     # resolver logic
  __tests__/getEventTabs.test.ts        # gating (mở rộng test sẵn có nếu có)
```

## 4. Mô hình dữ liệu

```ts
// types.ts
export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRecord {
  userId: string;
  eventId: string;
  fullName: string;
  email: string;
  schoolChoice: 'FPT' | 'OTHER';
  schoolName: string | null;        // khi OTHER
  studentCode: string;
  photoStudentCardUrl: string | null;
  note: string | null;
  status: 'pending' | 'approved';   // 'rejected' KHÔNG lưu ở store — suy từ UserRejections
  submittedAt: string;              // ISO; truyền vào hook, KHÔNG dùng Date.now() trong lib thuần
  decidedAt: string | null;
}
```

- `registrationStore`: `get(userId,eventId)`, `save(record)`, `setStatus(userId,eventId,status,decidedAt)`, `remove(userId,eventId)`. Bọc try/catch JSON, no-op khi SSR (`typeof window === 'undefined'`).
- `userRejections` (thật):
  - `listForUser(userId)` → `GET /api/UserRejections/user/{userId}` → `UserRejectionModel[]`.
  - `create({ userId, rejectedBy, reason })` → `POST /api/UserRejections`.
  - Thêm types vào `src/services/api/types.ts`: `UserRejectionModel { id; userId; rejectedBy; reason: string|null; createdTime; ... }`.

## 5. Resolver trạng thái (`useRegistration(eventId, userId)`)

Thứ tự ưu tiên:
1. `GET /UserRejections/user/{userId}` → nếu có ≥1 bản ghi (mới hơn `submittedAt` nếu có record) ⇒ **`rejected`** (+ `reason` của bản mới nhất).
2. Ngược lại đọc store:
   - không có record ⇒ **chưa đăng ký** (hiện form).
   - `record.status === 'approved'` ⇒ **`approved`**.
   - còn lại ⇒ **`pending`**.

Hook trả về: `{ status, record, rejection, isLoading, submit(values), resubmit() }`.

- `submit(values)`: upload ảnh thẻ (nếu có) → Storage thật → `registrationStore.save({...values, status:'pending', submittedAt})` → invalidate query. `submittedAt` lấy từ `new Date().toISOString()` **trong hook/component** (không trong lib thuần để dễ test).
- `resubmit()` (khi rejected): xóa record local + cho nhập lại form. (Bản ghi UserRejection cũ vẫn còn ở backend; resolver so theo thời gian — xem §9 Hạn chế.)

## 6. UI

### 6.1 `RegistrationForm`
Prefill từ `useCurrentUser()`: Họ tên, Email. Trường: select **FPT / Khác** (giống `/auth`); khi "Khác" hiện ô **Tên trường** + bắt buộc **upload ảnh thẻ**. MSSV bắt buộc. Ô **Ghi chú** (tùy chọn). Tái dùng pattern upload/validate (≤5MB, image/*) từ [auth/page.tsx](../../../src/app/auth/page.tsx) (cân nhắc tách `CardUpload` dùng chung nếu gọn).

### 6.2 `RegistrationStatusCard`
Hiện bảng **toàn bộ thông tin đã gửi** (ảnh thẻ xem phóng to như AccountApprovalTab) + badge:
- `pending` → vàng, "Chờ xét duyệt".
- `approved` → xanh, "Đã được duyệt" + nút **"Đăng ký đội"** (chuyển `activeTab='createTeam'`).
- `rejected` → đỏ, "Tài khoản bị từ chối", hiện **lý do**, nút **"Gửi lại"** → `resubmit()`.

Tái dùng token màu/Card hiện có (`Card`, `Badge`).

## 7. Gate "Tạo đội"
- `getEventTabs` ẩn `createTeam` khi `registrationStatus !== 'approved'`.
- Phòng vệ tầng 2: nếu vào thẳng tab `createTeam` mà chưa duyệt, [CreateTeam.tsx](../../../src/features/events/components/EventDashboard/tabs/CreateTeam.tsx) hiện thông báo + nút sang tab "Đăng ký thi đấu".

## 8. Admin từ chối (sửa AccountApprovalTab)
[AccountApprovalTab.tsx](../../../src/features/events/components/AdminEventDashboard/tabs/AccountApprovalTab.tsx) — nút **"Từ chối"**:
1. Nhập **lý do** (prompt hoặc ô nhập nhỏ).
2. `POST /UserRejections { userId, rejectedBy: <adminUserId>, reason }`.
3. Vẫn `removeRole` các EventRole như hiện tại.
4. `onError` dùng `errMsg` sẵn có; invalidate như cũ.

`rejectedBy` lấy từ `useCurrentUser().id` (admin đang đăng nhập). "Duyệt" giữ nguyên (`isApproved=true`).

## 9. Hạn chế đã biết (future backend work)
- **Đồng bộ "đã được duyệt" cross-device:** student không đọc được `isApproved` (Users admin-only; login không trả). Nên khi admin duyệt ở máy khác, store local của student **không tự cập nhật**. Khắc phục: backend trả `isApproved` trong login **hoặc** thêm `GET /Users/me`. Resolver (§5) tách riêng để cắm nguồn approved thật về sau mà không đổi UI.
- **Resubmit sau khi bị từ chối:** bản ghi `UserRejections` cũ vẫn tồn tại ⇒ resolver so `createdTime` của rejection với `submittedAt` của record mới để không hiện "từ chối" nhầm cho lần gửi lại. Nếu backend mong muốn, có thể `DELETE /UserRejections/{id}` khi gửi lại (tùy chọn, không bắt buộc đợt này).
- Đăng ký không tạo `EventRole` thật (student không có quyền) ⇒ admin "thấy" đăng ký qua dữ liệu sẵn có/seed, không qua submission này.

## 10. Testing
- Unit (lib thuần, không I/O): `getEventTabs` gating theo `registrationStatus`; resolver trạng thái trong `useRegistration` (mock store + rejection list) cho 4 ca: chưa đăng ký / pending / approved / rejected; ca resubmit (rejection cũ + submit mới).
- Component: `RegistrationStatusCard` render đúng badge + CTA theo từng status.
- Manual: đăng nhập student → mở 1 sự kiện → tab "Đăng ký thi đấu" → gửi → thấy pending → (đổi store/giả lập) approved mở "Tạo đội"; admin "Từ chối" → student thấy "bị từ chối" + lý do.

## 11. Out of scope
- Thay đổi luồng đăng ký tài khoản ở `/auth`.
- Đồng bộ approved cross-device (cần backend — §9).
- Tạo `EventRole` self-service cho student.
- Thay đổi UI admin ngoài việc bổ sung ghi `UserRejections` ở nút Từ chối.
