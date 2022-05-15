import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'


import Header from '../Header/Header'
import styles from "../Manage.module.scss"
export default function Accounts(){
    const [showAddModal, setShowAddModal] = useState(false)
    const scrollRef = useRef()
    const [page, setPage] = useState(1)
    const handleIncreasePage = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        // setPage(prev => {
        //     if(prev >= listTours.length - 2 ){
        //         return prev
        //     }
        //     return prev + 1
        // })
    }

    const handleDecreasePage = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        // setPage(prev => {
        //     if(prev <= 1 ){
        //       return prev
        //     }
        //     return prev - 1
        // })
    }
    return (
        <>
            <Header />

            <div className="grid wide">
            <div className={clsx(styles.wrapSearch)}>
            <input type="search" placeholder="Tìm kiếm"
             className={clsx(styles.inputSearch)}
             />
        </div>

        <div className={clsx(styles.container)}>
            <div className={clsx(styles.heading)}>
                <h1>Danh sách người dùng</h1>
               
            </div>
            {/* Content */}
           <div>
                <ul ref={scrollRef}>
                    <li className={clsx("row", styles.tourItem)}>
                        <div className="col l-1">STT</div>
                        <div className="col l-9">
                           <div>Thông tin</div>
                        </div>

                        <div className="col l-2">
                           <span>Tùy chọn</span>
                        </div>
                    </li>
                    
                </ul>
           </div>

           {/* Pagination */}
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
        </>
    )
}