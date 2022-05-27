import clsx from 'clsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

import styles from '../User.module.scss'
import Header from '../../Header/Header'
import Toast from '../../Toast'

export default function BookedTours(){
    const [listBills, setListBills] = useState([])
    const [idBill, setIdBill] = useState('')
    const [detailTour, setDetailTour] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [dayBegin, setDayBegin] = useState('')
    const [dayEnd, setDayEnd] = useState('')
    const [price, setPrice] = useState(0)
    const [review, setReview] = useState('Bình luận tại đây cùng Love Travel')
    const [showDialogConfirm, setShowDialogConfirm] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("Đặt tour thất bại")
    const [toastType, setToastType] = useState("error")

    const toastSuccess  = () => {
        setToastMsg("Hủy tour thành công")
        setToastType("success")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            setToastType("error")
            setToastMsg("Hủy tour thất bại")
        }, 3000)
    }

    const toastError = (msg = "Hủy tour thất bại") => {
        setToastMsg(msg)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
    }

    // Get booked tours
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/current-user/get-tour-booked',{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            const bills = res.data.bill
            const completeBill = bills.filter((bill, i) => {
                return bill.status === 'Compelete'
            })
            setListBills(completeBill)
        })
        .catch(err => {
            // console.log(err);
            toastError()
        })
    },[])

    // Show modal detail tour
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

    // Show diaglog Cancel
    const showDialogCancel = (idTour, idBill) => {
        setIdBill(idBill)
        setShowDialogConfirm(true)
        axios.get(`http://localhost:8000/api/tour/detail/${idTour}`)
        .then(res => {
            setDetailTour(res.data.tour)
        })
        .catch(err => console.log(err))
    }
    // Hủy tour
    const handleCancelTour = () => {
        axios.put(`http://localhost:8000/api/user/current-user/get-bill/${idBill}`,{}, {
            headers: {Authorization: localStorage.getItem('token')}
        })
        .then(res => {
            // console.log(res);
            toastSuccess()
            setTimeout(() => {
                window.location.reload(true)
            },1300)
        })
        .catch(err =>{ 
            // console.log(err.response)
            toastError("Tour chỉ hủy trước ngày bắt đầu")
        });
    }


    return (
    <>
        {/* Toast */}
        {
            showToast && <Toast type={toastType} desc={toastMsg}/>
        }
        <Header />
        <div className="grid wide">
           <div className="container">
           <ul className="listTour">
                <ul >
                   <li className={clsx("row", styles.bill)}>
                        <div className="col l-2 m-2 c-0 text-center"><b>STT</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Ngày thanh toán</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Tổng tiền</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Số người</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Hủy tour</b></div>
                        <div className="col l-2 m-2 c-0 text-center"><b>Chi tiết tour</b></div>
                   </li>
                {/* Content */}
                {
                    listBills.map((bill, i) => {
                        return ( 
                            <li key={i} className={clsx("row", styles.bill)}>
                            <div className="col l-2 m-2 c-0 text-center">{i+1}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.datePay.slice(0,10)}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                            <div className="col l-2 m-2 c-2 text-center">{bill.totalPerson}</div>
                            <div className="col l-2 m-2 c-2 text-center">
                                <button
                                 onClick={() => showDialogCancel(bill.id_tour, bill._id)}
                                >Hủy tour</button>
                            </div>
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
                            <p><b>Tên tour: </b>{detailTour.tourName }</p>
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

       {/* Dialog confirm cancel */}
        {/* Dialog Confirm */}
        {
          showDialogConfirm &&  <div className={clsx(styles.containerModal)}>
                <div className="dialogConfirm">
                    <h2 className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                        <path  d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                    </svg>
                    </h2>
                    <div className={clsx(styles.formGroup)}>
                        <p>Bạn muốn xóa tour: <b>{detailTour.tourName}</b> ?</p>
                        <p>
                            <b>Lưu ý:</b>
                            <p><mark>Bạn sẽ được hoàn lại 30% số tiền</mark></p>
                        </p>
                        <div className="confirmBtnGroup">
                            <button  onClick={() => setShowDialogConfirm(false)}>
                                Thoát
                            </button>
                            {/* Confirm Book tour */}
                            <button 
                                onClick={() => {
                                    setShowDialogConfirm(false)
                                    handleCancelTour()
                                }}
                            >
                            Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>

        }
    </>
    )
}