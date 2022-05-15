import clsx from 'clsx'
import { useState } from 'react';


import Header from '../Header'

import styles from '../Guide.module.scss';
import avatar from './avatar.jpg'

export default function Account(){
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('');
    const [identify, setIdentify] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
                        <label htmlFor="account" className={clsx(styles.formLabel)}>Tên đăng nhập:</label>
                        <p>Tên người dẫn tour</p>
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
                        <button className={clsx(styles.btnUpdateAccount)} >Cập nhật
                        <i className="fa-solid fa-comment-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}