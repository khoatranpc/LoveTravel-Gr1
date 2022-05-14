import {useState, createContext, useEffect} from 'react'
import axios from 'axios'
const OtpContext = createContext()

function OtpProvider(props){
    const [otp, setOtp]  = useState('')
    const [idAccount, setIdAccount] = useState('')

    const sendOtp = (receiveOtp) =>{
        setOtp(receiveOtp)
    }

    const sendIdAccount = (receiveIdAccount)  =>{
        setIdAccount(receiveIdAccount)
    }
   
    const value={
        otp,
        sendOtp,
        idAccount,
        sendIdAccount
    }

    return <OtpContext.Provider  value={value}>
        {props.children}
    </OtpContext.Provider>
}
export {OtpContext, OtpProvider}