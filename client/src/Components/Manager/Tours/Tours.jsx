import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

import Tour from './Tour'
import AddTour from './AddTour'
import styles from "../Manage.module.scss"


export default function Tours(){
    const [listTours, setListTours] = useState([])
    const [page, setPage] = useState(1)
    const [showAddModal, setShowAddModal] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const scrollRef = useRef()
    // Phân trang
    useEffect(() => {
        // Call api
        function getTours(page) {
            axios.get("http://localhost:8000/api/admin/admin-controller/get-all-tour", {
                params: { page: page },
            })
            .then((res) => {
                setListTours(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getTours(page)

    }, [page])

    // Tìm kiếm tour
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tour/search?name=${valueSearch}`)
        .then((res) => {
            setListTours(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        });

       if(!valueSearch){
            axios.get("http://localhost:8000/api/admin/admin-controller/get-all-tour", {
                params: { page: 1 },
            })
            .then((res) => {
                setListTours(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
       }

    },[valueSearch])

    const handleIncreasePage = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        setPage(prev => {
            if(listTours.length == 0){
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

    
    const handleshowAddModal = () => {
        setShowAddModal(!showAddModal)
    }

    return (<div className="grid wide">
        <div className={clsx(styles.wrapSearch)}>
            <input type="search" placeholder="Tìm kiếm tour ..."
                className={clsx(styles.inputSearch)}
                onChange={e => setValueSearch(e.target.value)}
             />
        </div>

        <div className={clsx(styles.container)}>
            <div className={clsx(styles.heading)}>
                <h1>Danh sách tour</h1>
                {/* button add tour */}
                <button onClick={handleshowAddModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>
            </div>
            {/* Content */}
           <div>
                <ul ref={scrollRef}>
                    <li className={clsx("row", styles.tourItem)}>
                        <div className="col l-1 m-1 c-0">STT</div>
                        <div className="col l-9 m-9 c-0">
                           <div>Thông tin</div>
                        </div>
                        <div className="col l-2 m-2 c-0">
                           <span>Tùy chọn</span>
                        </div>
                    </li>
                    {
                        listTours.map((tour, index) => {
                            return (
                                <Tour key={tour._id} data={tour} order={index}  />
                            )
                        })
                    }
                </ul>
           </div>

           {/* Pagination */}
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
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="$primaryColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

        {/* Add modal */}
        {
            showAddModal && <AddTour  totalTours={listTours.length}/>
        }
    </div>)
   
}