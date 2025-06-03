'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from './models/user';
import styles from './home.module.css'; 

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🏠 Trang Chủ</h1>

        <div style={{ position: 'relative' }}>
          {user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={styles.dropdownButton}
              >
                👤 {user.name}
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/profile">
                    <div className={styles.dropdownItem}>👀 Profile</div>
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <div className={styles.dropdownItem}>🛠️ Admin</div>
                    </Link>
                  )}
                  <div
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logout}`}
                  >
                    🚪 Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link href="/login">
                <button>Đăng nhập</button>
              </Link>
              <Link href="/register">
                <button>Đăng ký</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <p>Chào mừng bạn đến với trang chủ!</p>
    </div>
  );
}
