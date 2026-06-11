export default function Notif({ n }) {
  if (!n) return null;
  return (
    <div
      className={`fixed top-5 right-5 z-9999 px-5 py-3 
        rounded-xl font-bold text-sm animate-slideDown 
        shadow-2xl text-black ${n.t === "e" ? "bg-red-500" : "bg-brand-accent"}`}
    >
      {n.t === "e" ? "NO" : "YES"} {n.m}
    </div>
  );
}
