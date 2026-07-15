'use client';

import React, { useMemo, useState } from 'react';
import {
  useEventRounds,
  useRoundFinalResults,
  useCalculateRoundResults,
  useCancelRoundResults,
  useTeams,
} from '@/features/events/hooks/useEvents';
import { useNotify } from '@/components/NotificationProvider';
import { getErrorMessage } from '@/lib/apiError';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface LeaderboardTabProps {
  eventId: string;
}

export function LeaderboardTab({ eventId }: LeaderboardTabProps) {
  const notify = useNotify();
  const { data: rounds = [], isLoading: roundsLoading } = useEventRounds(eventId);
  // Rounds sorted newest-first; default selection = latest round.
  const sortedRounds = useMemo(
    () => [...rounds].sort((a, b) => b.roundNumber - a.roundNumber),
    [rounds],
  );
  const [selectedRoundId, setSelectedRoundId] = useState<string>('');
  const selectedRound =
    sortedRounds.find((r) => r.id === selectedRoundId) ?? sortedRounds[0];
  const roundId = selectedRound?.id;

  const {
    data: results = [],
    isLoading: resultsLoading,
    error,
  } = useRoundFinalResults(roundId);
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const calculate = useCalculateRoundResults(roundId);
  const cancel = useCancelRoundResults(roundId);

  // topN chỉ là dự phòng: khi vòng CHƯA đặt luật thăng vòng thì mới cần nhập tay.
  const [topN, setTopN] = useState<string>('');

  // ─── Trạng thái vòng thi (suy ra từ dữ liệu — BE không có field status) ───
  // "Đã kết thúc" = đã qua endDate (đồng bộ với logic khóa form của ScoringPanel).
  // "Đã công bố" = leaderboard của vòng đã tồn tại.
  const roundEnded = selectedRound?.endDate
    ? new Date() >= new Date(selectedRound.endDate)
    : false;
  const isPublished = results.length > 0;
  const busy = calculate.isPending || cancel.isPending;
  // Số đội thăng vòng lấy từ advancementRule (vd "top:2"). Có rule → BE tự quyết,
  // bỏ qua mọi topN gửi lên. Chưa có rule → cần EC nhập topN dự phòng.
  const advancementRule = selectedRound?.advancementRule?.trim() ?? '';
  const hasRule = advancementRule !== '';

  const endDateText = selectedRound?.endDate
    ? new Date(selectedRound.endDate).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  // ─── FE-01: Tính kết quả ───
  // Vòng có advancementRule → không gửi topN (BE tự quyết). Vòng chưa có rule →
  // gửi topN EC nhập (nếu bỏ trống, BE dùng mặc định của nó).
  const handleCalculate = () => {
    if (!roundId || !roundEnded || busy) return;
    let parsedTopN: number | undefined;
    if (!hasRule) {
      const raw = topN.trim();
      if (raw !== '') {
        parsedTopN = Number(raw);
        if (!Number.isInteger(parsedTopN) || parsedTopN <= 0) {
          notify.warning('Số đội thăng vòng phải là số nguyên dương, hoặc để trống.');
          return;
        }
      }
    }
    const msg = `Tính kết quả cho "${selectedRound?.roundName ?? 'vòng thi'}"?`;
    if (typeof window !== 'undefined' && !window.confirm(msg)) return;

    calculate.mutate(parsedTopN, {
      onSuccess: (rows) => {
        notify.success(`Đã công bố kết quả: ${rows.length} đội được xếp hạng.`);
      },
      // BE trả các lỗi nghiệp vụ: chưa chấm hết bài, vòng chưa đóng, không đủ quyền...
      onError: (err) => notify.error(getErrorMessage(err)),
    });
  };

  // ─── FE-02: Hủy công bố ───
  const handleCancel = () => {
    if (!roundId || !isPublished || busy) return;
    const msg =
      `Hủy công bố kết quả của "${selectedRound?.roundName ?? 'vòng thi'}"?\n\n` +
      'Toàn bộ bảng xếp hạng sẽ bị xóa và form chấm điểm được mở lại. ' +
      'Chỉ hủy được khi vòng sau chưa có bài nộp/kết quả.';
    if (typeof window !== 'undefined' && !window.confirm(msg)) return;

    cancel.mutate(undefined, {
      onSuccess: () => notify.success('Đã hủy công bố. Vòng thi quay lại trạng thái chờ chốt.'),
      onError: (err) => notify.error(getErrorMessage(err)),
    });
  };

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được bảng xếp hạng</p>
      </div>
    );
  }

  if (roundsLoading || teamsLoading) return <CardSkeleton />;

  if (sortedRounds.length === 0) {
    return (
      <Card title="Bảng xếp hạng">
        <p className="t-body-sm text-mute text-center py-8">Sự kiện chưa có vòng thi nào.</p>
      </Card>
    );
  }

  const teamName = (teamId: string | null) =>
    teams.find((t) => t.id === teamId)?.name ?? teamId ?? '—';
  // Use backend rank when present, otherwise sort by score desc.
  const ranked = [...results].sort(
    (a, b) => (a.rank || 9999) - (b.rank || 9999) || b.finalScore - a.finalScore,
  );

  const rankStyle = (rank: number) => {
    if (rank === 1) return 'bg-primary text-on-primary';
    if (rank === 2) return 'bg-stone text-on-dark';
    if (rank === 3) return 'bg-ash text-on-dark';
    return 'bg-surface-soft text-ink border border-hairline';
  };

  return (
    <Card title="Bảng xếp hạng">
      {/* ─── Thanh điều khiển: chọn vòng + tính / hủy kết quả ─── */}
      <div className="flex flex-col md:flex-row md:items-end gap-3 mb-5 pb-5 border-b border-hairline">
        <div className="flex flex-col gap-1">
          <label className="t-caption-sm text-mute font-bold uppercase">Vòng thi</label>
          <select
            value={selectedRound?.id ?? ''}
            onChange={(e) => setSelectedRoundId(e.target.value)}
            className="border border-hairline rounded-sm px-3 py-2 t-body-sm text-ink bg-canvas min-w-56"
          >
            {sortedRounds.map((r) => (
              <option key={r.id} value={r.id}>
                {r.roundName ?? `Vòng ${r.roundNumber}`}
              </option>
            ))}
          </select>
        </div>

        {isPublished ? (
          // ─── FE-02: đã công bố → cho hủy ───
          <div className="flex flex-col gap-1 md:ml-auto">
            <span className="t-caption-sm text-primary font-bold uppercase">Đã công bố</span>
            <button
              type="button"
              onClick={handleCancel}
              disabled={busy}
              className="px-4 py-2 rounded-sm t-body-sm font-bold bg-error text-on-primary disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
            >
              {cancel.isPending ? 'Đang hủy…' : 'Hủy công bố'}
            </button>
          </div>
        ) : (
          // ─── FE-01: chưa công bố → cho tính ───
          <>
            {hasRule ? (
              // Vòng đã đặt luật thăng vòng → BE tự quyết số đội, không cần nhập.
              <div className="flex flex-col gap-1">
                <label className="t-caption-sm text-mute font-bold uppercase">Luật thăng vòng</label>
                <span className="t-body-sm text-ink font-bold px-3 py-2 bg-surface-soft rounded-sm border border-hairline">
                  {advancementRule}
                </span>
              </div>
            ) : (
              // Vòng chưa đặt luật → EC nhập số đội thăng (dự phòng).
              <div className="flex flex-col gap-1">
                <label className="t-caption-sm text-mute font-bold uppercase">
                  Số đội thăng vòng
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={topN}
                  onChange={(e) => setTopN(e.target.value)}
                  placeholder="Vòng chưa có luật — nhập số đội"
                  className="border border-hairline rounded-sm px-3 py-2 t-body-sm text-ink bg-canvas w-56"
                />
              </div>
            )}
            <div className="flex flex-col gap-1 md:ml-auto">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!roundEnded || busy}
                className="px-4 py-2 rounded-sm t-body-sm font-bold bg-primary text-on-primary disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {calculate.isPending ? 'Đang tính…' : 'Tính kết quả vòng'}
              </button>
              {!roundEnded && (
                <p className="t-caption-sm text-warning m-0">
                  Nút mở khi vòng thi kết thúc{endDateText ? ` (${endDateText})` : ''}.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {resultsLoading ? (
        <CardSkeleton />
      ) : ranked.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-hairline-strong text-left">
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center w-16">Hạng</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên đội</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Điểm TB</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((row, idx) => {
                const rank = row.rank || idx + 1;
                return (
                  <tr key={row.id} className="border-b border-hairline last:border-b-0">
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full t-body-strong font-bold ${rankStyle(rank)}`}
                      >
                        {rank}
                      </span>
                    </td>
                    <td className="t-body-sm font-bold text-ink py-3 px-2">{teamName(row.teamId)}</td>
                    <td className="t-heading-sm text-primary font-bold py-3 px-2 text-center">{row.finalScore}</td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ${
                          row.isAdvanced ? 'bg-primary/10 text-primary' : 'bg-surface-soft text-mute border border-hairline'
                        }`}
                      >
                        {row.isAdvanced ? 'Đạt' : 'Loại'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="t-body-sm text-mute text-center py-8">
          {roundEnded
            ? 'Chưa có kết quả. Bấm "Tính kết quả" để công bố bảng xếp hạng.'
            : 'Chưa có dữ liệu xếp hạng.'}
        </p>
      )}
    </Card>
  );
}
