import clsx from 'clsx'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'


import styles from "../Manage.module.scss"

export default function Account({data, index}){
    // const authorGuide = () => {
    //     const apiAdd = "http://localhost:8000/api/admin/admin-controller/account/update-role"
    //     axios.put(apiAdd, 
    //         {
    //             "id_account": data.id_account, 
    //             "role_update": "guide"
    //         },{
    //             headers: {
    //                 authorization: localStorage.getItem('token')
    //             }
    //         }
    //     )
    //     .then(res => {
    //         window.location.reload(true)
    //         console.log("Res: ", res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }
    return (
        <li className={clsx("row", styles.accountItem)}>
            {/* <div className="col l-1 m-1 c-0 text-center">
                {index}
            </div>
            <div className="col l-9 m-9 c-10 text-center">
                <div className={clsx(styles.wrapInfoAccount)}>
                    <div className="l-6 m-6 c-6">{data.username}</div>
                    <div className="l-6 m-6 c-6">{data.role}</div>
                </div>
            </div>
            <div className={clsx("col l-2 m-2 c-2 text-center", styles.wrapButtons)}>
                <button onClick={authorGuide}>Chọn</button>
            </div> */}
        </li>
    )
}