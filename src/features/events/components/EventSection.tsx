"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";
import { useAllEvents, useMyEvents, useJoinEvent } from "../hooks/useEvents";
import { EventFilterTabs } from "./EventFilterTabs";
import { EventGrid } from "./EventGrid";
import type { ApiError } from "@/services/api";

type Filter = "all" | "my";

export function EventSection() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const allQuery = useAllEvents();
  const myQuery  = useMyEvents();

  const active = filter === "all" ? allQuery : myQuery;
  const events   = active.data ?? [];
  const isLoading = active.isLoading;

  const joinMutation = useJoinEvent();

  function handleJoin(id: string) {
    setJoiningId(id);
    setJoinError(null);
    joinMutation.mutate(id, {
      onSuccess: () => setJoiningId(null),
      onError: (err) => {
        setJoiningId(null);
        const msg = (err as AxiosError<ApiError>)?.response?.data?.message ?? "Tham gia thất bại. Thử lại sau.";
        setJoinError(msg);
      },
    });
  }

  return (
    <div className="container" style={{ paddingTop: "var(--space-section)" }}>
      <div className="card" style={{ padding: "var(--space-xxl)", gap: "var(--space-xl)" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <h2 className="t-heading-md" style={{ margin: 0 }}>Sự kiện</h2>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => router.push("/events/create")}
            style={{ cursor: "pointer" }}
          >
            + Tạo sự kiện
          </button>
        </div>

        {/* Tabs */}
        <EventFilterTabs active={filter} onChange={setFilter} />

        {/* Grid */}
        <EventGrid
          events={events}
          isLoading={isLoading}
          joiningId={joiningId}
          joinError={joinError}
          onJoin={handleJoin}
        />
      </div>
    </div>
  );
}
