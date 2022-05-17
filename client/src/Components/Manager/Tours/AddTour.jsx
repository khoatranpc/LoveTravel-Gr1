import clsx from 'clsx'
import {useState} from 'react'
import axios from 'axios'

import styles from "../Manage.module.scss"
export default function AddTour(){
    const [currentCustomer, setCurrentCustomer] = useState(0)
    const [image, setImage] = useState('')
    const [intro, setIntro] = useState('')
    const [maxCustomer, setMaxCustomer] = useState('')
    const [place, setPlace] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [supplierTour, setSupplierTour] = useState('')
    const [tourName, setTourName] = useState('')
    const [typeTour, setTypeTour] = useState('')

    const [sendData, setSendData] = useState({})

    const [showModal, setShowModal] = useState(true)

    const handleAddTour = () => {
        const apiAdd = "http://localhost:8000/api/tour/add-tour"
        axios.post(apiAdd, 
            {
                "tourName" : tourName,
                "place": place,
                "price": price,
                "typeTour": typeTour,

            },{
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            window.location.reload(true)
            console.log("Res: ", res);
        })
        .catch(err => {
            console.log(err);
        })
     
    }

    return (
        <div>
            {/* Modal */}
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
                                            <input type="text" className={clsx(styles.formControl)} 
                                                onChange={e => setTourName(e.target.value)}
                                                value={tourName}
                                            />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Địa điểm: </label>
                                            <input type="text" className={clsx(styles.formControl)}
                                                onChange={e => setPlace(e.target.value)}
                                                value={place}  />
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Số khách hiện tại: </label>
                                            <input  type="number" className={clsx(styles.formControl)} 
                                                onChange={e => setCurrentCustomer(e.target.value)}
                                                value={currentCustomer}
                                            />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Thể loại: </label>
                                            <input type="text" className={clsx(styles.formControl)}
                                                onChange={e => setTypeTour(e.target.value)}
                                                value={typeTour}
                                            />
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Nhà cung cấp: </label>
                                            <input type="text" className={clsx(styles.formControl)} 
                                                onChange={e => setSupplierTour(e.target.value)}
                                                value={supplierTour} />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Đơn giá: </label>
                                            <input type="number" className={clsx(styles.formControl)}
                                                onChange={e => setPrice(e.target.value)}
                                            value={price}  />
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Trạng thái: </label>
                                            <input type="text" className={clsx(styles.formControl)}
                                                onChange={e => setStatus(e.target.value)}
                                            value={status}  />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Số lượng tối đa:</label>
                                            <input
                                                onChange={e => setMaxCustomer(e.target.value)}
                                            value={maxCustomer} type="number" className={clsx(styles.formControl)} />
                                        </div>
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Giới thiệu:</label> 
                                            <textarea  className={clsx(styles.formControl)} 
                                                value={intro}
                                                onChange={e => setIntro(e.target.value)}
                                            />
                                        </div>                           


                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Ảnh</label>
                                            <input className={clsx(styles.formControl)} 
                                                value={image}
                                                onChange={e => setImage(e.target.value)}
                                                type="input"
                                                placeholder="Nhập đường dẫn hình ảnh"
                                                />
                                            <img src={image} alt=""/>
                                        </div>
                                        
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Người dẫn tour:</label>
                                            <select className={clsx(styles.formControl)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
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
           
          
        </div>)
}