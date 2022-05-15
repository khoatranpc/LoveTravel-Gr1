import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import {useNavigate} from 'react-router-dom'
import axios from "axios"

import styles from "../Form.module.scss";
import { isRequired, minLength, isEqual } from "../validator.jsx";
import {OtpContext} from '../../../Contexts/OtpContext'


function NewPassword() {
  const LENGTH_PASSWORD = 6
  const apiResetPwd = "http://localhost:8000/api/auth/reset-password"

  const [otp, setOtp] = useState('')
  const [otpMsg, setOtpMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [checkPassword, setCheckPassword] = useState(true)
  

  const context = useContext(OtpContext)
  
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Love Travel"
    console.log("OTP: ", (context.otp).toString());
    console.log("id: ", context.idAccount);
  },[])

  const handleConfirm = () => {
      if(parseInt(otp) === context.otp && password){
          if(otpMsg || passwordMsg || checkPassword){
            console.log("Fail")
          }
          else{
              axios.put(apiResetPwd,{
                "receivedOtp":true,
                "otp": context.otp.toString(),
                "id_account": context.idAccount,
                "password":password,
                "repassword":password
              })
              .then(res => {
                console.log("Success");
                navigate('/auth/login')
              })
              .catch(err => {
                console.log(err);
                setOtpMsg("Mã OTP không hợp lệ")
              })
              
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
          <span className={clsx(styles.formMsg, styles.formMsgSuccess)}>
            {
              parseInt(otp) === context.otp ? 'Mã OTP chính xác' : undefined
            }
          </span>
        </div>

         {/* Password */}
         <div className={clsx(styles.formGroup)}>
            <label htmlFor="password" className={clsx(styles.formLabel)}>Mật khẩu mới:</label>
            <input
            id="password" type="password" name="registerPassword" 
            className={clsx(styles.formControl)}
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
            onBlur={() => setPasswordMsg(minLength(password, LENGTH_PASSWORD))}
        />
        <span className={clsx(styles.formMsg, styles.formMsgError)}>{passwordMsg}</span>
        </div>

         {/* Re-password */}
         <div className={clsx(styles.formGroup)}>
          <label htmlFor="re-password" className={clsx(styles.formLabel)}>Nhập lại mật khẩu mới:</label>
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
