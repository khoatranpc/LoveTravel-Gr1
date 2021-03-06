
import clsx from 'clsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

import {isEmail, minLength} from '../../Forms/validator'
import Header from '../../Header/Header'
import styles from '../User.module.scss'
import avatar from './avatar.jpg'
import Toast from '../../Toast'

export default function Account(){
    const [name, setName] =useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('');
    const [identify, setIdentify] = useState('');
    const [identifyMsg, setIdentifyMsg] = useState();
    const [email, setEmail] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneMsg, setPhoneMsg] = useState('');

    const [showToast, setShowToast] = useState(false)

    // Get data user
    useEffect(() => {
       const timerId = setTimeout(() => {
            const api = `http://localhost:8000/api/user/current-user`
            axios.get(api,
                {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(res => {
                console.log(res.data);
                setName(res.data.data.name)
                setBirth(res.data.data.birth.slice(0, 10))
                setGender(res.data.data.gender)
                setAddress(res.data.data.address)
                setIdentify(res.data.data.indentify)
                setEmail(res.data.data.email)
                setPhone(res.data.data.phone)
            })
            .catch(err => console.error(err))
       }, 1000)

       return () => {
           clearTimeout(timerId)
       }
    },[])

    const validateInputs = () => {
        setIdentifyMsg(minLength(identify, 12))
        setEmailMsg(isEmail(email))
        setPhoneMsg(minLength(phone, 9))
      }

    const handleUpdate = () => {
        validateInputs()
        if(!emailMsg && !phoneMsg){
            const apiUpdate = `http://localhost:8000/api/user/current-user/update`
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
               window.location.reload(true)
            })
            .catch(err => {
                // console.error(err)
                setShowToast(true)
                setTimeout(() =>
                    setShowToast(false)
                , 2000)
            }
            )
        }else{
            // console.log("Failed");
            setShowToast(true)
            setTimeout(() =>
                setShowToast(false)
            , 2000)
        }
      
    }

    return (
        <>
            <Header />
            <div className="grid wide">
                <div className="row container">
                    <div className="col l-2 m-2 c-12">
                        <img className={clsx(styles.avatar)} src={avatar} alt="avatar" />
                    </div>

                    <div className={clsx("col l-8 m-7 c-12", styles.formContainer)}>
                        <h1 className="text-center brand-name">Th??ng tin c?? nh??n</h1>
                        {/* H??? t??n */}
                        <div className={clsx(styles.formGroup)}>
                        <label htmlFor="name" className={clsx(styles.formLabel)}>H??? t??n:</label>
                        <input
                            type="text" id="name"
                            className={clsx(styles.formControl)}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        </div>

                        {/* Gender */}
                        <div className={clsx("row", styles.formGroup)}>
                            <label className={clsx("col c-4", styles.formLabel)}>Gi???i t??nh:</label>
                            <div className="row col c-4">
                                <label className={clsx(styles.formLabel)} htmlFor="gender__male">Nam</label>
                                <input id="gender__male" type="radio"
                                checked={gender === 'male'}
                                onChange={e => setGender('male')}
                                />
                            </div>
                            <div className="row col c-4">
                                <label className={clsx(styles.formLabel)} htmlFor="gender__female">N???</label>
                                <input id="gender__female" type="radio"
                                checked={gender === 'female'}
                                onChange={e => setGender('female')}
                                />
                            </div>
                        </div>

                        {/* BirthDate */}
                        <div className={clsx(styles.formGroup)}>
                        <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ng??y sinh:
                        </label>
                        <input id="birthDate" type="date" name="registerBirthDate"
                            className={clsx(styles.formControl)}
                            value={birth}
                            onChange={e => setBirth(e.target.value.trim())}
                            
                        />
                        </div>

                        {/* Address */}
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="address" className={clsx(styles.formLabel)}>?????a ch???:</label>
                            <input id="address" type="text" name="registerAddress"  placeholder="Nh???p ?????a ch???"
                                className={clsx(styles.formControl)}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                
                            />
                        </div>


                        {/* CCCD */}
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="identify" className={clsx(styles.formLabel)}>CCCD:</label>
                            <input id="identify" type="text" name="registerIdentify" placeholder="Nh???p CCCD"
                                className={clsx(styles.formControl)}
                                value={identify}
                                onChange={e => setIdentify(e.target.value)}
                                onBlur={() => setIdentifyMsg(minLength(identify, 12))}
                            />
                        </div>
                        <span className={clsx(styles.formMsg, styles.formMsgError)}>{identifyMsg}</span>

                        {/* Email */}
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="email" className={clsx(styles.formLabel)}>Email:</label>
                            <input id="email" type="email" name="registerEmail" placeholder="VD: daotai123@gmail.com"
                                className={clsx(styles.formControl)}
                                value={email}
                                onChange={e => setEmail(e.target.value.trim())}
                                onBlur={() => setEmailMsg(isEmail(email))}
                            />
                        </div>
                        <span className={clsx(styles.formMsg, styles.formMsgError)}>{emailMsg}</span>

                        {/* Phone */}
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="Phone" className={clsx(styles.formLabel)}>S??? ??i???n tho???i:</label>
                            <input id="Phone" type="text" 
                                className={clsx(styles.formControl)}
                                value={phone}
                                onChange={e => setPhone(e.target.value.trim())}
                                onBlur={e =>  setPhoneMsg(minLength(phone, 10))}
                                
                            />
                        </div>
                        <span className={clsx(styles.formMsg, styles.formMsgError)}>{phoneMsg}</span>
                    </div>

                    <div className="col l-2 m-3 c-12">
                        <button 
                        onClick={handleUpdate}
                        className={clsx(styles.btnUpdateAccount)} >C???p nh???t
                        <i className="fa-solid fa-comment-pen"></i>
                        </button>
                    </div>
                </div>

            </div>

              {/* Toast */}
            {
                showToast && <Toast desc="Th??ng tin c???p nh???t kh??ng h???p l???" />
            }
        </>
    )
}