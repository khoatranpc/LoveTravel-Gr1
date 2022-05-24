import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'


import Header from '../Header/Header'
import styles from "../Manage.module.scss"
import Account from './Account'
import Authorize from './Authorize'

export default function Accounts(){
    const [showAddModal, setShowAddModal] = useState(false)
    const [listAccounts, setListAccounts] = useState([])
    const [listGuides, setListGuides] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [isListAccounts, setIsListAccounts] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(true)
    const [typeAccount, setTypeAccount] = useState('user')
    const [page, setPage] = useState(1)
    
    const showListAccounts = () => {
        setIsListAccounts(true)
        setIsAuthorized(false)
    }

    const showAuthorize = () => {
        setIsListAccounts(false)
        setIsAuthorized(true)
    }

    // Test
    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/account/get-all/guide`,
        {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then((res) => {
            setListGuides(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/get-data-user?page=2`,{
             headers: {
                    authorization: localStorage.getItem('token')
                }
        })
        .then(res => {
            setListAccounts(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    },[page])

    // Lọc guide
    useEffect(() => {
        // console.log("List guides: ", listGuides);
        // console.log("List account: ", listAccounts);

        const idGuides = listGuides.map(guide => guide._id)
        // console.log(idGuides);

        const guideInfo = listAccounts.filter(acc => {
            return idGuides.includes(acc.id_account)
        })
        // console.log("Guide info: ", guideInfo);
    },[listAccounts, listGuides])


    // List Author
    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/account/get-all/${typeAccount}`,
        {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then((res) => {
            setListRoles(res.data.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [typeAccount])

    return (
        <>
        <Header />
        <div className="grid wide">
            <div id={clsx(styles.wrapOtions)}>
                <button
                    onClick={showAuthorize}
                    className={clsx({
                        [styles.active]: isAuthorized
                    })}
                >Phân quyền
                </button>

                <button
                    onClick={showListAccounts}
                    className={clsx({
                        [styles.active]: isListAccounts
                    })}
                >
                    Danh sách tài khoản
                </button>
            </div>
            {/* Authorize */}
            {
                isAuthorized && (
                <div className={clsx(styles.container)}>
                    {/* Content */}
                    <>
                            <div className={clsx("brand-name",styles.heading)}>
                                <h1>Danh sách phân quyền</h1>
                            </div>
                            <select className={clsx(styles.optionAccount)} 
                                    onChange={e =>{
                                        setTypeAccount(e.target.options[e.target.selectedIndex].value)
                                    }}
                                    value={typeAccount}
                                >
                                    <option value="user">Khách hàng</option>
                                    <option value="guide">Người dẫn tour</option>
                                    <option value="admin">Admin</option>
                            </select>

                            <div>
                                <ul className={clsx(styles.tableInfo)}>
                                    <li className={clsx("row", styles.accountItem)}>
                                        <div className="col l-1 m-1 c-0 text-center"><span>STT</span></div>
                                        <div className="col l-9 m-9 c-9 text-center">
                                            <div className={clsx(styles.wrapInfoAccount)}>
                                                <div className="l-6 m-6 c-6"><span >User name</span></div>
                                                <div className="l-6 m-6 c-6"><span >Role</span></div>
                                            </div>
                                        </div>
                                        <div className="col l-2 m-2 c-2 text-center">
                                            <span>Phân quyền</span>
                                        </div>
                                    </li>
                                    {
                                    listRoles.map((account, i) =>{
                                        return <Authorize key={i} data={account} index={i} />
                                    })
                                    }
                                </ul>
                            </div>
                    </>
                </div>
                )
            }

            {/* Accounts */}
            {
                isListAccounts && <Account />
            }
           
        </div>
        </>
    )
}