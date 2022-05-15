import clsx from 'clsx'
import {useState} from 'react'

import { Link } from 'react-router-dom'

import styles from "../Guide.module.scss"

export default function Header(){
  const [toggleMenu, setToggleMenu] = useState(false)
  
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
                        <i className="fa-solid fa-bars"></i>
                        
                        {/* {showUserMenu &&  */}
                        {
                            toggleMenu && (
                                <ul className={clsx(styles.navUserChildren)}>
                                <li> <Link to="/guide/account" ><i className="fa-solid fa-user"></i>Thông tin cá nhân </Link></li>
                                <li> <Link to="/guide/selectedTours" ><i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour dẫn </Link></li>
                                <li> <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
                            </ul>
                             )
                        }
                    </div>
                </div>
            </nav>
        </div>
    </header>)
   
}