import clsx from 'clsx'
import {memo, useState, useLayoutEffect, useEffect} from 'react'

import styles from "./LisTour.module.scss"

function Tour({data}){
    const [amount, setAmount] = useState(0)
    const [statusBuy, setStatusBuy] = useState(false)
    const [showIntro, setShowInTro] = useState(false)
    useLayoutEffect(() => {
        if(amount < 0){
            setAmount(0)
        }

        if(amount > data.maxCustomer    ){
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
               
                {
                    showIntro &&
                    <div className={clsx(styles.tourIntro)}>
                        <p>{data.intro}</p>
                        <p>Nhà cung cấp: {data.supplierTour}</p>
                        
                    </div>
                }
            </div>
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
    </>)
}

export default memo(Tour)