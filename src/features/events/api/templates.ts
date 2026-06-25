import { apiClient } from "@/services/api";
import type { PagedResult } from "@/services/api";

/** Scoring template — a track links to one of these via `templateId`. */
export interface TemplateSummary {
  id: string;
  templateName: string;
  description: string | null;
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
};
