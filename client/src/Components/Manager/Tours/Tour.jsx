import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Manage.module.scss"
export default function Tour({data, order}){
    {
        // currenCustomer: 0
        // dayUpdate: "2022-05-02T14:25:01.002Z"
        // image: "https://media.vneconomy.vn/images/upload/2022/01/20/du-lich.jpg"
        // intro: "Đây là tour du lịch"
        // maxCustomer: 30
        // place: "Sông Tô Lịch"
        // price: 80000
        // status: "Activing"
        // supplierTour: "Nhóm 1 Đẹp trai"
        // tourName: "Hà Nội mùa lũ"
        // typeTour
    }
    
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

    const [showModal, setShowModal] = useState(false)
    const [showDialogConfirm, setShowDialogConfirm] = useState(false)

    const day = new Date(dayUpdate)

    const deleteTour = () => {
        setShowDialogConfirm(!showDialogConfirm)
    }
    const hanleDeleteTour = () => {
        console.log(data._id);
    }
    return (
        <div>
            <li className={clsx("row", styles.tourItem)}>
                <div className="col l-1">{order + 1}</div>
                <div className="col l-3">
                    <img src={data.image} alt={data.tourName} />
                </div>
                <div className={clsx("col l-6 m-6 c-12", styles.tourInfo)}>
                    <p>Tên tour: {data.tourName}</p>
                    <b>Đơn giá: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                    <p>Số khách hiện tại: {data.currenCustomer}</p>
                    <p>Ngày cập nhật: {data.dayUpdate}</p>
                </div>

                <div className={clsx("l-2", styles.wrapBtns)}>
                        <button onClick={() => setShowModal(true)}>Chi tiết</button>
                        <button onClick={deleteTour}>Xóa</button>
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
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
    
                        {/* Content */}
                        <h1 className="text-center brand-name">Chi tiết thông tin tour</h1>
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
                                                type="file" />
                                            <img src={image} alt=""/>
                                        </div>
                                       
                                    </div>
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Ngày cập nhật:</label>
                                            <span>{day.toLocaleString("en-US")}</span>

                                            <label htmlFor="" className={clsx(styles.formLabel)}>Người dẫn tour:</label>
                                            <select className={clsx(styles.formControl)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
    
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <button>Cập nhật</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                )
            }
           
           {/* Dialog Confirm */}
           {
               showDialogConfirm && (
                <div className={clsx(styles.containerModal)}>
                <div className={clsx(styles.dialogConfirm)}>

                    {/* Content */}
                    <h2 className="text-center"><i className="fa-solid fa-circle-info"></i></h2>
                    <div className={clsx( styles.formGroup)}>
                        <p>Bạn muốn xóa: 
                            <b>{data.tourName}</b>
                        </p>
                        <div className={clsx(styles.confirmBtnGroup)}>
                            <button  onClick={() => setShowDialogConfirm(false)}>Thoát</button>
                            <button 
                                onClick={() => {
                                    setShowDialogConfirm(false)
                                    hanleDeleteTour()
                                }}
                            >
                                Xác nhận</button>
                        </div>

                    </div>
                </div>
                </div>
               )
           }
          
        </div>)
}