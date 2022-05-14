import clsx from 'clsx'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from "../Manage.module.scss"

export default function Header(){
  
    return ( <header>
        <div className="grid wide">
            <nav className="row" >
                <ul className="row col l-10">
                    <li><Link to="/manage/tours" href="#">Tours</Link></li>
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