import apiClient from './apiClient';

// Client đã unwrap BaseResponse<T> → response.data = env.data trực tiếp.

const ENDPOINTS = {
  LIST:   '/appeals',
  MY:     '/appeals/my',
  CREATE: '/appeals',
  ACCEPT: (id) => `/appeals/${id}/accept`,
  REJECT: (id) => `/appeals/${id}/reject`,
  REVIEW: (id) => `/appeals/${id}/review`,
  DELETE: (id) => `/appeals/${id}`,
};

// GET /appeals  [Authorize(Roles = "Admin,Judge")]
export const getAllAppeals = async () => {
  const response = await apiClient.get(ENDPOINTS.LIST);
  return response.data ?? [];
};

// POST /appeals  [Authorize(Roles = "Team")]
export const createAppeal = async ({ name, id, email, reason }) => {
  const response = await apiClient.post(ENDPOINTS.CREATE, {
    teamName:          name,
    teamCode:          id,
    notificationEmail: email,
    reason,
  });
  return response.data;
};

// PUT /appeals/{id}/accept  [Authorize(Roles = "Admin,Judge")]
export const acceptAppeal = async (id, updatedScores = null) => {
  const response = await apiClient.put(ENDPOINTS.ACCEPT(id), { updatedScores });
  return response.data;
};

// PUT /appeals/{id}/reject  [Authorize(Roles = "Admin,Judge")]
export const rejectAppeal = async (id) => {
  const response = await apiClient.put(ENDPOINTS.REJECT(id));
  return response.data;
};

// PUT /appeals/{id}/review  [Authorize(Roles = "Admin,Judge")]
export const markAppealReview = async (id) => {
  const response = await apiClient.put(ENDPOINTS.REVIEW(id));
  return response.data;
};

// DELETE /appeals/{id}  [Authorize(Roles = "Admin")]
export const deleteAppeal = async (id) => {
  const response = await apiClient.delete(ENDPOINTS.DELETE(id));
  return response.data;
};
