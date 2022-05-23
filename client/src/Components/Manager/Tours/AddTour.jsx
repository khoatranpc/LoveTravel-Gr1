import clsx from 'clsx'
import {useState, useEffect} from 'react'
import axios from 'axios'

import styles from "../Manage.module.scss"
import Toast from '../../Toast'

export default function AddTour({totalTours}){
    const [currentCustomer, setCurrentCustomer] = useState(0)
    const [image, setImage] = useState('')
    const [intro, setIntro] = useState('')
    const [maxCustomer, setMaxCustomer] = useState(30)
    const [dateBeginTour, setDateBeginTour] = useState('')
    const [dateEndTour, setDateEndTour] = useState('')
    const [place, setPlace] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('Pending')
    const [supplierTour, setSupplierTour] = useState('Nhóm chúng mình')
    const [tourName, setTourName] = useState('')
    const [typeTour, setTypeTour] = useState('Di tích lịch sử')
    const [review, setReview] = useState('')
    const [sendData, setSendData] = useState({})

    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(true)
    const [showToast, setShowToast] = useState(false)

    const handleAddTour = () => {
        const apiAdd = "http://localhost:8000/api/tour/add-tour"
        axios.post(apiAdd, 
            sendData,{
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            window.location.reload(true)
        })
        .catch(err => {
            console.log(err);
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        })
     
    }

    const getDataSend = (e) => {
        setSendData({
            ...sendData,
            status,
            supplierTour,
            typeTour,
            maxCustomer,
            [e.target.id] : e.target.value
        })
    }

    useEffect(() => {
        console.log(sendData);
    },[sendData])

    return (
        <>
            {showToast && <Toast type="error" title="Thất bại" desc="Thông tin thêm không hợp lệ" />}

            {/* Content */}
        <div>
            {
                showModal && (
                    <div className={clsx(styles.containerModal)}>

                        <div className={clsx(styles.modalAddTour)}>
                            {/* Close button */}
                            <div className={clsx(styles.closeBtn)}>
                                <button onClick={() => setShowModal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                                </button>
                            </div>
        
                            {/* Content */}
                            <div>
                                <div className={clsx(styles.wrapTourInfo)}>
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Tên tour: </label>
                                            <input  id="tourName"
                                                type="text" className={clsx(styles.formControl)} 
                                                value={tourName}
                                                onChange={e =>{
                                                    getDataSend(e)
                                                    setTourName(e.target.value)}
                                                }
                                            />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Địa điểm: </label>
                                            <input id="place"
                                                type="text" className={clsx(styles.formControl)}
                                                value={place}  
                                                onChange={e =>{ setPlace(e.target.value)
                                                    getDataSend(e)
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Đơn giá: </label>
                                            <input id="price" type="number" className={clsx(styles.formControl)}
                                                value={price}  
                                                onChange={e =>{ setPrice(e.target.value) 
                                                    getDataSend(e)
                                                }}
                                            />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="typeTour" className={clsx(styles.formLabel)}>Thể loại: </label>
                                            <select name="" id="typeTour" className={clsx(styles.formControl)}
                                                onChange={e =>{
                                                    getDataSend(e)
                                                    setTypeTour(e.target.options[e.target.selectedIndex].value)
                                                }}
                                                value={typeTour}
                                            >
                                                <option value="Di tích lịch sử">Di tích lịch sử</option>
                                                <option value="Sinh thái khám phá">Sinh thái khám phá</option>
                                                <option value="Nghỉ dưỡng">Nghỉ dưỡng</option>
                                            </select>
                                        </div>
                                       
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Số lượng tối đa:</label>
                                            <input id="maxCustomer" type="number" className={clsx(styles.formControl)}
                                                value={maxCustomer} 
                                                onChange={e =>{
                                                    setMaxCustomer(e.target.value)
                                                    getDataSend(e)
                                                }}
                                             />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="supplierTour" className={clsx(styles.formLabel)}>Nhà cung cấp: </label>
                                            <input id="supplierTour" type="text" className={clsx(styles.formControl)} 
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setSupplierTour(e.target.value)
                                                }}
                                                value={supplierTour} />
                                        </div>
                                       
                                    </div>

                                    <div className={clsx(styles.row)}>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Trạng thái: </label>
                                            <select  
                                                id="status"  type="text" className={clsx(styles.formControl)}
                                                value={status}  
                                                onChange={e =>{ 
                                                    setStatus(e.target.value)
                                                    getDataSend(e)
                                            }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Activing">Activing</option>
                                                <option value="Ending">Ending</option>
                                            </select>
                                        </div>
                                        
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Giới thiệu:</label> 
                                            <textarea id="intro" className={clsx(styles.formControl)} 
                                                value={intro}
                                                onChange={e =>{ 
                                                    setIntro(e.target.value)
                                                    getDataSend(e)
                                                }}
                                            />
                                        </div>  

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Ảnh</label>
                                            <input className={clsx(styles.formControl)} 
                                                value={image}
                                                onChange={e =>{ setImage(e.target.value)}}
                                                type="input"
                                                placeholder="Nhập đường dẫn hình ảnh"
                                                />
                                            <img src={image} alt=""/>
                                        </div>                         
                                      
                                    </div>
                                </div>


                                <div className={clsx(styles.wrapBtn)}>
                                    <button 
                                        onClick={handleAddTour}
                                        className={clsx(styles.btnAddTour)}>Thêm
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                )
            }
           
        </div>
        </>
    )
}