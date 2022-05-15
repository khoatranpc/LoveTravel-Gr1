import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Guide.module.scss"
import Tours from "./Tours"
import Header from '../Header'
export default function SelectedTours(){
    return ( <div>
        <Header/>
        <div className="grid wide">
            <h1 className="text-center">Danh sách tours dẫn</h1>
            <Tours />
        </div>
    </div>)
   
}