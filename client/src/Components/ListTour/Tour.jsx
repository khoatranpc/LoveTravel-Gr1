import clsx from 'clsx'
import {memo, useState, useLayoutEffect, useMemo} from 'react'
import axios from 'axios'

import styles from "./LisTour.module.scss"

function Tour({data}){
    const [amount, setAmount] = useState(0)
    const [statusBuy, setStatusBuy] = useState(false)
    const [showIntro, setShowInTro] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [detailTour, setDetailTour] = useState({})
    const totalPrice = amount * data.price
    let dayBegin, dayEnd
    if(typeof detailTour.date_begin_tour === 'string'){
        let formatDayBegin = new Date(detailTour.date_begin_tour.slice(0,10)) 
        dayBegin = formatDayBegin.getDate() + '/' + (formatDayBegin.getMonth() + 1) + '/' +  formatDayBegin.getFullYear()
        
        let formatDayEnd = new Date(detailTour.date_end_tour.slice(0,10)) 
        dayEnd = formatDayEnd.getDate() + '/' + (formatDayEnd.getMonth() + 1) + '/' +  formatDayEnd.getFullYear()
    }


    // Handle set amount
    useLayoutEffect(() => {
        if(amount < 0){
            setAmount(0)
        }

        if(amount > data.maxCustomer){
            setAmount(data.maxCustomer)
        }
        
    }, [amount])


    // Get detail tour
    useLayoutEffect(() => {
        axios.get(`http://localhost:8000/api/tour/detail/${data._id}`)
        .then(res => {
            setDetailTour(res.data.tour.id_detail_Tour)
        })
        .catch(err => console.log(err))
    },[])

    const increaseAmount = () => {
        !statusBuy && setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        !statusBuy && setAmount(amount - 1)
    }


    // Đặt tour
    const bookTour = () => {
        setStatusBuy(!statusBuy)
        if(!statusBuy){
            setAmount(0)
        }
        if(amount > 0){
            console.log("Log: ", {
                id: data._id,
                quantity_user: amount,
            });

           axios.post(`http://localhost:8000/api/user/current-user/booktour/${data._id}/${amount}`,
            {
                headers: {authorization: localStorage.getItem('token')}
            }
           )
           .then(res => {
               console.log(res);
           })
           .catch(err => {
               console.log(err);
           })
        }
    }

    return(<>
        <div className={clsx("l-4 m-12 c-12", styles.tour)}>
            <div className={clsx(styles.tourInfo)}>
                <img  src={data.image} alt=""
                    onClick={() => setShowInTro(!showIntro)}
                />
                <h2>{data.tourName}</h2>
                <p>Địa điểm: {data.place}</p>
                <p>Giá: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                <p>Thể loại: {data.typeTour}</p>
                <p>Khởi hành: {dayBegin}</p>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className={clsx(styles.btnDetail)}
            >
                Chi tiết
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" className="bi bi-compass" viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                </svg>
            </button>

            <div className={clsx(styles.labelBrand)}>
            </div>
        </div>   

         {/* Modal  */}
         {
            showModal && 
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
                    <h1 className="text-center brand-name">{data.tourName}</h1>
                    <div className="row">
                        <div className={clsx("l-6 m-6 c-12")}>
                            <div className={clsx(styles.tourIntro)}>
                            <img  src={data.image} alt="img" />
                                <p><b>Địa điểm: </b>{data.place}</p>
                                <p><b>Thể loại: </b>{data.typeTour}</p>
                                <p><b>Giới thiệu: </b>{data.intro}</p>
                            </div>
                        </div>

                        <div className={clsx("l-6 m-6 c-12")}>
                            <p><b>Ngày bắt đầu: </b>
                                <mark>{dayBegin}</mark>
                            </p>
                            <p><b>Ngày kết thúc: </b>
                                <mark>{dayEnd}</mark>
                            </p>
                            <p><b>Số lượng tour: </b>{data.maxCustomer}</p>
                            <p><b>Trạng thái tour: </b>{data.status}</p>
                            <p><b>Giá: </b>{data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            <p><b>Tổng: </b>{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            <div className={clsx(styles.tourAmount)}>
                                <span>Số tour đặt</span>
                                <button onClick={decreaseAmount}> - </button>
                                <span>{amount}</span>
                                <button onClick={increaseAmount}> + </button>
                            </div>

                            <button
                                onClick={bookTour}
                                className={clsx(styles.btnBuy, {
                                    [styles.active]: statusBuy
                                })}
                            >
                            {statusBuy && `Hủy tour ` || 'Đặt tour' } 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         }
    </>)
}

export default memo(Tour)