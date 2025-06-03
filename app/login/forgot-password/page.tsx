'use client';

import style from './forgot-password.module.css';  // Đảm bảo đúng tên file và đường dẫn

export default function ForgotPassword() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Yêu cầu đặt lại mật khẩu đã được gửi (giả lập). Vui lòng kiểm tra email.');
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <a href="/login" className={style.goBack}>&larr; Quay lại đăng nhập</a>
        <h2>Quên mật khẩu</h2>
        <p>Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={style.label}>
            Email<span className={style.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email của bạn"
            required
            maxLength={225}
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            className={style.inputField}
            title="Email phải có đuôi @gmail.com"
          />

          <button type="submit" className={style.submitButton}>
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
}
