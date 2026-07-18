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
  // ── Thời gian các bước của hạng mục (chuỗi cho DateTimePicker). ──
  /** Nộp bài: mở → hạn nộp — BE: startDate/endDate. */
  startDate: string;
  endDate: string;
  /** Khung tổng của hạng mục (hiển thị cạnh tên) — BE chưa hỗ trợ (chỉ FE, chưa lưu). */
  windowStartDate: string;
  windowEndDate: string;
  /** Bắt đầu thi (khung thi) — BE chưa hỗ trợ (chỉ FE, chưa lưu). */
  competeStartDate: string;
  competeEndDate: string;
  /** Chấm điểm — BE: scoringStartDate/scoringEndDate. */
  scoringStartDate: string;
  scoringEndDate: string;
  /** Phúc khảo — BE chưa hỗ trợ (chỉ giữ ở FE, chưa lưu). */
  appealStartDate: string;
  appealEndDate: string;
  /** Công bố kết quả — BE chưa hỗ trợ (chỉ giữ ở FE, chưa lưu). */
  resultPublishDate: string;
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
  registrationStartDate: string;
  registrationEndDate: string;
  description: string;
  status: boolean;
  photoEventUrl: string | null;
  /** Khung công bố kết quả chung cuộc — BE chưa hỗ trợ (chỉ FE, chưa lưu). */
  announceStartDate: string;
  announceEndDate: string;
  rounds: RoundForm[];
}

// ─── Factories ────────────────────────────────────────────────────────────────

