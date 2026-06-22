import { userRejectionsApi } from '../userRejections';
import apiClient from '@/services/api/client';

jest.mock('@/services/api/client');
const mocked = apiClient as jest.Mocked<typeof apiClient>;

describe('userRejectionsApi', () => {
  afterEach(() => jest.resetAllMocks());

  test('listForUser unwraps PagedResult.data', async () => {
    mocked.get.mockResolvedValue({
      data: { data: [{ id: 'r1', userId: 'u1', rejectedBy: 'a1', reason: 'thiếu ảnh', createdTime: '2026-06-23T00:00:00Z' }] },
    } as never);
    const rows = await userRejectionsApi.listForUser('u1');
    expect(mocked.get).toHaveBeenCalledWith('/UserRejections/user/u1');
    expect(rows).toHaveLength(1);
    expect(rows[0].reason).toBe('thiếu ảnh');
  });

  test('listForUser returns [] when data missing', async () => {
    mocked.get.mockResolvedValue({ data: {} } as never);
    expect(await userRejectionsApi.listForUser('u1')).toEqual([]);
  });

  test('create posts the payload', async () => {
    mocked.post.mockResolvedValue({ data: {} } as never);
    await userRejectionsApi.create({ userId: 'u1', rejectedBy: 'a1', reason: 'sai MSSV' });
    expect(mocked.post).toHaveBeenCalledWith('/UserRejections', { userId: 'u1', rejectedBy: 'a1', reason: 'sai MSSV' });
  });
});
