"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { eventsApi, type CreateEventPayload } from "../api/events";
import { templatesApi, type TemplateSummary } from "../api/templates";
import { manageApi } from "../api/manage";
import { roundsApi, tracksApi } from "../api/roundTrack";
import { usersApi, type UserSummary } from "@/services/api";
import { storageApi } from "@/services/api/storage";

// ─── Form state types (mirror the create-event payload) ───────────────────────

interface InvitedUser {
  id?: string;
  email: string;
  fullName: string;
}

interface TrackForm {
  /** Backend id when editing an existing track; undefined for a new one. */
  id?: string;
  trackName: string;
  description: string;
  templateId: string;
  /** Free-text submission requirement (sent as submissionRuleDescription). */
  submissionRuleDescription: string;
  /** Optional — judge accounts to invite to this track. */
  judgeUserIds: InvitedUser[];
  /** Optional — mentor accounts to invite to this track. */
  mentorUserIds: InvitedUser[];
}

interface RoundForm {
  /** Backend id when editing an existing round; undefined for a new one. */
  id?: string;
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
  status: boolean;
  photoEventUrl: string | null;
  rounds: RoundForm[];
}

// ─── Factories ────────────────────────────────────────────────────────────────

const emptyTrack = (): TrackForm => ({
  trackName: "",
  description: "",
  templateId: "",
  submissionRuleDescription: "",
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
  status: true,
  photoEventUrl: null,
  rounds: [emptyRound()],
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** datetime-local value → ISO string (empty stays empty). */
function toIso(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? local : d.toISOString();
}

/** ISO string → `YYYY-MM-DDTHH:mm` for a datetime-local input (local time). */
function isoToLocalInput(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
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

/** Small muted helper line under a field. */
function Hint({ children }: { children: ReactNode }) {
  return (
    <span className="t-caption-sm" style={{ color: "var(--color-mute)", marginTop: -2 }}>
      {children}
    </span>
  );
}

/** Search users by email/name in the database and add them as chips (stores ids). */
function UserSearchSelect({
  label,
  values,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  values: InvitedUser[];
  onChange: (next: InvitedUser[]) => void;
  placeholder?: string;
  hint?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [manualFullName, setManualFullName] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [labels, setLabels] = useState<Record<string, string>>({});

  const searchQuery = useQuery({
    queryKey: ["userSearch", debounced],
    enabled: debounced.length >= 2,
    queryFn: () => usersApi.search(debounced),
    staleTime: 30_000,
  });
  const results = (searchQuery.data ?? []).filter((u) => !values.some((v) => v.id === u.id || v.email === u.email));

  const labelFor = (user: InvitedUser) => {
    const fallback = user.fullName || user.email || user.id || "(không tên)";
    return labels[user.id ?? user.email] ?? fallback;
  };

  const onType = (v: string) => {
    setQuery(v);
    setOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(v.trim()), 250);
  };

  const addUser = (u: UserSummary) => {
    const inviteUser: InvitedUser = {
      id: u.id,
      email: u.email ?? "",
      fullName: u.fullName ?? "",
    };
    setLabels((prev) => ({ ...prev, [u.id]: u.email ?? u.fullName ?? u.id }));
    if (!values.some((v) => v.id === u.id || v.email === inviteUser.email)) {
      onChange([...values, inviteUser]);
    }
    setQuery("");
    setDebounced("");
    setOpen(false);
  };

  const addManualUser = () => {
    const normalizedEmail = query.trim();
    const normalizedFullName = manualFullName.trim();
    if (!normalizedEmail) return;

    const inviteUser: InvitedUser = {
      id: undefined,
      email: normalizedEmail,
      fullName: normalizedFullName || normalizedEmail,
    };

    if (!values.some((v) => v.email === inviteUser.email)) {
      onChange([...values, inviteUser]);
    }

    setLabels((prev) => ({ ...prev, [normalizedEmail]: inviteUser.fullName }));
    setQuery("");
    setDebounced("");
    setManualFullName("");
    setOpen(false);
  };

  const removeAt = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>
        {label}
      </span>

      {values.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {values.map((v, i) => (
            <span
              key={`${v.email}-${i}`}
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
              {labelFor(v)}
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`Xóa ${labelFor(v)}`}
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

      <div ref={wrapperRef} style={{ position: "relative" }}>
        <input
          className="text-input"
          value={query}
          placeholder={placeholder ?? "Nhập email để tìm…"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onType(e.target.value)}
          onFocus={() => setOpen(true)}
          style={{ width: "100%" }}
        />

        {open && debounced.length >= 2 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 20,
              background: "var(--color-canvas)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              maxHeight: 220,
              overflowY: "auto",
            }}
          >
            {searchQuery.isLoading ? (
              <div className="t-caption-sm" style={{ padding: "10px 12px", color: "var(--color-mute)" }}>
                Đang tìm…
              </div>
            ) : results.length === 0 ? (
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="t-caption-sm" style={{ color: "var(--color-mute)" }}>
                  Không tìm thấy người dùng. Bạn có thể nhập thủ công email và tên đầy đủ để mời.
                </div>
                <input
                  className="text-input"
                  value={manualFullName}
                  onChange={(e) => setManualFullName(e.target.value)}
                  placeholder="Nhập họ và tên"
                  style={{ width: "100%" }}
                />
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addManualUser();
                  }}
                  style={{
                    alignSelf: "flex-start",
                    padding: "6px 10px",
                    background: "var(--color-surface-soft)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: "var(--fs-caption-sm)",
                    color: "var(--color-primary)",
                  }}
                >
                  + Thêm người này
                </button>
              </div>
            ) : (
              results.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addUser(u);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    background: "none",
                    border: "none",
                    borderBottom: "var(--border-hairline)",
                    cursor: "pointer",
                  }}
                >
                  <span className="t-body-sm" style={{ color: "var(--color-ink)" }}>
                    {u.email ?? "(không có email)"}
                  </span>
                  {u.fullName && (
                    <span className="t-caption-sm" style={{ color: "var(--color-mute)" }}>
                      {u.fullName}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {hint && <Hint>{hint}</Hint>}
    </div>
  );
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

function EventPhotoUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Chỉ chấp nhận tệp hình ảnh (.png, .jpg, .jpeg, ...)");
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const url = await storageApi.upload(file);
      onChange(url);
    } catch (err) {
      setError((err as Error).message || "Tải ảnh lên thất bại.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Chỉ chấp nhận tệp hình ảnh (.png, .jpg, .jpeg, ...)");
      return;
    }
    setIsUploading(true);
    setError(null);
    try {
      const url = await storageApi.upload(file);
      onChange(url);
    } catch (err) {
      setError((err as Error).message || "Tải ảnh lên thất bại.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="t-caption-xs" style={{ color: "var(--color-mute)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Ảnh đại diện sự kiện
      </span>
      {value ? (
        <div style={{ position: "relative", width: "100%", height: 240, borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-hairline)" }}>
          <img src={value} alt="Event Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 8 }}>
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "none" }}
              onClick={() => fileInputRef.current?.click()}
            >
              Thay đổi
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              style={{ background: "rgba(255,255,255,0.9)", border: "none" }}
              onClick={() => onChange(null)}
            >
              Xóa ảnh
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: "2px dashed var(--color-primary)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-xxl)",
            textAlign: "center",
            cursor: isUploading ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, rgba(118, 185, 0, 0.05) 0%, rgba(118, 185, 0, 0.01) 100%)",
            transition: "all 0.2s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: isUploading ? 0.7 : 1,
          }}
        >
          <div style={{ fontSize: 32, color: "var(--color-mute)", marginBottom: 8 }}>
            {isUploading ? "⏳" : "📸"}
          </div>
          <span className="t-body-strong" style={{ color: "var(--color-primary)" }}>
            {isUploading ? "Đang tải ảnh lên..." : "Nhấn để chọn hoặc kéo thả ảnh vào đây"}
          </span>
          <span className="t-caption-sm" style={{ color: "var(--color-mute)" }}>
            Hỗ trợ PNG, JPG, JPEG. Tối đa 5MB.
          </span>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      )}
      {error && (
        <span className="t-caption-sm" style={{ color: "var(--color-error)", marginTop: 4 }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Track editor ─────────────────────────────────────────────────────────────

function TrackCard({
  track,
  index,
  canRemove,
  templates,
  templatesLoading,
  onChange,
  onRemove,
}: {
  track: TrackForm;
  index: number;
  canRemove: boolean;
  templates: TemplateSummary[];
  templatesLoading: boolean;
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
      <Field label="Template chấm điểm">
        <select
          className="text-input"
          value={track.templateId}
          onChange={(e) => onChange({ templateId: e.target.value })}
          disabled={templatesLoading}
          style={{ cursor: templatesLoading ? "wait" : "pointer" }}
        >
          <option value="">
            {templatesLoading
              ? "Đang tải template…"
              : templates.length === 0
                ? "Chưa có template nào"
                : "— Chọn template —"}
          </option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.templateName}
            </option>
          ))}
        </select>
      </Field>

      <TextArea
        label="Yêu cầu nộp bài"
        value={track.submissionRuleDescription}
        onChange={(v) => onChange({ submissionRuleDescription: v })}
        placeholder="VD: Nộp link GitHub repo và bản thuyết trình (PDF)."
      />

      <UserSearchSelect
        label="Judge (tùy chọn)"
        values={track.judgeUserIds}
        onChange={(next) => onChange({ judgeUserIds: next })}
        placeholder="Nhập email để tìm judge…"
        hint="Tìm theo email/tên tài khoản có trong hệ thống."
      />

      <UserSearchSelect
        label="Mentor (tùy chọn)"
        values={track.mentorUserIds}
        onChange={(next) => onChange({ mentorUserIds: next })}
        placeholder="Nhập email để tìm mentor…"
      />
    </div>
  );
}

// ─── Round editor ─────────────────────────────────────────────────────────────

function parseAdvancementRule(rule: string) {
  const trimmed = (rule || "").trim();
  if (trimmed.startsWith('top:')) {
    return { type: 'top', value: trimmed.replace('top:', '') };
  }
  if (trimmed.toLowerCase().startsWith('percent:')) {
    return { type: 'percent', value: trimmed.replace(/percent:/i, '') };
  }
  if (trimmed.toLowerCase().startsWith('minscore:')) {
    return { type: 'minScore', value: trimmed.replace(/minscore:/i, '') };
  }
  // Mặc định là top nếu rỗng hoặc không khớp
  return { type: 'top', value: '' };
}

function RoundCard({
  round,
  index,
  canRemove,
  templates,
  templatesLoading,
  onChange,
  onRemove,
  onTrackChange,
  onAddTrack,
  onRemoveTrack,
}: {
  round: RoundForm;
  index: number;
  canRemove: boolean;
  templates: TemplateSummary[];
  templatesLoading: boolean;
  onChange: (key: keyof Omit<RoundForm, "tracks">, value: string) => void;
  onRemove: () => void;
  onTrackChange: (trackIndex: number, patch: Partial<TrackForm>) => void;
  onAddTrack: () => void;
  onRemoveTrack: (trackIndex: number) => void;
}) {
  const { type, value } = parseAdvancementRule(round.advancementRule);

  const handleRuleTypeChange = (newType: string) => {
    const defaultValue = newType === 'minScore' ? '7.5' : newType === 'percent' ? '50' : '10';
    onChange('advancementRule', `${newType}:${defaultValue}`);
  };

  const handleRuleValueChange = (newValue: string) => {
    if (type === 'manual') {
      onChange('advancementRule', newValue);
    } else {
      onChange('advancementRule', `${type}:${newValue}`);
    }
  };

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

      <TextField label="Tên vòng" value={round.roundName} onChange={(v) => onChange("roundName", v)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
        <TextField
          label="Mở cổng nộp bài"
          type="datetime-local"
          value={round.startDate}
          onChange={(v) => onChange("startDate", v)}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <TextField
            label="Hạn chót nộp bài (Deadline)"
            type="datetime-local"
            value={round.endDate}
            onChange={(v) => onChange("endDate", v)}
          />
          {round.startDate && (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>Đặt nhanh:</span>
              {[2, 24, 48, 72].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => {
                    const date = new Date(round.startDate);
                    date.setHours(date.getHours() + hours);
                    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                    onChange("endDate", local.toISOString().slice(0, 16));
                  }}
                  style={{
                    padding: "3px 8px",
                    background: "var(--color-canvas)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: 2,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--color-mute)",
                    cursor: "pointer",
                    transition: "all 100ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-hairline)";
                    e.currentTarget.style.color = "var(--color-mute)";
                  }}
                >
                  +{hours}h
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="t-caption-xs" style={{ color: "var(--color-mute)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Quy tắc thăng vòng (Advancement Rule)
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
          <select
            className="text-input"
            value={type}
            onChange={(e) => handleRuleTypeChange(e.target.value)}
            style={{ cursor: "pointer" }}
          >
            <option value="top">🏆 Lấy Top số lượng đội (top:N)</option>
            <option value="percent">📈 Lấy theo phần trăm (percent:P)</option>
            <option value="minScore">🎯 Điểm số tối thiểu (minScore:X)</option>
          </select>

          <input
            className="text-input"
            type="number"
            step={type === 'minScore' ? '0.1' : '1'}
            min="0"
            max={type === 'percent' ? '100' : undefined}
            value={value}
            onChange={(e) => handleRuleValueChange(e.target.value)}
            placeholder={
              type === 'top' ? "Nhập số lượng đội (VD: 10)" :
                type === 'percent' ? "Nhập phần trăm % (VD: 50)" :
                  "Nhập điểm tối thiểu (VD: 7.5)"
            }
          />
        </div>
        <Hint>
          <div style={{ fontSize: 11, lineHeight: "1.4em", marginTop: 2 }}>
            💡 Cú pháp được cấu hình tự động: <code style={{ background: "var(--color-surface-elevated)", padding: "1px 4px", borderRadius: 2, fontWeight: 700, color: "var(--color-primary)" }}>{round.advancementRule || "(Để trống)"}</code>
          </div>
        </Hint>
      </div>

      {/* Tracks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        {round.tracks.map((track, ti) => (
          <TrackCard
            key={ti}
            track={track}
            index={ti}
            canRemove={round.tracks.length > 1}
            templates={templates}
            templatesLoading={templatesLoading}
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

// ─── Edit-mode loader: fetches the event then renders the prefilled form ───────

export function CreateEventForm({
  onCancel,
  eventId,
}: {
  onCancel: () => void;
  /** When provided, the form edits an existing event instead of creating. */
  eventId?: string;
}) {
  if (!eventId) {
    return (
      <EventFormBody
        onCancel={onCancel}
        initialForm={emptyEvent()}
        initialRoundIds={[]}
        initialTrackIds={[]}
      />
    );
  }
  return <EditEventLoader eventId={eventId} onCancel={onCancel} />;
}

function EditEventLoader({
  eventId,
  onCancel,
}: {
  eventId: string;
  onCancel: () => void;
}) {
  const editQuery = useQuery({
    queryKey: ["eventEditData", eventId],
    queryFn: async () => {
      const [event, rounds, tracks] = await Promise.all([
        eventsApi.getModelById(eventId),
        manageApi.listEventRounds(eventId),
        manageApi.listEventTracks(eventId),
      ]);
      return { event, rounds, tracks };
    },
    staleTime: 0,
  });

  if (editQuery.isError) {
    return (
      <p className="t-body-md" style={{ color: "var(--color-error)" }}>
        Không tải được sự kiện để chỉnh sửa.
      </p>
    );
  }
  if (!editQuery.data) {
    return (
      <p className="t-body-md" style={{ color: "var(--color-mute)" }}>
        Đang tải sự kiện…
      </p>
    );
  }

  const { event, rounds, tracks } = editQuery.data;
  const orderedRounds = [...rounds].sort((a, b) => a.roundNumber - b.roundNumber);
  const initialForm: EventForm = {
    eventName: event.eventName ?? "",
    season: event.season ?? "",
    year: String(event.year ?? ""),
    startDate: isoToLocalInput(event.startDate),
    endDate: isoToLocalInput(event.endDate),
    description: event.description ?? "",
    status: event.status ?? false,
    photoEventUrl: event.photoEventUrl ?? null,
    rounds: orderedRounds.map((r) => ({
      id: r.id,
      roundName: r.roundName ?? "",
      roundNumber: String(r.roundNumber ?? ""),
      startDate: isoToLocalInput(r.startDate),
      endDate: isoToLocalInput(r.endDate),
      advancementRule: r.advancementRule ?? "",
      tracks: tracks
        .filter((t) => t.roundId === r.id)
        .map((t) => ({
          id: t.id,
          trackName: t.trackName ?? "",
          description: t.description ?? "",
          templateId: t.templateId ?? "",
          submissionRuleDescription: "",
          judgeUserIds: [],
          mentorUserIds: [],
        })),
    })),
  };

  return (
    <EventFormBody
      onCancel={onCancel}
      eventId={eventId}
      initialForm={initialForm}
      initialRoundIds={rounds.map((r) => r.id).filter(Boolean)}
      initialTrackIds={tracks.map((t) => t.id).filter(Boolean)}
    />
  );
}

// ─── Main form body ─────────────────────────────────────────────────────────────

function EventFormBody({
  onCancel,
  eventId,
  initialForm,
  initialRoundIds,
  initialTrackIds,
}: {
  onCancel: () => void;
  eventId?: string;
  initialForm: EventForm;
  initialRoundIds: string[];
  initialTrackIds: string[];
}) {
  const isEdit = !!eventId;
  const router = useRouter();
  const [form, setForm] = useState<EventForm>(() => initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const originalRoundIds = useRef<string[]>(initialRoundIds);
  const originalTrackIds = useRef<string[]>(initialTrackIds);
  const queryClient = useQueryClient();

  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: () => templatesApi.list(),
    staleTime: 5 * 60_000,
  });
  const templates = templatesQuery.data ?? [];

  const inviteUsersToTrack = async (eventId: string, trackId: string, judges: InvitedUser[], mentors: InvitedUser[]) => {
    for (const judge of judges) {
      const email = judge.email?.trim();
      if (!email) continue;
      await manageApi.inviteJudge({
        eventId,
        trackId,
        judgeEmail: email,
        judgeFullName: judge.fullName?.trim() || email,
        notes: "",
      });
    }

    for (const mentor of mentors) {
      const email = mentor.email?.trim();
      if (!email) continue;
      await manageApi.inviteMentor({
        eventId,
        trackId,
        mentorEmail: email,
        mentorFullName: mentor.fullName?.trim() || email,
        notes: "",
      });
    }
  };

  const createMutation = useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const created = await eventsApi.create(payload);
      const [createdRounds, createdTracks] = await Promise.all([
        manageApi.listEventRounds(created.id),
        manageApi.listEventTracks(created.id),
      ]);

      for (let ri = 0; ri < form.rounds.length; ri++) {
        const r = form.rounds[ri];
        const createdRound = createdRounds.find((round) => round.roundNumber === ri + 1);
        if (!createdRound?.id) continue;

        const roundTracks = createdTracks.filter((track) => track.roundId === createdRound.id);
        for (let ti = 0; ti < r.tracks.length; ti++) {
          const t = r.tracks[ti];
          const createdTrack = roundTracks[ti];
          if (!createdTrack?.id) continue;

          await inviteUsersToTrack(created.id, createdTrack.id, t.judgeUserIds, t.mentorUserIds);
        }
      }

      return created;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      if (data?.id) {
        router.push(`/events/${data.id}/manage`);
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      const id = eventId as string;
      await eventsApi.update(id, {
        eventName: form.eventName.trim(),
        season: form.season.trim(),
        year: Number(form.year) || 0,
        startDate: toIso(form.startDate),
        endDate: toIso(form.endDate),
        description: form.description.trim(),
        status: form.status,
        photoEventUrl: form.photoEventUrl || null,
      });

      for (let ri = 0; ri < form.rounds.length; ri++) {
        const r = form.rounds[ri];
        const roundPayload = {
          eventId: id,
          roundName: r.roundName.trim(),
          roundNumber: ri + 1,
          startDate: toIso(r.startDate),
          endDate: toIso(r.endDate),
          advancementRule: r.advancementRule.trim(),
        };
        let roundId = r.id;
        if (roundId) await roundsApi.update(roundId, roundPayload);
        else roundId = (await roundsApi.create(roundPayload)).id;

        for (const t of r.tracks) {
          const trackPayload = {
            eventId: id,
            roundId: roundId as string,
            trackName: t.trackName.trim(),
            templateId: t.templateId.trim() || null,
            description: t.description.trim(),
          };
          let trackId = t.id;
          if (trackId) await tracksApi.update(trackId, trackPayload);
          else trackId = (await tracksApi.create(trackPayload)).id;

          await inviteUsersToTrack(id, trackId, t.judgeUserIds, t.mentorUserIds);
        }
      }

      const keptTrackIds = new Set(
        form.rounds.flatMap((r) => r.tracks.map((t) => t.id)).filter(Boolean),
      );
      for (const tid of originalTrackIds.current) {
        if (!keptTrackIds.has(tid)) await tracksApi.remove(tid);
      }
      const keptRoundIds = new Set(form.rounds.map((r) => r.id).filter(Boolean));
      for (const rid of originalRoundIds.current) {
        if (!keptRoundIds.has(rid)) await roundsApi.remove(rid);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["eventModel", eventId] });
      queryClient.invalidateQueries({ queryKey: ["rounds", eventId] });
      queryClient.invalidateQueries({ queryKey: ["tracks", eventId] });
    },
  });

  const activeMutation = isEdit ? editMutation : createMutation;

  type EventStringKey = "eventName" | "season" | "year" | "startDate" | "endDate" | "description";
  const setField = (key: EventStringKey, value: string) =>
    setForm((f) => {
      const updated = { ...f, [key]: value };
      // When event start date is updated, automatically populate Round 1 start date, Year and Season
      if (key === "startDate") {
        if (updated.rounds[0]) {
          updated.rounds[0] = { ...updated.rounds[0], startDate: value };
        }
        if (value) {
          const date = new Date(value);
          const year = date.getFullYear();
          if (year && !Number.isNaN(year)) {
            updated.year = String(year);
          }

          // Auto-derive FPT University Academic Season based on user requirements:
          // Spring: Jan to Apr (0 to 3)
          // Summer: May to Aug (4 to 7)
          // Fall: Sep to Dec (8 to 11)
          const month = date.getMonth(); // 0-11
          if (month >= 0 && month <= 3) {
            updated.season = "Spring";
          } else if (month >= 4 && month <= 7) {
            updated.season = "Summer";
          } else {
            updated.season = "Fall";
          }
        } else {
          updated.year = "";
          updated.season = "";
        }
      }
      return updated;
    });

  const setStatus = (status: boolean) => setForm((f) => ({ ...f, status }));

  // ── round operations ──
  const addRound = () =>
    setForm((f) => {
      const lastRound = f.rounds[f.rounds.length - 1];
      const nextStartDate = lastRound ? lastRound.endDate : f.startDate;
      const newR = { ...emptyRound(), startDate: nextStartDate };
      return { ...f, rounds: [...f.rounds, newR] };
    });

  const removeRound = (ri: number) =>
    setForm((f) => ({ ...f, rounds: f.rounds.filter((_, i) => i !== ri) }));

  const updateRound = (ri: number, key: keyof Omit<RoundForm, "tracks">, value: string) =>
    setForm((f) => {
      const updatedRounds = f.rounds.map((r, i) => (i === ri ? { ...r, [key]: value } : r));
      // When round end date is updated, automatically set next round's start date
      if (key === "endDate" && updatedRounds[ri + 1]) {
        updatedRounds[ri + 1] = { ...updatedRounds[ri + 1], startDate: value };
      }
      return { ...f, rounds: updatedRounds };
    });

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

  // `templateId` sent as null when unset — empty string makes the backend throw a 500.
  // For invite-based flow, create-event payload should only build the event/round/track structure.
  // Judge/mentor role creation and mail sending happen later through invite APIs.
  function buildPayload(): CreateEventPayload {
    return {
      eventName: form.eventName.trim(),
      season: form.season.trim(),
      year: Number(form.year) || 0,
      startDate: toIso(form.startDate),
      endDate: toIso(form.endDate),
      description: form.description.trim(),
      status: form.status,
      photoEventUrl: form.photoEventUrl || null,
      rounds: form.rounds.map((r, ri) => ({
        roundName: r.roundName.trim(),
        roundNumber: ri + 1,
        startDate: toIso(r.startDate),
        endDate: toIso(r.endDate),
        advancementRule: r.advancementRule.trim(),
        tracks: r.tracks.map((t) => ({
          trackName: t.trackName.trim(),
          description: t.description.trim(),
          templateId: t.templateId.trim() || null,
          submissionRuleDescription: t.submissionRuleDescription.trim(),
          judgeUserIds: [],
          mentorUserIds: [],
        })),
      })),
    };
  }

  function validate(): string | null {
    if (!form.eventName.trim()) return "Vui lòng nhập tên sự kiện.";
    if ((Number(form.year) || 0) <= 2000) return "Năm tổ chức phải lớn hơn 2000.";
    if (!form.startDate) return "Vui lòng chọn ngày bắt đầu sự kiện.";
    if (!form.endDate) return "Vui lòng chọn ngày kết thúc sự kiện.";

    const now = Date.now() - 60000; // Allow 1 minute buffer for user entry latency
    const eventStart = new Date(form.startDate).getTime();
    const eventEnd = new Date(form.endDate).getTime();

    // Prevent past dates when creating a new event
    if (!isEdit && eventStart < now) {
      return "Ngày bắt đầu sự kiện không được ở trong quá khứ.";
    }

    if (eventEnd <= eventStart) {
      return "Ngày kết thúc sự kiện phải sau ngày bắt đầu.";
    }

    for (let i = 0; i < form.rounds.length; i++) {
      const r = form.rounds[i];
      if (!r.roundName.trim()) return `Vòng ${i + 1}: vui lòng nhập tên vòng.`;
      if (!r.startDate || !r.endDate)
        return `Vòng ${i + 1}: vui lòng chọn ngày bắt đầu và kết thúc.`;

      // Validate Quy tắc thăng vòng (Advancement Rule)
      const ruleStr = (r.advancementRule || "").trim();
      if (!ruleStr) {
        return `Vòng ${i + 1}: vui lòng cấu hình quy tắc thăng vòng.`;
      }
      if (ruleStr.startsWith('top:')) {
        const val = Number(ruleStr.replace('top:', ''));
        if (Number.isNaN(val) || val <= 0 || !Number.isInteger(val)) {
          return `Vòng ${i + 1}: số lượng đội thi lấy top phải là một số nguyên lớn hơn 0.`;
        }
      } else if (ruleStr.toLowerCase().startsWith('percent:')) {
        const val = Number(ruleStr.replace(/percent:/i, ''));
        if (Number.isNaN(val) || val < 0 || val > 100) {
          return `Vòng ${i + 1}: tỷ lệ phần trăm đội thi lấy tiếp phải nằm trong khoảng từ 0% đến 100%.`;
        }
      } else if (ruleStr.toLowerCase().startsWith('minscore:')) {
        const val = Number(ruleStr.replace(/minscore:/i, ''));
        if (Number.isNaN(val) || val < 0 || val > 100) {
          return `Vòng ${i + 1}: điểm số tối thiểu để thăng vòng phải nằm trong khoảng từ 0 đến 100.`;
        }
      } else {
        return `Vòng ${i + 1}: quy tắc thăng vòng không hợp lệ. Vui lòng chọn và cấu hình lại.`;
      }

      const roundStart = new Date(r.startDate).getTime();
      const roundEnd = new Date(r.endDate).getTime();

      if (!isEdit && roundStart < now) {
        return `Vòng ${i + 1}: ngày bắt đầu không được ở trong quá khứ.`;
      }

      if (roundEnd <= roundStart) {
        return `Vòng ${i + 1}: ngày kết thúc phải sau ngày bắt đầu.`;
      }

      // Round dates must fit within the overall event timeline
      if (roundStart < eventStart || roundEnd > eventEnd) {
        return `Vòng ${i + 1}: thời gian của vòng thi phải nằm trong khoảng thời gian diễn ra sự kiện.`;
      }

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

    if (isEdit) editMutation.mutate();
    else createMutation.mutate(buildPayload());
  }

  const apiErrorMessage = activeMutation.isError
    ? extractApiError(activeMutation.error)
    : null;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {/* Event-level fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        <TextField label="Tên sự kiện" value={form.eventName} onChange={(v) => setField("eventName", v)} />
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

        {/* Thông tin tự động nhận diện */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-md)",
          padding: "16px",
          background: "linear-gradient(135deg, rgba(118, 185, 0, 0.08) 0%, rgba(118, 185, 0, 0.02) 100%)",
          border: "2px dashed var(--color-primary)",
          borderRadius: "var(--radius-sm)",
          marginTop: "4px"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="t-caption-xs" style={{ color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
              MÙA (SEASON)
            </span>
            <div style={{
              padding: "10px 14px",
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-body-sm)",
              fontWeight: 700,
              color: form.season ? "var(--color-primary)" : "var(--color-mute)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              minHeight: 40
            }}>
              {form.season ? (
                form.season === "Spring" ? "🌸 Kỳ Spring (Mùa Xuân)" :
                  form.season === "Summer" ? "☀️ Kỳ Summer (Mùa Hè)" :
                    "🍂 Kỳ Fall (Mùa Thu)"
              ) : (
                "Chờ ngày bắt đầu..."
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="t-caption-xs" style={{ color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
              NĂM
            </span>
            <div style={{
              padding: "10px 14px",
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-body-sm)",
              fontWeight: 700,
              color: form.year ? "var(--color-primary)" : "var(--color-mute)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              minHeight: 40
            }}>
              {form.year ? `📅 Năm ${form.year}` : "Chờ ngày bắt đầu..."}
            </div>
          </div>
          <span className="t-caption-xs" style={{ gridColumn: "span 2", color: "var(--color-mute)", fontStyle: "italic", marginTop: 4 }}>
            💡 Hệ thống tự động xác định Mùa và Năm dựa vào ngày bắt đầu của sự kiện.
          </span>
        </div>
        
        <EventPhotoUpload 
          value={form.photoEventUrl} 
          onChange={(url) => setForm(f => ({ ...f, photoEventUrl: url }))} 
        />

        <TextArea label="Mô tả" value={form.description} onChange={(v) => setField("description", v)} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="t-caption-xs" style={{ color: "var(--color-mute)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Trạng thái hiển thị
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => setStatus(!form.status)}
              style={{
                width: 48,
                height: 24,
                background: form.status ? 'var(--color-primary)' : 'var(--color-surface-elevated)',
                border: '1px solid var(--color-hairline-strong)',
                borderRadius: 2,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 150ms ease',
                padding: 0,
              }}
              aria-label={form.status ? "Ẩn sự kiện" : "Hiện sự kiện"}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  background: '#fff',
                  borderRadius: 1,
                  position: 'absolute',
                  top: 2,
                  left: form.status ? 26 : 2,
                  transition: 'left 150ms ease',
                }}
              />
            </button>
            <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 700, color: form.status ? 'var(--color-primary)' : 'var(--color-mute)' }}>
              {form.status ? 'HIỆN' : 'ẨN'}
            </span>
          </div>
        </div>
        {/* <Hint>Sự kiện tự chuyển sang “Đã kết thúc” (vẫn hiện cho mọi người) sau ngày kết thúc.</Hint> */}
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
            templates={templates}
            templatesLoading={templatesQuery.isLoading}
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
          disabled={activeMutation.isPending}
          style={{
            cursor: activeMutation.isPending ? "not-allowed" : "pointer",
            opacity: activeMutation.isPending ? 0.6 : 1,
          }}
        >
          {isEdit
            ? activeMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"
            : activeMutation.isPending ? "Đang tạo..." : "Tạo sự kiện"}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} style={{ cursor: "pointer" }}>
          {activeMutation.isSuccess ? "Đóng" : "Hủy"}
        </button>
      </div>

      {/* Validation / API error */}
      {(formError || apiErrorMessage) && !activeMutation.isSuccess && (
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
      {activeMutation.isSuccess && (
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
          {isEdit ? (
            <>Đã cập nhật sự kiện thành công.</>
          ) : (
            <>
              Đã tạo sự kiện{" "}
              <strong>{createMutation.data?.eventName || form.eventName}</strong> thành công.
            </>
          )}
        </div>
      )}
    </form>
  );
}
