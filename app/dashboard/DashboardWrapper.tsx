
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardWrapper() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      {email ? (
        <div className={styles.message}>
          {name ? (
            <p>
              Xin chào, <strong>{name}</strong>! 
            </p>
          ) : (
            <p>Chưa có thông tin tên.</p>
          )}
          <p>Email của bạn là <strong>{email}</strong>.</p>
        </div>
      ) : (
        <p className={`${styles.message} ${styles.noEmail}`}>
          Chưa có thông tin đăng nhập.
        </p>
      )}

      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}
