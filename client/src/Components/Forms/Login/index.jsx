import { useState } from "react";
import clsx from "clsx";

import styles from "../Form.module.scss";
import { isRequired } from "../validator.jsx";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [accountMsg, setAccountMsg] = useState(undefined);
  const [passwordMsg, setPasswordMsg] = useState(undefined);

  const handleSendFormValues = () => {
    setAccountMsg(isRequired(account));
    setPasswordMsg(isRequired(password));

    !accountMsg &&
      !passwordMsg &&
      console.log({
        account,
        password,
      });
  };

  return (
    <div className="row bg-primary">
      <h1 className="col l-3 m-4 c-3 text-center brand-form">
        Love Travel
        <p className="brand-form__line"></p>
      </h1>

      <div id={clsx(styles.loginForm)} className="col l-9 m-8 c-9">
        <h1 className="text-center">Đăng nhập</h1>

        {/* Account */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="account" className={clsx(styles.formLabel)}>
            Tài khoản:
          </label>
          <input
            id="account"
            name="login_account"
            type="text"
            className={clsx(styles.formControl)}
            value={account}
            onChange={(e) => setAccount(e.target.value.trim())}
            onBlur={() => setAccountMsg(isRequired(account))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>
            {accountMsg}
          </span>
        </div>

        {/* Password */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="password" className={clsx(styles.formLabel)}>
            Mật khẩu:
          </label>
          <input
            id="password"
            name="login_password"
            type="password"
            className={clsx(styles.formControl)}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            onBlur={() => setPasswordMsg(isRequired(password))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>
            {passwordMsg}
          </span>
        </div>

        {/* Submit button className="col c-4 btn btn-login" */}
        <div className={clsx("row", styles.formGroup)}>
          <span className="col c-8">
            <a href="#" className={clsx(styles.link)}>Đăng ký ngay </a>
            <div style={{marginTop: '4px'}}>
              <a href="#" className={clsx(styles.link)}>Quên mật khẩu</a>
            </div>
          </span>
          <button
            className={clsx("col", "c-4", "btn", styles.btnLogin)}
            onClick={handleSendFormValues}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
