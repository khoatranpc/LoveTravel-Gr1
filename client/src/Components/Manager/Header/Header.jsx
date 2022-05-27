import clsx from 'clsx'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


import styles from "../Manage.module.scss"



export default function Header(){
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth/login')
    }

    return ( <header>
        <div className="grid wide">
            <nav className="row" >
                <ul className="row col l-10 m-10 c-9">
                    <li><Link to="/manage/tours">Tours</Link></li>
                    <li><Link to="/manage/accounts" >Tài khoản</Link></li>
                    <li><Link to="/manage/income"> Doanh thu</Link></li>
                </ul>
                <div className={clsx("row col l-2 m-2 c-3" ,styles.navRight)}>
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>
            </nav>
        </div>
    </header>)
   
}