"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { eventsApi, type CreateEventPayload } from "../api/events";

// ─── Form state types (mirror the create-event payload) ───────────────────────

interface TrackForm {
  trackName: string;
  description: string;
  templateId: string;
  /** Selected submission link types (e.g. "github", "doc", "other"). */
  submissionLinks: string[];
  /** Optional — judge accounts (email/ID). Empty allowed; account search comes later. */
  judgeUserIds: string[];
  /** Optional — mentor accounts (email/ID). Empty allowed. */
  mentorUserIds: string[];
}

interface RoundForm {
  roundName: string;
  roundNumber: string;
  startDate: string;
  endDate: string;
  advancementRule: string;
  tracks: TrackForm[];
}

interface EventForm {
  eventName: string;
  season: string;
  year: string;
  startDate: string;
  endDate: string;
  description: string;
  /** Event coordinators (multiple). Optional — account search comes later. */
  eventCoordinatorIds: string[];
  rounds: RoundForm[];
}

// ─── Factories ────────────────────────────────────────────────────────────────

const emptyTrack = (): TrackForm => ({
  trackName: "",
  description: "",
  templateId: "",
  submissionLinks: [],
  judgeUserIds: [],
  mentorUserIds: [],
});

const emptyRound = (): RoundForm => ({
  roundName: "",
  roundNumber: "",
  startDate: "",
  endDate: "",
  advancementRule: "",
  tracks: [emptyTrack()],
});

const emptyEvent = (): EventForm => ({
  eventName: "",
  season: "",
  year: "",
  startDate: "",
  endDate: "",
  description: "",
  eventCoordinatorIds: [],
  rounds: [emptyRound()],
});

/** Submission link types offered as checkboxes per track. */
const SUBMISSION_LINK_OPTIONS = [
  { key: "github", label: "Link GitHub" },
  { key: "doc", label: "Link Doc" },
  { key: "other", label: "Link khác" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** datetime-local value → ISO string (empty stays empty). */
function toIso(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? local : d.toISOString();
}

/** Backend 400 body: { message?, data?: [{ key, value: string[] }] }. */
interface BackendFieldError {
  key?: string;
  value?: string[];
}

const GENERIC_ERROR = "Tạo sự kiện thất bại. Vui lòng thử lại.";

/** Turn an Axios error into a user-facing message, surfacing field-level details. */
function extractApiError(err: unknown): string {
  const body = (err as AxiosError<{ message?: string; data?: BackendFieldError[] }>)
    ?.response?.data;
  if (!body) return GENERIC_ERROR;
  if (Array.isArray(body.data)) {
    const messages = body.data.flatMap((item) =>
      Array.isArray(item.value) ? item.value : [],
    );
    if (messages.length) return messages.join(" ");
  }
  // Hide raw server exception strings ("Exception of type ... was thrown").
  if (body.message && !/Exception|was thrown/i.test(body.message)) {
    return body.message;
  }
  return GENERIC_ERROR;
}

// ─── Small field primitives ───────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        className="text-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </Field>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <textarea
        className="text-input"
        rows={3}
        value={value}
        placeholder={placeholder}
        style={{ height: "auto", resize: "vertical", fontFamily: "inherit" }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    </Field>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        style={{ width: 16, height: 16, accentColor: "var(--color-primary)" }}
      />
      <span className="t-body-sm">{label}</span>
    </label>
  );
}

/** Small muted helper line under a field. */
function Hint({ children }: { children: ReactNode }) {
  return (
    <span className="t-caption-sm" style={{ color: "var(--color-mute)", marginTop: -2 }}>
      {children}
    </span>
  );
}

/** Add/remove multiple accounts as chips. Empty list is allowed (optional). */
function MultiTagInput({
  label,
  values,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  hint?: ReactNode;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!values.includes(v)) onChange([...values, v]);
    setDraft("");
  };
  const removeAt = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>
        {label}
      </span>

      {values.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {values.map((v, i) => (
            <span
              key={v}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                background: "var(--color-surface-soft)",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fs-caption-sm)",
              }}
            >
              {v}
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`Xóa ${v}`}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  lineHeight: 1,
                  fontSize: 15,
                  color: "var(--color-mute)",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <input
          className="text-input"
          value={draft}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={add}
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          Thêm
        </button>
      </div>

      {hint && <Hint>{hint}</Hint>}
    </div>
  );
}

