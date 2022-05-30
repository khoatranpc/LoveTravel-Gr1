import clsx from 'clsx'
import { useState, useEffect } from 'react';
import axios from 'axios';

import {isEmail, minLength} from '../../Forms/validator'
import Header from '../Header'

import styles from '../Guide.module.scss';
import avatar from './avatar.jpg'
import Toast from '../../Toast'

export default function Account(){
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('');
    const [identify, setIdentify] = useState('');
    const [identifyMsg, setIdentifyMsg] = useState();
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("Thông tin cập nhật không hợp lệ")

    const LENGTH_IDENTIFY = 12
    const LENGTH_PHONE = 10

    const [email, setEmail] = useState('');
    const [emailMsg, setEmailMsg] = useState('');

    const [phone, setPhone] = useState('');
    const [phoneMsg, setPhoneMsg] = useState('');

    useEffect(() => {
        // const decode = parseJwt((res.data.token))
        // console.log(decode);
        const api = `http://localhost:8000/api/user/current-user`
        axios.get(api,
            {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            setName(res.data.data.name)
            setBirth(res.data.data.birth.slice(0, 10))
            setGender(res.data.data.gender)
            setAddress(res.data.data.address)
            setIdentify(res.data.data.indentify)
            setEmail(res.data.data.email)
            setPhone(res.data.data.phone)
        })
        .catch(err => console.error(err))
    },[])

    const validateInputs = () => {
        setIdentifyMsg(minLength(identify, LENGTH_IDENTIFY))
        setEmailMsg(isEmail(email))
        setPhoneMsg(minLength(phone, LENGTH_PHONE))
      }

    const handleUpdateInfo = () => {
        // validateInputs()
        const apiUpdate = `http://localhost:8000/api/user/current-user/update`
        if(!identifyMsg && !emailMsg && !phoneMsg) {
            axios.put(apiUpdate,
                {
                    "name": name,
                    "birth": birth,
                    "gender": gender,
                    "address": address,
                    "indentify": identify,
                    "email": email,
                    "phone": phone,
                },
                {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(res => {
                console.log(res.data);
                window.location.reload(true)
            })
            .catch(err =>{
                setShowToast(true)
                setTimeout(() =>
                    setShowToast(false)
                , 2000)
                console.error(err)
            })
        }else{
            setShowToast(true)
            setTimeout(() =>
                setShowToast(false)
            , 2000)
        }
    }

   

    return (
        <>
            <div>
                <Header />
                <div className="grid wide">

                    <div className="row container">
                        <div className="col l-2 m-2 c-12">
                            <img className={clsx(styles.avatar)} src={avatar} alt="avatar" />
                        </div>

                        <div className={clsx("col l-8 m-8 c-12", styles.formContainer)}>
                            <h1 className="text-center brand-name">Người dẫn tour Love Travel</h1>
                            {/* Account */}
                            <div className={clsx(styles.formGroup)}>
                            <label htmlFor="account" className={clsx(styles.formLabel)}>Tên đăng nhập:</label>
                            <input id="name" type="text" 
                                    className={clsx(styles.formControl)}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            {/* Gender */}
                            <div className={clsx("row", styles.formGroup)}>
                                <label className={clsx("col c-4", styles.formLabel)}>Giới tính:</label>
                                <div className="row col c-4">
                                    <label className={clsx(styles.formLabel)} htmlFor="gender__male">Nam</label>
                                    <input id="gender__male" type="radio"
                                    checked={gender === 'male'}
                                    onChange={e => setGender('male')}
                                    />
                                </div>
                                <div className="row col c-4">
                                    <label className={clsx(styles.formLabel)} htmlFor="gender__female">Nữ</label>
                                    <input id="gender__female" type="radio"
                                    checked={gender === 'female'}
                                    onChange={e => setGender('female')}
                                    />
                                </div>
                            </div>

                            {/* BirthDate */}
                            <div className={clsx(styles.formGroup)}>
                            <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ngày sinh:</label>
                            <input id="birthDate" type="date" name="registerBirthDate"
                                className={clsx(styles.formControl)}
                                value={birth}
                                onChange={e => setBirth(e.target.value.trim())}
                                
                            />
                            </div>

                            {/* Address */}
                            <div className={clsx(styles.formGroup)}>
                                <label htmlFor="address" className={clsx(styles.formLabel)}>Địa chỉ:</label>
                                <input id="address" type="text" name="registerAddress"  placeholder="Nhập địa chỉ"
                                    className={clsx(styles.formControl)}
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    
                                />
                            </div>


                            {/* CCCD */}
                            <div className={clsx(styles.formGroup)}>
                                <label htmlFor="identify" className={clsx(styles.formLabel)}>CCCD:</label>
                                <input id="identify" type="text" name="registerIdentify" placeholder="Nhập CCCD"
                                    className={clsx(styles.formControl)}
                                    value={identify}
                                    onChange={e => setIdentify(e.target.value)}
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
                                <span className={clsx(styles.formMsg, styles.formMsgError)}>{emailMsg}</span>
                            </div>

                            {/* Phone */}
                            <div className={clsx(styles.formGroup)}>
                                <label htmlFor="Phone" className={clsx(styles.formLabel)}>Số điện thoại:</label>
                                <input id="Phone" type="number" 
                                    className={clsx(styles.formControl)}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.trim())}
                                    onBlur={() => setPhoneMsg(minLength(phone, LENGTH_PHONE))}
                                />
                                
                            </div>
                            <span className={clsx(styles.formMsg, styles.formMsgError)}>{phoneMsg}</span>
                        </div>

                        <div className="col l-2 m-2 c-12">
                            <button 
                            onClick={handleUpdateInfo}
                            className={clsx(styles.btnUpdateAccount)} >Cập nhật
                            <i className="fa-solid fa-comment-pen"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
         {/* Toast */}
         {
            showToast && <Toast desc={msgToast} />
        }
        </>
    )
}