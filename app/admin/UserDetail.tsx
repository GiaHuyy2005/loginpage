import React from 'react';
import { User } from '../models/user';
import styles from './admin.module.css';

interface UserDetailProps {
  users: User[];
}

export default function UserDetail({ users }: UserDetailProps) {
  return (
    <div>
      <h2>Chi tiết người dùng</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Quyền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone || '-'}</td>
              <td>{user.address || '-'}</td>
              <td>{user.role}</td>
              <td>{user.banned ? 'Bị cấm' : 'Hoạt động'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
