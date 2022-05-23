import clsx from "clsx";


import styles from './Toast.module.scss'

export default function Toast({type = 'error', title='Thông báo', desc='Lỗi', duration = 3000}){

    return (<>
        <div className={clsx(styles.toastContainer)}>
            <div id={clsx(styles.toast)}>
               <div className={clsx(styles.toast, {
                   [styles.toast__success] : type == 'success',
                   [styles.toast__error] : type == 'error'
               })}>
                    <div className={clsx(styles.toast__body)}>
                        <h3 className={clsx(styles.toast__title)}>{title}</h3>
                        <p className={clsx(styles.toast__desc)}>{desc}</p>
                    </div>
                    <div className={clsx(styles.toast__icon)}>
                    {
                        type === 'error' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="tomato" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                    }
                    </div>
               </div>
            </div>

            <div className={clsx(styles.wrapToast)}>
            </div>
        </div>
        
    </>)
}