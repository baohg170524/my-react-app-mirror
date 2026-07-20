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
import { TemplateCriteriaModal } from "./TemplateCriteriaModal";
import { TemplateBuilderModal } from "./TemplateBuilderModal";
import { manageApi } from "../api/manage";
import { roundsApi, tracksApi } from "../api/roundTrack";
import { usersApi, storageApi, type UserSummary } from "@/services/api";
import { useNotify } from "@/components/NotificationProvider";
import { getErrorMessage } from "@/lib/apiError";
import { DateTimePicker } from "@/components/DateTimePicker";

// ─── Form state types (mirror the create-event payload) ───────────────────────

interface InvitedUser {
  id?: string;
  email: string;
  fullName: string;
}

/**
 * Submission requirements captured as discrete checkboxes (multi-select).
 * Serialized into the backend's single `submissionRuleDescription` string at
 * submit time — see `serializeSubmissionRequirements`.
 */
interface SubmissionRequirements {
  /** Đường dẫn repository dự án */
  repo: boolean;
  /** Đường dẫn demo */
  demo: boolean;
  /** Đường dẫn báo cáo/slide */
  reportSlide: boolean;
  /** "Khác" — admin tự điền thêm một yêu cầu */
  otherEnabled: boolean;
  /** Nội dung yêu cầu tùy chỉnh khi "Khác" được tích */
  otherText: string;
}

interface TrackForm {
  /** Backend id when editing an existing track; undefined for a new one. */
  id?: string;
  /** Stable client id — key React & trạng thái mở/đóng accordion hạng mục. */
  uid: string;
  trackName: string;
  description: string;
  templateId: string;
  /** Submission requirement checkboxes (serialized to submissionRuleDescription). */
  submissionRequirements: SubmissionRequirements;
  /**
   * Raw saved requirement string loaded in edit mode, shown read-only as a
   * "đã lưu trước đó" reference. `undefined` in create mode (no reference shown).
   */
  savedSubmissionRule?: string;
  // ── Hai khoảng thời gian thực của hạng mục (BE quản lý đúng 2 phase). ──
  /** Nộp bài: mở → hạn nộp — BE: startDate/endDate. */
  startDate: string;
  endDate: string;
  /** Chấm điểm: mở → đóng — BE: scoringStartDate/scoringEndDate. */
  scoringStartDate: string;
  scoringEndDate: string;
}

/** Fixed URL-based submission options shown as checkboxes, in display order. */
const SUBMISSION_URL_OPTIONS = [
  { key: "repo", label: "Link github repository dự án" },
  { key: "demo", label: "Link demo" },
  { key: "reportSlide", label: "Link báo cáo/slide" },
] as const;

const emptySubmissionRequirements = (): SubmissionRequirements => ({
  repo: false,
  demo: false,
  reportSlide: false,
  otherEnabled: false,
  otherText: "",
});

/** Join the checked requirements into the newline-separated backend string. */
function serializeSubmissionRequirements(req: SubmissionRequirements): string {
  const parts: string[] = [];
  for (const opt of SUBMISSION_URL_OPTIONS) {
    if (req[opt.key]) parts.push(opt.label);
  }
  if (req.otherEnabled && req.otherText.trim()) {
    parts.push(`Khác: ${req.otherText.trim()}`);
  }
  return parts.join("\n");
}

/**
 * Reverse of `serializeSubmissionRequirements` — turns the stored backend string
 * back into checkbox state so the edit form shows what was selected before.
 * Lines matching a known URL label tick that box; a "Khác: …" line (or any
 * unrecognized line) fills the custom "Khác" field. Empty input → all unchecked.
 */
function parseSubmissionRequirements(stored: string | null | undefined): SubmissionRequirements {
  const req = emptySubmissionRequirements();
  if (!stored) return req;

  const otherLines: string[] = [];
  for (const raw of stored.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const matched = SUBMISSION_URL_OPTIONS.find((opt) => opt.label === line);
    if (matched) {
      req[matched.key] = true;
    } else if (/^khác\s*:/i.test(line)) {
      otherLines.push(line.replace(/^khác\s*:/i, "").trim());
    } else {
      otherLines.push(line);
    }
  }

  const otherText = otherLines.filter(Boolean).join("\n");
  if (otherText) {
    req.otherEnabled = true;
    req.otherText = otherText;
  }
  return req;
}

interface RoundForm {
  /** Backend id when editing an existing round; undefined for a new one. */
  id?: string;
  /** Stable client id — dùng cho key React & trạng thái mở/đóng accordion (bền qua thêm/xóa). */
  uid: string;
  roundName: string;
  roundNumber: string;
  startDate: string;
  endDate: string;
  advancementRule: string;
  tracks: TrackForm[];
}

let roundUidSeq = 0;
const nextRoundUid = () => `r${++roundUidSeq}`;

interface EventForm {
  eventName: string;
  season: string;
  year: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  description: string;
  status: boolean;
  photoEventUrl: string | null;
  rounds: RoundForm[];
}

