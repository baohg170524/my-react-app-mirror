import { useState } from "react";
import { calcScore, StatusBadge } from "../utils.jsx";

export default function AppealModal({
  appeal,
  team,
  criteria,
  onClose,
  onUpdate,
}) {
  const [editing, setEditing] = useState(false);
  const [es, setEs] = useState([...(team?.scores || [])]);
  const prev = team ? calcScore(team.scores, criteria) : 0;
  const next = calcScore(es, criteria);

  return (
    <div className="modal-overlay items-center" style={{ padding: 24 }}>
      <div className="modal-box" style={{ maxWidth: 600 }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="text-base font-bold" style={{ color: "#e6f4ea" }}>
              Chi tiết đơn phúc khảo
            </div>
            <div className="text-xs mt-1" style={{ color: "#3ddc84" }}>
              {appeal.id} · {appeal.teamId} · {appeal.teamName}
            </div>
          </div>
          <button
            className="btn-hover text-xl"
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

        {/* Reason */}
        <div
          className="rounded-xl p-4 mb-4"
          style={{ background: "rgba(0,0,0,.2)" }}
        >
          <div
            className="text-[10px] tracking-widest mb-2"
            style={{ color: "#4d7a5c" }}
          >
            LÝ DO PHÚC KHẢO
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#e6f4ea" }}>
            {appeal.reason}
          </div>
        </div>

        {/* Meta */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {[
            ["EMAIL", appeal.email],
            ["NGÀY NỘP", appeal.date],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-xl p-3 flex-1 min-w-28"
              style={{ background: "rgba(0,0,0,.2)" }}
            >
              <div className="text-[10px] mb-1" style={{ color: "#4d7a5c" }}>
                {k}
              </div>
              <div className="text-xs" style={{ color: "#e6f4ea" }}>
                {v}
              </div>
            </div>
          ))}
          <div
            className="rounded-xl p-3 flex-1"
            style={{ background: "rgba(0,0,0,.2)" }}
          >
            <div className="text-[10px] mb-1" style={{ color: "#4d7a5c" }}>
              TRẠNG THÁI
            </div>
            <div className="mt-1">
              <StatusBadge status={appeal.status} />
            </div>
          </div>
        </div>

        {/* Scores */}
        {team && (
          <div className="mb-4">
            <div className="text-xs mb-2.5" style={{ color: "#7da88a" }}>
              ĐIỂM HIỆN TẠI ({prev.toFixed(2)}/10)
            </div>
            {!editing ? (
              <>
                {criteria.map((c, i) => (
                  <div
                    key={i}
                    className="grid items-center rounded-xl p-3 mb-1.5"
                    style={{
                      gridTemplateColumns: "1fr 70px 80px 100px",
                      gap: 8,
                      background: "rgba(0,0,0,.2)",
                    }}
                  >
                    <div className="text-sm" style={{ color: "#e6f4ea" }}>
                      {c.label}
                    </div>
                    <div
                      className="text-center text-xs"
                      style={{ color: "#7da88a" }}
                    >
                      {c.weight}%
                    </div>
                    <div
                      className="text-center text-base font-bold"
                      style={{ color: "#e6f4ea" }}
                    >
                      {team.scores[i] || 0}
                    </div>
                    <div
                      className="text-right text-sm font-bold"
                      style={{ color: "#3ddc84" }}
                    >
                      {((team.scores[i] || 0) * (c.weight / 100)).toFixed(2)}
                    </div>
                  </div>
                ))}
                <button
                  className="btn-hover w-full mt-2 rounded-xl py-2.5 text-sm font-bold"
                  onClick={() => setEditing(true)}
                  style={{
                    background: "rgba(61,220,132,.08)",
                    border: "1px solid #1e3022",
                    color: "#3ddc84",
                  }}
                >
                  Chỉnh sửa điểm
                </button>
              </>
            ) : (
              <>
                {criteria.map((c, i) => (
                  <div
                    key={i}
                    className="grid items-center rounded-xl p-3 mb-1.5"
                    style={{
                      gridTemplateColumns: "1fr 70px 80px 100px",
                      gap: 8,
                      background: "rgba(0,0,0,.2)",
                    }}
                  >
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "#e6f4ea" }}
                    >
                      {c.label}
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
                      value={es[i] || 0}
                      onChange={(e) => {
                        const v = [...es];
                        v[i] = parseFloat(e.target.value) || 0;
                        setEs(v);
                      }}
                      className="text-center text-sm font-bold w-full rounded-lg focus:border-brand-accent"
                      style={{
                        background: "rgba(61,220,132,.07)",
                        border: "1px solid #1e3022",
                        padding: "7px 4px",
                        color: "#e6f4ea",
                        outline: "none",
                      }}
                    />
                    <div
                      className="text-right text-sm font-bold"
                      style={{ color: "#3ddc84" }}
                    >
                      {((es[i] || 0) * (c.weight / 100)).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div
                  className="grid items-center rounded-xl p-4 mt-1"
                  style={{
                    gridTemplateColumns: "1fr 120px",
                    background: "rgba(61,220,132,.12)",
                  }}
                >
                  <div className="text-xs" style={{ color: "#7da88a" }}>
                    Trước:{" "}
                    <strong style={{ color: "#e6f4ea" }}>
                      {prev.toFixed(2)}
                    </strong>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-[10px] tracking-widest"
                      style={{ color: "#4d7a5c" }}
                    >
                      TỔNG MỚI
                    </div>
                    <div
                      className="text-2xl font-black"
                      style={{ color: "#3ddc84" }}
                    >
                      {next.toFixed(2)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 flex-wrap">
          {editing ? (
            <>
              <button
                className="btn-ghost flex-1"
                onClick={() => setEditing(false)}
              >
                Hủy chỉnh sửa
              </button>
              <button
                className="btn-primary"
                style={{ flex: 2 }}
                onClick={() => onUpdate(appeal.id, "Đã duyệt", es)}
              >
                ✓ Xác nhận & Duyệt đơn
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-hover flex-1 rounded-xl py-2.5 text-sm font-bold"
                style={{
                  background: "rgba(255,77,109,.12)",
                  border: "1px solid rgba(255,77,109,.3)",
                  color: "#ff4d6d",
                }}
                onClick={() => onUpdate(appeal.id, "Từ chối", null)}
              >
                Từ chối
              </button>
              <button
                className="btn-hover flex-1 rounded-xl py-2.5 text-sm font-bold"
                style={{
                  background: "rgba(96,165,250,.12)",
                  border: "1px solid rgba(96,165,250,.3)",
                  color: "#60a5fa",
                }}
                onClick={() => onUpdate(appeal.id, "Đang xét", null)}
              >
                Đang xét
              </button>
              <button className="btn-ghost flex-1" onClick={onClose}>
                Đóng
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
