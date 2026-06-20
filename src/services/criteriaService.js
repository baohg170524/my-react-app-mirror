import apiClient from './api/client';

// Backend: /api/Criterias + /api/Templates/{id}
// Client đã unwrap BaseResponse<T> → response.data = env.data trực tiếp.

const ENDPOINTS = {
  LIST:     '/Criterias',
  DETAIL:   (id) => `/Criterias/${id}`,
  CREATE:   '/Criterias',
  UPDATE:   (id) => `/Criterias/${id}`,
  DELETE:   (id) => `/Criterias/${id}`,
  TOGGLE:   (id) => `/Criterias/${id}/toggle-status`,
  TEMPLATE: (id) => `/Templates/${id}`,
};

function adaptCriteria(backendItem, templateCriteria) {
  return {
    id:       backendItem.id,
    label:    backendItem.criteriaName,
    labelVi:  backendItem.criteriaName,
    desc:     backendItem.description ?? '',
    isActive: backendItem.isActive,
    weight:   templateCriteria?.weight   ?? 0,
    maxScore: templateCriteria?.maxScore ?? 10,
  };
}

// GET /Criterias → PagedResult<Criteria> → .data = array
export const getCriteria = async (templateId) => {
  const res   = await apiClient.get(ENDPOINTS.LIST);
  const items = res.data?.data ?? [];   // PagedResult.data = []

  if (!templateId) {
    return items.map(item => adaptCriteria(item, null));
  }

  const tmplRes  = await apiClient.get(ENDPOINTS.TEMPLATE(templateId));
  const tmplList = tmplRes.data?.criterias ?? [];
  const tmplMap  = Object.fromEntries(
    tmplList.map(tc => [tc.criteriaId ?? tc.id, tc])
  );

  return items.map(item => adaptCriteria(item, tmplMap[item.id]));
};

// POST /Criterias
export const createCriteria = async ({ criteriaName, description = '' }) => {
  const res = await apiClient.post(ENDPOINTS.CREATE, { criteriaName, description });
  return adaptCriteria(res.data, null);
};

// PUT /Criterias/{id}
export const updateCriteria = async (id, { criteriaName, description = '' }) => {
  const res = await apiClient.put(ENDPOINTS.UPDATE(id), { criteriaName, description });
  return adaptCriteria(res.data, null);
};

// DELETE /Criterias/{id}
export const deleteCriteria = async (id) => {
  const res = await apiClient.delete(ENDPOINTS.DELETE(id));
  return res.data;
};

// PATCH /Criterias/{id}/toggle-status
export const toggleCriteriaStatus = async (id) => {
  const res = await apiClient.patch(ENDPOINTS.TOGGLE(id));
  return res.data;
};
