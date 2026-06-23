import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRegistration } from '../useRegistration';

// Mock @/services/api
jest.mock('@/services/api', () => ({
  usersApi: { getProfile: jest.fn() },
  authApi: { submitStudentProfile: jest.fn() },
}));
// Mock userRejections api
jest.mock('../../api/userRejections', () => ({
  userRejectionsApi: { listForUser: jest.fn(), remove: jest.fn() },
}));

import { usersApi, authApi } from '@/services/api';
import { userRejectionsApi } from '../../api/userRejections';

const mockGetProfile = usersApi.getProfile as jest.MockedFunction<typeof usersApi.getProfile>;
const mockSubmit = authApi.submitStudentProfile as jest.MockedFunction<typeof authApi.submitStudentProfile>;
const mockListForUser = userRejectionsApi.listForUser as jest.MockedFunction<typeof userRejectionsApi.listForUser>;

function wrapper({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false } } }));
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useRegistration', () => {
  beforeEach(() => {
    localStorage.clear();
    // Set token so `enabled` is true
    localStorage.setItem('accessToken', 'test-token');
    jest.resetAllMocks();
    mockListForUser.mockResolvedValue([]);
  });

  test('approved profile → status approved', async () => {
    mockGetProfile.mockResolvedValue({
      id: 'u1', email: 'a@e.com', fullName: 'A', studentCode: 'SE1',
      schoolId: 's1', isStudent: true, isAdmin: false, isApproved: true,
      isFpt: true, photoStudentCardUrl: null,
    });
    const { result } = renderHook(() => useRegistration('u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.status).toBe('approved');
    expect(result.current.reason).toBeNull();
  });

  test('not-approved + rejection → status rejected with reason', async () => {
    mockGetProfile.mockResolvedValue({
      id: 'u1', email: 'a@e.com', fullName: 'A', studentCode: 'SE1',
      schoolId: 's1', isStudent: true, isAdmin: false, isApproved: false,
      isFpt: true, photoStudentCardUrl: null,
    });
    mockListForUser.mockResolvedValue([
      { id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'sai MSSV', createdTime: '2026-06-24T00:00:00Z' },
    ]);
    const { result } = renderHook(() => useRegistration('u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.status).toBe('rejected');
    expect(result.current.reason).toBe('sai MSSV');
  });

  test('not-approved no rejection → status pending', async () => {
    mockGetProfile.mockResolvedValue({
      id: 'u1', email: 'a@e.com', fullName: 'A', studentCode: 'SE1',
      schoolId: 's1', isStudent: true, isAdmin: false, isApproved: false,
      isFpt: true, photoStudentCardUrl: null,
    });
    mockListForUser.mockResolvedValue([]);
    const { result } = renderHook(() => useRegistration('u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.status).toBe('pending');
    expect(result.current.reason).toBeNull();
  });

  test('submit(cmd) calls authApi.submitStudentProfile', async () => {
    mockGetProfile.mockResolvedValue({
      id: 'u1', email: 'a@e.com', fullName: 'A', studentCode: 'SE1',
      schoolId: 's1', isStudent: true, isAdmin: false, isApproved: false,
      isFpt: true, photoStudentCardUrl: null,
    });
    mockSubmit.mockResolvedValue(undefined);
    const { result } = renderHook(() => useRegistration('u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    const cmd = { isFpt: true, studentCode: 'SE123', fullName: 'A', schoolId: 's1', photoStudentCardUrl: null };
    await act(async () => {
      await result.current.submit(cmd);
    });
    expect(mockSubmit).toHaveBeenCalledWith(cmd);
  });
});
