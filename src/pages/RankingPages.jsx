import { calcScore, getRankColor, getRankBg, getRankIcon } from "../utils.jsx";

export default function rankingPage({
  teams,
  criteria,
  sortBy,
  setSortBy,
  onEdit,
  onExport,
}) {
  const sorted = [...teams].sort((a, b) =>
    sortBy === "score"
      ? calcScore(b.scores, criteria) - calcScore(a.scores, criteria)
      : sortBy === "id"
        ? a.id.localeCompare(b.id)
        : a.name.localeCompare(b.name),
  );
  const byScore = [...teams].sort(
    (a, b) => calcScore(b.scores, criteria) - calcScore(a.scores, criteria),
  );
  const ranked = sorted.map((t) => ({
    ...t,
    rank: byScore.findIndex((x) => x.id === t.id) + 1,
  }));

  return (
    <div className="animate-fadeUp">
      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color: "#e6f4ea" }}>
            Bảng xếp hạng
          </h2>
          <p className="text-sm mt-1" style={{ color: "#7da88a" }}>
            Tổng hợp điểm số & thứ hạng các đội thi.
          </p>
        </div>
        <div className="flex gap-2.5">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
            style={{ width: "auto", padding: "10px 14px" }}
          >
            <option value="score">Sắp xếp: Điểm số</option>
            <option value="id">Sắp xếp: Mã đội</option>
            <option value="name">Sắp xếp: Tên đội</option>
          </select>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={onExport}
          >
            📤 Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
      >
        {[
          {
            l: "Điểm cao nhất",
            v: Math.max(
              ...teams.map((t) => calcScore(t.scores, criteria)),
            ).toFixed(2),
            i: "🥇",
          },
          {
            l: "Điểm trung bình",
            v: (
              teams.reduce((a, t) => a + calcScore(t.scores, criteria), 0) /
              teams.length
            ).toFixed(2),
            i: "📊",
          },
          { l: "Tổng đội thi", v: `${teams.length} đội`, i: "👥" },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex items-center gap-3.5"
            style={{ background: "#131f16", border: "1px solid #1e3022" }}
          >
            <span className="text-2xl">{s.i}</span>
            <div>
              <div className="text-xl font-bold" style={{ color: "#3ddc84" }}>
                {s.v}
              </div>
              <div className="text-[11px]" style={{ color: "#7da88a" }}>
                {s.l}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table header */}
      <div
        className="grid gap-1.5 px-5 py-2 mb-2 text-[10px] tracking-widest"
        style={{
          gridTemplateColumns: `56px 1fr ${criteria.map(() => "72px").join(" ")} 84px 110px`,
          color: "#4d7a5c",
          borderBottom: "1px solid #1e3022",
        }}
      >
        <div>HẠNG</div>
        <div>ĐỘI</div>
        {criteria.map((c, i) => (
          <div key={i} className="text-center">
            {c.label.split(" ")[0].slice(0, 6).toUpperCase()}
          </div>
        ))}
        <div className="text-center">TỔNG</div>
        <div>HÀNH ĐỘNG</div>
      </div>

      {ranked.map((t, i) => {
        const score = calcScore(t.scores, criteria);
        return (
          <div
            key={t.id}
            className="card-hover grid gap-1.5 px-5 py-3.5 rounded-xl mb-2 items-center"
            style={{
              gridTemplateColumns: `56px 1fr ${criteria.map(() => "72px").join(" ")} 84px 110px`,
              background: getRankBg(t.rank),
              border: `1px solid ${t.rank <= 3 ? getRankColor(t.rank) + "44" : "#1e3022"}`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div
              className="font-bold"
              style={{
                fontSize: t.rank <= 3 ? 20 : 13,
                color: getRankColor(t.rank),
              }}
            >
              {getRankIcon(t.rank)}
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "#e6f4ea" }}>
                {t.name}
              </div>
              <div className="text-[11px]" style={{ color: "#7da88a" }}>
                {t.id}
              </div>
            </div>
            {criteria.map((_, ci) => (
              <div
                key={ci}
                className="text-center text-sm font-semibold"
                style={{ color: "#e6f4ea" }}
              >
                {(t.scores[ci] || 0).toFixed(1)}
              </div>
            ))}
            <div
              className="text-center text-xl font-black"
              style={{ color: "#3ddc84" }}
            >
              {score.toFixed(2)}
            </div>
            <button
              className="btn-hover px-2.5 py-1.5 rounded-lg text-[11px] font-bold"
              onClick={() => onEdit(t)}
              style={{
                background: "rgba(61,220,132,.12)",
                border: "1px solid #1e3022",
                color: "#3ddc84",
              }}
            >
              ✏️ Sửa điểm
            </button>
          </div>
        );
      })}
    </div>
  );
}
