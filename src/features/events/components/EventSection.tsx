"use client";

import { useState } from "react";
import type { AxiosError } from "axios";
import { useAllEvents, useMyEvents, useJoinEvent } from "../hooks/useEvents";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { EventFilterTabs } from "./EventFilterTabs";
import { EventGrid } from "./EventGrid";
import { CreateEventForm } from "./CreateEventForm";
import type { ApiError } from "@/services/api";

type Filter = "all" | "my";
type Mode = "list" | "create";

export function EventSection() {
  const [mode, setMode] = useState<Mode>("list");
  const [filter, setFilter] = useState<Filter>("all");
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const { data: profile } = useUserProfile();
  const isAdmin = profile?.role === "ADMIN";
  // Admins don't have a "Của tôi" list — always show all events.
  const effectiveFilter: Filter = isAdmin ? "all" : filter;

  const allQuery = useAllEvents();
  const myQuery  = useMyEvents();

  const active = effectiveFilter === "all" ? allQuery : myQuery;
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
          <h2 className="t-heading-md" style={{ margin: 0 }}>
            {mode === "create" ? "Tạo sự kiện" : "Sự kiện"}
          </h2>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setMode((m) => (m === "create" ? "list" : "create"))}
            style={{ cursor: "pointer" }}
          >
            {mode === "create" ? "← Quay lại" : "+ Tạo sự kiện"}
          </button>
        </div>

        {mode === "create" ? (
          <CreateEventForm onCancel={() => setMode("list")} />
        ) : (
          <>
            {/* Tabs */}
            <EventFilterTabs active={effectiveFilter} onChange={setFilter} hideMy={isAdmin} />

            {/* Grid */}
            <EventGrid
              events={events}
              isLoading={isLoading}
              joiningId={joiningId}
              joinError={joinError}
              onJoin={handleJoin}
            />
          </>
        )}
      </div>
    </div>
  );
}
