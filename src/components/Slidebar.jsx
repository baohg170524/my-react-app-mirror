const ADMIN_NAV = [
  { k: "tieuChi", l: "Tiêu chí chấm điểm" },
  { k: "chamDiem", l: "Chấm điểm" },
  { k: "xepHang", l: "Bảng xếp hạng" },
  { k: "baiNop", l: "Bài nộp" },
  { k: "phucKhao", l: "Phúc khảo" },
];
const JUDGE_NAV = [
  { k: "chamDiem", l: "Chấm điểm" },
  { k: "xepHang", l: "Bảng xếp hạng" },
  { k: "baiNop", l: "Bài nộp" },
  { k: "phucKhao", l: "Phúc khảo" },
];
const TEAM_NAV = [
  { k: "nopBai", l: "Nộp bài" },
  { k: "xepHang", l: "Xem xếp hạng" },
  { k: "phucKhaoTeam", l: "Tạo đơn phúc khảo" },
];

export default function Sidebar({ tab, setTab, role }) {
  const nav =
    role === "team" ? TEAM_NAV : role === "judge" ? JUDGE_NAV : ADMIN_NAV;
  return (
    <div
      className="flex flex-col shrink-0 min-h-screen"
      style={{
        width: 230,
        background: "#111a14",
        borderRight: "1px solid #1e3022",
        padding: "20px 14px",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 pl-1">
        <div
          className="flex items-center justify-center text-lg rounded-xl animate-pulseGlow"
          style={{
            width: 36,
            height: 36,
            background: "rgba(61,220,132,.12)",
            border: "1.5px solid #3ddc84",
          }}
        ></div>
        <div>
          <div
            className="text-xs font-bold leading-tight"
            style={{ color: "#3ddc84" }}
          >
            Hệ Thống Chấm Điểm
          </div>
          <div className="text-[10px]" style={{ color: "#7da88a" }}>
            Quản lý & Phúc khảo
          </div>
        </div>
      </div>

      {/* Nav */}
      {nav.map((x) => (
        <div
          key={x.k}
          className="nav-item flex items-center gap-3 mb-1"
          onClick={() => setTab(x.k)}
          style={{
            padding: "10px 14px",
            background: tab === x.k ? "rgba(61,220,132,.12)" : "transparent",
            color: tab === x.k ? "#3ddc84" : "#7da88a",
            fontWeight: tab === x.k ? 700 : 400,
            fontSize: 13,
            borderLeft:
              tab === x.k ? "3px solid #3ddc84" : "3px solid transparent",
          }}
        >
          <span style={{ fontSize: 15 }}>{x.i}</span>
          {x.l}
        </div>
      ))}
    </div>
  );
}
