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
    }, [amount])


    const increaseAmount = () => {
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        setAmount(amount - 1)
    }

    const submitAmount = () => {
        console.log({
            id: data.id,
            place: data.tour,
            amount
        });
        setStatusBuy(!statusBuy)
    }

    return(<>
        <div className={clsx("col l-3 m-6 c-6", styles.tour)}>
            <img src={img} alt="" />
            <h3>Tên tour: {data.tour}</h3>
            <p>Địa điểm</p>
            <p>Giá: {data.price}</p>
            <p>Số lượng tour</p>
            <p>Giới thiệu</p>
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