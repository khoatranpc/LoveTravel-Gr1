import {useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "../Form.module.scss";
import { isRequired, isEmail, minLength, isEqual} from "../validator.jsx";

const LENGTH_USER_NAME = 6
const LENGTH_IDENTIFY = 12
const LENGTH_PASSWORD = 6

const api = "http://localhost:8000/api/auth/signup"

function Register() {
  const [userName, setUserName] = useState('');
  const [userNameMsg, setUserNameMsg] = useState();

  const [name, setName] = useState('');
  const [nameMsg, setNameMsg] = useState();

  const [birth, setBirth] = useState('');
  const [birthMsg, setBirthMsg] = useState();

  const [address, setAddress] = useState('');
  const [addressMsg, setAddressMsg] = useState();

  const [gender, setGender] = useState('male');

  const [identify, setIdentify] = useState('');
  const [identifyMsg, setIdentifyMsg] = useState();

  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const [checkPassword, setCheckPassword] = useState(true);

  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Đăng ký'
  },[])

// Validate form
  const validateInputs = () => {
    setUserNameMsg(minLength(userName, LENGTH_USER_NAME))
    setNameMsg(isRequired(name))
    setBirthMsg(isRequired(birth))
    setAddressMsg(isRequired(address))
    setIdentifyMsg(minLength(identify, LENGTH_IDENTIFY))
    setEmailMsg(isEmail(email))
    setPasswordMsg(minLength(password, LENGTH_PASSWORD))
  }

  // Handle submit
  const handleSubmit = () => {
    validateInputs()
    if(!userNameMsg && !!name && !!birth && !!address && !identifyMsg && !emailMsg && !passwordMsg && checkPassword === undefined) {
      (
        axios.post(api, {
          "username" : userName ,
          "name" :  name,
          "birth" :  birth,
          "address" :  address,
          "gender" :  gender,
          "indentify" :  identify,
          "email" :  email,
          "password" :  password,
          "repassword": password
        })
        .then((res)=> {
          console.log(res);
            if(res.status === 201){
              navigate('/auth/login');
            }
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed");
        })

      )
    }
  }


  return (
    <div className="bg-primary">
       <h1 className="col l-3 m-4 c-0 text-center brand-form">
        Love Travel
        <p className="brand-form__line"></p>
      </h1>
      
      <div id={clsx(styles.registerForm)} className="col l-9 m-8 c-12" >
        <h1 className="text-center">Đăng ký</h1>

         {/* User name */}
         <div className={clsx(styles.formGroup)}>
          <label htmlFor="user-name" className={clsx(styles.formLabel)}>Tên đăng nhập:</label>
          <input id="user-name" type="text" name="registerUserName"
            className={clsx(styles.formControl)}
            value={userName}
            onChange={e => setUserName(e.target.value)}
            onBlur={() => setUserNameMsg(minLength(userName, LENGTH_USER_NAME))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{userNameMsg}</span>
        </div>

        {/* Name */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="name" className={clsx(styles.formLabel)}>Họ tên:</label>
          <input id="name" type="text" name="registerName" placeholder="VD: Đào Tài"
            className={clsx(styles.formControl)}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => setNameMsg(isRequired(name))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{nameMsg}</span>
        </div>

        {/* BirthDate */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ngày sinh:</label>
          <input id="birthDate" type="date" name="registerBirthDate"
            className={clsx(styles.formControl)}
            value={birth}
            onChange={e => setBirth(e.target.value.trim())}
            onBlur={() => setBirthMsg(isRequired(birth))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{birthMsg} </span>
        </div>

        {/* Address */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="address" className={clsx(styles.formLabel)}>Địa chỉ:</label>
          <input id="address" type="text" name="registerAddress"  placeholder="Nhập địa chỉ"
            className={clsx(styles.formControl)}
            value={address}
            onChange={e => setAddress(e.target.value)}
            onBlur={() => setAddressMsg(isRequired(address))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> {addressMsg} </span>
        </div>

        {/* Gender */}
        <div className={clsx("row", styles.formGroup)}>
          <label className={clsx("col c-4", styles.formLabel)}>Giới tính:</label>
          <div className="row col c-4">
            <label className={clsx(styles.formLabel)} htmlFor="gender__male">Nam</label>
            <input id="gender__male" type="radio" name="registerGender"
              checked={gender === 'male'}
              onChange={e => setGender('male')}
            />
          </div>
          <div className="row col c-4">
            <label className={clsx(styles.formLabel)} htmlFor="gender__female">Nữ</label>
            <input id="gender__female" type="radio" name="registerGender"
              checked={gender === 'female'}
              onChange={e => setGender('female')}
            />
          </div>
          <span className={clsx(styles.formMsg, styles.formMsgError)}> </span>
        </div>

        {/* CCCD */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="identify" className={clsx(styles.formLabel)}>CCCD:</label>
          <input id="identify" type="number" name="registerIdentify" placeholder="Nhập CCCD"
            className={clsx(styles.formControl)}
            value={identify}
            onChange={e => setIdentify(e.target.value.trim())}
            onBlur={() => setIdentifyMsg(minLength(identify, LENGTH_IDENTIFY))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{identifyMsg}</span> 
        </div>

        {/* Email */}
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="email" className={clsx(styles.formLabel)}>Email:</label>
          <input id="email" type="email" name="registerEmail" placeholder="VD: daotai123@gmail.com"
            className={clsx(styles.formControl)}
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            onBlur={() => setEmailMsg(isEmail(email))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}>{emailMsg} </span>
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
          <label htmlFor="password" className={clsx(styles.formLabel)}>Nhập lại mật khẩu:</label>
          <input id="re-password" type="password" name="registerRePassword" 
            className={clsx(styles.formControl)}
            onBlur={e => setCheckPassword(isEqual(e.target.value, password, "Mật khẩu nhập lại không chính xác"))}
          />
          <span className={clsx(styles.formMsg, styles.formMsgError)}> {checkPassword} </span>
        </div>

        <div className={clsx(styles.formGroup)}>
          <button className={clsx(styles.btnRegister)}
              onClick={handleSubmit}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
