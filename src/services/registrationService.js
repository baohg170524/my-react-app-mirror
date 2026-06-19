import apiClient from './apiClient';

// Client đã unwrap BaseResponse<T> → response.data = env.data trực tiếp.

const ENDPOINTS = {
  REGISTER: '/registration',
  LIST:     '/registration',
  ACCEPT:   (id) => `/registration/${id}/accept`,
  REJECT:   (id) => `/registration/${id}/reject`,
};

// POST /registration
export const submitRegistration = async (formData) => {
  const payload = buildRegistrationPayload(formData);
  const response = await apiClient.post(ENDPOINTS.REGISTER, payload);
  return response.data;
};

// GET /registration  [Authorize(Roles = "Admin")]
export const getAllRegistrations = async () => {
  const response = await apiClient.get(ENDPOINTS.LIST);
  return response.data ?? [];
};

// PUT /registration/{id}/accept  [Authorize(Roles = "Admin")]
export const acceptRegistration = async (id) => {
  const response = await apiClient.put(ENDPOINTS.ACCEPT(id));
  return response.data;
};

// PUT /registration/{id}/reject  [Authorize(Roles = "Admin")]
export const rejectRegistration = async (id) => {
  const response = await apiClient.put(ENDPOINTS.REJECT(id));
  return response.data;
};

const buildRegistrationPayload = (formData) => {
  if (formData.type === 'fpt') {
    return {
      type:             'fpt',
      semester:          formData.hocKi,
      notificationEmail: formData.gmail,
      leader: {
        fullName:  formData.leader.name,
        studentId: formData.leader.mssv,
      },
      members: (formData.members || [])
        .filter(m => m.name)
        .map(m => ({ fullName: m.name, studentId: m.id })),
    };
  }
  return {
    type:             'external',
    university:        formData.truong,
    notificationEmail: formData.gmail,
    leader: {
      fullName:   formData.leader.name,
      nationalId: formData.leader.cccd,
    },
    members: (formData.members || [])
      .filter(m => m.name)
      .map(m => ({ fullName: m.name, nationalId: m.id })),
  };
};
