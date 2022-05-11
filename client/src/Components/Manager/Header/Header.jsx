import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Manage.module.scss"

export default function Header(){
  
    return ( <header>
        <div className="grid wide">
            <nav className="row" >
                <ul className="row col l-10">
                    <li><a href="#">Tours</a></li>
                    <li><a href="#"> Tài khoản</a></li>
                    <li><a href="#"> Doanh thu</a></li>
                </ul>
                <div className={clsx("row col l-2" ,styles.navRight)}>
                    <button>Đăng xuất</button>
                </div>
            </nav>
        </div>
    </header>)
   
}