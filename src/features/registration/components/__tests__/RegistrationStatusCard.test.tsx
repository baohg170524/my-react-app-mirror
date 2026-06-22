import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationStatusCard } from '../RegistrationStatusCard';
import type { RegistrationRecord } from '../../types';

const rec: RegistrationRecord = {
  userId: 'u1', eventId: 'e1', fullName: 'Nguyễn Văn A', email: 'a@e.com', schoolChoice: 'FPT',
  schoolName: null, studentCode: 'SE123', photoStudentCardUrl: null, note: null,
  status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null,
};

describe('RegistrationStatusCard', () => {
  test('pending shows chờ xét duyệt + submitted info', () => {
    render(<RegistrationStatusCard status="pending" reason={null} record={rec} onRegisterTeam={jest.fn()} onResubmit={jest.fn()} />);
    expect(screen.getByText(/Chờ xét duyệt/i)).toBeInTheDocument();
    expect(screen.getByText('SE123')).toBeInTheDocument();
  });

  test('approved shows CTA that calls onRegisterTeam', () => {
    const onRegisterTeam = jest.fn();
    render(<RegistrationStatusCard status="approved" reason={null} record={rec} onRegisterTeam={onRegisterTeam} onResubmit={jest.fn()} />);
    expect(screen.getByText(/Đã được duyệt/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Đăng ký đội/i }));
    expect(onRegisterTeam).toHaveBeenCalled();
  });

  test('rejected shows reason + resubmit', () => {
    const onResubmit = jest.fn();
    render(<RegistrationStatusCard status="rejected" reason="Ảnh thẻ không rõ" record={rec} onRegisterTeam={jest.fn()} onResubmit={onResubmit} />);
    expect(screen.getByText(/Tài khoản bị từ chối/i)).toBeInTheDocument();
    expect(screen.getByText(/Ảnh thẻ không rõ/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gửi lại/i }));
    expect(onResubmit).toHaveBeenCalled();
  });
});
