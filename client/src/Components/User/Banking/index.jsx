import {useState, useEffect} from 'react'
import clsx from 'clsx'
import axios from 'axios'


import styles from '../User.module.scss'
import Toast from '../../Toast'
import Header from '../../Header/Header'

export default function Banking(){
    const [bankInfo, setBankInfo] = useState({bankName: '', cardNumber: ''})
    const [toastMsg, setToastMsg] = useState("Thêm ngân hàng thất bại")
    const [toastType, setToastType] = useState("error")
    const [showToast, setShowToast] = useState(false)
    const [currentMoney, setCurrentMoney] = useState(0)
    const [banks, setBanks] = useState(['ViettinBank', 'VPBank', 'AgriBank', 'VietcomBank', 'SeaBank'])

    const getDataSend = (e) => {
        setBankInfo({
            ...bankInfo,
            [e.target.id] : e.target.value,
        })
    }

    const toastSuccess  = () => {
        setToastMsg("Thêm thành công")
        setToastType("success")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            setToastType("error")
            setToastMsg("Thêm ngân hàng thất bại")
        }, 3000)
    }

    const toastError = () => {
        setToastMsg("Thêm ngân hàng thất bại")
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
    }

    const handleAddBanking = () => {
        if(bankInfo.cardNumber.length > 8 && bankInfo.cardNumber.length <= 15) {
            axios.post("http://localhost:8000/api/user/current-user/banking",bankInfo,{headers: {authorization: localStorage.getItem('token')}})
            .then(res => {
                // console.log(res);
                toastSuccess()
            })
            .catch(err => {
                console.log(err);
                toastError()
            })
        }
        else{
            toastError()
        }
    }

    useEffect(() => {
        const api = `http://localhost:8000/api/user/current-user`
        const timerId = setTimeout(() =>{
            axios.get(api,
                {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(res => {
                // console.log(res);
                setBankInfo({
                    bankName: res.data.data.id_bank.bankName,
                    cardNumber: res.data.data.id_bank.cardNumber,
                })
                setCurrentMoney(res.data.data.id_bank.currentMoney)
            })
            .catch(err => console.error(err))
        }, 1000)
        return () => clearTimeout(timerId)
    },[])

    // useEffect(() => {
    //     console.log(bankInfo);
    // }, [bankInfo])

    return (
    <>
        <Header />
        <div className="grid wide">
            
            <div className={clsx(styles.formContainer)}>
              {/* Save button */}
              <h1 className="text-center brand-name">Ngân hàng</h1>
            {/* Tên ngân hàng */}
            <div className={clsx(styles.formGroup)}>
                    <label htmlFor="bankName" className={clsx(styles.formLabel)}>Tên ngân hàng:</label>
                    <select name="" id="bankName" className={clsx(styles.formControl)}
                        onChange={e =>{
                            getDataSend(e)
                        }}
                        value={bankInfo.bankName}
                    >
                        <option value={bankInfo.bankName}>{bankInfo.bankName}</option>
                        {
                            banks.map((bank, i) => {
                                return <option key={i} value={bank} >{bank}</option>
                            })
                        }
                    </select>
            </div>
            {/* Thẻ ngân hàng */}
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="cardNumber" className={clsx(styles.formLabel)}>Tài khoản:</label>
                <input id="cardNumber" type="number" 
                    className={clsx(styles.formControl)}
                    value={bankInfo.cardNumber}
                    onChange={e => getDataSend(e)}
                />
            </div>
            {/* Số tiền */}
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="currentMoney" className={clsx(styles.formLabel)}>Số tiền:</label>
                <p className={clsx(styles.formControl)}>{currentMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
            </div>

            <button
                onClick={handleAddBanking}
                className={clsx(styles.btnAddBanking)}
            >
            Lưu</button>
          
            </div>
        </div>

        {/* Toast */}
        {
            showToast && <Toast type={toastType} desc={toastMsg} />
        }
        
    </>
    )
}