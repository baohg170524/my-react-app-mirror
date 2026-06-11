const BADGES = {
  admin: [
    { l: "Quản trị viên", a: true },
    { l: "Giám khảo", a: false },
    { l: "Đội thi", a: false },
  ],
  judge: [
    { l: "Quản trị viên", a: false },
    { l: "Giám khảo", a: true },
    { l: "Đội thi", a: false },
  ],
  team: [
    { l: "Quản trị viên", a: false },
    { l: "Giám khảo", a: false },
    { l: "Đội thi", a: true },
  ],
};
const INITIALS = { admin: "AD", judge: "JG", team: "TM" };

export default function Topbar({ role, onLogout, title, sub }) {
  const bdg = BADGES[role] || BADGES.team;
  return (
    <div
      className="flex items-center justify-between shrink-0 px-7"
      style={{
        background: "#111a14",
        borderBottom: "1px solid #1e3022",
        height: 56,
      }}
    >
      <div>
        <div className="text-base font-bold" style={{ color: "#e6f4ea" }}>
          {title}
        </div>
        {sub && (
          <div className="text-[11px]" style={{ color: "#7da88a" }}>
            {sub}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {bdg.map((b, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-lg text-[11px]"
            style={{
              background: b.a ? "rgba(61,220,132,.12)" : "#131f16",
              border: "1px solid #1e3022",
              color: b.a ? "#3ddc84" : "#7da88a",
            }}
          >
            {b.l}
          </span>
        ))}
        <div
          className="flex items-center justify-center text-xs font-bold rounded-lg"
          style={{
            width: 30,
            height: 30,
            background: "rgba(61,220,132,.12)",
            border: "1.5px solid #3ddc84",
            color: "#3ddc84",
          }}
        >
          {INITIALS[role] || "??"}
        </div>
        <button
          className="btn-hover px-3 py-1 rounded-lg text-[11px]"
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "1px solid #1e3022",
            color: "#7da88a",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
