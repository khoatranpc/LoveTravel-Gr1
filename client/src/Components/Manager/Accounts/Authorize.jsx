import clsx from 'clsx'
import {useState, useEffect} from 'react'
import axios from 'axios'

import styles from "../Manage.module.scss"
import Toast from '../../Toast'

export default function Authorize({data, index}){
    const [showToast, setShowToast] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [showModalAuthorize, setShowModalAuthorize] = useState(false)
    const [valueAuthorize, setValueAuthorize] = useState('')

   

    const handleCloseModalDetail = () => {
        setShowModalDetail(false)
    }

    const handleShowModalDetail = () => {
        console.log(data._id);
        setShowModalDetail(true)
        axios.get(`http://localhost:8000/api/admin/admin-controller/get-data-user/detail-current-user/${data._id}`, 
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            console.log("Success");
        })
        .catch(err => {
            console.log(err);
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        })
    }

    const handleCloseModalAuthorize = () => {
        setShowModalAuthorize(false)
    }

    const handleShowModalAuthorize = () => {
        console.log(data._id);
        setShowModalAuthorize(true)
    }

    // Handle Authorize
    const handleAuthorized = () => {
        console.log(data._id)
        const apiAdd = "http://localhost:8000/api/admin/admin-controller/account/update-role"
        axios.put(apiAdd, 
            {
                "id_account": data._id, 
                "role_update": valueAuthorize
            },{
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            window.location.reload(true)
        })
        .catch(err => {
            console.log(err);
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        })
    }

    return (
       <>
       {
           showToast && <Toast />
       }
       
       <li className={clsx("row", styles.accountItem)}>
            <div className="col l-1 m-1 c-0 text-center">
                {index + 1}
            </div>
            <div className="col l-9 m-9 c-8 text-center">
                <div className={clsx(styles.wrapInfoAccount)}>
                    <div className="l-6 m-6 c-6">{data.username}</div>
                    <div className="l-6 m-6 c-6">{data.role}</div>
                </div>
            </div>
            <div className={clsx("col l-2 m-2 c-2 text-center", styles.wrapButtons)}>
                <button onClick={handleShowModalAuthorize}>Chọn</button>
            </div>

            {/* Modal authorization --> Done */}
            {
                showModalAuthorize && (
                <div className={clsx(styles.containerModal)}>
                    <div className={clsx(styles.modalAddTour)}>
                        {/* Close button */}
                        <div className={clsx(styles.closeBtn)}>
                            <button onClick={handleCloseModalAuthorize}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                            </button>
                        </div>
    
                        {/* Content */}
                        <div>
                            <h1 className={clsx("text-center brand-name",styles.headingModal)}>Lựa chọn phân quyền</h1>
                            <div>
                                <input type="radio" name="typeAuthorize" value="admin"
                                    checked={valueAuthorize == 'admin'}
                                    onChange={e => setValueAuthorize(e.target.value)}
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div>
                                <input type="radio" name="typeAuthorize" value="guide"
                                    checked={valueAuthorize == 'guide'}
                                    onChange={e => setValueAuthorize(e.target.value)}
                                />
                                <label htmlFor="guide">Người dẫn tour</label>
                            </div>
                            <div>
                                <input type="radio" name="typeAuthorize" value="user"
                                    checked={valueAuthorize == 'user'}
                                    onChange={e => setValueAuthorize(e.target.value)}
                                />
                                <label htmlFor="user">Khách hàng</label>
                            </div>

                            <div className={clsx(styles.wrapBtn)}>
                                <button 
                                    onClick={handleAuthorized}   
                                >Xác nhận
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                )
            }
        </li>

       </>
    )
   
}