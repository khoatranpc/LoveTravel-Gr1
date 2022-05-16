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
            <Link to="/home" id={clsx(styles.logo)}className="col l-1"  >
              <img src={logo} />
            </Link>

            <ul className="row col l-9" style={{justifyContent: "center"}}>
                <li className={clsx(styles.navItem)} ><Link to="/listTour"  className={clsx(styles.item)} >Tours</Link></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#suggest">Gợi ý</a></li>
                <li className={clsx(styles.navItem)} ><a className={clsx(styles.item)} href="#contact">Liên hệ</a></li>
            </ul>

            {/* Search */}
            {/* <div className="col l-4 ">
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
                                <Link to="/listTour" key={i} >
                                    <div className="wrapImg l-3">
                                      <img src={tour.image} alt="" />
                                    </div>
                                    <div className="l-9">
                                      <h4>{tour.tourName}</h4>
                                      <p>Giá: {tour.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                    </div>
                                </Link>
                            )
                          })}
                        </div>
                      )
                   }
                </div>
            </div> */}

            <div className={clsx("row col l-2" ,styles.navRight)}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            Thông tin cá nhân
                            </Link>
                            
                            </li>
                          <li>
                            <i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour
                            
                            </li>
                          <li onClick={() => {
                            navigate('/home')
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
