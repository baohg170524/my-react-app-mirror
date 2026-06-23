import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationStatusCard } from '../RegistrationStatusCard';
import type { UserSummary } from '@/services/api';

const profile: UserSummary = {
  id: 'u1',
  email: 'a@e.com',
  fullName: 'Nguyễn Văn A',
  isStudent: true,
  isAdmin: false,
  isApproved: false,
  isFpt: true,
  studentCode: 'SE123',
  schoolId: 'fpt-1',
  photoStudentCardUrl: null,
};

const noop = jest.fn();

describe('RegistrationStatusCard', () => {
  test('pending shows Chờ xét duyệt + Cập nhật hồ sơ button (onEdit)', () => {
    const onEdit = jest.fn();
    render(
      <RegistrationStatusCard
        status="pending"
        reason={null}
        profile={profile}
        onRegisterTeam={noop}
        onEdit={onEdit}
        onResubmit={noop}
      />,
    );
    expect(screen.getByText(/Chờ xét duyệt/i)).toBeInTheDocument();
    expect(screen.getByText('SE123')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Cập nhật hồ sơ/i }));
    expect(onEdit).toHaveBeenCalled();
  });

  test('approved shows Đã được duyệt + Đăng ký đội button (onRegisterTeam)', () => {
    const onRegisterTeam = jest.fn();
    render(
      <RegistrationStatusCard
        status="approved"
        reason={null}
        profile={profile}
        onRegisterTeam={onRegisterTeam}
        onEdit={noop}
        onResubmit={noop}
      />,
    );
    expect(screen.getByText(/Đã được duyệt/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Đăng ký đội/i }));
    expect(onRegisterTeam).toHaveBeenCalled();
  });

  test('rejected shows Tài khoản bị từ chối + reason + Gửi lại (onResubmit)', () => {
    const onResubmit = jest.fn();
    render(
      <RegistrationStatusCard
        status="rejected"
        reason="Ảnh thẻ không rõ"
        profile={profile}
        onRegisterTeam={noop}
        onEdit={noop}
        onResubmit={onResubmit}
      />,
    );
    expect(screen.getByText(/Tài khoản bị từ chối/i)).toBeInTheDocument();
    expect(screen.getByText(/Ảnh thẻ không rõ/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gửi lại/i }));
    expect(onResubmit).toHaveBeenCalled();
  });
});
