'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEvent, useEventRounds, useEventTracks } from '@/features/events/hooks/useEvents';
import { templatesApi } from '@/features/events/api/templates';
import { eventsApi } from '@/features/events/api/events';
import { manageApi } from '@/features/events/api/manage';
import type { Event } from '@/features/events/types/event.types';
import type { EventRound, TrackItem, EventRole } from '@/features/events/api/manage';
import { Card } from './Card';
import { CardSkeleton } from './SkeletonLoaders';
import { formatDateTime } from '@/lib/date';

type TimelineVariant = 'admin' | 'participant';

interface Props {
  eventId: string;
  /** 'admin' hiển thị thêm Template · Judge · Mentor dưới mỗi hạng mục. */
  variant?: TimelineVariant;
}

type NodeStatus = 'done' | 'active' | 'upcoming' | 'pending';

/** One entry on the timeline. `pending` = a milestone the backend does not yet
 *  supply a date for (rendered as "Chưa cập nhật"). */
interface TimelineNode {
  id: string;
  title: string;
  start?: string | null;
  end?: string | null;
  /** Extra one-line detail (advancement rule, description…). */
  meta?: string;
  /** Template chấm điểm + yêu cầu nộp bài của hạng mục (chỉ admin) — hiện dưới title. */
  adminInfo?: { template: string | null; submissionRules?: string[] };
  /** Cột số liệu bên phải (chỉ admin, cho mốc đăng ký & mỗi vòng). */
  sideStats?: { label: string; value: number }[];
  /** Nested milestones — used for a round's tracks & process steps. */
  children?: TimelineNode[];
}

// ─── Status ──────────────────────────────────────────────────────────────────

/** Where a milestone sits relative to `now`. No dates → `pending`. */
function statusOf(now: number, start?: string | null, end?: string | null): NodeStatus {
  const s = start ? new Date(start).getTime() : NaN;
  const e = end ? new Date(end).getTime() : NaN;
  const hasS = !Number.isNaN(s);
  const hasE = !Number.isNaN(e);

  if (!hasS && !hasE) return 'pending';
  if (hasE && now > e) return 'done';
  if (hasS && now < s) return 'upcoming';
  // now is within [start, end], or after start with no end.
  return 'active';
}

const DOT: Record<NodeStatus, string> = {
  done: 'bg-primary-dark border-2 border-primary-dark',
  active: 'bg-primary border-2 border-primary',
  upcoming: 'bg-canvas border-2 border-hairline',
  pending: 'bg-canvas border-2 border-dashed border-mute',
};

// ─── Derive nodes from event data ─────────────────────────────────────────────

/** Điểm nội suy giữa hai mốc ISO theo tỉ lệ `frac` (0..1). Dựng mock các bước
 *  GỌN TRONG khung của hạng mục để không vượt ra tương lai của cha (cha xong →
 *  con xong). Trả null nếu thiếu mốc. */
function lerpISO(
  startIso: string | null | undefined,
  endIso: string | null | undefined,
  frac: number,
): string | null {
  if (!startIso || !endIso) return null;
  const s = new Date(startIso).getTime();
  const e = new Date(endIso).getTime();
  if (Number.isNaN(s) || Number.isNaN(e)) return null;
  return new Date(s + (e - s) * frac).toISOString();
}

/** Diễn giải quy tắc lên vòng: "top:5" → "Top 5 đội dẫn đầu vào vòng tiếp theo". */
function advancementText(rule: string): string {
  const n = rule.match(/\d+/)?.[0];
  if (/top/i.test(rule) && n) return `Top ${n} đội có tổng điểm cao nhất vào vòng tiếp theo`;
  return `Đội đạt "${rule}" sẽ được vào vòng tiếp theo`;
}

interface BuildOpts {
  /** Bơm thông tin quản lý (template/judge/mentor) vào mỗi hạng mục. */
  admin?: boolean;
  /** Tra tên template chấm điểm từ id (chỉ dùng khi admin). */
  templateName?: (id: string | null) => string | null;
  /** Vai trò trong sự kiện (chỉ admin) — tính số đội/judge/mentor cho cột phải. */
  roles?: EventRole[];
  /** trackId → chuỗi yêu cầu nộp bài đã lưu (chỉ admin) — hiện dưới hạng mục. */
  submissionRuleByTrackId?: Map<string, string>;
}

