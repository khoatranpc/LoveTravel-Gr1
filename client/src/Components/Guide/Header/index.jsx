import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Guide.module.scss"

export default function Header(){
  
    return ( <header>
        <div className="grid wide">
            <nav className="row" >
                <ul className="row col l-10">
                   
                </ul>
                <div className={clsx("row col l-2" ,styles.navRight)}>
                    <div className={clsx(styles.navUser)} >
                        <i className="fa-solid fa-bars"></i>
                        {/* {showUserMenu &&  */}
                        <ul className={clsx(styles.navUserChildren)}>
                        <li><i className="fa-solid fa-user"></i>Thông tin cá nhân</li>
                        <li><i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour dẫn</li>
                        <li ><i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
                        </ul>
                                    
                    </div>
                </div>
            </nav>
        </div>
    </header>)
   
}