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
      <nav className="row" >
        <a id={clsx(styles.logo)}  className="col l-1"  href="#">
          <img src={logo} />
        </a>

        <ul className="row col l-5" style={{justifyContent: "center"}}>
            <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#category">Thể loại</a></li>
            <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#suggest">Gợi ý</a></li>
            <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#contact">Liên hệ</a></li>
        </ul>

        {/* Search */}
        <div className="col l-4">
            <div className={clsx(styles.navSearch)}>
                <input id={clsx(styles.navSearchInput)} type="text" placeholder="Tìm kiếm"  />
                <label htmlFor="nav-search" className={clsx(styles.searchIcon)}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </label>

                <div className={clsx(styles.searchTours)}>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                   <a href="#">
                      <h4>Tên tour</h4>
                      <span>Giá: 500$</span>
                   </a>
                </div>
            </div>
        </div>

        <div className={clsx("row col l-2" ,styles.navRight)}>
              {/* <div><a className={clsx(styles.item)} href="">Đăng nhập</a></div> */}
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
        </div>
      </nav>
    </div>
    </header>
  );
}
