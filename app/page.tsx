import style from './login.module.css';

export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <a href="#" className={style.goBack}>&larr; Go Back</a>
        <h2>Sign In</h2>
        <p>Enter your email and password to sign in!</p>

        <form>
          <label htmlFor="email" className={style.label}>
            Email<span className={style.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            maxLength={255}
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            className={style.inputField}
            title="Email phải có đuôi @gmail.com"
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
            />
          </div>

          <div className={style.formOptions}>
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <a href="#" className={style.forgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className={style.submitButton}>
            Sign In
          </button>

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
