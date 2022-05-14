import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx'
import axios from 'axios'

import Loading from '../Loading'
import styles from "./Header.module.scss";
import logo from './logo.png'

//  {/* <Link to={"/"}>Home</Link>
//         <Link to={"/"}>Account</Link>
//         <Link to={"/"}>Setting</Link>
//         <a href="/auth/login">Login</a>
//         <a href="/auth/register">Register</a> */}


export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [showBoxSearch, setShowBoxSearch] = useState(false)
  const [searchTours, setSearchTours] = useState([])
  const [nameTour, setNameTour] = useState('')

  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsOnline(true)
    }

  }, [])

  useEffect(() => {
    const api = `http://localhost:8000/api/tour/search?place=${nameTour}`

    const getTours = () => {
      axios.get(api)
      .then((res) => {
          console.log(res.data);
          setSearchTours(res.data)
          return res;
      })
      .catch((err) => {
          console.log(err);
      });
    };
    getTours()
    console.log("Tours: ", searchTours);
  },[nameTour])


  const toggleMenuUser = () => {
      setShowUserMenu(!showUserMenu)
  }

  useEffect(() => {
     const handleScroll = () => {
         setScrollTop(window.scrollY >= 200)
     }
     window.addEventListener('scroll', handleScroll)

     return () => {
        window.removeEventListener('scroll', handleScroll)
     }

  }, [])
  
  return (
    <header>
      <div className={clsx("grid wide", styles.header)}>
          <nav className="row" >
            <Link to="/home" id={clsx(styles.logo)}className="col l-1"  >
              <img src={logo} />
            </Link>

            <ul className="row col l-5" style={{justifyContent: "center"}}>
                <li className={clsx(styles.navItem)} ><Link to="/listTour"  className={clsx(styles.item)} >Tours</Link></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#suggest">Gợi ý</a></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#contact">Liên hệ</a></li>
            </ul>

            {/* Search */}
            <div className="col l-4 ">
                <div className={clsx(styles.navSearch)}>
                    <input
                      value ={nameTour}
                      onChange={e => setNameTour(e.target.value)}
                      onClick={() => setShowBoxSearch(!showBoxSearch)}
                      id={clsx(styles.navSearchInput)} type="text" placeholder="Tìm kiếm"  />
                    <label htmlFor="nav-search" className={clsx(styles.searchIcon)}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </label>

                   {
                      showBoxSearch && (
                        <div className={clsx(styles.searchTours)}>
                          {searchTours.data &&  searchTours.data.map((tour, i) => {
                            return (
                                <a key={i} href="#">
                                    <div className="wrapImg l-3">
                                      <img src={tour.image} alt="" />
                                    </div>
                                    <div className="l-9">
                                      <h4>{tour.tourName}</h4>
                                      <p>Giá: {tour.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                    </div>
                                </a>
                            )
                          })}
                        </div>
                      )
                   }
                </div>
            </div>

            <div className={clsx("row col l-2" ,styles.navRight)}>
              {
                  isOnline ? (
                    <> 
                      <div className={clsx(styles.navUser)} onClick={toggleMenuUser}>
                        <i className="fa-solid fa-bars"></i>
                        {showUserMenu && 
                          <ul className={clsx(styles.navUserChildren)}>
                          <li><i className="fa-solid fa-user"></i>Thông tin cá nhân</li>
                          <li><i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour</li>
                          <li onClick={() => {
                            localStorage.removeItem('token')
                            setIsOnline(false)
                          }}><i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
                        </ul>
                        }
                      </div>
                    </>
                  )
                  : (<div><Link to="/auth/login" className={clsx(styles.item)} >Đăng nhập</Link></div>)
              }
                  {/* <div><Link to="/auth/login" className={clsx(styles.item)} >Đăng nhập</Link></div> */}
                  {/* {isOnline && (
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
                  )} */}
            </div>
          </nav>
      </div>

    {/* Scroll on Top  */}
     <div>
        {
        scrollTop && (
          (<div className={clsx(styles.scrollOnTop)}>
            <a href="#">
              <div>
                <i className="fa-solid fa-circle-arrow-up"></i>
              </div>
            </a>
          </div>
          )
        )
      }
     </div>

      {/* Loading */}
      {/* {isLoading &&  <div className={clsx(styles.modal)}>
          <div>
              <Loading /> 
          </div>
          <h2 className="text-center">Vui lòng đợi ...</h2>
      </div>} */}
    </header>
  );
}
