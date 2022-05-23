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
    const [idGuide, setIdGuide] = useState('')
    
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

    // Decode Token
    const parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        const decode = parseJwt(localStorage.getItem('token'))
        setIdGuide()
        // API list selected Tours
        axios.get(`http://localhost:8000/api/user/guider/tour-guide`,{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    },[])




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