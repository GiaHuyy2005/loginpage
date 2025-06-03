'use client';
import style from './login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserByEmail } from '../services/userService';
import type { User } from '../models/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  // Giữ thông tin user sau khi đăng nhập thành công (optional)
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        setErrorMsg('Email không tồn tại');
        return;
      }

      if (user.password !== password) {
        setErrorMsg('Mật khẩu không đúng');
        return;
      }

      setErrorMsg('');
      setUser(user); 

      alert('Đăng nhập thành công!');
      router.push(`/dashboard?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`);

    } catch (err) {
      setErrorMsg('Có lỗi xảy ra khi đăng nhập');
      console.error(err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <a href="../" className={style.goBack}>&larr; Go Back</a>
        <h2>Sign In</h2>
        <p>Enter your email and password to sign in!</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={style.label}>
            Email<span className={style.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            maxLength={225}
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            className={style.inputField}
           
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className={style.label}>
            Password<span className={style.required}>*</span>
          </label>
          <div className={style.passwordWrapper}>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className={style.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={style.formOptions}>
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <a href="../login/forgot-password" className={style.forgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className={style.submitButton}>
            Sign In
          </button>

          {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

          <p className={style.note}>
            Only Pro Members Can Have Accounts – <a href="#">Purchase Now!</a>
          </p>

          <div className={style.alertBox}>
            Please <a href="#">reset your password</a> if you have previously made a purchase on our old site.
          </div>
        </form>
      </div>

      <div className={style.rightSide}>
        <div className={style.brandingSection}>
          <img src="logo1.jpg" alt="Logo" className={style.brandingLogo} />
          <h1 className={style.brandingTitle}>TailAdmin</h1>
          <p className={style.brandingDescription}>
            Free and Open-Source Tailwind CSS Admin Dashboard Template!
          </p>
        </div>
      </div>
    </div>
  );
}