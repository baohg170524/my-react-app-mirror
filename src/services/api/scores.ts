import apiClient from "./client";
import type { PagedResult } from "./types";

// ─── Score types ──────────────────────────────────────────────────────────────

export interface ScoreDetail {
  id: string;
  scoreId?: string | null;
  templateId?: string | null;
  criteriaId: string | null;
  /** BE dùng `value` (không phải `score`) cho điểm từng tiêu chí. */
  value: number;
}

export interface Score {
  id: string;
  eventRoleId: string | null;
  submitResultId: string | null;
  totalScore: number;
}

/** Returned by GET /api/Scores/{id}/detail */
export interface ScoreWithDetails extends Score {
  details: ScoreDetail[];
}

// ─── Request payload types ────────────────────────────────────────────────────

export interface CreateScorePayload {
  eventRoleId: string;
  submitResultId: string;
}

/** POST /api/Scores/save — gộp tạo/cập nhật phiếu chấm + chi tiết 1 lần.
 *  Mỗi detail dùng `value` (khớp SaveScoreDetailItem của BE); `comment` là tùy chọn. */
export interface SaveScorePayload {
  eventRoleId: string;
  submitResultId: string;
  comment?: string;
  details: { criteriaId: string; value: number; templateId?: string }[];
}

export interface CreateScoreDetailPayload {
  scoreId: string;
  criteriaId: string;
  value: number;
}

// ─── ScoreDetails API ─────────────────────────────────────────────────────────

export const scoreDetailsApi = {
  // POST /api/ScoreDetails
  create: async (payload: CreateScoreDetailPayload): Promise<ScoreDetail> => {
    const { data } = await apiClient.post<ScoreDetail>("/ScoreDetails", payload);
    return data;
  },

  // GET /api/ScoreDetails/{id}
  getById: async (id: string): Promise<ScoreDetail> => {
    const { data } = await apiClient.get<ScoreDetail>(`/ScoreDetails/${id}`);
    return data;
  },

  // PUT /api/ScoreDetails/{id}
  update: async (id: string, value: number): Promise<ScoreDetail> => {
    const { data } = await apiClient.put<ScoreDetail>(`/ScoreDetails/${id}`, { value });
    return data;
  },

  // DELETE /api/ScoreDetails/{id}
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/ScoreDetails/${id}`).then(() => undefined),

  // GET /api/ScoreDetails/score/{scoreId}
  listByScore: async (scoreId: string): Promise<ScoreDetail[]> => {
    const { data } = await apiClient.get<PagedResult<ScoreDetail>>(
      `/ScoreDetails/score/${scoreId}`,
    );
    return data.data ?? [];
  },
};

// ─── Scores API ───────────────────────────────────────────────────────────────

export const scoresApi = {
  // POST /api/Scores — tạo phiếu chấm mới (TotalScore = 0)
  create: async (payload: CreateScorePayload): Promise<Score> => {
    const { data } = await apiClient.post<Score>("/Scores", payload);
    return data;
  },

  // POST /api/Scores/save — gộp tạo/cập nhật phiếu chấm + toàn bộ chi tiết 1 lần.
  // TotalScore tự động tính lại; tiêu chí mới → thêm, đã có → cập nhật, không còn → xóa.
  save: async (payload: SaveScorePayload): Promise<Score> => {
    const { data } = await apiClient.post<Score>("/Scores/save", payload);
    return data;
  },

  // GET /api/Scores/{id}
  getById: async (id: string): Promise<Score> => {
    const { data } = await apiClient.get<Score>(`/Scores/${id}`);
    return data;
  },

  // PUT /api/Scores/{id}
  update: async (id: string, payload: Partial<CreateScorePayload>): Promise<Score> => {
    const { data } = await apiClient.put<Score>(`/Scores/${id}`, payload);
    return data;
  },

  // DELETE /api/Scores/{id} — cascade xóa toàn bộ ScoreDetail liên quan
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/Scores/${id}`).then(() => undefined),

  // GET /api/Scores/{id}/detail — lấy phiếu chấm kèm toàn bộ chi tiết 1 lần
  getWithDetails: async (id: string): Promise<ScoreWithDetails> => {
    const { data } = await apiClient.get<ScoreWithDetails>(`/Scores/${id}/detail`);
    return data;
  },

  // GET /api/Scores/event-role/{eventRoleId} — lấy danh sách phiếu chấm theo giám khảo
  listByEventRole: async (eventRoleId: string): Promise<Score[]> => {
    const { data } = await apiClient.get<PagedResult<Score>>(
      `/Scores/event-role/${eventRoleId}`,
    );
    return data.data ?? [];
  },
};
