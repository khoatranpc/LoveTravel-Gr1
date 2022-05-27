import clsx from 'clsx'
import {memo, useState, useLayoutEffect, useMemo} from 'react'
import axios from 'axios'

import styles from "./LisTour.module.scss"
import Toast from '../Toast'

function Tour({data}){
    const [amount, setAmount] = useState(0)
    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("Đặt tour thất bại")
    const [toastType, setToastType] = useState("error")
    const [showIntro, setShowInTro] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [detailTour, setDetailTour] = useState({})
    const [currentCustomer, setCurrentCustomer] = useState(data.currentCustomer)
    const [showDialogConfirm, setShowDialogConfirm] = useState(false)
    const totalPrice = amount * data.price

    const toastSuccess  = () => {
        setToastMsg("Đặt tour thành công")
        setToastType("success")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            setToastType("error")
            setToastMsg("Đặt tour thất bại")
        }, 3000)
    }

    const toastError = (msg = "Đặt tour thất bại") => {
        setToastMsg(msg)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 4000)
    }

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

        if(amount > (data.maxCustomer - data.currentCustomer)){
            setAmount(data.maxCustomer - data.currentCustomer)
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
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        setAmount(amount - 1)
    }


    // Đặt tour
    const apiBookTour = () => {
        axios.post(`http://localhost:8000/api/user/current-user/booktour/${data._id}/${amount}`,{
        },
         {
            headers: {Authorization: localStorage.getItem('token')}
         }
        )
        .then(res => {
            // console.log(res);
            setCurrentCustomer(amount)
            toastSuccess();
        })
        .catch(err => {
            // console.log(err.response);
            toastError()
        })
    }

    const bookTour = () => {
        if(data.status === 'Pending' || data.status === 'Ending'){
            toastError("Tour chưa sẵn sàng hoặc đã kết thúc")
        }else{
            if(amount > 0){
                setShowDialogConfirm(true)
            }
        }
        
    }

    const handleBookTour = () => {
        apiBookTour();
    }

    return(<>
        {/* Toast */}
        {
            showToast && <Toast type={toastType} desc={toastMsg}/>
        }
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
                        <p><b>Số khách hiện tại: </b>{currentCustomer}</p>
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
                            className={clsx(styles.btnBuy)}
                        >
                            Đặt tour
                        </button>
                    </div>
                </div>
            </div>
        </div>
        }

        {/* Dialog Confirm */}
        {
          showDialogConfirm &&  <div className={clsx(styles.containerModal)}>
                <div className="dialogConfirm">
                    <h2 className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                    </h2>
                    <div className={clsx(styles.formGroup)}>
                        <p>Xác nhận đặt tour: <b>{data.tourName}</b> </p>
                        <p>Số lượng vé: <span>{amount}</span></p>
                        <p><b>Tổng: </b>{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                        <div className="confirmBtnGroup">
                            <button  onClick={() => setShowDialogConfirm(false)}>
                                Thoát
                            </button>
                            {/* Confirm Book tour */}
                            <button 
                            onClick={() => {
                                setShowDialogConfirm(false)
                                handleBookTour()
                            }}
                            >
                            Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>

        }
    </>)
}

export default memo(Tour)