
import clsx from 'clsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

import Header from '../../Header/Header'
import styles from '../User.module.scss'
import avatar from './avatar.jpg'
export default function Account(){
    const [name, setName] =useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('');
    const [identify, setIdentify] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    

    useEffect(() => {
        // const decode = parseJwt((res.data.token))
        // console.log(decode);
        const api = `http://localhost:8000/api/user/current-user`
        axios.get(api,
            {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            //     address: "Hà Nội"
    // birth: "2001-11-11T00:00:00.000Z"
    // email: "ductaidao24102001@gmail.com"
    // gender: "male"
    // id_account: "6281062bbb3581bb82fd8b9e"
    // indentify: 12121212122121212
    // name: "Dinh Dat"
    // phone: ""
    //   
            setName(res.data.data.name)
            setBirth(res.data.data.birth)
            setGender(res.data.data.gender)
            setAddress(res.data.data.address)
            setIdentify(res.data.data.indentify)
            setEmail(res.data.data.email)
            setPhone(res.data.data.phone)

            console.log(res.data.data);
            
        })
        .catch(err => console.error(err))
    },[])

    const handleUpdate = () => {
        const apiUpdate = `http://localhost:8000/api/user/current-user/update`

        axios.put(apiUpdate,
            {
                "name": name,
                "birth": birth,
                "gender": gender,
                "address": address,
                "identify": identify,
                "email": email,
                "phone": phone,
            },
            {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            console.log("Update thanh cong:", res);
        })
        .catch(err => console.error(err))
    }

    return (
        <>
        <Header />
         <div className="grid wide">
            <div className="row container">
                <div className="col l-2">
                    <img className={clsx(styles.avatar)} src={avatar} alt="avatar" />
                </div>

                <div className={clsx("col l-8", styles.formContainer)}>
                    {/* Account */}
                    <div className={clsx(styles.formGroup)}>
                    {/* <label htmlFor="account" className={clsx(styles.formLabel)}>Tên đăng nhập:</label> */}
                    <p>Họ tên: {name}</p>
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
                    <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ngày sinh:
                        {birth}
                    </label>
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
                        <input id="identify" type="number" name="registerIdentify" placeholder="Nhập CCCD"
                            className={clsx(styles.formControl)}
                            value={identify}
                            onChange={e => setIdentify(e.target.value.trim())}
                        />
                    </div>

                    {/* Email */}
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="email" className={clsx(styles.formLabel)}>Email:</label>
                        <input id="email" type="email" name="registerEmail" placeholder="VD: daotai123@gmail.com"
                            className={clsx(styles.formControl)}
                            value={email}
                            onChange={e => setEmail(e.target.value.trim())}
                        />
                    </div>

                    {/* Phone */}
                    <div className={clsx(styles.formGroup)}>
                        <label htmlFor="Phone" className={clsx(styles.formLabel)}>Số điện thoại:</label>
                        <input id="Phone" type="text" 
                            className={clsx(styles.formControl)}
                            value={phone}
                            onChange={e => setPhone(e.target.value.trim())}
                        />
                    </div>
                </div>

                <div className="col l-2">
                    <button 
                    onClick={handleUpdate}
                    className={clsx(styles.btnUpdateAccount)} >Cập nhật
                    <i className="fa-solid fa-comment-pen"></i>
                    </button>
                </div>
            </div>

        </div>
        </>
    )
}