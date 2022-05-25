import clsx from 'clsx'
import {useState, useEffect} from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import styles from "../Guide.module.scss"

export default function Header(){
  const [toggleMenu, setToggleMenu] = useState(false)
  const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/home')
    }

    return ( <header>
        <div className="grid wide">
            <nav className="row" >
                <ul className="row col l-10">
                   <li><Link to="/listTour">Tìm kiếm tour</Link></li>
                </ul>
                <div className={clsx("row col l-2" ,styles.navRight)}>
                    <div
                        onClick={() => setToggleMenu(!toggleMenu)}
                        className={clsx(styles.navUser)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"fill="currentColor" className={clsx("bi bi-list", styles.svgOption)} viewBox="0 0 16 16">
                            <path  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        
                        {/* {showUserMenu &&  */}
                        {
                            toggleMenu && (
                                <ul className={clsx(styles.navUserChildren)}>
                                <li  > <Link to="/guide/account" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={clsx("bi bi-person", styles.svgOption)} viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                    Thông tin cá nhân
                                </Link>
                                </li>
                                <li> <Link to="/guide/selectedTours" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={clsx("bi bi-box2-heart-fill", styles.svgOption)} viewBox="0 0 16 16">
                                <   path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                                    Danh sách tour dẫn </Link>
                                    </li>
                                <li onClick={handleLogout}> 
                                    <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={clsx("bi bi-box-arrow-right", styles.svgOption)}   viewBox="0 0 16 16">
                                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                    </a>
                                Đăng xuất</li>

                            </ul>
                             )
                        }
                    </div>
                </div>
            </nav>
        </div>
    </header>)
   
}