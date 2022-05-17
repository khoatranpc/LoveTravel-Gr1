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
    const [typeSearch, setTypeSearch] = useState('name')
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

    // Phân trang
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


    useEffect(() => {
        axios.get(`http://localhost:8000/api/tour/search?${typeSearch}=${valueSearch}`)
        .then((res) => {
            setListTours(res.data.data)
            console.log("Tours: ", listTours);
            return res;
        })
        .catch((err) => {
            console.log(err);
        });


    },[valueSearch, typeSearch])


    // const handleSearch = () => {
    //     axios.get(`http://localhost:8000/api/tour/search?${typeSearch}=${valueSearch}`)
    //     .then((res) => {
    //         setListTours(res.data.data)
    //         console.log("Tours: ", listTours);
    //         console.log("Res: ", res.data.data);
    //         return res;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }


    return <>
            <header>
                <div className={clsx("grid wide", styles.header)}>
                    <nav className="row" >
                        <Link to="/home" id={clsx(styles.logo)}className="col l-1"  >
                        <img src={logo} />
                        </Link>

                        <div className={clsx("row col l-2" ,styles.navRight)}>
                        {/* <div><Link to="/auth/login" className={clsx(styles.item)} >Đăng nhập</Link></div> */}
                        {/* {(
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
                         )} */}
                        </div>
                    </nav>
                </div>
            </header>

            {/* List tours */}
            <div className={clsx("grid wide row", styles.container)} >
                <div className="col l-3 m-12 c-12">
                    <div className={clsx(styles.headingSearch)}>
                        <span>Tìm kiếm theo: </span>
                        <select 
                            name="typeSearch" id="typeSearch"
                         
                            onChange={(e) => {
                                setTypeSearch(e.target.options[e.target.selectedIndex].value)
                            }}
                        >

                            <option value="name">Tên tour</option>
                            <option value="place" >Địa điểm</option>
                            {/* <option value="type">Thể loại</option> */}
                        </select>
                    </div>
                    {/* Search */}
                    {/* name,place,type */}
                    <input type="search" placeholder="Tìm kiếm"
                        value = {valueSearch}
                        onChange={e => {
                            console.log("Tìm kiếm theo:", typeSearch);
                            console.log("Giá trị tìm kiếm:", valueSearch);
                            setValueSearch(e.target.value)
                            // handleSearch()
                        } }
                    />
                </div>

                <div ref={scrollRef} className={clsx("col l-9 m-12 c-12",styles.listTour)}>
                {
                  Array.isArray(listTours) ?  listTours.map((tour) => {
                        return (
                            <Tour key={tour._id} data={tour} />
                        )
                    })
                  : []
                }

                      <nav className={clsx(styles.wrapPagination)}>
                <ul className={clsx(styles.pagination)}>
                    <li className="page-item">
                        <button onClick={handleDecreasePage}
                        className={clsx(styles.pageLink)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>    
                        </button>
                    </li>

                    <li className="page-item">
                        <span>{page}</span>
                    </li>

                    <li className="page-item">
                        <button onClick={handleIncreasePage}
                        className={clsx(styles.pageLink)}>
                            <svg xmlns="http://www.w3.org/2000/svg"   className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
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