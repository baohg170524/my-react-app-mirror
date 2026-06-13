export type BadgeTier = "gold" | "silver" | "bronze" | null;

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatar: string;
  score: number;
  badge: BadgeTier;
}
