import clsx from 'clsx'
import {useState, useEffect, useLayoutEffect} from 'react'
import axios from 'axios'


import {infor} from '../../axios'
import Tour from './Tour'
import Header from '../Header/Header'
import styles from "./LisTour.module.scss"

const apiTours = "http://localhost:8000/api/tour/get-all-tour"
export default function ListTour(){
    const [listTours, setListTours] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [typeSearch, setTypeSearch] = useState('category')
    const [page, setPage] = useState(1)

    const handleIncreasePage = () => {
      setPage(prev => {
          if(prev >= listTours.length - 2 ){
            return prev
          }
          return prev + 1
      })
    }

    const handleDecreasePage = () => {
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
            <Header />
            <div className={clsx("grid wide row", styles.container)} >
            <div className="col l-3 m-12 c-12">
                <div className={clsx(styles.headingSearch)}>
                    <span>Tìm kiếm theo: </span>
                    <select name="typeSearch" id="typeSearch" onChange={(e) => setTypeSearch(e.target.options[e.target.selectedIndex].value)}>
                        <option value="category">Thể loại</option>
                        <option value="nameTour">Tên tour</option>
                        <option value="place" >Địa điểm</option>
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

            <div className={clsx("col l-9 m-12 c-12",styles.listTour)}>
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
    </>
}