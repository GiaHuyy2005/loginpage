import { User } from '../models/user';

const API_URL = 'http://localhost:3001/users';

// Lấy user theo email
export async function getUserByEmail(email: string): Promise<User | null> {
  const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Failed to fetch user by email');
  const users: User[] = await res.json();
  return users.length > 0 ? users[0] : null;
}

// Cập nhật mật khẩu
export async function updateUserPassword(email: string, newPassword: string): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword }),
  });
  if (!res.ok) throw new Error('Failed to update password');
}

// Cập nhật tên
export async function updateUserName(email: string, newName: string): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  });
  if (!res.ok) throw new Error('Failed to update name');
}

// Đăng ký
export async function registerUser(userData: Omit<User, 'id'>): Promise<User> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to register user');
  const user: User = await res.json();
  return user;
}

// Lấy tất cả user (cho admin)
export async function getAllUsers(): Promise<User[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch users');
  const users: User[] = await res.json();
  return users;
}

// Toggle ban
export async function toggleBanUser(userId: string, banned: boolean): Promise<void> {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ banned }),
  });
  if (!res.ok) throw new Error('Failed to update banned status');
}
// Cập nhật số điện thoại
export async function updateUserPhone(email: string, newPhone: string): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: newPhone }),
  });
  if (!res.ok) throw new Error('Failed to update phone number');
}
// Cập nhật địa chỉ
export async function updateUserAddress(email: string, newAddress: string): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: newAddress }),
  });
  if (!res.ok) throw new Error('Failed to update address');
}
