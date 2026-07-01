import { apiClient } from '@/services/api';
import type { PagedResult } from '@/services/api';

export interface FinalResultRow {
  id: string;
  teamId: string;
  teamName?: string;
  roundId: string;
  finalScore: number;
  rank: number;
  isAdvanced: boolean;
}

export interface ScoreRow {
  id: string;
  eventRoleId: string;
  teamId: string;
  roundId: string;
  trackId: string;
  totalScore: number;
  comment: string | null;
}

export interface ScoreDetailRow {
  id: string;
  scoreId: string;
  templateId: string;
  criteriaId: string;
  criteriaName?: string;
  value: number;
  maxScore?: number;
  weight?: number;
}

// ─── Team score breakdown (C9 — thí sinh xem điểm từng giám khảo × tiêu chí) ───
export interface CriterionLine {
  criteriaName: string;
  value: number;
  maxScore: number;
  weight: number;
}
export interface JudgeBreakdown {
  judgeName: string;
  totalScore: number;
  comment: string | null;
  criteria: CriterionLine[];
}
export interface SubmissionBreakdown {
  submitResultId: string;
  trackName: string;
  roundId: string;
  roundName: string;
  roundPublished: boolean;
  judgeScores: JudgeBreakdown[];
}
export interface TeamScoreBreakdown {
  teamId: string;
  teamName: string;
  submissions: SubmissionBreakdown[];
}

export const resultsApi = {
  /** GET /api/Scores/team/{teamId}/breakdown — điểm theo bài nộp → giám khảo → tiêu chí.
   *  BE trả BaseResponse<obj> (interceptor đã bóc .data) nên đọc thẳng `data`. */
  getTeamBreakdown: async (teamId: string): Promise<TeamScoreBreakdown> => {
    const { data } = await apiClient.get<TeamScoreBreakdown>(
      `/Scores/team/${encodeURIComponent(teamId)}/breakdown`,
    );
    return data ?? { teamId, teamName: '', submissions: [] };
  },

  listTeamFinalResults: async (teamId: string): Promise<FinalResultRow[]> => {
    const { data } = await apiClient.get<PagedResult<FinalResultRow>>(
      `/FinalResults/team/${encodeURIComponent(teamId)}`,
      { params: { PageNumber: 1, PageSize: 100 } },
    );
    return data.data ?? [];
  },

  listRoundLeaderboard: async (roundId: string): Promise<FinalResultRow[]> => {
    const { data } = await apiClient.get<PagedResult<FinalResultRow>>(
      `/FinalResults/round/${encodeURIComponent(roundId)}`,
      { params: { PageNumber: 1, PageSize: 100, SortBy: 'Rank', IsAscending: true } },
    );
    return data.data ?? [];
  },

  /**
   * Team-scoped score query is not exposed by the backend at time of writing.
   * We discover scores by listing the round leaderboard and then walking
   * `/Scores/event-role/{eventRoleId}` for each judge — filter client-side.
   *
   * If the backend later adds `GET /api/Scores?TeamId=&RoundId=`, replace
   * the body of this function with a direct call.
   */
  listScoresForTeamRound: async (teamId: string, roundId: string): Promise<ScoreRow[]> => {
    // Discover all eventRoles tied to this round via EventRoles for the event of the round.
    // Simpler approach: ask `/Scores/event-role/{eventRoleId}` per judge — but we don't
    // know judges here. Cheapest path: the leaderboard row carries judge breakdowns in
    // many backends; if not, we attempt to read `/Scores?roundId=&teamId=` and tolerate 404.
    try {
      const { data } = await apiClient.get<PagedResult<ScoreRow>>('/Scores', {
        params: { TeamId: teamId, RoundId: roundId, PageNumber: 1, PageSize: 100 },
      });
      return data.data ?? [];
    } catch {
      return [];
    }
  },

  listScoreDetails: async (scoreId: string): Promise<ScoreDetailRow[]> => {
    const { data } = await apiClient.get<PagedResult<ScoreDetailRow>>(
      `/ScoreDetails/score/${encodeURIComponent(scoreId)}`,
      { params: { PageNumber: 1, PageSize: 100 } },
    );
    return data.data ?? [];
  },
};
