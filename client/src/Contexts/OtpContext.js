import {useState, createContext, useEffect} from 'react'
import axios from 'axios'
const OtpContext = createContext()

function OtpProvider(props){
    const [otp, setOtp]  = useState('')


    const sendOtp = (receiveOtp) =>{
        setOtp(receiveOtp)
    }
   
    const value={
        otp,
        sendOtp
    }

    return <OtpContext.Provider  value={value}>
        {props.children}
    </OtpContext.Provider>
}
export {OtpContext, OtpProvider}