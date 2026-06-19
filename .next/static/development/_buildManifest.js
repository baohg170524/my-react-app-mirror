self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/AppealManagementPage",
    "/CriteriaPage",
    "/DangKyPage",
    "/LeaderboardPage",
    "/PheDuyetPage",
    "/ScoringPage",
    "/SubmissionPage",
    "/SubmitProjectPage",
    "/TeamAppealPage",
    "/TeamRankingPage",
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()