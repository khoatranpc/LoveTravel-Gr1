import { useState } from "react";
import clsx from "clsx";
import {useNavigate} from 'react-router-dom'

import styles from "../Form.module.scss";
import { isRequired, minLength, isEqual } from "../validator.jsx";

const LENGTH_PASSWORD = 6

function NewPassword() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [otpMsg, setOtpMsg] = useState('')
  
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const [checkPassword, setCheckPassword] = useState(true);

  const handleConfirm = () => {
      if(otp == 123 && password){
          if(otpMsg || passwordMsg || checkPassword){
            console.log("Fail")
          }else{
              console.log(otp, password);
              navigate('/auth/login')
          }
      }else{
          console.log("Mã OTP không hợp lệ");
      }
  }

  return (
    <div className="bg-primary">
      <h1 className="col l-3 m-4 c-0 text-center brand-form">
        Love Travel
        <p className="brand-form__line"></p>
      </h1>

      <div id={clsx(styles.loginForm)} className="col l-9 m-8 c-11">
        <h1 className="text-center">Love Travel</h1>

        {/* OTP */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="otp" className={clsx(styles.formLabel)}>Mã OTP:</label>
          <input
            id="otp"
            type="text"
            className={clsx(styles.formControl)}
            value={otp}
            onChange={(e) => setOtp(e.target.value.trim())}
            onBlur={() => setOtpMsg(isRequired(otp))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>
            {otpMsg}
          </span>
        </div>

         {/* Password */}
         <div className={clsx(styles.formGroup)}>
            <label htmlFor="password" className={clsx(styles.formLabel)}>Mật khẩu:</label>
            <input id="password" type="password" name="registerPassword" 
            className={clsx(styles.formControl)}
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
            onBlur={() => setPasswordMsg(minLength(password, LENGTH_PASSWORD))}
        />
        <span className={clsx(styles.formMsg, styles.formMsgError)}>{passwordMsg}</span>
        </div>

         {/* Re-password */}
         <div className={clsx(styles.formGroup)}>
          <label htmlFor="re-password" className={clsx(styles.formLabel)}>Nhập lại mật khẩu:</label>
          <input id="re-password" type="password" name="registerRePassword" 
            className={clsx(styles.formControl)}
            onBlur={e => setCheckPassword(isEqual(e.target.value, password, "Mật khẩu nhập lại không chính xác"))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> {checkPassword} </span>
        </div>

        <div className={clsx(styles.formGroup)}>
          <button
            className={clsx("col btn l-12 m-12 c-12", styles.btnConfirmPwd)}
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
