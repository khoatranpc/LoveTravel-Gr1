import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from 'clsx'
import axios from 'axios'
import Loading from '../Loading'
import styles from "./Header.module.scss";
import logo from './logo.png'


export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [showBoxSearch, setShowBoxSearch] = useState(false)
  const [searchTours, setSearchTours] = useState([])
  const [nameTour, setNameTour] = useState('')

  const navigate = useNavigate()

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
        setSearchTours(res.data)
        console.log(res.data);
          return res;
      })
      .catch((err) => {
          console.log(err);
      });
    };
    getTours()
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
            <Link to="/home" id={clsx(styles.logo)}className="col l-1 m-1 c-1"  >
                <img src={logo} />
            </Link>

            <ul className="row col l-9 m-9 c-10" style={{justifyContent: "center"}}>
                <li className={clsx(styles.navItem)} ><Link to="/listTour"  className={clsx(styles.item)} >Tours</Link></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#suggest">Gợi ý</a></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#contact">Liên hệ</a></li>
            </ul>
                  
            <div className={clsx("row col l-2 m-2 c-1" ,styles.navRight)}>
              {
                  isOnline ? (
                    <> 
                      <div className={clsx(styles.navUser)} onClick={toggleMenuUser}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        {showUserMenu && 
                          <ul className={clsx(styles.navUserChildren)}>
                          <li>
                              <Link to="/user/account">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange"  className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                              </svg>
                                Tài khoản
                              </Link>
                          </li>
                          <li>
                              <Link to="/user/bookedTours">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="hotpink" className="bi bi-box2-heart-fill" viewBox="0 0 16 16">
                                  <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                                Danh sách tour
                              </Link>
                          </li>
                          <li>
                              <Link to="/user/banking">
                              <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="cyan" className="bi bi-bank" viewBox="0 0 16 16">
                                <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
                              </svg>
                                Ngân hàng
                              </Link>
                          </li>

                          <li
                            onClick={() => {
                              navigate('/home')
                              localStorage.removeItem('token')
                              setIsOnline(false)
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                              <path  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                              <path  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            Đăng xuất
                          </li>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="orange" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                <path  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
              </svg>
              </div>
            </a>
          </div>
          )
        )
      }
     </div>

    
    </header>
  );
}
