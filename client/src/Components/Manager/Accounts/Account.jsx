import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'


import styles from "../Manage.module.scss"
import Toast from '../../Toast'
export default function Account({data, index}){
    const [page, setPage] = useState(1)
    const [listAccounts, setListAccounts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [msgToast, setMsgToast] = useState("Thông tin cập nhật không hợp lệ")
    
    const [id, setId] = useState('')
    const [name, setName] =useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [identify, setIdentify] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [typeAccount, setTypeAccount] = useState('user');

    //  Phân trang
    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/get-data-user?page=${page}&role=${typeAccount}`,{
             headers: {
                    authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            setListAccounts(res.data.data)
            console.log(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[page, typeAccount])


    const handleIncreasePage = () => {
        setPage(prev => {
            if(prev >= listAccounts.length - 1 ){
                return prev
            }
            return prev + 1
        })
    }

    const handleDecreasePage = () => {
        setPage(prev => {
            if(prev <= 1 ){
              return prev
            }
            return prev - 1
        })
    }

    const handleShowDetail = (acc) => {
        console.log("ID: ", acc._id);
        setShowModal(true)
        setId(acc._id)
        setName(acc.name)
        setGender(acc.gender)
        setBirth(acc.birth.slice(0, 10))
        setAddress(acc.address)
        setIdentify(acc.indentify)
        setEmail(acc.email)
        setPhone(acc.phone)
    }

    const handleUpdateAccount = (id) => {
        const birthday = new Date(birth)
        const now = new Date()
        if(birthday > now){
            setShowToast(true)
            setTimeout(() =>
                setShowToast(false)
            , 2000)
        }else{
            axios.post(`http://localhost:8000/api/admin/admin-controller/get-data-user/detail-current-user/${id}`,
            {
                "updateInfor": {
                    "name": name,
                    "birth": birth,
                    "gender": gender,
                    "address": address,
                    "identify": identify,
                    "email": email,
                    "phone": phone,
                }
            },
            {
                headers: {authorization: localStorage.getItem('token')}
            }
            )
            .then(res =>{
                window.location.reload(true)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>
        <div >
            <div className={clsx("text-center brand-name",styles.heading)}>
                <h1>Danh sách tài khoản</h1>
            </div>
            <select className={clsx(styles.optionAccount)} 
                onChange={e =>{
                    setTypeAccount(e.target.options[e.target.selectedIndex].value)
                }}
                value={typeAccount}
            >
                <option value="user">Khách hàng</option>
                <option value="guide">Người dẫn tour</option>
            </select>
        </div>

        <div>
            <ul className={clsx(styles.tableInfo)}>
                <li className={clsx("row", styles.accountItem)}>
                    <div className="l-1 m-1 c-0 text-center"><span>STT</span></div>
                    <div className="l-10 m-10 c-0 text-center">
                        <div className={clsx(styles.wrapInfoAccount)}>
                            <div className="l-1 m-1 c-1"><span>Họ tên</span></div>
                            <div className="l-1 m-1 c-1"><span>Giới tính</span></div>
                            <div className="l-2 m-2 c-2"><span>Ngày sinh</span></div>
                            <div className="l-4 m-4 c-4"><span>Email</span></div>
                            <div className="l-2 m-2 c-2"><span>Địa chỉ</span></div>
                            <div className="l-2 m-2 c-2"><span>SĐT</span></div>
                        </div>
                    </div>
                    <div className="l-1 m-1 c-0 text-center">
                        <span>Chi tiết</span>
                    </div>
                </li>
               
               {
                   listAccounts.map((account, i) => {
                       return (
                        <li key={i} className={clsx("row", styles.accountItem)}>
                            <div className="l-1 m-1 c-0 text-center"><span>{i + 1}</span></div>
                            <div className="l-10 m-10 c-12 text-center">
                                <div className={clsx(styles.wrapInfoAccount)}>
                                    {console.log(account.id_user)}
                                    <div className="l-1 m-1 c-12"><span>{account.id_user.name}</span></div>
                                    <div className="l-1 m-1 c-0"><span>{account.id_user.gender == 'male' || account.id_user.gender === 'Male' ? 'Nam' : 'Nữ'}</span></div>
                                    <div className="l-2 m-2 c-0"><span>{account.id_user.birth.slice(0, 10)}</span></div>
                                    <div className="l-4 m-4 c-0"><span>{account.id_user.email}</span></div>
                                    <div className="l-2 m-2 c-0"><span>{account.id_user.address}</span></div>
                                    <div className="l-2 m-2 c-0"><span>{account.id_user.phone}</span></div>
                                </div>
                            </div>
                            <div className="l-1 m-1 c-12 text-center">
                                <button className={clsx(styles.btnDetailAccount)}
                                    onClick={() => {handleShowDetail(account.id_user)}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" className="bi bi-ticket-detailed" viewBox="0 0 16 16">
                                        <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z"/>
                                        <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5ZM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5h-13Z"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                       )
                   })
               }
            </ul>
        </div>

        {/* Modal Detail */}
        {
            showModal && (
                <div className={clsx(styles.containerModal)}>
                    <div className={clsx(styles.modalAddTour)}>
                        {/* Close button */}
                        <div className={clsx(styles.closeBtn)}>
                            <button onClick={() => setShowModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                            </button>
                        </div>
    
                        {/* Content */}
                        <div>
                            <div className={clsx(styles.wrapTourInfo)}>
                                    {/* Họ tên */}
                                    <div className={clsx(styles.formGroup)}>
                                        <label htmlFor="name" className={clsx(styles.formLabel)}>Họ tên:</label>
                                        <input
                                            type="text" id="name"
                                            className={clsx(styles.formControl)}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>

                                    {/* BirthDate */}
                                    <div className={clsx(styles.formGroup)}>
                                    <label htmlFor="birthDate" className={clsx(styles.formLabel)}>Ngày sinh:
                                    </label>
                                    <input id="birthDate" type="date" name="registerBirthDate"
                                        className={clsx(styles.formControl)}
                                        value={birth}
                                        onChange={e => setBirth(e.target.value.trim())}
                                        
                                    />
                                    </div>

                                {/* Gender */}
                                <div className={clsx("row", styles.formGroup)}>
                                    <label className={clsx("col c-4", styles.formLabel)}>Giới tính:</label>
                                    <div className={clsx("col c-4", styles.rowRadio)}>
                                        <label className={clsx(styles.formLabel)} htmlFor="gender__male">Nam</label>
                                        <input id="gender__male" type="radio"
                                        checked={gender === 'male' || gender === 'Male'}
                                        onChange={e => setGender('male')}
                                        />
                                    </div>
                                    <div className={clsx("col c-4", styles.rowRadio)}>
                                        <label className={clsx(styles.formLabel)} htmlFor="gender__female">Nữ</label>
                                        <input id="gender__female" type="radio"
                                        checked={gender === 'female' || gender === 'Female'}
                                        onChange={e => setGender('female')}
                                        />
                                    </div>
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
                                    <input id="Phone" type="number" 
                                        className={clsx(styles.formControl)}
                                        value={phone}
                                        onChange={e => setPhone(e.target.value.trim())}
                                    />
                                </div>
                                    
                            </div>
                        </div>


                            <div className={clsx(styles.wrapBtn)}>
                                <button 
                                    className={clsx(styles.btnAddTour)}
                                    onClick={() => handleUpdateAccount(id)}
                                    >
                                    Cập nhật
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                </div>

            )
        }

        {/* Pagination */}
        <nav className={clsx(styles.wrapPagination)}>
                <ul className={clsx(styles.pagination)}>
                    <li className="page-item">
                        <button onClick={handleDecreasePage}
                        className={clsx(styles.pageLink)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>    
                        </button>
                    </li>

                    <li className="page-item">
                        <span>{page}</span>
                    </li>

                    <li className="page-item">
                        <button onClick={handleIncreasePage}
                        className={clsx(styles.pageLink)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="$primaryColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </button>
                    </li>
                </ul>
        </nav>

        {/* Toast */}
        {
            showToast && <Toast desc={msgToast} />
        }
    </>
    )
}