import type { UserProfile } from "@/services/api/types";

export const MOCK_USER_PROFILE: UserProfile = {
  id: "user-001",
  email: "nguyen.van.a@fpt.edu.vn",
  fullName: "Nguyễn Văn A",
  role: "STUDENT",
  avatar: "https://api.dicebear.com/9.x/initials/svg?seed=NVA&backgroundColor=76b900&fontColor=ffffff",
  createdAt: "2026-01-15T08:00:00.000Z",
  stats: {
    eventsJoined: 12,
    projectScore: 78,
    rank: 4,
  },
  announcement: {
    id: "ann-001",
    text: "🎓 Kỳ nộp báo cáo cuối kỳ SU26 kết thúc vào 20/07/2026. Vui lòng hoàn thành trước hạn.",
    ctaLabel: "Xem chi tiết",
    ctaUrl: "/announcements/ann-001",
  },
  projectSummary: {
    semesterName: "Summer 2026",
    projectName: "EduConnect Platform",
    completionPct: 65,
    teamSize: 5,
  },
};
