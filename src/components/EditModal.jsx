import { useState } from "react";
import { calcScore } from "../utils.jsx";

export default function EditModal({ team, criteria, onClose, onSave }) {
  const [scores, setScores] = useState(
    [...team.scores].concat(
      Array(Math.max(0, criteria.length - team.scores.length)).fill(0),
    ),
  );
  const [cmts, setCmts] = useState(
    [...(team.comments || [])].concat(
      Array(Math.max(0, criteria.length - (team.comments || []).length)).fill(
        "",
      ),
    ),
  );
  const prev = calcScore(team.scores, criteria);
  const next = calcScore(scores, criteria);

  return (
    <div className="modal-overlay" style={{ padding: "24px 16px" }}>
      <div className="modal-box" style={{ maxWidth: 680 }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-lg font-bold" style={{ color: "#e6f4ea" }}>
              Chấm / Chỉnh sửa điểm số
            </div>
            <div className="text-xs mt-1" style={{ color: "#7da88a" }}>
              Xem lại và điều chỉnh điểm số theo từng tiêu chí.
            </div>
            <div
              className="text-sm mt-1.5 font-bold"
              style={{ color: "#3ddc84" }}
            >
              {team.id} · {team.name}
            </div>
          </div>
          <button
            className="btn-hover text-xl leading-none"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#7da88a",
            }}
          >
            ✕
          </button>
        </div>

        {/* Criteria */}
        {criteria.map((c, i) => {
          const w = Math.round((scores[i] || 0) * (c.weight / 100) * 100) / 100;
          const sc = scores[i] || 0;
          const al = c.levels
            ? c.levels.findIndex((lv) => {
                const pts = lv.range.replace("–", "-").split("-").map(Number);
                return sc >= pts[0] && sc <= (pts[1] ?? 10);
              })
            : -1;
          return (
            <div
              key={c.id}
              className="rounded-2xl mb-3 p-5"
              style={{
                background: "rgba(0,0,0,.25)",
                border: "1px solid #1e3022",
              }}
            >
              {/* Row */}
              <div
                className="grid gap-2 items-center mb-3"
                style={{ gridTemplateColumns: "1fr 70px 100px 110px" }}
              >
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "#e6f4ea" }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="text-[11px] mt-0.5"
                    style={{ color: "#7da88a" }}
                  >
                    {c.labelVi} · {c.weight}%
                  </div>
                </div>
                <div
                  className="text-center text-xs"
                  style={{ color: "#7da88a" }}
                >
                  {c.weight}%
                </div>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={scores[i] || 0}
                  onChange={(e) => {
                    const v = [...scores];
                    v[i] = parseFloat(e.target.value) || 0;
                    setScores(v);
                  }}
                  className="text-center rounded-lg text-lg font-black w-full focus:border-brand-accent"
                  style={{
                    background: "rgba(61,220,132,.08)",
                    border: "1.5px solid #1e3022",
                    padding: "9px 4px",
                    color: "#3ddc84",
                    outline: "none",
                  }}
                />
                <div
                  className="text-right text-xl font-bold"
                  style={{ color: "#3ddc84" }}
                >
                  {w.toFixed(2)}
                </div>
              </div>

              {/* Level pills */}
              {c.levels && c.levels.length > 0 && (
                <div
                  className={`grid gap-1.5 mb-3`}
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(c.levels.length, 4)},1fr)`,
                  }}
                >
                  {c.levels.map((lv, li) => (
                    <div
                      key={li}
                      className="rounded-lg p-2"
                      style={{
                        background:
                          li === al ? "rgba(61,220,132,.12)" : "rgba(0,0,0,.2)",
                        border: `1px solid ${li === al ? "#3ddc84" : "#1e3022"}`,
                      }}
                    >
                      <div
                        className="text-[10px] font-bold mb-0.5"
                        style={{ color: li === al ? "#3ddc84" : "#4d7a5c" }}
                      >
                        {lv.range}
                      </div>
                      <div
                        className="text-[10px] leading-snug"
                        style={{ color: li === al ? "#3ddc84" : "#7da88a" }}
                      >
                        {lv.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment */}
              <div>
                <div
                  className="text-[10px] tracking-widest mb-1"
                  style={{ color: "#4d7a5c" }}
                >
                  NHẬN XÉT
                </div>
                <textarea
                  value={cmts[i] || ""}
                  rows={2}
                  onChange={(e) => {
                    const v = [...cmts];
                    v[i] = e.target.value;
                    setCmts(v);
                  }}
                  placeholder="Nhận xét cho tiêu chí này..."
                  className="input-field resize-y text-xs leading-relaxed"
                />
              </div>
            </div>
          );
        })}

        {/* Total */}
        <div
          className="grid items-center rounded-xl p-5 mt-1"
          style={{
            gridTemplateColumns: "1fr 140px",
            background: "rgba(61,220,132,.12)",
          }}
        >
          <div className="text-sm" style={{ color: "#7da88a" }}>
            Tổng trước đó:{" "}
            <strong style={{ color: "#e6f4ea" }}>{prev.toFixed(2)}</strong>
          </div>
          <div className="text-right">
            <div
              className="text-[10px] tracking-widest"
              style={{ color: "#7da88a" }}
            >
              TỔNG ĐIỂM MỚI
            </div>
            <div
              className="text-3xl font-black leading-none"
              style={{ color: "#3ddc84" }}
            >
              {next.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          <button className="btn-ghost" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-primary" onClick={() => onSave(scores, cmts)}>
            Xác nhận chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
}
