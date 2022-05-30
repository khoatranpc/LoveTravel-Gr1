import clsx from 'clsx'
import {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import styles from "../Manage.module.scss"
import Toast from '../../Toast'



export default function Tour({data, order}){
    const [dateBeginTour, setDateBeginTour] = useState('')
    const [dateEndTour, setDateEndTour] = useState('')
    const [image, setImage] = useState('')
    const [intro, setIntro] = useState('')
    const [maxCustomer, setMaxCustomer] = useState('')
    const [place, setPlace] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [supplierTour, setSupplierTour] = useState('')
    const [tourName, setTourName] = useState('')
    const [typeTour, setTypeTour] = useState('Di tích lịch sử')
    const [reviewsTour, setReviewsTour] = useState('')
    const [sendData, setSendData] = useState({})

    const [idTour, setIdTour] = useState('')
    const [guideInfo, setGuideInfo] = useState([])
    const [guide, setGuide] = useState({})
    const [pageGuide ,setPageGuide] = useState(1)

    const [showModal, setShowModal] = useState(false)
    const [showDialogConfirm, setShowDialogConfirm] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState("error")
    const [toastTittle, setToastTittle] = useState("Thông báo")
    const [toastMsg, setToastMsg] = useState("Dữ liệu không hợp lệ")
    
    // Get list guides
    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/get-data-user?page=${pageGuide}&role=guide`,{
            headers: {
            authorization: localStorage.getItem('token')
        }
    })
    .then(res => {
        setGuideInfo(res.data.data)
    })
    .catch(err => {
        console.log(err);
    })
    },[pageGuide])


    const deleteTour = () => {
        setShowDialogConfirm(!showDialogConfirm)
    }

    const hanleDeleteTour = () => {
        const apiDelete = `http://localhost:8000/api/tour/delete/${data._id}`
        axios.delete(apiDelete,{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            // console.log(res);
            window.location.reload(true)
        })
        .catch(err =>{
            console.error(err)
            setToastTittle("Xóa tour thất bại")
            setToastMsg("Chỉ xóa khi trạng thái Pending...")
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                setToastMsg("Dữ liệu không hợp lệ")
                setToastTittle("Thông báo")
            }, 3000)
        })
    }

    const getDataSend = (e) => {
        setSendData({
            ...sendData,
            [e.target.id] : e.target.value
        })
    }

     // Show modal detail
    const handleShowDetail = () => {
        setShowModal(true)
        setIdTour(data._id)
        axios.get(`http://localhost:8000/api/tour/detail/${data._id}`)
        .then(res => {
            setTourName(res.data.tour.tourName)
            setPlace(res.data.tour.place)
            setPrice(res.data.tour.price)
            setIntro(res.data.tour.intro)
            setMaxCustomer(res.data.tour.maxCustomer)
            setTypeTour(res.data.tour.typeTour  )
            setSupplierTour(res.data.tour.supplierTour)
            setStatus(res.data.tour.status)
            setDateBeginTour(res.data.tour.id_detail_Tour.date_begin_tour.slice(0, 10))
            setDateEndTour(res.data.tour.id_detail_Tour.date_end_tour.slice(0, 10))
            setReviewsTour(res.data.tour.id_detail_Tour.reviews_tour)
        })
        .catch(err => console.log(err))
   }


    // Update tour
    const updateTour = () => {
        let currentDate = new Date();
        const apiUpdateTour = `http://localhost:8000/api/tour/update/${data._id}`
        axios.put(apiUpdateTour,
            {   ...sendData,
                "dayUpdate": currentDate
            },
            {
                headers: {authorization: localStorage.getItem('token')}
            }
        )
        .then(res => {
            window.location.reload(true)
        })
        .catch(err => {
            console.error(err)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        })
    }

    
    // Update detail tour
    const updateDetailTour = () => {
        const apiUpdateDetailTour = `http://localhost:8000/api/admin/admin-controller/tour/${data._id}/update`
        axios.put(apiUpdateDetailTour,
            {
                "reviews_tour": reviewsTour,
                "date_begin_tour": dateBeginTour,
                "date_end_tour": dateEndTour
            },
            {
                headers: {authorization: localStorage.getItem('token')}
            }
        )
        .then(res => {
            console.log("Update thanh cong:", res);
        })
        .catch(err => {
            console.error(err)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        })
    }

    // Toast error
    const toastError = (msg) => {
        setToastMsg(msg)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            setToastMsg("Dữ liệu không hợp lệ")
        }, 3000)
    }

    // Update guide
    const updateGuide = () => {
        if(status === 'Ending'){
            toastError("Tour đã kết thúc")
        }else{
            axios.put(`http://localhost:8000/api/tour/add-Tour-Guide/${idTour}`,
            {
                "id_guide": guide.id
            },
            {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(res => {
                setToastMsg("Thêm người dẫn tour thành công")
                setToastType("success")
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                    setToastType("error")
                    setToastMsg("Dữ liệu không hợp lệ")
                }, 2000)
            })
            .catch(err => {
                // setToastMsg(err.response.data.message)
                // console.log(err.response.data)
                toastError("Người dẫn tour trùng lịch")
            });
        }
    }

    // Handle update tour
    const handleUpdateTour = () => {
        const begin = new Date(dateBeginTour)
        const end = new Date(dateEndTour)
        if(begin <= end){
            updateTour()
            updateDetailTour()
            window.location.reload(true)
        }else{
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
       
    }

    // Get guide for individual tour
   useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/admin-controller/get-guide-tour/${data._id}`,{
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(res => {
            setGuide({
                ...guide,
                name: res.data.data.id_user.name
            })
        })
        .catch(err => {
            // console.log(err);
        })
   },[])



    return (<>
    {/* Toast */}
    {
        showToast && <Toast type={toastType} title={toastTittle} desc={toastMsg} />
    }
    {/* Content */}
        <div>
            <li className={clsx("row", styles.tourItem)}>
                <div className="col l-1 m-1 c-0">{order + 1}</div>

                <div className="col l-3 m-3 c-12">
                    <img src={data.image} alt={data.tourName} />
                </div>
                <div className={clsx("col l-6 m-6 c-12", styles.tourInfo)}>
                    <p>Tên tour: {data.tourName}</p>
                    <b>Đơn giá: {data.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                    <p>Số khách hiện tại: {data.currentCustomer}</p>
                    <p>Số khách giới hạn: {data.maxCustomer}</p>
                    <p>Ngày cập nhật: {data.dayUpdate.slice(0, 10)}</p>
                </div>

                <div className={clsx("col l-2 m-2 c-12", styles.wrapBtns)}>
                        <button onClick={handleShowDetail}>Chi tiết</button>
                        <button onClick={deleteTour}>Xóa</button>
                </div>
            </li>

            {/* Modal detail */}
            {
                showModal && (
                    <div className={clsx(styles.containerModal)}>
                        <div className={clsx(styles.modalDetailTour)}>
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
                                    <div className={clsx(styles.wrapBtn)}>
                                        <button
                                            onClick={handleUpdateTour}
                                            className={clsx(styles.btnUpdateTour)
                                        }>Lưu
                                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-save" viewBox="0 0 16 16">
                                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                            </svg>
                                        </button>
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="tourName" className={clsx(styles.formLabel)}>Tên tour: </label>
                                            <input id="tourName" type="text" className={clsx(styles.formControl)} 
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setTourName(e.target.value)
                                                }}
                                                value={tourName}
                                            />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="place" className={clsx(styles.formLabel)}>Địa điểm: </label>
                                            <input id="place" type="text" className={clsx(styles.formControl)}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setPlace(e.target.value)
                                                }}
                                                value={place}  />
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
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

                                        {/* List Guide  */}
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                           
                                            <label htmlFor="guide" className={clsx(styles.formLabel)}>Người dẫn tour: {guide.name || 'Chưa ai dẫn'}</label>
                                            <select id="guide" className={clsx(styles.formControl)}
                                                onChange={(e) => {
                                                    setGuide({
                                                        ...guide,
                                                        name: e.target.options[e.target.selectedIndex].value,
                                                        id: e.target.options[e.target.selectedIndex].id
                                                    })
                                                }}
                                            >
                                            <option value=""></option>
                                            {/* Options guide */}
                                            {
                                                guideInfo.map((guide, i) => {
                                                    if(guide.id_user._id){
                                                        console.log("OK");
                                                        return (
                                                            <option
                                                                id={guide.id_user._id}
                                                                value={guide.id_user.name}
                                                                key={i}
                                                            >
                                                                {guide.id_user.name}: {guide.username}
                                                            </option>
                                                        )
                                                    }
                                                })
                                            }
                                            </select>
                                            
                                            <button
                                                className={clsx(styles.btnGuide)}
                                                onClick={updateGuide}
                                            >
                                            Lưu người dẫn</button>
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="supplierTour" className={clsx(styles.formLabel)}>Nhà cung cấp: </label>
                                            <input id="supplierTour" type="text" className={clsx(styles.formControl)} 
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setSupplierTour(e.target.value)
                                                }}
                                                value={supplierTour} />
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Đơn giá:
                                                <b>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                                            </label>
                                            <input id="price" type="number" className={clsx(styles.formControl)}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setPrice(e.target.value)
                                                }}
                                                value={price} 
                                            />
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="status" className={clsx(styles.formLabel)}>Trạng thái: </label>
                                            <select id="status" className={clsx(styles.formControl)}
                                                onChange={e =>{
                                                    getDataSend(e)
                                                    setStatus(e.target.options[e.target.selectedIndex].value)
                                                }}
                                            >   
                                                <option value={status}>{status}</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Activing">Activing</option>
                                                <option value="Ending">Ending</option>
                                            </select>
                                        </div>

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="maxCustomer" className={clsx(styles.formLabel)}>Số lượng tối đa:</label>
                                            <input id="maxCustomer" type="number" className={clsx(styles.formControl)}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setMaxCustomer(e.target.value)
                                                }}
                                                value={maxCustomer}  />
                                        </div>
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="date_begin_tour" className={clsx(styles.formLabel)}>Ngày bắt đầu:</label>
                                            <input id="date_begin_tour" type="date" className={clsx(styles.formControl)}
                                                value={dateBeginTour}
                                                onChange={e => { 
                                                    setDateBeginTour(e.target.value)
                                                }}
                                            />

                                            
                                        </div>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="date_end_tour" className={clsx(styles.formLabel)}>Ngày kết thúc:</label>
                                            <input id="date_end_tour" type="date" className={clsx(styles.formControl)}
                                                value={dateEndTour}
                                                onChange={e => { 
                                                    setDateEndTour(e.target.value)
                                                }}
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Ảnh</label>
                                            <input
                                                id="image"
                                                className={clsx(styles.formControl)} 
                                                type="input" placeholder="Nhập đường dẫn"
                                                value={image}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setImage(e.target.value)
                                                }}
                                                />
                                            <img src={image} alt=""/>
                                        </div>
                                    </div>


                                    <div className={clsx(styles.row)}>
                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="intro" className={clsx(styles.formLabel)}>Giới thiệu:</label> 
                                            <textarea id="intro" className={clsx(styles.formControl)} 
                                                value={intro}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setIntro(e.target.value)
                                                }}
                                            />
                                        </div>                           

                                        <div className={clsx("col l-6 m-6 c-12", styles.formGroup)}>
                                            <label htmlFor="" className={clsx(styles.formLabel)}>Nhận xét:</label> 
                                            <textarea id="reviews_tour"  className={clsx(styles.formControl)} 
                                                value={reviewsTour}
                                                onChange={e => { 
                                                    getDataSend(e)
                                                    setReviewsTour(e.target.value)
                                                }}
                                            />
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
                    <h2 className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    </h2>
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
          
        </div>
    </>
    )
}