// ─── Factories ────────────────────────────────────────────────────────────────

let trackUidSeq = 0;
const nextTrackUid = () => `t${++trackUidSeq}`;

const emptyTrack = (): TrackForm => ({
  uid: nextTrackUid(),
  trackName: "",
  description: "",
  templateId: "",
  submissionRequirements: emptySubmissionRequirements(),
  startDate: "",
  endDate: "",
  scoringStartDate: "",
  scoringEndDate: "",
});

const emptyRound = (): RoundForm => ({
  uid: nextRoundUid(),
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
  registrationStartDate: "",
  registrationEndDate: "",
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
function extractApiError(err: unknown): string | string[] {
  const body = (err as AxiosError<{ message?: string; data?: BackendFieldError[] }>)
    ?.response?.data;
  if (!body) return GENERIC_ERROR;
  if (Array.isArray(body.data)) {
    const messages = body.data.flatMap((item) =>
      Array.isArray(item.value) ? item.value : [],
    );
    if (messages.length) return messages;
  }
  // Hide raw server exception strings ("Exception of type ... was thrown").
  if (body.message && !/Exception|was thrown/i.test(body.message)) {
    return body.message;
  }
  return GENERIC_ERROR;
}

// ─── Small field primitives ───────────────────────────────────────────────────

/** Cặp ngày giờ gọn trên một hàng: [bắt đầu] → [kết thúc]. */
function DateRangeInput({
  start,
  end,
  onStart,
  onEnd,
}: {
  start: string;
  end: string;
  onStart: (v: string) => void;
  onEnd: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <DateTimePicker value={start} onChange={onStart} placeholder="Bắt đầu" />
      </div>
      <span className="t-body-sm" style={{ color: "var(--color-mute)", flexShrink: 0 }}>→</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <DateTimePicker value={end} onChange={onEnd} placeholder="Kết thúc" />
      </div>
    </div>
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
  // URL bị lỗi tải — so với `value` để tự reset khi ảnh đổi (không cần effect).
  const [erroredUrl, setErroredUrl] = useState<string | null>(null);
  const imgError = value != null && value === erroredUrl;
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
      <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>
        Ảnh đại diện sự kiện
      </span>
      {value ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "2.35 / 1", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-hairline)" }}>
          {imgError ? (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "var(--color-surface-soft)" }}>
              <span className="t-body-sm" style={{ color: "var(--color-mute)" }}>Không tải được ảnh</span>
            </div>
          ) : (
            <img src={value} alt="Event Photo" onError={() => setErroredUrl(value)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 8 }}>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              style={{ cursor: "pointer" }}
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
            border: "1px dashed var(--color-ink)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-lg)",
            aspectRatio: "2.35 / 1",
            textAlign: "center",
            cursor: isUploading ? "not-allowed" : "pointer",
            background: "transparent",
            transition: "all 0.2s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: isUploading ? 0.7 : 1,
          }}
        >
          <span className="t-body-strong" style={{ color: "var(--color-mute)" }}>
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

// ─── Submission requirements (vertical checkboxes) ────────────────────────────

function SubmissionRequirementsField({
  value,
  onChange,
}: {
  value: SubmissionRequirements;
  onChange: (next: SubmissionRequirements) => void;
}) {
  const checkboxRow = (
    key: string,
    checked: boolean,
    label: string,
    onToggle: () => void,
  ) => (
    <label
      key={key}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--color-primary)" }}
      />
      <span className="t-body-sm" style={{ color: "var(--color-ink)" }}>
        {label}
      </span>
    </label>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>
        Yêu cầu nộp bài
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 2 }}>
        {SUBMISSION_URL_OPTIONS.map((opt) =>
          checkboxRow(opt.key, value[opt.key], opt.label, () =>
            onChange({ ...value, [opt.key]: !value[opt.key] }),
          ),
        )}
        {checkboxRow("other", value.otherEnabled, "Khác", () =>
          onChange({ ...value, otherEnabled: !value.otherEnabled }),
        )}
        {value.otherEnabled && (
          <input
            className="text-input"
            value={value.otherText}
            placeholder="Nhập yêu cầu nộp bài khác…"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({ ...value, otherText: e.target.value })
            }
            style={{ marginLeft: 26, width: "calc(100% - 26px)" }}
          />
        )}
      </div>
      <Hint>Chọn ít nhất một yêu cầu thí sinh cần nộp (có thể chọn nhiều).</Hint>
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

// ─── Track input card (cùng format thẻ với màn hiển thị timeline) ──────────────

/** Nhãn + cặp ngày giờ cho một pha trong thẻ hạng mục. */
function PhaseInput({
  label,
  start,
  end,
  onStart,
  onEnd,
}: {
  label: string;
  start: string;
  end: string;
  onStart: (v: string) => void;
  onEnd: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <span className="t-body-strong text-ink shrink-0 sm:w-40 tracking-wider">{label}</span>
      <div className="flex-1 min-w-0">
        <DateRangeInput start={start} end={end} onStart={onStart} onEnd={onEnd} />
      </div>
    </div>
  );
}

