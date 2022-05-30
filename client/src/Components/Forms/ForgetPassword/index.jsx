import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

import NewPassword from '../NewPassword'
import styles from "../Form.module.scss";
import { isRequired, isEmail } from "../validator.jsx"

import {OtpContext} from '../../../Contexts/OtpContext'
import Toast from '../../Toast'

function ForgetPassword() {
  const api = "http://localhost:8000/api/auth/sending-otp"
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [userNameMsg, setUserNameMsg] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [showToast, setShowToast] = useState(false)


  const navigate = useNavigate()
  const otpContext = useContext(OtpContext)

  useEffect(() => {
    document.title = 'Quên mật khẩu'
  },[])

  const validate = () =>{
    setUserNameMsg(isRequired(userName))
    setEmailMsg(isEmail(email))
  }


  const handleSendOTP = () => {
    validate()
    if(userName && email){
        if(emailMsg || userNameMsg){
            return
        }
        else{
            axios.post(api, {
                "username": userName,
                "email": email
            },{
                
            })
            .then((res)=> {
                console.log(res);
                if(res.status === 200){
                  otpContext.sendOtp(res.data.otp)
                  otpContext.sendIdAccount(res.data.id_account)
                  navigate('/auth/newPassword')
                }
            })
            .catch((err) => {
                // console.log(err);
                 // Show toast
                setShowToast(true)
                setTimeout(() => {
                  setShowToast(false)
                }, 4000)
            })
        }
    }
    else{
      
    }
  }


  return (
    <>
      {showToast &&  <Toast desc="Thông tin không hợp lệ" />}
      <div className="bg-primary">
        <h1 className="col l-3 m-4 c-0 text-center brand-form">
          Love Travel
          <p className="brand-form__line"></p>
        </h1>

        <div id={clsx(styles.loginForm)} className="col l-9 m-8 c-11">
          <h1 className="text-center">Quên mật khẩu</h1>

          {/* Account */}
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="account" className={clsx(styles.formLabel)}>Tên đăng nhập:</label>
            <input
              id="account"
              type="text"
              className={clsx(styles.formControl)}
              value={userName}
              onChange={(e) => setUserName(e.target.value.trim())}
              onBlur={() => setUserNameMsg(isRequired(userName))}
            />
            <span className={clsx(styles.formMsg, styles.formMsgError)}>
              {userNameMsg}
            </span>
          </div>

          {/* Password */}
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="email" className={clsx(styles.formLabel)}>Email:</label>
            <input
              id="email"
              type="email"
              className={clsx(styles.formControl)}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              onBlur={() => setEmailMsg(isEmail(email))}
            />
            <span className={clsx(styles.formMsg, styles.formMsgError)}>
              {emailMsg}
            </span>
          </div>
          {/* Submit button className="col c-4 btn btn-login" */}
          <div className={clsx("row", styles.formGroup)}>
            <button
              className={clsx("col btn l-12 m-12 c-12", styles.btnGetOTP)}
              onClick={handleSendOTP}
            >
              Lấy mã OTP
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default ForgetPassword;
