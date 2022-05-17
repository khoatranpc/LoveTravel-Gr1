import clsx from "clsx";


import styles from './Toast.module.scss'

export default function Toast({type = 'error', title='Thông báo', desc='Lỗi', duration = 3000}){

    return (<>
        <div className={clsx(styles.toastContainer)}>
            <div id={clsx(styles.toast)}>
               <div className={clsx(styles.toast)}>
                    <div className={clsx(styles.toast__body)}>
                        <h3 className={clsx(styles.toast__title)}>{title}</h3>
                        <p className={clsx(styles.toast__desc)}>{desc}</p>
                    </div>
                    <div className={clsx(styles.toast__icon)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="tomato" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                    </div>
               </div>
            </div>

            <div className={clsx(styles.wrapToast)}>
            </div>
        </div>
        
    </>)
}