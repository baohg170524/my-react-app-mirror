import { useState, useMemo } from "react";
import {
  INIT_CRITERIA,
  INIT_TEAMS,
  INIT_APPEALS,
  INIT_SUBMISSIONS,
  MY_TEAM_ID,
} from "./data.js";
import { calcScore } from "./utils.jsx";

import Notif from "./components/Notif.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import EditModal from "./components/EditModal.jsx";
import ExportModal from "./components/ExportModal.jsx";

import Login from "./pages/Login.jsx";
import TieuChiPage from "./pages/TieuChiPage.jsx";
import ChamDiemPage from "./pages/ChamDiemPage.jsx";
import BaiNopPage from "./pages/BaiNopPage.jsx";
import PhucKhaoPage from "./pages/PhucKhaoPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";
import RankingPagesTeam from "./app/pages/RankingPagesTeam.jsx";
import NopBaiPage from "./pages/NopBaiPage.jsx";
import PhucKhaoTeamPage from "./pages/PhucKhaoTeamPage.jsx";

const PAGE_META = {
  tieuChi: {
    t: "Tiêu chí chấm điểm",
    s: "Quản lý bộ tiêu chí. Tất cả điểm chấm sẽ dựa theo bộ này.",
  },
  chamDiem: { t: "Bảng chấm điểm", s: "Chấm và quản lý điểm số các đội thi." },
  xepHang: { t: "Bảng xếp hạng", s: "Tổng hợp điểm số & thứ hạng." },
  baiNop: { t: "Danh sách bài nộp", s: "Xem bài nộp từ các đội thi." },
  phucKhao: {
    t: "Danh sách đơn phúc khảo",
    s: "Xem xét và xử lý các đơn phúc khảo.",
  },
  nopBai: { t: "Nộp bài", s: "Nộp bài dự thi của nhóm bạn." },
  phucKhaoTeam: { t: "Đơn xin phúc khảo", s: "Gửi yêu cầu phúc khảo điểm số." },
};

const Placeholder = ({ icon, label }) => (
  <div
    className="flex items-center justify-center animate-fadeUp"
    style={{ height: 400 }}
  >
    <div className="text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-lg font-bold mb-2" style={{ color: "#3ddc84" }}>
        {label}
      </div>
      <div className="text-sm" style={{ color: "#7da88a" }}>
        Tính năng đang được phát triển
      </div>
    </div>
  </div>
);

