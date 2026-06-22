import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegistrationForm } from '../RegistrationForm';

describe('RegistrationForm', () => {
  test('prefills name/email and submits FPT values without upload', async () => {
    const onSubmit = jest.fn();
    render(<RegistrationForm defaults={{ fullName: 'Nguyễn Văn A', email: 'a@e.com' }} onSubmit={onSubmit} />);

    expect((screen.getByLabelText(/Họ và tên/i) as HTMLInputElement).value).toBe('Nguyễn Văn A');

    fireEvent.change(screen.getByLabelText(/Mã số sinh viên/i), { target: { value: 'SE123' } });
    fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      fullName: 'Nguyễn Văn A', email: 'a@e.com', schoolChoice: 'FPT', studentCode: 'SE123',
      photoStudentCardUrl: null,
    }));
  });

  test('blocks submit when MSSV empty', () => {
    const onSubmit = jest.fn();
    render(<RegistrationForm defaults={{ fullName: 'A', email: 'a@e.com' }} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /Gửi đăng ký/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Vui lòng nhập mã số sinh viên/i)).toBeInTheDocument();
  });
});
