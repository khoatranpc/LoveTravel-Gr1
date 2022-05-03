import {useState} from "react";
import { Link } from "react-router-dom";


import styles from "./Header.module.scss";
import clsx from 'clsx'
import logo from './logo.png'

 {/* <Link to={"/"}>Home</Link>
        <Link to={"/"}>Account</Link>
        <Link to={"/"}>Setting</Link>
        <a href="/auth/login">Login</a>
        <a href="/auth/register">Register</a> */}

const IS_ONLINE = true;        
export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const toggleMenuUser = () => {
      setShowUserMenu(!showUserMenu)
  }

  return (
    <header>
      <div className={clsx("grid wide", styles.header)}>
      <nav className="row">
        <img id={clsx(styles.logo)} className="col l-1" src={logo} />
        <ul className="row col l-5">
            <li ><a className={clsx(styles.navItem)} href="">Trang chủ</a></li>
            <li ><a className={clsx(styles.navItem)} href="">Thể loại</a></li>
            <li ><a className={clsx(styles.navItem)} href="">Thông tin liên hệ</a></li>
        </ul>

        <div className="col l-3">
            <div className={clsx(styles.navSearch)}>
                <input id="nav-search" type="text" placeholder="Tìm kiếm"  />
                <label htmlFor="nav-search" className={clsx(styles.searchIcon)}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </label>
            </div>
        </div>

        <ul className={clsx("row col l-3" ,styles.navRight)}>
              {/* <li ><a className={clsx(styles.navItem)} href="">Đăng ký</a></li>
              <li ><a className={clsx(styles.navItem)} href="">Đăng nhập</a></li> */}
              {IS_ONLINE && (
                <> 
                  <div className={clsx(styles.navUser)} onClick={toggleMenuUser}>
                    <i className="fa-solid fa-bars"></i>
                    {showUserMenu && 
                       <ul className={clsx(styles.navUserChildren)}>
                       <li><i className="fa-solid fa-user"></i>Thông tin cá nhân</li>
                       <li><i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour</li>
                       <li><i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
                     </ul>
                    }
                  </div>
                </>
              )}
        </ul>
      </nav>
    </div>
    </header>
  );
}
