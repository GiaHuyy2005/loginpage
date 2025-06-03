'use client';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import {
  updateUserName,
  updateUserPhone,
  updateUserAddress,
  updateUserPassword,
  getUserByEmail
} from '../services/userService';

import { User } from '../models/user';

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null); 
  const [role, setRole] = useState('');

  const [editField, setEditField] = useState<null | 'name' | 'phone' | 'address'>(null);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser); 
      setUser(userData);
      setUserName(userData.name);
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
      setRole(userData.role || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSaveField = async (field: 'name' | 'phone' | 'address') => {
    if (!user) return;
    try {
      if (field === 'name') {
        await updateUserName(user.email, userName);
      } else if (field === 'phone') {
        await updateUserPhone(user.email, phone);
      } else if (field === 'address') {
        await updateUserAddress(user.email, address);
      }

      const updatedUser: User = { ...user };
      if (field === 'name') updatedUser.name = userName;
      else if (field === 'phone') updatedUser.phone = phone;
      else if (field === 'address') updatedUser.address = address;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfileMsg('Cập nhật hồ sơ thành công!');
      setEditField(null);
    } catch {
      setProfileMsg('Lỗi khi cập nhật hồ sơ!');
    }
  };

  const handleCancelEdit = (field: 'name' | 'phone' | 'address') => {
    if (!user) return;
    if (field === 'name') setUserName(user.name);
    else if (field === 'phone') setPhone(user.phone || '');
    else if (field === 'address') setAddress(user.address || '');
    setEditField(null);
  };

  const handleChangePassword = async () => {
    if (!user) return;
    try {
      const userData = await getUserByEmail(user.email);
      if (!userData) {
        setMsg('Người dùng không tồn tại');
        return;
      }
      if (userData.password !== currentPassword) {
        setMsg('Mật khẩu hiện tại không đúng!');
        return;
      }
      if (currentPassword === newPassword) {
        setMsg('Mật khẩu mới không được trùng với mật khẩu hiện tại!');
        return;
      }
      await updateUserPassword(user.email, newPassword);
      setMsg('Đổi mật khẩu thành công!');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setMsg('Lỗi khi đổi mật khẩu!');
    }
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <p>
          Bạn chưa đăng nhập. Vui lòng <a href="/login">đăng nhập</a> để xem hồ sơ.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.push('/')} className={styles.backButton}>
        ⬅️ Quay lại Trang Chủ
      </button>

      <h1 className={styles.title}>👤 Trang Hồ Sơ</h1>
      {profileMsg && <p className={styles.message}>{profileMsg}</p>}

      <div className={styles.profileWrapper}>
        <p><b>Email:</b> {user.email}</p>

        <p>
          <b>Tên:</b>{' '}
          {editField === 'name' ? (
            <>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.inputField}
              />
              <button onClick={() => handleSaveField('name')} className={styles.submitButton}>Lưu</button>
              <button onClick={() => handleCancelEdit('name')} className={styles.cancelButton}>Hủy</button>
            </>
          ) : (
            <>
              <span>{userName}</span>
              <button onClick={() => setEditField('name')} className={styles.editButton}>✏️</button>
            </>
          )}
        </p>

        <p>
          <b>Số điện thoại:</b>{' '}
          {editField === 'phone' ? (
            <>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.inputField}
              />
              <button onClick={() => handleSaveField('phone')} className={styles.submitButton}>Lưu</button>
              <button onClick={() => handleCancelEdit('phone')} className={styles.cancelButton}>Hủy</button>
            </>
          ) : (
            <>
              <span>{phone || '-'}</span>
              <button onClick={() => setEditField('phone')} className={styles.editButton}>✏️</button>
            </>
          )}
        </p>

        <p>
          <b>Địa chỉ:</b>{' '}
          {editField === 'address' ? (
            <>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.inputField}
              />
              <button onClick={() => handleSaveField('address')} className={styles.submitButton}>Lưu</button>
              <button onClick={() => handleCancelEdit('address')} className={styles.cancelButton}>Hủy</button>
            </>
          ) : (
            <>
              <span>{address || '-'}</span>
              <button onClick={() => setEditField('address')} className={styles.editButton}>✏️</button>
            </>
          )}
        </p>

        <p><b>Quyền:</b> {role}</p>

        <div className={styles.changePasswordSection}>
          <h3>Đổi mật khẩu</h3>
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.inputField}
            autoComplete="current-password"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.inputField}
            autoComplete="new-password"
          />
          <button onClick={handleChangePassword} className={styles.submitButton}>
            Cập nhật mật khẩu
          </button>
          {msg && <p className={styles.message}>{msg}</p>}
        </div>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        🚪 Đăng xuất
      </button>
    </div>
  );
}
