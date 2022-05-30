import { useState, useEffect } from "react";
import clsx from "clsx";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"

import styles from "../Form.module.scss";
import { isRequired } from "../validator.jsx";
import Toast from '../../Toast'

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [accountMsg, setAccountMsg] = useState(undefined);
  const [passwordMsg, setPasswordMsg] = useState(undefined);
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Đăng nhập'
  },[])

  // Decode Token
  const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

  const handleSendFormValues = () => {
    setAccountMsg(isRequired(account));
    setPasswordMsg(isRequired(password));
    (
      axios.post('http://localhost:8000/api/auth/login', {
          "username": account,
          "password": password
      },{
        
      })
      .then((res)=> {
        if(res.data.status === 200){
          const decode = parseJwt((res.data.token))
          if(decode.role_user === "admin"){
            navigate('/manage/tours')
          }
          if(decode.role_user === 'user'){
            navigate('/home')
          }
          if(decode.role_user === 'guide'){
            navigate('/guide/account')
          }
        }
        else{
          console.log(res.data.status);
        }
        localStorage.setItem('token', res.data.token)
        document.title = "Love Travel"
      })
      .catch((err) => {
        // console.log(err);
        setPasswordMsg("Thông tin đăng nhập không hợp lệ")
       
        // Show toast
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      })

    )
  };


  return (<>
        {showToast &&  <Toast desc="Thông tin đăng nhập không hợp lệ" />}
      <div className="bg-primary">
        
        <h1 className="col l-3 m-4 c-0 text-center brand-form">
          Love Travel
          <p className="brand-form__line"></p>
        </h1>

        <div id={clsx(styles.loginForm)} className="col l-9 m-8 c-11">
          <h1 className="text-center">Đăng nhập</h1>

          {/* Account */}
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="account" className={clsx(styles.formLabel)}>Tên đăng nhập:</label>
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
              <Link to="/auth/register" className={clsx(styles.link)}>Đăng ký ngay </Link>
              <div style={{marginTop: '4px'}}>
                <Link to="/auth/forgetPassword" className={clsx(styles.link)}>Quên mật khẩu</Link>
              </div>
            </span>
            <button
              type="submit"
              className={clsx("col", "c-4", "btn", styles.btnLogin)}
              onClick={handleSendFormValues}
            >
              Đăng nhập
            </button>
          </div>

        </div> 
      </div>
  </>
  );
}

export default Login;
