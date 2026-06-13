import { apiClient } from "@/services/api";
import type { UserProfile, ProjectSummary } from "@/services/api/types";

export const userApi = {
  getProfile: (): Promise<UserProfile> =>
    apiClient.get<UserProfile>("/users/me/profile").then((r) => r.data),

  getProjectSummary: (): Promise<ProjectSummary> =>
    apiClient.get<ProjectSummary>("/users/me/project-summary").then((r) => r.data),
};