export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("chamDiem");
  const [criteria, setCriteria] = useState(INIT_CRITERIA);
  const [teams, setTeams] = useState(INIT_TEAMS);
  const [appeals, setAppeals] = useState(INIT_APPEALS);
  const [submissions, setSubmissions] = useState(INIT_SUBMISSIONS);
  const [editT, setEditT] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [sortBy, setSortBy] = useState("score");
  const [notif, setNotif] = useState(null);

  const sn = (m, t = "s") => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  };

  const login = (r) => {
    setRole(r);
    setTab(r === "team" ? "xepHang" : r === "admin" ? "tieuChi" : "chamDiem");
  };

  const saveEdit = (tid, scores, cmts) => {
    setTeams((p) =>
      p.map((t) => (t.id === tid ? { ...t, scores, comments: cmts } : t)),
    );
    setEditT(null);
    sn("Đã lưu điểm thành công!");
  };

  const updateAppeal = (aid, status, scores) => {
    setAppeals((p) => p.map((a) => (a.id === aid ? { ...a, status } : a)));
    if (scores) {
      const a = appeals.find((x) => x.id === aid);
      if (a)
        setTeams((p) =>
          p.map((t) => (t.id === a.teamId ? { ...t, scores } : t)),
        );
    }
    sn(status === "Từ chối" ? "Đã từ chối đơn." : `Đơn đã cập nhật: ${status}`);
  };

  const submitAppeal = (f) => {
    setAppeals((p) => [
      ...p,
      {
        id: `A-${String(p.length + 1).padStart(3, "0")}`,
        teamId: f.id,
        teamName: f.name,
        email: f.email,
        reason: f.reason,
        status: "Chờ xử lý",
        date: new Date().toLocaleDateString("vi-VN"),
      },
    ]);
    sn("Đã nộp đơn phúc khảo!");
  };

  const submitBai = (f) => {
    const now = new Date();
    const ds = `${now.toLocaleDateString("vi-VN")} ${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
    setSubmissions((p) => {
      const ei = p.findIndex((s) => s.teamId === f.teamId);
      const ns = {
        id: ei >= 0 ? p[ei].id : `S-${String(p.length + 1).padStart(3, "0")}`,
        teamId: f.teamId,
        teamName: f.teamName,
        projectName: f.projectName,
        repo: f.repo,
        submittedAt: ds,
        status: "Đã nhận",
      };
      if (ei >= 0) {
        const n = [...p];
        n[ei] = ns;
        return n;
      }
      return [...p, ns];
    });
    sn("Đã nộp bài thành công!");
  };

  const ranked = useMemo(
    () =>
      [...teams].sort(
        (a, b) => calcScore(b.scores, criteria) - calcScore(a.scores, criteria),
      ),
    [teams, criteria],
  );

  if (!role) return <Login onSelect={login} />;

  const pm = PAGE_META[tab] || PAGE_META.tongQuan;
  const isStaff = role === "admin" || role === "judge";
  const myTeam = teams.find((t) => t.id === MY_TEAM_ID);

  return (
    <div
      className="flex min-h-screen font-mono"
      style={{ background: "#0d1117", color: "#e6f4ea" }}
    >
      <Notif n={notif} />

      {editT && (
        <EditModal
          team={editT}
          criteria={criteria}
          onClose={() => setEditT(null)}
          onSave={(s, c) => saveEdit(editT.id, s, c)}
        />
      )}
      {showExp && (
        <ExportModal
          ranked={ranked}
          criteria={criteria}
          onClose={() => setShowExp(false)}
          sn={sn}
        />
      )}

      <Sidebar tab={tab} setTab={setTab} role={role} />

      <div className="flex flex-col flex-1 overflow-auto">
        <Topbar
          role={role}
          onLogout={() => setRole(null)}
          title={pm.t}
          sub={pm.s}
        />

        <div className="flex-1 p-8">
          {/* Admin only */}
          {role === "admin" && tab === "tieuChi" && (
            <TieuChiPage
              criteria={criteria}
              setCriteria={setCriteria}
              sn={sn}
            />
          )}

          {/* Admin + Judge */}
          {isStaff && tab === "chamDiem" && (
            <ChamDiemPage teams={teams} criteria={criteria} onEdit={setEditT} />
          )}
          {isStaff && tab === "xepHang" && (
            <XepHangPage
              teams={teams}
              criteria={criteria}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onEdit={setEditT}
              onExport={() => setShowExp(true)}
            />
          )}
          {isStaff && tab === "baiNop" && (
            <BaiNopPage submissions={submissions} teams={teams} />
          )}
          {isStaff && tab === "phucKhao" && (
            <PhucKhaoPage
              appeals={appeals}
              teams={teams}
              criteria={criteria}
              onUpdate={updateAppeal}
              onDel={(id) => {
                setAppeals((p) => p.filter((a) => a.id !== id));
                sn("Đã xóa đơn.");
              }}
            />
          )}

          {/* Team */}
          {role === "team" && tab === "xepHang" && (
            <XepHangTeamPage
              teams={teams}
              criteria={criteria}
              myId={MY_TEAM_ID}
            />
          )}
          {role === "team" && tab === "nopBai" && (
            <NopBaiPage
              myTeam={myTeam}
              submissions={submissions}
              onSubmit={submitBai}
            />
          )}
          {role === "team" && tab === "phucKhaoTeam" && (
            <PhucKhaoTeamPage myTeam={myTeam} onSubmit={submitAppeal} />
          )}
        </div>
      </div>
    </div>
  );
}
