import React from 'react';
import { User } from '../models/user';
import styles from './admin.module.css';

interface UserManageProps {
  users: User[];
  currentEmail: string | null;
  onToggleBan: (userId: string, banned: boolean) => void;
}

export default function UserManage({ users, currentEmail, onToggleBan }: UserManageProps) {
  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address || '-'}</td>
              <td>
                {user.email !== currentEmail && user.role !== 'admin' && (
                  <button
                    className={user.banned ? styles.unban : styles.ban}
                    onClick={() => onToggleBan(user.id, user.banned)}
                  >
                    {user.banned ? 'Mở cấm' : 'Cấm'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
