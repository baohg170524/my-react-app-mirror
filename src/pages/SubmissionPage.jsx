export default function SubmissionPage({ submissions, teams }) {
  const done = new Set(submissions.map((s) => s.teamId));
  return (
    <div className="animate-fadeUp">
      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color: "#e6f4ea" }}>
            Danh sách bài nộp
          </h2>
          <p className="text-sm mt-1" style={{ color: "#7da88a" }}>
            Xem bài nộp từ các đội thi.
          </p>
        </div>
        <div className="badge-accent px-4 py-2 text-sm">
          {submissions.length}/{teams.length} đội đã nộp
        </div>
      </div>
      {/* Progress */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "#131f16", border: "1px solid #1e3022" }}
      >
        <div className="flex justify-between mb-2.5">
          <span className="text-sm" style={{ color: "#7da88a" }}>
            Tiến độ nộp bài
          </span>
          <span className="text-sm font-bold" style={{ color: "#3ddc84" }}>
            {Math.round((submissions.length / teams.length) * 100)}%
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(0,0,0,.3)" }}
        >
          <div
            style={{
              height: "100%",
              width: `${(submissions.length / teams.length) * 100}%`,
              background: "linear-gradient(90deg,#3ddc84,#2ab368)",
              borderRadius: 99,
            }}
          />
        </div>
      </div>
      {/* Submitted */}
      {submissions.map((s, i) => (
        <div
          key={s.id}
          className="rounded-2xl p-5 mb-2.5"
          style={{
            background: "#131f16",
            border: "1px solid #1e3022",
            animationDelay: `${i * 0.06}s`,
          }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xs font-bold" style={{ color: "#3ddc84" }}>
              {s.teamId}
            </span>
            <span className="text-sm font-bold" style={{ color: "#e6f4ea" }}>
              {s.teamName}
            </span>
            <span className="badge-accent">{s.status}</span>
          </div>
          <div
            className="grid gap-2.5 mb-2.5"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {[
              ["TÊN DỰ ÁN", s.projectName],
              ["THỜI GIAN NỘP", s.submittedAt],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl p-3"
                style={{ background: "rgba(0,0,0,.2)" }}
              >
                <div
                  className="text-[10px] tracking-widest mb-1"
                  style={{ color: "#4d7a5c" }}
                >
                  {k}
                </div>
                <div className="text-sm font-bold" style={{ color: "#e6f4ea" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-3 flex items-center gap-2.5"
            style={{ background: "rgba(0,0,0,.2)" }}
          >
            <div
              className="text-[10px] tracking-widest shrink-0"
              style={{ color: "#4d7a5c", minWidth: 50 }}
            >
              REPO
            </div>
            <a
              href={s.repo}
              target="_blank"
              rel="noreferrer"
              className="text-xs break-all"
              style={{ color: "#3ddc84", textDecoration: "none" }}
            >
              🔗 {s.repo}
            </a>
          </div>
        </div>
      ))}
      {/* Not submitted */}
      {teams.filter((t) => !done.has(t.id)).length > 0 && (
        <div className="mt-5">
          <div
            className="text-[11px] tracking-widest mb-2.5"
            style={{ color: "#7da88a" }}
          >
            CHƯA NỘP BÀI
          </div>
          {teams
            .filter((t) => !done.has(t.id))
            .map((t) => (
              <div
                key={t.id}
                className="rounded-xl p-4 mb-2 flex items-center gap-3.5"
                style={{
                  background: "#131f16",
                  border: "1px solid #1e3022",
                  opacity: 0.65,
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: "#f4a261" }}
                >
                  {t.id}
                </span>
                <span className="text-sm" style={{ color: "#e6f4ea" }}>
                  {t.name}
                </span>
                <span className="badge-warn ml-auto">Chưa nộp</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
