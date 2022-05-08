import clsx from 'clsx'
import {memo, useState, useLayoutEffect, useEffect} from 'react'

import styles from "./LisTour.module.scss"
import img from './img_intro.jpg'


function Tour({data}){
    const [amount, setAmount] = useState(0)
    const [statusBuy, setStatusBuy] = useState(false)

    useLayoutEffect(() => {
        if(amount < 0){
            setAmount(0)
        }

        if(amount > data.limit){
            setAmount(data.limit)
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
        <div className={clsx("l-3 m-12 c-12", styles.tour)}>
            <div className={clsx(styles.tourInfo)}>
                <img src={img} alt="" />
                <h2>{data.tour}</h2>
                <p>Địa điểm</p>
                <p>Giá: {data.price}</p>
                <div>Số lượng tour: {data.limit}</div>
               
                <div className={clsx(styles.tourIntro)}>
                    <span>Đoạn này giới thiệu chi tiết tour </span>
                </div>
            </div>
            <div className="row amount">
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
    </>)
}

export default memo(Tour)