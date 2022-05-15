
import clsx from 'clsx'
import {useState} from 'react'

import Header from '../Header/Header'
import Account from './Account'
export default function User(){
    return <>
        <Header />
        <div className="grid wide">
            <Account />
        </div>
    </>
}