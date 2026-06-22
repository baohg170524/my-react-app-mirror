import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRegistration } from '../useRegistration';
import { registrationStore } from '../../api/registrationStore';
import { userRejectionsApi } from '../../api/userRejections';

jest.mock('../../api/userRejections');
const mockRejections = userRejectionsApi as jest.Mocked<typeof userRejectionsApi>;

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useRegistration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    mockRejections.listForUser.mockResolvedValue([]);
  });

  test('no record → status null (chưa đăng ký)', async () => {
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.status).toBeNull();
  });

  test('submit saves a pending record', async () => {
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => {
      result.current.submit(
        { fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT', schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null },
        '2026-06-23T00:00:00Z',
      );
    });
    await waitFor(() => expect(result.current.status).toBe('pending'));
    expect(registrationStore.get('u1', 'e1')?.studentCode).toBe('SE1');
  });

  test('rejection from API → status rejected with reason', async () => {
    registrationStore.save({
      userId: 'u1', eventId: 'e1', fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT',
      schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null,
      status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null,
    });
    mockRejections.listForUser.mockResolvedValue([
      { id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'sai MSSV', createdTime: '2026-06-24T00:00:00Z' },
    ]);
    const { result } = renderHook(() => useRegistration('e1', 'u1'), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('rejected'));
    expect(result.current.reason).toBe('sai MSSV');
  });
});