// ─── Track editor ─────────────────────────────────────────────────────────────

function TrackCard({
  track,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  track: TrackForm;
  index: number;
  canRemove: boolean;
  onChange: (patch: Partial<TrackForm>) => void;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--color-canvas)",
        border: "var(--border-hairline)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="t-body-strong">
          Hạng mục {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onRemove}
            style={{ cursor: "pointer" }}
          >
            Xóa hạng mục
          </button>
        )}
      </div>

      <TextField label="Tên hạng mục" value={track.trackName} onChange={(v) => onChange({ trackName: v })} />
      <TextArea label="Mô tả" value={track.description} onChange={(v) => onChange({ description: v })} />
      <TextField label="Template ID" value={track.templateId} onChange={(v) => onChange({ templateId: v })} />

      {/* Submission link types */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>
          Loại link nộp bài
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)" }}>
          {SUBMISSION_LINK_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.key}
              label={opt.label}
              checked={track.submissionLinks.includes(opt.key)}
              onChange={(on) =>
                onChange({
                  submissionLinks: on
                    ? [...track.submissionLinks, opt.key]
                    : track.submissionLinks.filter((k) => k !== opt.key),
                })
              }
            />
          ))}
        </div>
      </div>

      <MultiTagInput
        key="judge"
        label="Judge (tùy chọn)"
        values={track.judgeUserIds}
        onChange={(next) => onChange({ judgeUserIds: next })}
        placeholder="Email hoặc ID tài khoản"
        hint="Có thể để trống — sau này sẽ thêm judge bằng cách tìm kiếm tài khoản."
      />

      <MultiTagInput
        key="mentor"
        label="Mentor (tùy chọn)"
        values={track.mentorUserIds}
        onChange={(next) => onChange({ mentorUserIds: next })}
        placeholder="Email hoặc ID tài khoản"
      />
    </div>
  );
}

// ─── Round editor ─────────────────────────────────────────────────────────────