const emptyTrack = (): TrackForm => ({
  trackName: "",
  description: "",
  templateId: "",
  submissionRequirements: emptySubmissionRequirements(),
  startDate: "",
  endDate: "",
  windowStartDate: "",
  windowEndDate: "",
  competeStartDate: "",
  competeEndDate: "",
  scoringStartDate: "",
  scoringEndDate: "",
  appealStartDate: "",
  appealEndDate: "",
  resultPublishDate: "",
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
  registrationStartDate: "",
  registrationEndDate: "",
  description: "",
  status: true,
  photoEventUrl: null,
  announceStartDate: "",
  announceEndDate: "",
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
            border: "1px dashed var(--color-hairline)",
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
  savedReference,
}: {
  value: SubmissionRequirements;
  onChange: (next: SubmissionRequirements) => void;
  /** When defined (edit mode), shows the saved requirement as a read-only reference. */
  savedReference?: string;
}) {
  const savedLines =
    savedReference === undefined
      ? null
      : savedReference.split("\n").map((l) => l.trim()).filter(Boolean);

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
      <span className="t-caption-xs" style={{ color: "var(--color-mute)" }}>
        Yêu cầu nộp bài
      </span>

      {savedLines !== null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: "8px 10px",
            background: "var(--color-surface-soft)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <span className="t-caption-xs" style={{ color: "var(--color-mute)", fontWeight: 700 }}>
            Đã lưu trước đó
          </span>
          {savedLines.length === 0 ? (
            <span className="t-caption-sm" style={{ color: "var(--color-mute)", fontStyle: "italic" }}>
              Chưa có yêu cầu nào được lưu.
            </span>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 2 }}>
              {savedLines.map((line, i) => (
                <li key={i} className="t-caption-sm" style={{ color: "var(--color-ink)" }}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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

// ─── Timeline rail primitives (form dạng timeline) ─────────────────────────────

/** Chấm trên rail. `phase` = mốc lớn (đăng ký/vòng/kết quả), `sub` = hạng mục,
 *  `step` = 5 bước (mờ, không nhập). */
function RailDot({ level }: { level: "phase" | "sub" | "step" }) {
  const size = level === "phase" ? "w-3.5 h-3.5" : level === "sub" ? "w-2.5 h-2.5" : "w-2 h-2";
  const fill =
    level === "step"
      ? "bg-canvas border-dashed border-mute"
      : "bg-primary border-primary";
  return <span className={`relative z-10 shrink-0 rounded-full border-2 ${size} ${fill}`} />;
}

/** Một node trên rail: chấm + đường nối dọc + nội dung. `last` bỏ đường nối. */
function RailNode({
  level,
  last,
  children,
}: {
  level: "phase" | "sub" | "step";
  last?: boolean;
  children: React.ReactNode;
}) {
  const top = level === "phase" ? "top-4" : "top-3";
  return (
    <div className="relative flex gap-3 md:gap-4 pb-6 last:pb-0">
      <div className="relative flex flex-col items-center shrink-0">
        <RailDot level={level} />
        {!last && <span className={`absolute ${top} bottom-0 w-px bg-hairline`} />}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/** Một bước quy trình của hạng mục: chấm + nhãn + ô nhập thời gian. */
function StepRow({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    /* Ô nhập bên trái, nhãn bên phải — giống hàng [thời gian] [title] ở display */
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <div className="shrink-0 w-full sm:w-[22rem]">{children}</div>
      <div className="min-w-0">
        <span className="t-body-sm text-ink">{label}</span>
        {note && <span className="t-caption-xs text-mute italic"> ({note})</span>}
      </div>
    </div>
  );
}

/** 5 bước quy trình của hạng mục — nhập thời gian trực tiếp. Phúc khảo & Công bố
 *  kết quả BE chưa hỗ trợ nên đánh dấu "chưa lưu". */
function TrackSteps({
  track,
  onChange,
}: {
  track: TrackForm;
  onChange: (patch: Partial<TrackForm>) => void;
}) {
  return (
    <div className="mt-3 border-l border-hairline pl-4 flex flex-col gap-3">
      <StepRow label="Bắt đầu thi">
        <DateTimePicker value={track.startDate} onChange={(v) => onChange({ startDate: v })} placeholder="Chọn thời gian" />
      </StepRow>
      <StepRow label="Nộp bài">
        <DateTimePicker value={track.endDate} onChange={(v) => onChange({ endDate: v })} placeholder="Chọn thời gian" />
      </StepRow>
      <StepRow label="Chấm điểm">
        <DateRangeInput
          start={track.scoringStartDate}
          end={track.scoringEndDate}
          onStart={(v) => onChange({ scoringStartDate: v })}
          onEnd={(v) => onChange({ scoringEndDate: v })}
        />
      </StepRow>
      <StepRow label="Phúc khảo" note="chưa lưu">
        <DateRangeInput
          start={track.appealStartDate}
          end={track.appealEndDate}
          onStart={(v) => onChange({ appealStartDate: v })}
          onEnd={(v) => onChange({ appealEndDate: v })}
        />
      </StepRow>
      <StepRow label="Công bố kết quả" note="chưa lưu">
        <DateTimePicker value={track.resultPublishDate} onChange={(v) => onChange({ resultPublishDate: v })} placeholder="Chọn thời gian" />
      </StepRow>
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
    <RailNode level="sub">
      <div className="flex flex-col gap-3">
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

      <SubmissionRequirementsField
        value={track.submissionRequirements}
        onChange={(next) => onChange({ submissionRequirements: next })}
        savedReference={track.savedSubmissionRule}
      />
      </div>
      <TrackSteps track={track} onChange={onChange} />
    </RailNode>
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
    <RailNode level="phase">
      <div className="flex flex-col gap-3">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="t-heading-sm">Vòng {index + 1}</span>
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
      <DateRangeInput
        start={round.startDate}
        end={round.endDate}
        onStart={(v) => onChange("startDate", v)}
        onEnd={(v) => onChange("endDate", v)}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>
          Quy tắc thăng vòng (Advancement Rule)
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
          <select
            className="text-input"
            value={type}
            onChange={(e) => handleRuleTypeChange(e.target.value)}
            style={{ cursor: "pointer" }}
          >
            <option value="top">Lấy Top số lượng đội (top:N)</option>
            <option value="percent">Lấy theo phần trăm (percent:P)</option>
            <option value="minScore">Điểm số tối thiểu (minScore:X)</option>
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
            Cú pháp được cấu hình tự động: <code style={{ background: "var(--color-surface-elevated)", padding: "1px 4px", borderRadius: 2, fontWeight: 700, color: "var(--color-primary)" }}>{round.advancementRule || "(Để trống)"}</code>
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
    </RailNode>
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

  // `submissionRuleDescription` is only returned nested inside GET /Events/{id}
  // (EventModel.rounds[].tracks[]), not by the flat /Tracks/event list — build a
  // trackId → rule lookup so the edit form can pre-fill the requirement checkboxes.
  const submissionRuleByTrackId = new Map<string, string>();
  const nestedRounds =
    (event as { rounds?: Array<{ tracks?: Array<{ id?: string; submissionRuleDescription?: string | null }> }> })
      .rounds ?? [];
  for (const r of nestedRounds) {
    for (const t of r.tracks ?? []) {
      if (t.id) submissionRuleByTrackId.set(t.id, t.submissionRuleDescription ?? "");
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
    announceStartDate: "",
    announceEndDate: "",
    rounds: orderedRounds.map((r) => ({
      id: r.id,
      roundName: r.roundName ?? "",
      roundNumber: String(r.roundNumber ?? ""),
      startDate: isoToLocalInput(r.startDate),
      endDate: isoToLocalInput(r.endDate),
      advancementRule: r.advancementRule ?? "",
      tracks: tracks
        .filter((t) => t.roundId === r.id)
        .map((t) => {
          const td = t as {
            startDate?: string | null;
            endDate?: string | null;
            scoringStartDate?: string | null;
            scoringEndDate?: string | null;
          };
          return {
            id: t.id,
            trackName: t.trackName ?? "",
            description: t.description ?? "",
            templateId: t.templateId ?? "",
            // Pre-fill the requirement checkboxes from the saved rule (joined via id).
            submissionRequirements: parseSubmissionRequirements(
              submissionRuleByTrackId.get(t.id),
            ),
            // Keep the raw saved string to show as a read-only reference in edit mode.
            savedSubmissionRule: submissionRuleByTrackId.get(t.id) ?? "",
            // Thời gian bước (BE hỗ trợ start/end/scoring; phúc khảo & công bố chưa có).
            startDate: isoToLocalInput(td.startDate ?? ""),
            endDate: isoToLocalInput(td.endDate ?? ""),
            windowStartDate: "",
            windowEndDate: "",
            competeStartDate: "",
            competeEndDate: "",
            scoringStartDate: isoToLocalInput(td.scoringStartDate ?? ""),
            scoringEndDate: isoToLocalInput(td.scoringEndDate ?? ""),
            appealStartDate: "",
            appealEndDate: "",
            resultPublishDate: "",
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

// ─── Timeline nhập liệu (copy UI từ EventTimeline hiển thị) ─────────────────────

// Hình học rail — copy y hệt EventTimeline để form giống display.
const TL_DOT_X = [12, 42, 72];
const TL_DOT_Y = 11;
const TL_DOT_SIZE = ["w-3.5 h-3.5", "w-2.5 h-2.5", "w-2 h-2"];
const TL_CONTENT_PL = ["sm:pl-[32px]", "sm:pl-[62px]", "sm:pl-[92px]"];
const TL_TIME_W = ["sm:w-[428px]", "sm:w-[398px]", "sm:w-[368px]"];

function TLSegment({ x, from, to }: { x: number; from: number; to: number | "bottom" }) {
  return (
    <span
      className="absolute w-0.5 -translate-x-1/2 bg-hairline"
      style={{ left: x, top: from, height: to === "bottom" ? undefined : to - from, bottom: to === "bottom" ? 0 : undefined }}
    />
  );
}

interface FormRowProps {
  depth: number;
  isFirst: boolean;   // đầu nhóm anh-em cùng cấp
  isLast: boolean;    // cuối nhóm anh-em cùng cấp
  isFirstRow: boolean;
  isLastRow: boolean;
  extraGap?: boolean;
  timeSlot?: ReactNode;
  titleSlot: ReactNode;
}

/** Một hàng timeline nhập: rail (spine + chấm) + [cột thời gian | cột title]. */
function FormRow({ depth, isFirst, isLast, isFirstRow, isLastRow, extraGap, timeSlot, titleSlot }: FormRowProps) {
  const contentPl = TL_CONTENT_PL[depth] ?? TL_CONTENT_PL[2];
  const timeW = TL_TIME_W[depth] ?? TL_TIME_W[2];
  const pb = isLastRow ? "" : extraGap ? "pb-14" : depth === 2 ? "pb-5" : "pb-10";
  return (
    <div className="relative flex">
      <div className="absolute inset-0 pointer-events-none">
        {!isFirstRow && <TLSegment x={TL_DOT_X[0]} from={0} to={TL_DOT_Y} />}
        {!isLastRow && <TLSegment x={TL_DOT_X[0]} from={TL_DOT_Y} to="bottom" />}
        {depth === 2 && !isFirst && <TLSegment x={TL_DOT_X[2]} from={0} to={TL_DOT_Y} />}
        {depth === 2 && !isLast && <TLSegment x={TL_DOT_X[2]} from={TL_DOT_Y} to="bottom" />}
        <span
          className={`absolute rounded-full bg-primary border-2 border-primary ${TL_DOT_SIZE[depth]}`}
          style={{ left: TL_DOT_X[depth], top: TL_DOT_Y, transform: "translate(-50%, -50%)" }}
        />
      </div>
      <div className={`flex-1 min-w-0 pl-24 ${contentPl} flex flex-col sm:flex-row sm:items-baseline sm:gap-x-3 ${pb}`}>
        <div className={`shrink-0 ${timeW}`}>{timeSlot}</div>
        <div className="flex flex-1 min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">{titleSlot}</div>
      </div>
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

  type EventStringKey = "eventName" | "season" | "year" | "startDate" | "endDate" | "registrationStartDate" | "registrationEndDate" | "description" | "announceStartDate" | "announceEndDate";
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

    if (form.registrationStartDate && form.registrationEndDate) {
      const regStart = new Date(form.registrationStartDate).getTime();
      const regEnd = new Date(form.registrationEndDate).getTime();
      if (regEnd <= regStart) {
        return "Ngày kết thúc đăng ký phải sau ngày bắt đầu đăng ký.";
      }
      if (regEnd > eventStart) {
        return "Thời gian đăng ký phải diễn ra trước ngày bắt đầu sự kiện.";
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

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {/* Event-level fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
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

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="t-body-strong" style={{ color: "var(--color-ink)", letterSpacing: "0.05em" }}>
            Thời gian sự kiện
          </span>
          <DateRangeInput
            start={form.startDate}
            end={form.endDate}
            onStart={(v) => setField("startDate", v)}
            onEnd={(v) => setField("endDate", v)}
          />
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
      </div>

      {/* Timeline nhập liệu: Mở đăng ký → Vòng → Kết quả chung cuộc */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
        <h3 className="t-heading-sm" style={{ margin: 0 }}>
          Lịch trình sự kiện
        </h3>
        <div className="relative flex flex-col">
          {(() => {
            type Spec = { key: string; depth: number; isFirst: boolean; isLast: boolean; timeSlot?: ReactNode; titleSlot: ReactNode };
            const specs: Spec[] = [];

            // 1) Mở đăng ký
            specs.push({
              key: "reg", depth: 0, isFirst: true, isLast: false,
              timeSlot: (
                <DateRangeInput
                  start={form.registrationStartDate} end={form.registrationEndDate}
                  onStart={(v) => setField("registrationStartDate", v)} onEnd={(v) => setField("registrationEndDate", v)}
                />
              ),
              titleSlot: <span className="t-body-strong text-ink">Mở đăng ký</span>,
            });

            // 2) Vòng → hạng mục → 5 bước
            form.rounds.forEach((round, ri) => {
              const { type, value } = parseAdvancementRule(round.advancementRule);
              specs.push({
                key: `round-${ri}`, depth: 0, isFirst: false, isLast: false,
                timeSlot: (
                  <DateRangeInput
                    start={round.startDate} end={round.endDate}
                    onStart={(v) => updateRound(ri, "startDate", v)} onEnd={(v) => updateRound(ri, "endDate", v)}
                  />
                ),
                titleSlot: (
                  <>
                    <input className="text-input" style={{ width: 320, maxWidth: "100%", fontWeight: 700 }} value={round.roundName}
                      placeholder={`Tên vòng ${ri + 1}`} onChange={(e) => updateRound(ri, "roundName", e.target.value)} />
                    {form.rounds.length > 1 && (
                      <button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={() => removeRound(ri)}>Xóa vòng</button>
                    )}
                    <div className="basis-full flex flex-wrap items-center gap-2">
                      <span className="t-caption-xs text-mute shrink-0">Lên vòng:</span>
                      <select className="text-input shrink-0" style={{ width: 160 }} value={type}
                        onChange={(e) => { const nt = e.target.value; const dv = nt === "minScore" ? "7.5" : nt === "percent" ? "50" : "10"; updateRound(ri, "advancementRule", `${nt}:${dv}`); }}>
                        <option value="top">Top số đội</option>
                        <option value="percent">Phần trăm</option>
                        <option value="minScore">Điểm tối thiểu</option>
                      </select>
                      <input className="text-input shrink-0" style={{ width: 90 }} type="number" value={value}
                        onChange={(e) => updateRound(ri, "advancementRule", `${type}:${e.target.value}`)} />
                    </div>
                  </>
                ),
              });

              round.tracks.forEach((track, ti) => {
                specs.push({
                  key: `track-${ri}-${ti}`, depth: 1, isFirst: ti === 0, isLast: ti === round.tracks.length - 1,
                  timeSlot: (
                    <DateRangeInput
                      start={track.windowStartDate} end={track.windowEndDate}
                      onStart={(v) => updateTrack(ri, ti, { windowStartDate: v })} onEnd={(v) => updateTrack(ri, ti, { windowEndDate: v })}
                    />
                  ),
                  titleSlot: (
                    <>
                      <input className="text-input" style={{ maxWidth: 320, fontWeight: 700 }} value={track.trackName}
                        placeholder="Tên hạng mục" onChange={(e) => updateTrack(ri, ti, { trackName: e.target.value })} />
                      {round.tracks.length > 1 && (
                        <button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={() => removeTrack(ri, ti)}>Xóa</button>
                      )}
                      <div className="basis-full flex flex-col gap-2">
                        <textarea className="text-input" rows={2} value={track.description} placeholder="Mô tả hạng mục"
                          style={{ height: "auto", resize: "vertical", fontFamily: "inherit" }}
                          onChange={(e) => updateTrack(ri, ti, { description: e.target.value })} />
                        <select className="text-input" value={track.templateId} disabled={templatesQuery.isLoading}
                          onChange={(e) => updateTrack(ri, ti, { templateId: e.target.value })}>
                          <option value="">{templatesQuery.isLoading ? "Đang tải template…" : "— Chọn template chấm điểm —"}</option>
                          {templates.map((t) => (<option key={t.id} value={t.id}>{t.templateName}</option>))}
                        </select>
                        <SubmissionRequirementsField value={track.submissionRequirements}
                          onChange={(next) => updateTrack(ri, ti, { submissionRequirements: next })} savedReference={track.savedSubmissionRule} />
                      </div>
                    </>
                  ),
                });

                const stepLabel = (label: string, note?: string) => (
                  <span className="t-body-strong text-ink">{label}{note && <span className="t-caption-xs text-mute italic"> ({note})</span>}</span>
                );
                specs.push({ key: `s1-${ri}-${ti}`, depth: 2, isFirst: true, isLast: false, timeSlot: <DateRangeInput start={track.competeStartDate} end={track.competeEndDate} onStart={(v) => updateTrack(ri, ti, { competeStartDate: v })} onEnd={(v) => updateTrack(ri, ti, { competeEndDate: v })} />, titleSlot: stepLabel("Bắt đầu thi") });
                specs.push({ key: `s2-${ri}-${ti}`, depth: 2, isFirst: false, isLast: false, timeSlot: <DateRangeInput start={track.startDate} end={track.endDate} onStart={(v) => updateTrack(ri, ti, { startDate: v })} onEnd={(v) => updateTrack(ri, ti, { endDate: v })} />, titleSlot: stepLabel("Nộp bài") });
                specs.push({ key: `s3-${ri}-${ti}`, depth: 2, isFirst: false, isLast: false, timeSlot: <DateRangeInput start={track.scoringStartDate} end={track.scoringEndDate} onStart={(v) => updateTrack(ri, ti, { scoringStartDate: v })} onEnd={(v) => updateTrack(ri, ti, { scoringEndDate: v })} />, titleSlot: stepLabel("Chấm điểm") });
                specs.push({ key: `s4-${ri}-${ti}`, depth: 2, isFirst: false, isLast: false, timeSlot: <DateRangeInput start={track.appealStartDate} end={track.appealEndDate} onStart={(v) => updateTrack(ri, ti, { appealStartDate: v })} onEnd={(v) => updateTrack(ri, ti, { appealEndDate: v })} />, titleSlot: stepLabel("Phúc khảo") });
                specs.push({ key: `s5-${ri}-${ti}`, depth: 2, isFirst: false, isLast: true, timeSlot: <DateTimePicker value={track.resultPublishDate} onChange={(v) => updateTrack(ri, ti, { resultPublishDate: v })} placeholder="Chọn thời gian" />, titleSlot: stepLabel("Công bố kết quả") });
              });

              specs.push({ key: `addtrack-${ri}`, depth: 1, isFirst: false, isLast: true, titleSlot: (<button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={() => addTrack(ri)}>+ Thêm hạng mục</button>) });
            });

            specs.push({ key: "addround", depth: 0, isFirst: false, isLast: false, titleSlot: (<button type="button" className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} onClick={addRound}>+ Thêm vòng</button>) });
            specs.push({
              key: "final", depth: 0, isFirst: false, isLast: true,
              timeSlot: (
                <DateTimePicker value={form.announceStartDate} onChange={(v) => setField("announceStartDate", v)} placeholder="Chọn thời gian" />
              ),
              titleSlot: (<span className="t-body-strong text-ink">Công bố kết quả chung cuộc</span>),
            });

            return specs.map((s, i) => (
              <FormRow key={s.key} depth={s.depth} isFirst={s.isFirst} isLast={s.isLast}
                isFirstRow={i === 0} isLastRow={i === specs.length - 1}
                extraGap={i < specs.length - 1 && specs[i + 1].depth === 0}
                timeSlot={s.timeSlot} titleSlot={s.titleSlot} />
            ));
          })()}
        </div>
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
