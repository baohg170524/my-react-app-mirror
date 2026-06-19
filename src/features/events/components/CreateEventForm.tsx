"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";

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
        <span className="t-caption-md" style={{ color: "var(--color-primary)" }}>
          Track {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onRemove}
            style={{ cursor: "pointer" }}
          >
            Xóa track
          </button>
        )}
      </div>

      <TextField label="Tên track" value={track.trackName} onChange={(v) => onChange({ trackName: v })} />
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
          + Thêm track
        </button>
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function CreateEventForm({ onCancel }: { onCancel: () => void }) {
  const [form, setForm] = useState<EventForm>(emptyEvent);
  const [preview, setPreview] = useState<string | null>(null);

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

  // ── submit (UI-only: build payload, log + preview) ──
  function buildPayload() {
    return {
      eventName: form.eventName,
      season: form.season,
      year: Number(form.year) || 0,
      startDate: toIso(form.startDate),
      endDate: toIso(form.endDate),
      description: form.description,
      eventCoordinatorIds: form.eventCoordinatorIds,
      rounds: form.rounds.map((r) => ({
        roundName: r.roundName,
        roundNumber: Number(r.roundNumber) || 0,
        startDate: toIso(r.startDate),
        endDate: toIso(r.endDate),
        advancementRule: r.advancementRule,
        tracks: r.tracks.map((t) => ({
          trackName: t.trackName,
          description: t.description,
          templateId: t.templateId,
          submissionLinks: t.submissionLinks,
          judgeUserIds: t.judgeUserIds,
          mentorUserIds: t.mentorUserIds,
        })),
      })),
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = buildPayload();
    // UI-only for now — not wired to an API.
    console.log("[CreateEventForm] payload:", payload);
    setPreview(JSON.stringify(payload, null, 2));
  }

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
        <button type="submit" className="btn btn-primary" style={{ cursor: "pointer" }}>
          Tạo sự kiện
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} style={{ cursor: "pointer" }}>
          Hủy
        </button>
      </div>

      {/* UI-only payload preview */}
      {preview && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <span className="t-caption-md" style={{ color: "var(--color-primary)" }}>
            Payload (UI demo — chưa gửi API, xem thêm ở console)
          </span>
          <pre
            style={{
              margin: 0,
              padding: "var(--space-md)",
              background: "var(--color-surface-soft)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-caption-sm)",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {preview}
          </pre>
        </div>
      )}
    </form>
  );
}
