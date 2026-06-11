import { calcScore, getRankColor, getRankBg, getRankIcon } from "../utils.jsx";

export default function RankingPageTeam({ teams, criteria, myId }) {
  const by = [...teams].sort(
    (a, b) => calcScore(b.scores, criteria) - calcScore(a.scores, criteria),
  );
  const ranked = by.map((t, i) => ({ ...t, rank: i + 1 }));
  const me = ranked.find((t) => t.id === myId);

  return (
    <div className="animate-fadeUp">
      <div className="mb-6">
        <h2 className="text-xl font-bold m-0" style={{ color: "#e6f4ea" }}>
          Xem xếp hạng
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7da88a" }}>
          Thứ hạng của đội bạn và toàn bộ bảng xếp hạng.
        </p>
      </div>
      {/* My team */}
      {me && (
        <div
          className="rounded-2xl p-7 mb-7"
          style={{
            background: "linear-gradient(135deg,#131f16,rgba(61,220,132,.07))",
            border: "1.5px solid #3ddc84",
          }}
        >
          <div
            className="text-[11px] tracking-widest mb-1.5"
            style={{ color: "#7da88a" }}
          >
            ĐỘI CỦA BẠN
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-bold" style={{ color: "#3ddc84" }}>
                {me.name}
              </div>
              <div className="text-sm mt-0.5" style={{ color: "#7da88a" }}>
                {me.id}
              </div>
              <div
                className="mt-3 text-2xl font-bold"
                style={{ color: getRankColor(me.rank) }}
              >
                {getRankIcon(me.rank)} Hạng {me.rank}
              </div>
            </div>
            <div className="text-right">
              <div
                className="font-black leading-none"
                style={{ fontSize: 56, color: "#3ddc84" }}
              >
                {calcScore(me.scores, criteria).toFixed(2)}
              </div>
              <div className="text-xs" style={{ color: "#7da88a" }}>
                /10 điểm
              </div>
            </div>
          </div>
          <div
            className="grid gap-2.5 mt-6"
            style={{
              gridTemplateColumns: `repeat(${Math.min(criteria.length, 5)},1fr)`,
            }}
          >
            {criteria.map((c, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{ background: "rgba(0,0,0,.2)" }}
              >
                <div className="text-[10px] mb-1" style={{ color: "#7da88a" }}>
                  {c.label}
                </div>
                <div className="text-xl font-bold" style={{ color: "#3ddc84" }}>
                  {me.scores[i] || 0}
                </div>
                <div className="text-[10px]" style={{ color: "#4d7a5c" }}>
                  {c.weight}%
                </div>
                {me.comments?.[i] && (
                  <div
                    className="text-[10px] mt-1 italic leading-snug"
                    style={{ color: "#7da88a" }}
                  >
                    "{me.comments[i]}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-sm font-bold mb-3" style={{ color: "#3ddc84" }}>
        Bảng xếp hạng toàn đoàn
      </div>
      {ranked.map((t, i) => (
        <div
          key={t.id}
          className="rounded-2xl p-4 mb-2.5 flex items-center gap-4"
          style={{
            background:
              t.id === myId
                ? "linear-gradient(135deg,#131f16,rgba(61,220,132,.06))"
                : "#131f16",
            border: `1.5px solid ${t.id === myId ? "#3ddc84" : t.rank <= 3 ? getRankColor(t.rank) + "55" : "#1e3022"}`,
            animationDelay: `${i * 0.06}s`,
          }}
        >
          <div
            className="w-11 text-center font-bold"
            style={{
              fontSize: t.rank <= 3 ? 22 : 15,
              color: getRankColor(t.rank),
            }}
          >
            {getRankIcon(t.rank)}
          </div>
          <div className="flex-1">
            <div
              className="text-sm font-bold"
              style={{ color: t.id === myId ? "#3ddc84" : "#e6f4ea" }}
            >
              {t.name}
              {t.id === myId && (
                <span className="badge-accent ml-2 text-[10px]">Đội bạn</span>
              )}
            </div>
            <div className="text-[11px]" style={{ color: "#7da88a" }}>
              {t.id}
            </div>
          </div>
          <div
            className="text-2xl font-black"
            style={{ color: getRankColor(t.rank) }}
          >
            {calcScore(t.scores, criteria).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
