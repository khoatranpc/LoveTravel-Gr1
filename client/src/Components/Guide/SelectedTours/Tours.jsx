import clsx from 'clsx'
import {useState, useRef, useEffect} from 'react'
import axios from 'axios'

import Tour from './Tour'
import styles from "../Guide.module.scss"

const apiTours = "http://localhost:8000/api/tour/get-all-tour"
export default function Tours(){
    const [listTours, setListTours] = useState([])
    const [page, setPage] = useState(1)
    const [showAddModal, setShowAddModal] = useState(false)
    const [totalTours, setTotalTours] = useState([])
    
    const scrollRef = useRef()

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

    console.log(localStorage.getItem('token'));

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
          getTours(page)

    }, [page])



    return (
        <div className="grid wide">
            <ul >
                <li className={clsx("row", styles.tourItem)}>
                    <div className="col l-1">STT</div>
                    <div className="col l-9">
                    <div>Thông tin</div>
                    </div>

                    <div className="col l-2">
                    <span>Tùy chọn</span>
                    </div>
                </li>
                {
                    listTours.map((tour, index) => {
                        return (
                            <Tour key={tour._id} data={tour} order={index} />
                        )
                    })
                }
            </ul>
        </div>
    )
}