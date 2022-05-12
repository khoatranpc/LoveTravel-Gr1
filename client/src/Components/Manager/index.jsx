import clsx from 'clsx'
import {useState} from 'react'

import Header from './Header/Header'
import Tours from './Tours/Tours'
import styles from "./Manage.module.scss"

const apiTours = "http://localhost:8000/api/tour/get-all-tour"
export default function Manage(){
  
    return <div >
            <Header />
            <Tours />
    </div>
}