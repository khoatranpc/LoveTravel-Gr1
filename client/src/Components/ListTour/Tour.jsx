import clsx from 'clsx'
import {memo, useState, useLayoutEffect, useMemo} from 'react'

import styles from "./LisTour.module.scss"

function Tour({data}){
    const [amount, setAmount] = useState(0)
    const [statusBuy, setStatusBuy] = useState(false)
    const [showIntro, setShowInTro] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const totalPrice = amount * data.price
    useLayoutEffect(() => {
        if(amount < 0){
            setAmount(0)
        }

        if(amount > data.maxCustomer){
            setAmount(data.maxCustomer)
        }
        
    }, [amount])


    const increaseAmount = () => {
        !statusBuy && setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        !statusBuy && setAmount(amount - 1)
    }

    const submitAmount = () => {
        if(!statusBuy){
            setAmount(0)
        }
        console.log({
            id: data.id,
            place: data.tour,
            amount
        });
        setStatusBuy(!statusBuy)
    }

    return(<>
        <div className={clsx("l-4 m-12 c-12", styles.tour)}>
            <div className={clsx(styles.tourInfo)}>
                <img  src={data.image} alt=""
                    onClick={() => setShowInTro(!showIntro)}
                    // onMouseEnter={() => setShowInTro(true)}
                    // onMouseLeave={() => setShowInTro(false)}
                />
                <h2>{data.tourName}</h2>
                <p>Địa điểm: {data.place}</p>
                <p>Giá: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                <p>Thể loại: {data.typeTour}</p>
                <div>Số lượng tour: {data.maxCustomer}</div>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className={clsx(styles.btnDetail)}
            >
                Chi tiết
                <i className="fa-solid fa-compass"></i>
            </button>
        </div>   

         {/* Modal  */}
         {
            showModal && 
            <div className={clsx(styles.containerModal)}>
                <div className={clsx(styles.modalTour)}>
                    {/* Close button */}
                    <div className={clsx(styles.closeBtn)}>
                        <button onClick={() => setShowModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Content */}
                    <h1 className="text-center brand-name">{data.tourName}</h1>
                    <div className="row">
                        <div className={clsx("l-6 m-6 c-12")}>
                            <div className={clsx(styles.tourIntro)}>
                            <img  src={data.image} alt="img" />
                                <p>Địa điểm: {data.place}</p>
                                <p>Thể loại: {data.typeTour}</p>
                                <p>Nhà cung cấp: {data.supplierTour}</p>
                                <p>Giới thiệu: {data.intro}</p>
                            </div>
                        </div>

                        <div className={clsx("l-6 m-6 c-12")}>
                            <p>Số lượng tour: {data.maxCustomer}</p>
                            <p>Giá: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            <p>Tổng: {totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            <div className={clsx(styles.tourAmount)}>
                                <span>Số tour đặt</span>
                                <button onClick={decreaseAmount}> - </button>
                                <span>{amount}</span>
                                <button onClick={increaseAmount}> + </button>
                            </div>

                            <button
                                onClick={submitAmount}
                                className={clsx(styles.btnBuy, {
                                    [styles.active]: statusBuy
                                })}
                            >
                            {statusBuy && `Hủy tour ` || 'Đặt tour'  } 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         }
    </>)
}

export default memo(Tour)