/** Một hạng mục dạng thẻ nhập liệu — viền + border trái, chứa tên/mô tả/template/
 *  yêu cầu nộp bài và đúng 2 pha thời gian (Nộp bài, Chấm điểm). */
function TrackFormCard({
  track,
  index,
  templates,
  templatesLoading,
  onChange,
}: {
  track: TrackForm;
  index: number;
  templates: TemplateSummary[];
  templatesLoading: boolean;
  onChange: (patch: Partial<TrackForm>) => void;
}) {
  const qc = useQueryClient();
  const notify = useNotify();
  const [showCriteria, setShowCriteria] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  // Khi "chỉnh sửa tiêu chí": clone sẵn rồi mở trình sửa với id + tên bộ mới.
  const [builderTemplateId, setBuilderTemplateId] = useState<string | undefined>(undefined);
  const [builderName, setBuilderName] = useState("");
  const [deriving, setDeriving] = useState(false);

  // Bấm "Chỉnh sửa tiêu chí" trong popup xem: clone bộ đang xem → mở trình sửa
  // với tiêu chí đã copy sẵn.
  async function handleDerive() {
    if (!track.templateId) return;
    setDeriving(true);
    try {
      const detail = await templatesApi.getById(track.templateId);
      if (detail.isSystem) {
        // Bộ dùng chung (hệ thống) → tạo bản RIÊNG (tên duy nhất, BE chặn trùng tên)
        // để không ảnh hưởng sự kiện khác.
        const existing = new Set(templates.map((t) => t.templateName));
        let n = 2;
        let uniqueName = `${detail.templateName} (${n})`;
        while (existing.has(uniqueName)) uniqueName = `${detail.templateName} (${++n})`;
        const newId = await templatesApi.clone(track.templateId, uniqueName);
        onChange({ templateId: newId });
        qc.invalidateQueries({ queryKey: ["templates"] });
        setBuilderTemplateId(newId);
        setBuilderName(uniqueName);
      } else {
        // Bộ riêng (không phải hệ thống) → SỬA TRỰC TIẾP, dùng lại, không tạo mới.
        setBuilderTemplateId(track.templateId);
        setBuilderName(detail.templateName);
      }
      setShowCriteria(false);
      setShowBuilder(true);
    } catch (e) {
      notify.error(getErrorMessage(e, "Không mở được trình chỉnh sửa tiêu chí. Vui lòng thử lại."));
    } finally {
      setDeriving(false);
    }
  }

  function openCreateBlank() {
    setBuilderTemplateId(undefined);
    setBuilderName("");
    setShowBuilder(true);
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">Tên hạng mục</span>
        <input
          className="text-input flex-1 min-w-0"
          style={{ fontWeight: 700 }}
          value={track.trackName}
          placeholder={`Tên hạng mục ${index + 1}`}
          onChange={(e) => onChange({ trackName: e.target.value })}
        />
      </div>

      <div className="flex items-start gap-3">
        <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40 pt-2">Mô tả</span>
        <textarea
          className="text-input flex-1 min-w-0"
          rows={2}
          value={track.description}
          placeholder="Mô tả hạng mục"
          style={{ height: "auto", resize: "vertical", fontFamily: "inherit" }}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">Bộ tiêu chí</span>
        <div className="flex-1 min-w-0" style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
          <select
            className="text-input"
            style={{ flex: 1, minWidth: 0 }}
            value={track.templateId}
            disabled={templatesLoading}
            onChange={(e) => onChange({ templateId: e.target.value })}
          >
            <option value="">{templatesLoading ? "Đang tải template…" : "— Chọn template chấm điểm —"}</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.templateName}</option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline btn-sm shrink-0"
            style={{ height: "auto", alignSelf: "stretch", cursor: "pointer", whiteSpace: "nowrap" }}
            onClick={() => (track.templateId ? setShowCriteria(true) : openCreateBlank())}
          >
            {track.templateId ? "Xem tiêu chí" : "Tạo bộ tiêu chí"}
          </button>
        </div>
      </div>
      {showCriteria && track.templateId && (
        <TemplateCriteriaModal
          templateId={track.templateId}
          onClose={() => setShowCriteria(false)}
          onDerive={handleDerive}
          deriveBusy={deriving}
        />
      )}
      {showBuilder && (
        <TemplateBuilderModal
          initialTemplateId={builderTemplateId}
          initialName={builderName || undefined}
          templates={templates}
          onTemplateReady={(id) => onChange({ templateId: id })}
          onClose={() => setShowBuilder(false)}
        />
      )}

      <SubmissionRequirementsField
        value={track.submissionRequirements}
        onChange={(next) => onChange({ submissionRequirements: next })}
      />

      {/* Hai pha thời gian — cùng thứ tự với màn hiển thị. */}
      <div className="flex flex-col gap-2">
        <PhaseInput label="Nộp bài" start={track.startDate} end={track.endDate}
          onStart={(v) => onChange({ startDate: v })} onEnd={(v) => onChange({ endDate: v })} />
        <PhaseInput label="Chấm điểm" start={track.scoringStartDate} end={track.scoringEndDate}
          onStart={(v) => onChange({ scoringStartDate: v })} onEnd={(v) => onChange({ scoringEndDate: v })} />
      </div>
    </>
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

  // `submissionRuleDescription` AND the two per-track time windows are only
  // returned nested inside GET /Events/{id} (EventModel.rounds[].tracks[]), not by
  // the flat /Tracks/event list — build a trackId → {rule, dates} lookup so the
  // edit form can pre-fill the requirement checkboxes and the Nộp bài/Chấm điểm times.
  interface NestedTrackMeta {
    submissionRule: string;
    startDate: string;
    endDate: string;
    scoringStartDate: string;
    scoringEndDate: string;
  }
  const trackMetaById = new Map<string, NestedTrackMeta>();
  const nestedRounds =
    (event as {
      rounds?: Array<{
        tracks?: Array<{
          id?: string;
          submissionRuleDescription?: string | null;
          startDate?: string | null;
          endDate?: string | null;
          scoringStartDate?: string | null;
          scoringEndDate?: string | null;
        }>;
      }>;
    }).rounds ?? [];
  for (const r of nestedRounds) {
    for (const t of r.tracks ?? []) {
      if (!t.id) continue;
      trackMetaById.set(t.id, {
        submissionRule: t.submissionRuleDescription ?? "",
        startDate: t.startDate ?? "",
        endDate: t.endDate ?? "",
        scoringStartDate: t.scoringStartDate ?? "",
        scoringEndDate: t.scoringEndDate ?? "",
      });
    }
  }

  const orderedRounds = [...rounds].sort((a, b) => a.roundNumber - b.roundNumber);
  const initialForm: EventForm = {
    eventName: event.eventName ?? "",
    season: event.season ?? "",
    year: String(event.year ?? ""),
    startDate: isoToLocalInput(event.startDate),
    endDate: isoToLocalInput(event.endDate),
    registrationStartDate: isoToLocalInput(event.registrationStartDate ?? ""),
    registrationEndDate: isoToLocalInput(event.registrationEndDate ?? ""),
    description: event.description ?? "",
    status: event.status ?? false,
    photoEventUrl: event.photoEventUrl ?? null,
    rounds: orderedRounds.map((r) => ({
      id: r.id,
      uid: nextRoundUid(),
      roundName: r.roundName ?? "",
      roundNumber: String(r.roundNumber ?? ""),
      startDate: isoToLocalInput(r.startDate),
      endDate: isoToLocalInput(r.endDate),
      advancementRule: r.advancementRule ?? "",
      tracks: tracks
        .filter((t) => t.roundId === r.id)
        .map((t) => {
          const meta = trackMetaById.get(t.id);
          return {
            id: t.id,
            uid: nextTrackUid(),
            trackName: t.trackName ?? "",
            description: t.description ?? "",
            templateId: t.templateId ?? "",
            // Pre-fill the requirement checkboxes from the saved rule (joined via id).
            submissionRequirements: parseSubmissionRequirements(meta?.submissionRule),
            // Keep the raw saved string to show as a read-only reference in edit mode.
            savedSubmissionRule: meta?.submissionRule ?? "",
            // Hai khoảng thời gian thực của hạng mục (từ model lồng GET /Events/{id}).
            startDate: isoToLocalInput(meta?.startDate ?? ""),
            endDate: isoToLocalInput(meta?.endDate ?? ""),
            scoringStartDate: isoToLocalInput(meta?.scoringStartDate ?? ""),
            scoringEndDate: isoToLocalInput(meta?.scoringEndDate ?? ""),
          };
        }),
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

// ─── Accordion section (vỏ chứa từng khối của form) ────────────────────────────

/** dd/mm HH:mm ngắn gọn cho tóm tắt header (chuỗi datetime-local). */
function fmtShort(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm} ${hh}:${mi}`;
}

/** Một khối accordion: header (chevron + tiêu đề + tóm tắt + chấm cảnh báo + hành động)
 *  và phần thân mở/đóng được. */
/** Bảng màu viền trái phân biệt các khối. Thông tin/Đăng ký cố định 2 màu đầu;
 *  mỗi Vòng lấy màu xoay vòng từ phần còn lại. */
const SECTION_ACCENTS = ["#0046a4", "#b45309", "#0d9488", "#7c3aed", "#dc2626", "#65a30d", "#0891b2", "#c2410c"];

function AccordionSection({
  title,
  summary,
  warn,
  open,
  onToggle,
  actions,
  accent,
  inset,
  children,
}: {
  title: string;
  summary?: string;
  warn?: boolean;
  open: boolean;
  onToggle: () => void;
  actions?: ReactNode;
  /** Màu viền trái để phân biệt khối. */
  accent?: string;
  /** Thụt thêm phần thân để input thẳng hàng với input hạng mục (lồng sâu hơn). */
  inset?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-md border border-ink bg-canvas overflow-hidden"
      style={accent ? { borderLeftWidth: 4, borderLeftColor: accent } : undefined}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex flex-1 min-w-0 items-center gap-2.5"
          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
        >
          <span style={{ fontSize: 11, color: "var(--color-mute)", transform: open ? "rotate(90deg)" : "none", transition: "transform .15s", flexShrink: 0 }}>▶</span>
          <span className="t-body-strong text-ink shrink-0">{title}</span>
          {!open && summary && <span className="t-caption-sm text-mute truncate">· {summary}</span>}
        </button>
        {warn && (
          <span
            title="Còn thiếu thông tin"
            aria-label="Còn thiếu thông tin"
            style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-error)", flexShrink: 0 }}
          />
        )}
        {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
      </div>
      {open && (
        <div className={`px-4 pb-4 pt-1 border-t border-hairline flex flex-col gap-3${inset ? " sm:pl-9 sm:pr-8.25" : ""}`}>
          {children}
        </div>
      )}
    </div>
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
  // Trạng thái mở/đóng các khối accordion (mở nhiều tùy ý). Mặc định mở "Thông tin".
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set(["info"]));
  const toggleSection = (id: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const originalRoundIds = useRef<string[]>(initialRoundIds);
  const originalTrackIds = useRef<string[]>(initialTrackIds);
  const queryClient = useQueryClient();
  const notify = useNotify();

  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: () => templatesApi.list(),
    staleTime: 5 * 60_000,
  });
  const templates = templatesQuery.data ?? [];

  const createMutation = useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const created = await eventsApi.create(payload);
      // Wait for rounds/tracks creation logic handled in backend (or keep checking for validity, though backend handles creation of rounds/tracks directly from payload)
      return created;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      notify.success("Tạo sự kiện thành công!");
      if (data?.id) {
        router.push(`/events/${data.id}/manage`);
      }
    },
    onError: (e) => notify.error(getErrorMessage(e, "Tạo sự kiện thất bại. Vui lòng thử lại.")),
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      const id = eventId as string;
      const oldStart = new Date(initialForm.startDate).getTime();
      const oldEnd = new Date(initialForm.endDate).getTime();
      const newStart = new Date(form.startDate).getTime();
      const newEnd = new Date(form.endDate).getTime();

      // Create a temporary bounding box that encloses BOTH the old and new timelines.
      // This prevents the backend from rejecting the Event update if the new bounds
      // shrink to exclude old rounds, or rejecting Round updates if they expand outside old bounds.
      const tempStart = newStart < oldStart ? toIso(form.startDate) : toIso(initialForm.startDate);
      const tempEnd = newEnd > oldEnd ? toIso(form.endDate) : toIso(initialForm.endDate);
      const requiresTempWidening = tempStart !== toIso(form.startDate) || tempEnd !== toIso(form.endDate);

      const finalPayload = {
        eventName: form.eventName.trim(),
        season: form.season.trim(),
        year: Number(form.year) || 0,
        startDate: toIso(form.startDate),
        endDate: toIso(form.endDate),
        registrationStartDate: toIso(form.registrationStartDate) || null,
        registrationEndDate: toIso(form.registrationEndDate) || null,
        description: form.description.trim(),
        status: form.status,
        photoEventUrl: form.photoEventUrl || null,
      };

      // 1. Update Event to the widest bounds temporarily (if needed)
      if (requiresTempWidening) {
        await eventsApi.update(id, { ...finalPayload, startDate: tempStart, endDate: tempEnd });
      } else {
        await eventsApi.update(id, finalPayload);
      }

      // 2. Update Rounds and Tracks to their new times
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
            submissionRuleDescription: serializeSubmissionRequirements(t.submissionRequirements),
            startDate: toIso(t.startDate) || null,
            endDate: toIso(t.endDate) || null,
            scoringStartDate: toIso(t.scoringStartDate) || null,
            scoringEndDate: toIso(t.scoringEndDate) || null,
          };
          const trackId = t.id;
          if (trackId) {
            await tracksApi.update(trackId, trackPayload);
          } else {
            // POST /Tracks (CreateTrackRequestModel) chưa nhận submissionRuleDescription
            // → tạo xong update ngay để lưu yêu cầu nộp bài cho hạng mục mới thêm khi sửa.
            const createdId = (await tracksApi.create(trackPayload)).id;
            if (trackPayload.submissionRuleDescription.trim()) {
              await tracksApi.update(createdId, trackPayload);
            }
          }
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

      // 3. Finalize Event to its actual bounds
      if (requiresTempWidening) {
        await eventsApi.update(id, finalPayload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["eventModel", eventId] });
      queryClient.invalidateQueries({ queryKey: ["rounds", eventId] });
      queryClient.invalidateQueries({ queryKey: ["tracks", eventId] });
      // Refresh the edit form's own data so reopening it reflects the saved
      // submission requirements (and any other edits) instead of stale cache.
      queryClient.invalidateQueries({ queryKey: ["eventEditData", eventId] });
      notify.success("Cập nhật sự kiện thành công!");
    },
    onError: (e) => notify.error(getErrorMessage(e, "Cập nhật sự kiện thất bại. Vui lòng thử lại.")),
  });

  const activeMutation = isEdit ? editMutation : createMutation;

  type EventStringKey = "eventName" | "season" | "year" | "startDate" | "endDate" | "registrationStartDate" | "registrationEndDate" | "description";
  const setField = (key: EventStringKey, value: string) =>
    setForm((f) => {
      const updated = { ...f, [key]: value };
      // When event start date is updated, auto-fill (chỉ khi đang trống) Round 1 start,
      // mốc bắt đầu đăng ký, và derive Year/Season để hiển thị.
      if (key === "startDate") {
        if (updated.rounds[0] && !updated.rounds[0].startDate) {
          updated.rounds[0] = { ...updated.rounds[0], startDate: value };
        }
        // Bắt đầu đăng ký = bắt đầu sự kiện (điền sẵn, vẫn sửa được).
        if (!updated.registrationStartDate) {
          updated.registrationStartDate = value;
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
  const addRound = () => {
    const newR = { ...emptyRound() };
    setForm((f) => {
      const lastRound = f.rounds[f.rounds.length - 1];
      newR.startDate = lastRound ? lastRound.endDate : f.startDate;
      return { ...f, rounds: [...f.rounds, newR] };
    });
    setOpenSections((prev) => new Set(prev).add(`round-${newR.uid}`)); // vòng mới tự mở
  };

  const removeRound = (ri: number) =>
    setForm((f) => ({ ...f, rounds: f.rounds.filter((_, i) => i !== ri) }));

  const updateRound = (ri: number, key: keyof Omit<RoundForm, "tracks">, value: string) =>
    setForm((f) => {
      const updatedRounds = f.rounds.map((r, i) => {
        if (i !== ri) return r;
        const nextRound = { ...r, [key]: value };
        // Auto-fill thời gian hạng mục theo vòng (chỉ khi ô đang trống, vẫn sửa được):
        //  • Bắt đầu nộp bài (startDate) = bắt đầu vòng.
        //  • Bắt đầu chấm điểm (scoringStartDate) = kết thúc vòng.
        if (key === "startDate" || key === "endDate") {
          nextRound.tracks = r.tracks.map((t) => ({
            ...t,
            startDate: key === "startDate" && !t.startDate ? value : t.startDate,
            scoringStartDate: key === "endDate" && !t.scoringStartDate ? value : t.scoringStartDate,
          }));
        }
        return nextRound;
      });
      // Kết thúc vòng cũng gợi ý bắt đầu vòng kế tiếp (nếu vòng sau chưa đặt).
      if (key === "endDate" && updatedRounds[ri + 1] && !updatedRounds[ri + 1].startDate) {
        updatedRounds[ri + 1] = { ...updatedRounds[ri + 1], startDate: value };
      }
      return { ...f, rounds: updatedRounds };
    });

  // ── track operations ──
  const addTrack = (ri: number) => {
    const uid = nextTrackUid();
    setForm((f) => ({
      ...f,
      rounds: f.rounds.map((r, i) =>
        i === ri
          ? {
              ...r,
              // Hạng mục mới điền sẵn: nộp bài mở = bắt đầu vòng, chấm điểm mở = kết thúc vòng.
              tracks: [
                ...r.tracks,
                { ...emptyTrack(), uid, startDate: r.startDate, scoringStartDate: r.endDate },
              ],
            }
          : r,
      ),
    }));
    setOpenSections((prev) => new Set(prev).add(`track-${uid}`)); // hạng mục mới tự mở
  };

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
      registrationStartDate: toIso(form.registrationStartDate) || null,
      registrationEndDate: toIso(form.registrationEndDate) || null,
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
          submissionRuleDescription: serializeSubmissionRequirements(t.submissionRequirements),
          startDate: toIso(t.startDate) || null,
          endDate: toIso(t.endDate) || null,
          scoringStartDate: toIso(t.scoringStartDate) || null,
          scoringEndDate: toIso(t.scoringEndDate) || null,
        })),
      })),
    };
  }

  function validate(): string | null {
    // Sự kiện đã kết thúc (theo mốc kết thúc gốc đã lưu) → khóa mọi chỉnh sửa.
    if (isEdit) {
      const originalEnd = new Date(initialForm.endDate).getTime();
      if (!Number.isNaN(originalEnd) && originalEnd < Date.now()) {
        return "Sự kiện đã kết thúc, không thể chỉnh sửa.";
      }
    }
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

    // Thời gian đăng ký (tùy chọn) — nhất quán với auto-fill: đăng ký mở khi sự
    // kiện bắt đầu và phải nằm gọn trong khung thời gian sự kiện.
    if (form.registrationStartDate && form.registrationEndDate) {
      const regStart = new Date(form.registrationStartDate).getTime();
      const regEnd = new Date(form.registrationEndDate).getTime();
      if (regEnd <= regStart) {
        return "Ngày kết thúc đăng ký phải sau ngày bắt đầu đăng ký.";
      }
      if (regStart < eventStart || regEnd > eventEnd) {
        return "Thời gian đăng ký phải nằm trong khoảng thời gian diễn ra sự kiện.";
      }
    } else if (form.registrationStartDate || form.registrationEndDate) {
      return "Vui lòng nhập đầy đủ cả thời gian bắt đầu và kết thúc đăng ký.";
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
        const track = r.tracks[j];
        if (!track.trackName.trim())
          return `Vòng ${i + 1} – Hạng mục ${j + 1}: vui lòng nhập tên hạng mục.`;

        const req = track.submissionRequirements;
        if (req.otherEnabled && !req.otherText.trim())
          return `Vòng ${i + 1} – Hạng mục ${j + 1}: đã chọn "Khác" nhưng chưa nhập nội dung yêu cầu.`;
        if (!serializeSubmissionRequirements(req).trim())
          return `Vòng ${i + 1} – Hạng mục ${j + 1}: vui lòng chọn ít nhất một yêu cầu nộp bài.`;
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

  // ── Tóm tắt + cảnh báo (chấm đỏ) cho header các khối accordion ──
  const infoWarn = !form.eventName.trim() || !form.startDate || !form.endDate || (Number(form.year) || 0) <= 2000;
  const regWarn = (!!form.registrationStartDate) !== (!!form.registrationEndDate); // chỉ điền 1 trong 2
  const regSummary = form.registrationStartDate && form.registrationEndDate
    ? `${fmtShort(form.registrationStartDate)} → ${fmtShort(form.registrationEndDate)}`
    : "Chưa đặt thời gian";
  const roundWarn = (r: RoundForm) =>
    !r.roundName.trim() || !r.startDate || !r.endDate || !r.advancementRule.trim() || r.tracks.some((t) => !t.trackName.trim());
  const roundSummary = (r: RoundForm) => {
    const time = r.startDate && r.endDate ? `${fmtShort(r.startDate)} → ${fmtShort(r.endDate)}` : "chưa đặt";
    return `${time} · ${r.tracks.length} hạng mục`;
  };
  const trackWarn = (t: TrackForm) =>
    !t.trackName.trim() || !serializeSubmissionRequirements(t.submissionRequirements).trim();
  const trackSummary = (t: TrackForm) =>
    t.startDate && t.endDate ? `Nộp: ${fmtShort(t.startDate)} → ${fmtShort(t.endDate)}` : "Chưa đặt giờ nộp";

  return (
    <form className="create-event-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {/* Các khối accordion (mở nhiều tùy ý). Nút hành động cách xa bên dưới. */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>

        {/* Khối 1: Thông tin sự kiện */}
        <AccordionSection
          title="Thông tin sự kiện"
          summary={form.eventName.trim() || "(Chưa đặt tên)"}
          warn={infoWarn}
          accent={SECTION_ACCENTS[0]}
          inset
          open={openSections.has("info")}
          onToggle={() => toggleSection("info")}
        >
        {/* Thứ tự khớp trang chi tiết: ảnh → tên → mô tả → thời gian */}
        <EventPhotoUpload
          value={form.photoEventUrl}
          onChange={(url) => setForm(f => ({ ...f, photoEventUrl: url }))}
        />

        {/* Tên & mô tả căn giữa, không nhãn — vị trí giống title/desc ở trang chi tiết */}
        <input
          className="text-input"
          value={form.eventName}
          placeholder="Tên sự kiện"
          onChange={(e) => setField("eventName", e.target.value)}
          style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: 700 }}
        />
        <textarea
          className="text-input"
          rows={2}
          value={form.description}
          placeholder="Mô tả sự kiện"
          onChange={(e) => setField("description", e.target.value)}
          style={{ textAlign: "center", height: "auto", resize: "vertical", fontFamily: "inherit", width: "100%" }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">
            Thời gian sự kiện
          </span>
          <div className="flex-1 min-w-0">
            <DateRangeInput
              start={form.startDate}
              end={form.endDate}
              onStart={(v) => setField("startDate", v)}
              onEnd={(v) => setField("endDate", v)}
            />
          </div>
        </div>

        {/* Mùa + Năm — suy tự động từ ngày bắt đầu; BE là nguồn chính, chỉ hiển thị. */}
        <div style={{ display: "flex", gap: "var(--space-xl)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>Mùa</span>
            <span className="t-body-sm" style={{ color: form.season ? "var(--color-ink)" : "var(--color-mute)", fontWeight: 600 }}>
              {form.season || "—"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>Năm</span>
            <span className="t-body-sm" style={{ color: form.year ? "var(--color-ink)" : "var(--color-mute)", fontWeight: 600 }}>
              {form.year || "—"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>
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
              {/* transform:translateX thay vì left — animate trên GPU (compositor), tránh reflow mỗi frame. */}
              <span
                style={{
                  width: 18,
                  height: 18,
                  background: '#fff',
                  borderRadius: 1,
                  position: 'absolute',
                  top: 2,
                  left: 2,
                  transform: `translateX(${form.status ? 24 : 0}px)`,
                  transition: 'transform 150ms ease',
                }}
              />
            </button>
            <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 700, color: form.status ? 'var(--color-primary)' : 'var(--color-mute)' }}>
              {form.status ? 'HIỆN' : 'ẨN'}
            </span>
          </div>
        </div>
        {/* <Hint>Sự kiện tự chuyển sang “Đã kết thúc” (vẫn hiện cho mọi người) sau ngày kết thúc.</Hint> */}
        </AccordionSection>

        {/* Khối 2: Đăng ký */}
        <AccordionSection
          title="Đăng ký"
          summary={regSummary}
          warn={regWarn}
          accent={SECTION_ACCENTS[1]}
          inset
          open={openSections.has("reg")}
          onToggle={() => toggleSection("reg")}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">Thời gian đăng ký</span>
            <div className="flex-1 min-w-0">
              <DateRangeInput
                start={form.registrationStartDate} end={form.registrationEndDate}
                onStart={(v) => setField("registrationStartDate", v)} onEnd={(v) => setField("registrationEndDate", v)}
              />
            </div>
          </div>
        </AccordionSection>

        {/* Khối 3..N: từng Vòng */}
        {form.rounds.map((round, ri) => {
          const { type, value } = parseAdvancementRule(round.advancementRule);
          return (
            <AccordionSection
              key={round.uid}
              title={`Vòng ${ri + 1}${round.roundName.trim() ? ": " + round.roundName.trim() : ""}`}
              summary={roundSummary(round)}
              warn={roundWarn(round)}
              accent={SECTION_ACCENTS[(2 + ri) % SECTION_ACCENTS.length]}
              open={openSections.has(`round-${round.uid}`)}
              onToggle={() => toggleSection(`round-${round.uid}`)}
              actions={form.rounds.length > 1 ? (
                <button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={() => removeRound(ri)}>Xóa vòng</button>
              ) : undefined}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:pl-5 sm:pr-4.25">
                <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">Thời gian vòng {ri + 1}</span>
                <div className="flex-1 min-w-0">
                  <DateRangeInput
                    start={round.startDate} end={round.endDate}
                    onStart={(v) => updateRound(ri, "startDate", v)} onEnd={(v) => updateRound(ri, "endDate", v)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:pl-5 sm:pr-4.25">
                <span className="t-body-strong text-ink shrink-0 tracking-wider sm:w-40">Tên vòng</span>
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <input className="text-input min-w-0" style={{ flex: "0.93 1 0%" }} value={round.roundName}
                    placeholder={`Tên vòng ${ri + 1}`} onChange={(e) => updateRound(ri, "roundName", e.target.value)} />
                  <span className="t-body-sm" style={{ flexShrink: 0, visibility: "hidden" }} aria-hidden>→</span>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="t-body-strong text-ink shrink-0 tracking-wider">Lên vòng</span>
                    <select className="text-input flex-1 min-w-0" value={type}
                      onChange={(e) => { const nt = e.target.value; const dv = nt === "minScore" ? "7.5" : nt === "percent" ? "50" : "10"; updateRound(ri, "advancementRule", `${nt}:${dv}`); }}>
                      <option value="top">Top số đội</option>
                      <option value="percent">Phần trăm</option>
                      <option value="minScore">Điểm tối thiểu</option>
                    </select>
                    <input className="text-input shrink-0" style={{ width: 90 }} type="number" value={value}
                      onChange={(e) => updateRound(ri, "advancementRule", `${type}:${e.target.value}`)} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {round.tracks.map((track, ti) => (
                  <AccordionSection
                    key={track.uid}
                    title={`Hạng mục ${ti + 1}${track.trackName.trim() ? ": " + track.trackName.trim() : ""}`}
                    summary={trackSummary(track)}
                    warn={trackWarn(track)}
                    accent="var(--color-ink)"
                    open={openSections.has(`track-${track.uid}`)}
                    onToggle={() => toggleSection(`track-${track.uid}`)}
                    actions={round.tracks.length > 1 ? (
                      <button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={() => removeTrack(ri, ti)}>Xóa</button>
                    ) : undefined}
                  >
                    <TrackFormCard
                      track={track}
                      index={ti}
                      templates={templates}
                      templatesLoading={templatesQuery.isLoading}
                      onChange={(patch) => updateTrack(ri, ti, patch)}
                    />
                  </AccordionSection>
                ))}
                <button type="button" className="btn btn-outline btn-sm" style={{ alignSelf: "flex-start", cursor: "pointer" }} onClick={() => addTrack(ri)}>
                  + Thêm hạng mục
                </button>
              </div>
            </AccordionSection>
          );
        })}

        {/* + Thêm vòng */}
        <button type="button" className="btn btn-outline btn-sm" style={{ alignSelf: "flex-start", cursor: "pointer" }} onClick={addRound}>
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
          {formError ? formError : (
            Array.isArray(apiErrorMessage) ? (
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {apiErrorMessage.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            ) : apiErrorMessage
          )}
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
