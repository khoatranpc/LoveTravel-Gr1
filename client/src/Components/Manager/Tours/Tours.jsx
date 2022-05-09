import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Manage.module.scss"

export default function Tours(){
  
    return (<div className={clsx("grid wide", styles.container)}>
        <div className="col l-4">
            <h1>Thông tin</h1>
            <div>
                <div className={clsx("row", styles.formGroup)}>
                    <label className="col l-4">Tên tour: </label>
                    <input type="text" className="col l-8"/>
                </div>
                <div className={clsx("row", styles.formGroup)}>
                    <label className="col l-4">Tên tour: </label>
                    <input type="text" className="col l-8"/>
                </div>
                 <div className={clsx("row", styles.formGroup)}>
                    <label className="col l-4">Tên tour: </label>
                    <input type="text" className="col l-8"/>
                </div>
                 <div className={clsx("row", styles.formGroup)}>
                    <label className="col l-4">Tên tour: </label>
                    <input type="text" className="col l-8"/>
                </div>
            </div>
            <div className={clsx(styles.buttonGroup)}>
                <button>Sửa</button>
                <button>Thêm</button>
            </div>
        </div>


        <div className="col l-8">
            <h1>Danh sách</h1>
        </div>
    </div>)
   
}