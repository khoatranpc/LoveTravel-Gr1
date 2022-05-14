import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import logo from './logo.png'
import Tour from './Tour'
import styles from "./LisTour.module.scss"

const apiTours = "http://localhost:8000/api/tour/get-all-tour"
export default function ListTour(){
    const [scrollTop, setScrollTop] = useState(false)
    const [listTours, setListTours] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [typeSearch, setTypeSearch] = useState('category')
    const [page, setPage] = useState(1)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const scrollRef = useRef()

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

    const handleIncreasePage = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        setPage(prev => {
            if(prev >= listTours.length - 2 ){
                return prev
            }
            return prev + 1
        })
    }

    const handleDecreasePage = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        setPage(prev => {
            if(prev <= 1 ){
              return prev
            }
            return prev - 1
        })
    }

    useEffect(() => {
        // Call api
        const getTours = (page) => {
            axios.get(apiTours, {
                params: { page: page },
            })
            .then((res) => {
                setListTours(res.data.data)
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
          };
          getTours(page);

    }, [page])

    return <>
            <header>
                <div className={clsx("grid wide", styles.header)}>
                    <nav className="row" >
                        <Link to="/home" id={clsx(styles.logo)}className="col l-1"  >
                        <img src={logo} />
                        </Link>

                        <div className={clsx("row col l-2" ,styles.navRight)}>
                        {/* <div><Link to="/auth/login" className={clsx(styles.item)} >Đăng nhập</Link></div> */}
                        {(
                            <> 
                            <div className={clsx(styles.navUser)} onClick={toggleMenuUser}>
                                <i className="fa-solid fa-bars"></i>
                                {showUserMenu && 
                                <ul className={clsx(styles.navUserChildren)}>
                                <li><i className="fa-solid fa-user"></i>Thông tin cá nhân</li>
                                <li><i className="fa-solid fa-person-walking-luggage"></i>Danh sách tour</li>
                                <li ><i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</li>
                                </ul>
                                }
                            </div>
                            </>
                         )}
                        </div>
                    </nav>
                </div>
            </header>
            

            {/* List tours */}
            <div className={clsx("grid wide row", styles.container)} >
                <div className="col l-3 m-12 c-12">
                    <div className={clsx(styles.headingSearch)}>
                        <span>Tìm kiếm theo: </span>
                        <select name="typeSearch" id="typeSearch" onChange={(e) => setTypeSearch(e.target.options[e.target.selectedIndex].value)}>
                            <option value="place" >Địa điểm</option>
                            <option value="category">Thể loại</option>
                            <option value="nameTour">Tên tour</option>
                        </select>
                    </div>
                    <input type="search" placeholder="Tìm kiếm"
                        value = {valueSearch}
                        onChange={e => {
                            console.log("Tìm theo: ", typeSearch);
                            setValueSearch(e.target.value)
                        } }
                    />
                </div>

                <div ref={scrollRef} className={clsx("col l-9 m-12 c-12",styles.listTour)}>
                {
                    listTours.map((tour) => {
                        return (
                            <Tour key={tour._id} data={tour} />
                        )
                    })
                }
                    <nav className={clsx(styles.wrapPagination)}>
                        <ul className={clsx(styles.pagination)}>
                            <li className="page-item">
                                <button onClick={handleDecreasePage}
                                className={clsx(styles.pageLink)}>
                                    <i className="fa-solid fa-circle-chevron-left"></i>
                                </button>
                            </li>

                            <li className="page-item">
                                <span>{page}</span>
                            </li>

                            <li className="page-item">
                                <button onClick={handleIncreasePage}
                                className={clsx(styles.pageLink)}>
                                    <i className="fa-solid fa-circle-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Scroll button */}
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
    </>
}