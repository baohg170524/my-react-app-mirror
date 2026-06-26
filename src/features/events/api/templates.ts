import { apiClient } from "@/services/api";
import type { PagedResult } from "@/services/api";

/** Scoring template — a track links to one of these via `templateId`. */
export interface TemplateSummary {
  id: string;
  templateName: string;
  description: string | null;
}

/** One criteria entry inside a template (with weight & maxScore). */
export interface TemplateCriteria {
  criteriaId: string;
  criteriaName: string;
  description: string | null;
  weight: number;
  maxScore: number;
  isActive: boolean;
}

/** Full template returned by GET /api/Templates/{id} */
export interface TemplateDetail extends TemplateSummary {
  isActive: boolean;
  isSystem: boolean;
  criterias: TemplateCriteria[];
}

export const templatesApi = {
  /** GET /api/Templates — list scoring templates (requires auth). */
  list: async (): Promise<TemplateSummary[]> => {
    const { data } = await apiClient.get<PagedResult<TemplateSummary>>(
      "/Templates",
      { params: { PageNumber: 1, PageSize: 100 } },
    );
    return data.data ?? [];
  },

  /** GET /api/Templates/{id} — lấy template kèm toàn bộ criteria (weight, maxScore). */
  getById: async (id: string): Promise<TemplateDetail> => {
    const { data } = await apiClient.get<TemplateDetail>(`/Templates/${id}`);
    return data;
  },
};