/** Tách chuỗi yêu cầu nộp bài đã lưu thành các dòng hiển thị (bỏ dòng trống). */
function parseSubmissionRuleLines(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function buildTimeline(
  event: Event,
  rounds: EventRound[],
  tracks: TrackItem[],
  opts: BuildOpts = {},
): TimelineNode[] {
  const nodes: TimelineNode[] = [];
  const roles = opts.roles ?? [];
  const distinct = (arr: (string | null)[]) => new Set(arr.filter(Boolean)).size;

  // 1) Registration window. Admin: số đội đã đăng ký (tổng đội phân biệt).
  nodes.push({
    id: 'registration',
    title: 'Mở đăng ký',
    start: event.registrationStartDate,
    end: event.registrationEndDate,
    sideStats: opts.admin
      ? [{ label: 'Đội đăng ký', value: distinct(roles.map((r) => r.teamId)) }]
      : undefined,
  });

  // 2) Rounds, in order — each carrying its tracks + the per-round process steps.
  const ordered = [...rounds].sort((a, b) => a.roundNumber - b.roundNumber);
  for (const round of ordered) {
    const roundTracks = tracks.filter((t) => t.roundId === round.id);

    // Mỗi hạng mục có quy trình riêng: bắt đầu thi → nộp bài → chấm điểm →
    // phúc khảo → công bố kết quả. BE chưa cấp mốc nên mock quanh khung của hạng
    // mục (khung hạng mục lại mock theo vòng cho tới khi BE có ngày riêng).
    const children: TimelineNode[] = roundTracks.map((t) => {
      const tStart = t.startDate ?? round.startDate;
      const tEnd = t.endDate ?? round.endDate;
      // Các bước chia đều TRONG khung [tStart, tEnd] → cùng trạng thái với hạng mục.
      const at = (f: number) => lerpISO(tStart, tEnd, f);
      return {
        id: `track-${t.id}`,
        title: `Hạng mục: ${t.trackName ?? '—'}`,
        start: tStart,
        end: tEnd,
        meta: t.description || undefined,
        adminInfo: opts.admin
          ? {
              template: t.templateId ? opts.templateName?.(t.templateId) ?? '—' : null,
              submissionRules: parseSubmissionRuleLines(opts.submissionRuleByTrackId?.get(t.id)),
            }
          : undefined,
        sideStats: opts.admin
          ? [
              {
                label: 'Số đội tham gia',
                value: distinct(roles.filter((r) => r.trackId === t.id).map((r) => r.teamId)),
              },
              { label: 'Số người hướng dẫn', value: t.mentors?.length ?? 0 },
              { label: 'Số giám khảo', value: t.judges?.length ?? 0 },
            ]
          : undefined,
        children: [
          { id: `t-start-${t.id}`, title: 'Bắt đầu thi', start: tStart, end: at(0.35) },
          { id: `t-submit-${t.id}`, title: 'Nộp bài', start: at(0.35), end: at(0.5) },
          { id: `t-score-${t.id}`, title: 'Chấm điểm', start: at(0.5), end: at(0.72) },
          { id: `t-appeal-${t.id}`, title: 'Phúc khảo', start: at(0.72), end: at(0.88) },
          { id: `t-publish-${t.id}`, title: 'Công bố kết quả', start: tEnd, end: null },
        ],
      };
    });

    nodes.push({
      id: `round-${round.id}`,
      title: `Vòng ${round.roundNumber}: ${round.roundName ?? '—'}`,
      start: round.startDate,
      end: round.endDate,
      meta: round.advancementRule ? advancementText(round.advancementRule) : undefined,
      children,
    });
  }

  // 3) Final overall result at the close of the event.
  nodes.push({
    id: 'final-result',
    title: 'Công bố kết quả chung cuộc',
    start: event.endDate,
    end: null,
  });

  return nodes;
}

// ─── Presentational pieces ────────────────────────────────────────────────────

function DateRange({ status, start, end }: { status: NodeStatus; start?: string | null; end?: string | null }) {
  if (status === 'pending') {
    return <span className="t-body-md text-ink italic whitespace-nowrap">Chưa cập nhật thời gian</span>;
  }
  if (start && end) {
    return (
      <span className="t-body-md text-body whitespace-nowrap">
        {formatDateTime(start)} <span className="text-ink">→</span> {formatDateTime(end)}
      </span>
    );
  }
  return <span className="t-body-md text-body whitespace-nowrap">{formatDateTime(start ?? end)}</span>;
}

// ── Hình học rail (px) — chấm thụt SÂU theo cấp; ngày giờ nằm sát chấm ──
const DOT_X = [12, 42, 72]; // tâm chấm theo cấp (thụt sâu hơn)
const DOT_Y = 11;           // tâm chấm cách đỉnh dòng (canh dòng chữ đầu)
const DOT_SIZE = ['w-3.5 h-3.5', 'w-2.5 h-2.5', 'w-2 h-2']; // cấp 0 → 2, nhỏ dần
// sm+: lề trái nội dung + bề rộng cột thời gian theo cấp — ngày giờ sát chấm,
// title thẳng một cột & cách thời gian xa (contentLeft + timeW = 460px ở mọi cấp).
const CONTENT_PL = ['sm:pl-[32px]', 'sm:pl-[62px]', 'sm:pl-[92px]'];
const TIME_W = ['sm:w-[428px]', 'sm:w-[398px]', 'sm:w-[368px]'];

interface Row {
  node: TimelineNode;
  depth: number;
  isFirst: boolean; // đầu trong nhóm anh-em cùng cấp
  isLast: boolean;  // cuối trong nhóm anh-em cùng cấp
}

/** Duỗi cây mốc thành danh sách dòng phẳng. */
function flatten(nodes: TimelineNode[]): Row[] {
  const rows: Row[] = [];
  const walk = (list: TimelineNode[], depth: number) => {
    list.forEach((n, i) => {
      rows.push({ node: n, depth, isFirst: i === 0, isLast: i === list.length - 1 });
      if (n.children?.length) walk(n.children, depth + 1);
    });
  };
  walk(nodes, 0);
  return rows;
}

/** Đoạn đường dọc 2px căn giữa tại `x`. `to='bottom'` = kéo hết đáy dòng. */
function Segment({ x, from, to }: { x: number; from: number; to: number | 'bottom' }) {
  return (
    <span
      className="absolute w-0.5 -translate-x-1/2 bg-hairline"
      style={{
        left: x,
        top: from,
        height: to === 'bottom' ? undefined : to - from,
        bottom: to === 'bottom' ? 0 : undefined,
      }}
    />
  );
}

/** Lớp phủ tuyệt đối vẽ đường nối + chấm; phủ hết chiều cao dòng để line liền. */
function RailOverlay({
  row,
  status,
  isFirstRow,
  isLastRow,
}: {
  row: Row;
  status: NodeStatus;
  isFirstRow: boolean;
  isLastRow: boolean;
}) {
  const { depth, isFirst, isLast } = row;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* x0 — đường sự kiện chạy LIỀN MẠCH suốt cả timeline (mọi dòng đều vẽ) */}
      {!isFirstRow && <Segment x={DOT_X[0]} from={0} to={DOT_Y} />}
      {!isLastRow && <Segment x={DOT_X[0]} from={DOT_Y} to="bottom" />}
      {/* x2 — nối các bước tuần tự TRONG một hạng mục (reset giữa các hạng mục) */}
      {depth === 2 && !isFirst && <Segment x={DOT_X[2]} from={0} to={DOT_Y} />}
      {depth === 2 && !isLast && <Segment x={DOT_X[2]} from={DOT_Y} to="bottom" />}
      {/* cấp hạng mục (x1) KHÔNG có đường nối — chỉ có chấm (độc lập nhau) */}
      {/* chấm — nền che vạch nên nhìn như đường xuyên qua chấm */}
      <span
        className={`absolute rounded-full ${DOT[status]} ${DOT_SIZE[depth]}`}
        style={{ left: DOT_X[depth], top: DOT_Y, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}

function TimelineRow({
  row,
  now,
  isFirstRow,
  isLastRow,
  extraGap,
}: {
  row: Row;
  now: number;
  isFirstRow: boolean;
  isLastRow: boolean;
  /** Khoảng trống lớn hơn (tách khối) khi dòng kế tiếp bắt đầu một vòng mới. */
  extraGap?: boolean;
}) {
  const { node, depth } = row;
  const status = statusOf(now, node.start, node.end);
  // Nội dung thụt sát ngay sau chấm của cấp (sm+); mobile chừa lề nền để né chấm.
  const contentPl = CONTENT_PL[depth] ?? CONTENT_PL[2];
  const timeW = TIME_W[depth] ?? TIME_W[2];
  // Dòng có cột 3 (vòng & hạng mục) giãn nhiều hơn để các cụm số không dính nhau;
  // bước thi (không cột 3) giữ khít; trước mỗi vòng mới thì tách khối lớn.
  const pb = isLastRow ? '' : extraGap ? 'pb-14' : depth === 2 ? 'pb-5' : 'pb-10';
  return (
    <div className="relative flex">
      <RailOverlay row={row} status={status} isFirstRow={isFirstRow} isLastRow={isLastRow} />
      {/* nội dung — pb ở đây (không ở hàng) để rail phủ hết chiều cao, line liền mạch.
          pl-24 cho mobile để né chấm; sm+ thụt chính xác theo cấp. */}
      <div className={`flex-1 min-w-0 pl-24 ${contentPl} flex flex-col sm:flex-row sm:items-baseline sm:gap-x-3 ${pb}`}>
        <div className={`shrink-0 ${timeW}`}>
            <DateRange status={status} start={node.start} end={node.end} />
          </div>
          <div className="flex flex-1 min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
          {depth === 0 ? (
            <h3 className="t-heading-md text-ink m-0">{node.title}</h3>
          ) : (
            <span className="t-heading-sm text-ink">{node.title}</span>
          )}
          {/* Mô tả nằm dưới title (basis-full → dòng riêng); nbsp giữ 1 dòng khi trống → cách đều. */}
          <p className="basis-full t-body-sm text-ink mt-0.5 mb-0">{node.meta || ' '}</p>
          {node.adminInfo && (
            <p className="basis-full t-body-sm mt-0.5 mb-0">
              <span className={node.adminInfo.template ? 'text-ink' : 'text-error font-bold'}>
                {node.adminInfo.template ? `Template: ${node.adminInfo.template}` : 'Chưa gán template'}
              </span>
            </p>
          )}
          {node.adminInfo?.submissionRules && node.adminInfo.submissionRules.length > 0 && (
            <div className="basis-full mt-1">
              <p className="t-body-sm text-ink m-0 mb-0.5">Yêu cầu nộp bài:</p>
              <ul className="m-0 pl-4 list-disc">
                {node.adminInfo.submissionRules.map((rule, i) => (
                  <li key={i} className="t-body-sm text-ink">{rule}</li>
                ))}
              </ul>
            </div>
          )}
          </div>
      </div>
      {node.sideStats && node.sideStats.length > 0 && (
        <div className="shrink-0 self-start w-52 ml-24 flex flex-col gap-1.5">
          {node.sideStats.map((s) => (
            <p key={s.label} className="t-body-sm text-ink m-0 whitespace-nowrap">
              {s.label}: <span className="text-ink">{s.value}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Vertical timeline of an event's milestones: registration → each round
 * (with its tracks + chấm điểm / phúc khảo / công bố điểm vòng) → công bố kết
 * quả chung cuộc. Milestones the backend has no date for yet render as
 * "Chưa cập nhật" so the layout is ready when those fields arrive.
 */
export function EventTimeline({ eventId, variant = 'participant' }: Props) {
  const admin = variant === 'admin';
  const { data: event, isLoading: eventLoading } = useEvent(eventId);
  const { data: rounds = [], isLoading: roundsLoading } = useEventRounds(eventId);
  const { data: tracks = [], isLoading: tracksLoading } = useEventTracks(eventId);
  // Template & roles chỉ cần cho admin → không tải thừa ở participant.
  const { data: templates = [] } = useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.list(),
    enabled: admin,
    staleTime: 5 * 60 * 1000,
  });
  const { data: roles = [] } = useQuery({
    queryKey: ['eventRoles', eventId, undefined],
    queryFn: () => manageApi.listEventRoles(eventId),
    enabled: admin,
    staleTime: 2 * 60 * 1000,
  });
  // Yêu cầu nộp bài chỉ có trong model lồng của GET /Events/{id} (rounds[].tracks[]),
  // không có ở /Tracks phẳng → tải model thô để dựng map trackId → chuỗi rule.
  const { data: eventModel } = useQuery({
    queryKey: ['eventModel', eventId],
    queryFn: () => eventsApi.getModelById(eventId),
    enabled: admin,
    staleTime: 5 * 60 * 1000,
  });
  // Tính "now" một lần (tránh gọi Date.now() thuần trong render).
  const [now] = React.useState(() => Date.now());

  if (eventLoading || roundsLoading || tracksLoading) return <CardSkeleton />;
  if (!event) return null;

  const templateName = (id: string | null) =>
    id ? templates.find((t) => t.id === id)?.templateName ?? '—' : null;

  // trackId → yêu cầu nộp bài (chỉ có trong model lồng của GET /Events/{id}).
  const submissionRuleByTrackId = new Map<string, string>();
  const nestedRounds =
    (eventModel as { rounds?: Array<{ tracks?: Array<{ id?: string; submissionRuleDescription?: string | null }> }> } | undefined)
      ?.rounds ?? [];
  for (const r of nestedRounds) {
    for (const t of r.tracks ?? []) {
      if (t.id) submissionRuleByTrackId.set(t.id, t.submissionRuleDescription ?? '');
    }
  }

  const rows = flatten(
    buildTimeline(event, rounds, tracks, { admin, templateName, roles, submissionRuleByTrackId }),
  );

  return (
    <Card className="border-transparent">
      <h2 className="t-heading-md text-ink m-0 mb-4">Lịch trình sự kiện</h2>
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <TimelineRow
            key={row.node.id}
            row={row}
            now={now}
            isFirstRow={i === 0}
            isLastRow={i === rows.length - 1}
            extraGap={i < rows.length - 1 && rows[i + 1].depth === 0}
          />
        ))}
      </div>
    </Card>
  );
}
