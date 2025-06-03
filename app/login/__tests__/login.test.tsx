import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page';
import { getUserByEmail } from '../../services/userService';
import { useRouter } from 'next/navigation';

jest.mock('../../services/userService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // Sửa ở đây: tìm nút theo role và tên
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows error if email does not exist', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue(null);

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'admin123@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'admin123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() =>
      expect(screen.getByText(/Email không tồn tại/i)).toBeInTheDocument()
    );
  });

  it('shows error if password is incorrect', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue({
      email: 'user@gmail.com',
      password: 'correctpassword',
      name: 'Test User',
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() =>
      expect(screen.getByText(/Mật khẩu không đúng/i)).toBeInTheDocument()
    );
  });

  it('redirects on successful login', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue({
      email: 'user@gmail.com',
      password: '123456',
      name: 'Test User',
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith('/')
    );
  });

  it('shows generic error on exception', async () => {
    (getUserByEmail as jest.Mock).mockRejectedValue(new Error('Server error'));

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() =>
      expect(screen.getByText(/Có lỗi xảy ra khi đăng nhập/i)).toBeInTheDocument()
    );
  });
});
