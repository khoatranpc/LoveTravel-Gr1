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

    const [showModal, setShowModal] = useState(true)

    const handleAddTour = () => {
        const apiAdd = "http://localhost:8000/api/tour/add-tour"
        axios.post(apiAdd, 
            {
                "tourName" : tourName,
                "place": place,
                "price": price,
                "typeTour": typeTour
            },{
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
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

                        <div className={clsx(styles.modalTour)}>
                            {/* Close button */}
                            <div className={clsx(styles.closeBtn)}>
                                <button onClick={() => setShowModal(false)}>
                                    Thoát <i className="fa-solid fa-xmark"></i>
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
                                        className={clsx(styles.btnUpdateTour)}>Thêm
                                        <i className="fa-solid fa-floppy-disk"></i>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                )
            }
           
          
        </div>)
}