function RoundCard({
  round,
  index,
  canRemove,
  onChange,
  onRemove,
  onTrackChange,
  onAddTrack,
  onRemoveTrack,
}: {
  round: RoundForm;
  index: number;
  canRemove: boolean;
  onChange: (key: keyof Omit<RoundForm, "tracks">, value: string) => void;
  onRemove: () => void;
  onTrackChange: (trackIndex: number, patch: Partial<TrackForm>) => void;
  onAddTrack: () => void;
  onRemoveTrack: (trackIndex: number) => void;
}) {
  return (
    <div
      style={{
        background: "var(--color-surface-soft)",
        border: "var(--border-hairline)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="t-body-strong">Vòng {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onRemove}
            style={{ cursor: "pointer" }}
          >
            Xóa vòng
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-md)" }}>
        <TextField label="Tên vòng" value={round.roundName} onChange={(v) => onChange("roundName", v)} />
        <TextField
          label="Số thứ tự vòng"
          type="number"
          value={round.roundNumber}
          onChange={(v) => onChange("roundNumber", v)}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
        <TextField
          label="Bắt đầu"
          type="datetime-local"
          value={round.startDate}
          onChange={(v) => onChange("startDate", v)}
        />
        <TextField
          label="Kết thúc"
          type="datetime-local"
          value={round.endDate}
          onChange={(v) => onChange("endDate", v)}
        />
      </div>
      <TextField
        label="Quy tắc lên vòng (advancement rule)"
        value={round.advancementRule}
        onChange={(v) => onChange("advancementRule", v)}
      />

      {/* Tracks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        {round.tracks.map((track, ti) => (
          <TrackCard
            key={ti}
            track={track}
            index={ti}
            canRemove={round.tracks.length > 1}
            onChange={(patch) => onTrackChange(ti, patch)}
            onRemove={() => onRemoveTrack(ti)}
          />
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onAddTrack}
          style={{ alignSelf: "flex-start", cursor: "pointer" }}
        >
          + Thêm hạng mục
        </button>
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function CreateEventForm({ onCancel }: { onCancel: () => void }) {
  const [form, setForm] = useState<EventForm>(emptyEvent);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateEventPayload) => eventsApi.create(payload),
    onSuccess: () => {
      // Refresh any event listings once they move to the real API.
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // ── event-level field update (string fields only) ──
  type EventStringKey =
    | "eventName"
    | "season"
    | "year"
    | "startDate"
    | "endDate"
    | "description";
  const setField = (key: EventStringKey, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // ── round operations ──
  const addRound = () => setForm((f) => ({ ...f, rounds: [...f.rounds, emptyRound()] }));

  const removeRound = (ri: number) =>
    setForm((f) => ({ ...f, rounds: f.rounds.filter((_, i) => i !== ri) }));

  const updateRound = (ri: number, key: keyof Omit<RoundForm, "tracks">, value: string) =>
    setForm((f) => ({
      ...f,
      rounds: f.rounds.map((r, i) => (i === ri ? { ...r, [key]: value } : r)),
    }));

  // ── track operations ──
  const addTrack = (ri: number) =>
    setForm((f) => ({
      ...f,
      rounds: f.rounds.map((r, i) =>
        i === ri ? { ...r, tracks: [...r.tracks, emptyTrack()] } : r,
      ),
    }));

  const removeTrack = (ri: number, ti: number) =>
    setForm((f) => ({
      ...f,
      rounds: f.rounds.map((r, i) =>
        i === ri ? { ...r, tracks: r.tracks.filter((_, j) => j !== ti) } : r,
      ),
    }));

  const updateTrack = (ri: number, ti: number, patch: Partial<TrackForm>) =>
    setForm((f) => ({
      ...f,
      rounds: f.rounds.map((r, i) =>
        i === ri
          ? { ...r, tracks: r.tracks.map((t, j) => (j === ti ? { ...t, ...patch } : t)) }
          : r,
      ),
    }));

  // ── build the API payload (CreateEventRequestModel) ──
  // Note: the backend has no `eventCoordinatorIds` field, so it is collected in
  // the UI for the future but NOT sent. Track submission link checkboxes are
  // joined into the `submissionRuleDescription` string the API expects.
  const linkLabel = (key: string) =>
    SUBMISSION_LINK_OPTIONS.find((o) => o.key === key)?.label ?? key;

  function buildPayload(): CreateEventPayload {
    return {
      eventName: form.eventName.trim(),
      season: form.season.trim(),
      year: Number(form.year) || 0,
      startDate: toIso(form.startDate),
      endDate: toIso(form.endDate),
      description: form.description.trim(),
      rounds: form.rounds.map((r) => ({
        roundName: r.roundName.trim(),
        roundNumber: Number(r.roundNumber) || 0,
        startDate: toIso(r.startDate),
        endDate: toIso(r.endDate),
        advancementRule: r.advancementRule.trim(),
        tracks: r.tracks.map((t) => ({
          trackName: t.trackName.trim(),
          description: t.description.trim(),
          templateId: t.templateId.trim(),
          submissionRuleDescription: t.submissionLinks.map(linkLabel).join(", "),
          judgeUserIds: t.judgeUserIds,
          mentorUserIds: t.mentorUserIds,
        })),
      })),
    };
  }

  /** Returns the first validation error, or null when the form is valid. */
  function validate(): string | null {
    if (!form.eventName.trim()) return "Vui lòng nhập tên sự kiện.";
    if ((Number(form.year) || 0) <= 2000) return "Năm tổ chức phải lớn hơn 2000.";
    if (!form.startDate) return "Vui lòng chọn ngày bắt đầu sự kiện.";
    if (!form.endDate) return "Vui lòng chọn ngày kết thúc sự kiện.";
    for (let i = 0; i < form.rounds.length; i++) {
      const r = form.rounds[i];
      if (!r.roundName.trim()) return `Vòng ${i + 1}: vui lòng nhập tên vòng.`;
      if ((Number(r.roundNumber) || 0) <= 0)
        return `Vòng ${i + 1}: số thứ tự vòng phải lớn hơn 0.`;
      if (!r.startDate || !r.endDate)
        return `Vòng ${i + 1}: vui lòng chọn ngày bắt đầu và kết thúc.`;
      for (let j = 0; j < r.tracks.length; j++) {
        if (!r.tracks[j].trackName.trim())
          return `Vòng ${i + 1} – Hạng mục ${j + 1}: vui lòng nhập tên hạng mục.`;
      }
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate();
    setFormError(error);
    if (error) return;

    createMutation.mutate(buildPayload());
  }

  const apiErrorMessage = createMutation.isError
    ? extractApiError(createMutation.error)
    : null;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {/* Event-level fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        <TextField label="Tên sự kiện" value={form.eventName} onChange={(v) => setField("eventName", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
          <TextField label="Mùa (season)" value={form.season} onChange={(v) => setField("season", v)} />
          <TextField label="Năm" type="number" value={form.year} onChange={(v) => setField("year", v)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
          <TextField
            label="Bắt đầu"
            type="datetime-local"
            value={form.startDate}
            onChange={(v) => setField("startDate", v)}
          />
          <TextField
            label="Kết thúc"
            type="datetime-local"
            value={form.endDate}
            onChange={(v) => setField("endDate", v)}
          />
        </div>
        <TextArea label="Mô tả" value={form.description} onChange={(v) => setField("description", v)} />

        <MultiTagInput
          label="Event Coordinator (có thể nhiều người, tùy chọn)"
          values={form.eventCoordinatorIds}
          onChange={(next) => setForm((f) => ({ ...f, eventCoordinatorIds: next }))}
          placeholder="Email hoặc ID tài khoản"
          
        />
      </div>

      {/* Rounds */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <h3 className="t-heading-sm" style={{ margin: 0 }}>
          Các vòng thi
        </h3>
        {form.rounds.map((round, ri) => (
          <RoundCard
            key={ri}
            round={round}
            index={ri}
            canRemove={form.rounds.length > 1}
            onChange={(key, value) => updateRound(ri, key, value)}
            onRemove={() => removeRound(ri)}
            onTrackChange={(ti, patch) => updateTrack(ri, ti, patch)}
            onAddTrack={() => addTrack(ri)}
            onRemoveTrack={(ti) => removeTrack(ri, ti)}
          />
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={addRound}
          style={{ alignSelf: "flex-start", cursor: "pointer" }}
        >
          + Thêm vòng
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "var(--space-md)" }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={createMutation.isPending}
          style={{ cursor: createMutation.isPending ? "not-allowed" : "pointer", opacity: createMutation.isPending ? 0.6 : 1 }}
        >
          {createMutation.isPending ? "Đang tạo..." : "Tạo sự kiện"}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} style={{ cursor: "pointer" }}>
          {createMutation.isSuccess ? "Đóng" : "Hủy"}
        </button>
      </div>

      {/* Validation / API error */}
      {(formError || apiErrorMessage) && !createMutation.isSuccess && (
        <div
          role="alert"
          style={{
            padding: "var(--space-md)",
            background: "var(--color-surface-soft)",
            border: "1px solid var(--color-error)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-error)",
          }}
          className="t-body-sm"
        >
          {formError ?? apiErrorMessage}
        </div>
      )}

      {/* Success */}
      {createMutation.isSuccess && (
        <div
          role="status"
          style={{
            padding: "var(--space-md)",
            background: "var(--color-surface-soft)",
            border: "1px solid var(--color-primary)",
            borderRadius: "var(--radius-sm)",
          }}
          className="t-body-sm"
        >
          Đã tạo sự kiện{" "}
          <strong>{createMutation.data?.eventName || form.eventName}</strong> thành công.
        </div>
      )}
    </form>
  );
}
