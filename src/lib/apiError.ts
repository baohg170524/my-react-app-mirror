import type { AxiosError } from 'axios';

interface ApiErrorBody {
  message?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Extract a user-facing message from a failed API call.
 *
 * Priority: field-level validation errors → backend `message` → caller's
 * action-specific fallback → a status-aware generic message. Raw .NET
 * exception strings ("... Exception ...", "... was thrown") are treated as
 * non-user-facing and skipped.
 */
export function getErrorMessage(e: unknown, fallback?: string): string {
  const res = (e as AxiosError<ApiErrorBody>)?.response;
  const data = res?.data;

  // 1. Field-level validation errors from the backend.
  const fieldMsgs = data?.errors ? Object.values(data.errors).flat() : [];
  if (fieldMsgs.length) return fieldMsgs.join(' ');

  // 2. A human-readable message from the backend.
  if (data?.message && !/Exception|was thrown/i.test(data.message)) {
    return data.message;
  }

  // 3. Caller's action-specific fallback (e.g. "Tạo sự kiện thất bại…").
  if (fallback) return fallback;

  // 4. No response at all → the request never reached / returned from the server.
  if (!res) {
    return 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng rồi thử lại.';
  }

  // 5. Status-aware generic message. For 4xx the request itself is invalid,
  //    so "thử lại" with the same input would just fail again.
  const status = res.status ?? data?.statusCode;
  if (status === 401 || status === 403) {
    return 'Bạn không có quyền thực hiện thao tác này.';
  }
  if (status && status >= 400 && status < 500) {
    return 'Thao tác không hợp lệ. Vui lòng kiểm tra lại thông tin đã nhập.';
  }
  return 'Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.';
}
