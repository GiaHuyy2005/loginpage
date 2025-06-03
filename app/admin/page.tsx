'use client';

import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { getAllUsers, toggleBanUser } from '../services/userService';
import { User } from '../models/user';
import { useSearchParams, useRouter } from 'next/navigation';
import UserDetail from './UserDetail';
import UserManage from './UserManage';

export default function AdminPage() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get('name') || 'Admin';
  const role = searchParams.get('role') || 'admin';
  const email = searchParams.get('email');
  const router = useRouter();

  const [view, setView] = useState<'detail' | 'manage'>('detail');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getAllUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleToggleBan = async (userId: string, banned: boolean) => {
    if (!email) return;
    const userToBan = users.find(u => u.id === userId);
    if (!userToBan || userToBan.email === email || userToBan.role === 'admin') return;

    await toggleBanUser(userId, !banned);
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, banned: !banned } : user
    );
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push(`/profile?name=${nameParam}&email=${email}&role=${role}`);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <p>Xin chào, <strong>{nameParam}</strong></p>
          <button onClick={handleProfile}>Trang thông tin</button>
        </div>
        <ul>
          <li onClick={() => setView('detail')}>Chi tiết người dùng</li>
          <li onClick={() => setView('manage')}>Quản lý người dùng</li>
        </ul>
        <div className={styles.sidebarFooter}>
          <button onClick={handleHome}>Trang chủ</button>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      </aside>

      <main className={styles.content}>
        {view === 'detail' && <UserDetail users={users} />}
        {view === 'manage' && (
          <UserManage users={users} currentEmail={email} onToggleBan={handleToggleBan} />
        )}
      </main>
    </div>
  );
}
