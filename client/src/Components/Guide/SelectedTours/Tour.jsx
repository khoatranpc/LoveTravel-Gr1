import clsx from 'clsx'
import {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'


import styles from "../Guide.module.scss"
export default function Tour({data, order}){
    const [currentCustomer, setCurrentCustomer] = useState(data.currentCustomer)
    const [dayUpdate, setDayUpdate] = useState(data.dayUpdate)
    const [image, setImage] = useState(data.image)
    const [intro, setIntro] = useState(data.intro)
    const [maxCustomer, setMaxCustomer] = useState(data.maxCustomer)
    const [place, setPlace] = useState(data.place)
    const [price, setPrice] = useState(data.price)
    const [status, setStatus] = useState(data.status)
    const [supplierTour, setSupplierTour] = useState(data.supplierTour)
    const [tourName, setTourName] = useState(data.tourName)
    const [typeTour, setTypeTour] = useState(data.typeTour)
    const [detailTour, setDetailTour] = useState({})
    const [showModal, setShowModal] = useState(false)

    let dayBegin, dayEnd
    if(typeof detailTour.date_begin_tour === 'string'){
        let formatDayBegin = new Date(detailTour.date_begin_tour.slice(0,10)) 
        dayBegin = formatDayBegin.getDate() + '/' + (formatDayBegin.getMonth() + 1) + '/' +  formatDayBegin.getFullYear()
        
        let formatDayEnd = new Date(detailTour.date_end_tour.slice(0,10)) 
        dayEnd = formatDayEnd.getDate() + '/' + (formatDayEnd.getMonth() + 1) + '/' +  formatDayEnd.getFullYear()
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tour/detail/${data._id}`)
        .then(res => {
            console.log(res);
            setDetailTour(res.data.tour.id_detail_Tour)
        })
        .catch(err => console.log(err))
    },[])

    return (
        <div>
            <li className={clsx("row", styles.tourItem)}>
                <div className="col l-1">{order + 1}</div>
                <div className="col l-3">
                    <img src={data.image} alt={data.tourName} />
                </div>
                <div className={clsx("col l-6 m-6 c-12", styles.tourInfo)}>
                    <p>T??n tour: {data.tourName}</p>
                    <b>????n gi??: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                    <p>S??? kh??ch hi???n t???i: {data.currenCustomer}</p>
                    <p>Ng??y d???n: 
                        <mark>{dayBegin} </mark>
                    </p>
                    <p>Ng??y k???t th??c: 
                        <mark>{dayEnd} </mark>
                    </p>
                </div>

                <div className={clsx("l-2", styles.wrapBtns)}>
                    <button onClick={() => setShowModal(true)}>Chi ti???t</button>
                </div>
            </li>

            {/* Modal */}
            {
                showModal && (
                    <div className={clsx(styles.containerModal)}>
                    <div className={clsx(styles.modalTour)}>
                        {/* Close button */}
                        <div className={clsx(styles.closeBtn)}>
                            <button onClick={() => setShowModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                            </button>
                        </div>
    
                        {/* Content */}
                        <h1 className="text-center brand-name">Chi ti???t th??ng tin tour</h1>
                            <div>
                                <div className={clsx(styles.wrapTourInfo)}>
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>T??n tour: </label>
                                            <input readOnly type="text" className={clsx(styles.formControl)} 
                                                onChange={e => setTourName(e.target.value)}
                                                value={tourName}
                                            />
                                        </div>
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>?????a ??i???m: </label>
                                            <input readOnly type="text" className={clsx(styles.formControl)}
                                                onChange={e => setPlace(e.target.value)}
                                                value={place}  />
                                        </div>
                                    </div>
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>S??? kh??ch hi???n t???i: </label>
                                            <input readOnly  type="number" className={clsx(styles.formControl)} 
                                                onChange={e => setCurrentCustomer(e.target.value)}
                                                value={currentCustomer}
                                            />
                                        </div>
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Th??? lo???i: </label>
                                            <input readOnly type="text" className={clsx(styles.formControl)}
                                                onChange={e => setTypeTour(e.target.value)}
                                                value={typeTour}
                                            />
                                        </div>
                                    </div>
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Nh?? cung c???p: </label>
                                            <input readOnly type="text" className={clsx(styles.formControl)} 
                                                onChange={e => setSupplierTour(e.target.value)}
                                                value={supplierTour} />
                                        </div>
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>????n gi??: </label>
                                            <input readOnly type="number" className={clsx(styles.formControl)}
                                                onChange={e => setPrice(e.target.value)}
                                            value={price}  />
                                        </div>
                                    </div>
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Tr???ng th??i: </label>
                                            <input readOnly type="text" className={clsx(styles.formControl)}
                                                onChange={e => setStatus(e.target.value)}
                                            value={status}  />
                                        </div>
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>S??? l?????ng t???i ??a:</label>
                                            <input readOnly
                                                onChange={e => setMaxCustomer(e.target.value)}
                                            value={maxCustomer} type="number" className={clsx(styles.formControl)} />
                                        </div>
                                    </div>
    
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Gi???i thi???u:</label> 
                                            <textarea  className={clsx(styles.formControl)} 
                                                value={intro}
                                                onChange={e => setIntro(e.target.value)}
                                            />
                                        </div>                           
    
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>???nh</label>
                                            <img src={image} alt=""/>
                                        </div>
                                       
                                    </div>
    
                                </div>
                               
                            </div>
                    </div>
                    </div>
                )
            }
           
          
          
        </div>)
}