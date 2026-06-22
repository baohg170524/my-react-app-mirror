export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface RegistrationRecord {
  userId: string;
  eventId: string;
  fullName: string;
  email: string;
  schoolChoice: 'FPT' | 'OTHER';
  schoolName: string | null;
  studentCode: string;
  photoStudentCardUrl: string | null;
  note: string | null;
  /** 'rejected' không lưu ở store — suy từ UserRejections. */
  status: 'pending' | 'approved';
  submittedAt: string;
  decidedAt: string | null;
}

export type RegistrationFormValues = Omit<
  RegistrationRecord,
  'userId' | 'eventId' | 'status' | 'submittedAt' | 'decidedAt'
>;
