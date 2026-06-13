"use client";

type Filter = "all" | "my";

interface Props {
  active: Filter;
  onChange: (tab: Filter) => void;
}

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "my",  label: "Của tôi" },
];

export function EventFilterTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Lọc sự kiện"
      style={{ display: "flex", gap: "var(--space-sm)" }}
    >
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          id={`tab-${id}`}
          aria-selected={active === id}
          aria-controls={`tabpanel-events`}
          className={`pill-tab${active === id ? " is-active" : ""}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
