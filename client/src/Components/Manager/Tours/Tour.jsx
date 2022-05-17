import clsx from 'clsx'
import {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import styles from "../Manage.module.scss"

const guides = [
    {
        id: 123,
        name: 'Tài'
    },
    
]

export default function Tour({data, order}){
    // const [currentCustomer, setCurrentCustomer] = useState(data.currentCustomer)
    // const [dayUpdate, setDayUpdate] = useState(data.dayUpdate)
    // const [image, setImage] = useState(data.image)
    // const [intro, setIntro] = useState(data.intro)
    // const [maxCustomer, setMaxCustomer] = useState(data.maxCustomer)
    // const [place, setPlace] = useState(data.place)
    // const [price, setPrice] = useState(data.price)
    // const [status, setStatus] = useState(data.status)
    // const [supplierTour, setSupplierTour] = useState(data.supplierTour)
    // const [tourName, setTourName] = useState(data.tourName)
    // const [typeTour, setTypeTour] = useState(data.typeTour)


    const [guide, setGuide] = useState({})

    const [currentCustomer, setCurrentCustomer] = useState('')
    const [dayUpdate, setDayUpdate] = useState('')
    const [image, setImage] = useState('')
    const [intro, setIntro] = useState('')
    const [maxCustomer, setMaxCustomer] = useState('')
    const [place, setPlace] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [supplierTour, setSupplierTour] = useState('')
    const [tourName, setTourName] = useState('')
    const [typeTour, setTypeTour] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [showDialogConfirm, setShowDialogConfirm] = useState(false)


    const day = new Date(dayUpdate)

    const deleteTour = () => {
        setShowDialogConfirm(!showDialogConfirm)
    }


    const hanleDeleteTour = () => {
        const apiDelete = `http://localhost:8000/api/tour/delete/${data._id}`
        axios.delete(apiDelete,{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            console.log(res);
            window.location.reload(true)
        })
        .catch(err => console.error(err))
    }

    const handleUpdateTour = () => {
        const apiUpdate = `http://localhost:8000/api/tour/update/${data._id}`
        axios.put(apiUpdate,
            {
                "tourName": tourName,
                "supplierTour" : supplierTour,
                "place": place
            },
            {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            console.log("Update thanh cong:", res);
            window.location.reload(true)
        })
        .catch(err => console.error(err))

        // const apiAddGuide = `http://localhost:8000/api/tour/add-Tour-Guide/ ${data._id}`
        // axios.put(apiAddGuide,
        //     {
        //         "id_guide": "62819f536ea02c9622928747"
        //     },
        //     {
        //     headers: {authorization: localStorage.getItem('token')}
        // })
        // .then(res => {
        //     console.log("Them guide thanh cong:", res);
        //     window.location.reload(true)
        // })
        // .catch(err => console.error(err))

    }

    const handleShowDetail = () => {
        console.log(data._id);
        const apiDetail = 'http://localhost:8000/api/tour/detail/'
        // Call API detail tour
        axios.get(apiDetail,
            {
                params: { id: data._id }
            }
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

        // Show modal
        setShowModal(true)
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
                    <p>Ngày cập nhật: {data.dayUpdate.slice(0, 10)}</p>
                </div>

                <div className={clsx("l-2", styles.wrapBtns)}>
                        <button onClick={handleShowDetail}>Chi tiết</button>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
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
                                                type="input" placeholder="Nhập đường dẫn" />
                                            <img src={image} alt=""/>
                                        </div>
                                       
                                    </div>
    
                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Ngày cập nhật:</label>
                                            <span>{day.toLocaleString("en-US")}</span>

                                            <label htmlFor="" className={clsx(styles.formLabel)}>Người dẫn tour:</label>
                                            <select className={clsx(styles.formControl)}
                                            
                                            onChange={(e) => {
                                                setGuide(e.target.options[e.target.selectedIndex].value)
                                            }}
                                            >
                                            {/* <option value="1">Nguyen Van A</option> */}
                                                {
                                                    guides.map((data, i) => {
                                                        return (
                                                            <option
                                                            value={data.name}
                                                            key={i}>
                                                                {data.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={clsx(styles.wrapBtn)}>
                                    <button
                                    onClick={handleUpdateTour}
                                    className={clsx(styles.btnUpdateTour)}>Lưu
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-save" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                        </svg>
                                    </button>
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