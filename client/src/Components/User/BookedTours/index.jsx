import clsx from 'clsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

import styles from '../User.module.scss'
import Header from '../../Header/Header'
import Toast from '../../Toast'

export default function BookedTours(){
    const [listBills, setListBills] = useState([])
    const [detailTour, setDetailTour] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [dayBegin, setDayBegin] = useState('')
    const [dayEnd, setDayEnd] = useState('')
    const [price, setPrice] = useState(0)
    const [review, setReview] = useState('Bình luận tại đây cùng Love Travel')

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/current-user/get-tour-booked',{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            setListBills(res.data.bill)
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    // Show modal
    const showModalTour = (idTour) => {
        setShowModal(true)
        axios.get(`http://localhost:8000/api/tour/detail/${idTour}`)
        .then(res => {
            setDayBegin(res.data.tour.id_detail_Tour.date_begin_tour.slice(0,10))
            setDayEnd(res.data.tour.id_detail_Tour.date_end_tour.slice(0,10))
            setPrice(res.data.tour.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}))
            setDetailTour(res.data.tour)
        })
        .catch(err => console.log(err))
    }


    return (
    <>
        <Header />
        <div className="grid wide">
           <div className="container">
           <ul className="listTour">
                <ul >
                   <li className={clsx("row", styles.bill)}>
                        <div className="col l-2 m-2 c-0 text-center"><b>STT</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Ngày thanh toán</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Phương thức thanh toán</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Tổng tiền</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Số người</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Chi tiết tour</b></div>
                   </li>
                {/* Content */}
                {
                    listBills.map((bill, i) => {
                        return ( 
                            <li key={i} className={clsx("row", styles.bill)}>
                            <div className="col l-2 m-2 c-0 text-center">{i+1}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.datePay.slice(0,10)}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.methodBill}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.totalPerson}</div>
                            <div className="col l-2 m-2 c-2 text-center">
                                <button onClick={() => showModalTour(bill.id_tour)}>Xem</button>
                            </div>
                       </li>
                        )
                    })
                }
                </ul>
            </ul>
           </div>
        </div>

        {/* Modal tour */}
       {
           showModal && (
            <div className={clsx(styles.containerModal)}>
            <div className={clsx(styles.modalTour)}>
                {/* Close button */}
                <div className={clsx(styles.closeBtn)}>
                    <button onClick={() => setShowModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#333" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    </button>
                </div>
                {/* Content */}
                <h1 className="text-center brand-name"></h1>
                <div className="row">
                    <div className={clsx("l-6 m-6 c-12")}>
                        <div className={clsx(styles.tourIntro)}>
                        <img src={detailTour.image}  alt="img" />
                            <p><b>Địa điểm: </b>{detailTour.place }</p>
                            <p><b>Thể loại: </b>{detailTour.typeTour }</p>
                            <p><b>Giới thiệu: </b>{detailTour.intro }</p>
                        </div>
                    </div>

                    <div className={clsx("l-6 m-6 c-12")}>
                        <p><b>Ngày bắt đầu: </b>
                            <mark>{dayBegin}</mark>
                        </p>
                        <p><b>Ngày kết thúc: </b>
                            <mark>{dayEnd }</mark>
                        </p>
                        <p><b>Số lượng tour: </b>{detailTour.maxCustomer }</p>
                        <p><b>Trạng thái tour: </b>{detailTour.status }</p>
                        <p><b>Đơn giá: </b>{price  }</p>
                        <textarea value={review} 
                            onChange={e => setReview(e.target.value)}
                        >
                        </textarea>
                        <button>Gửi bình luận</button>
                    </div>
                </div>
            </div>
    </div>
           )
       }
    </>
    )
}