import {useState, useEffect} from 'react'
import clsx from 'clsx'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import styles from './Suggest.module.scss'
import adv1 from './img-1.jpg'
import adv2 from './img-2.jpg'
import adv3 from './img-3.jpg'

import imgEvent from './end_event.png'
import qrCode from './qr-code.png'
import apple from './apple-store.svg'
import googlePlay from './google-play.svg'

const listAdv = [
    {
        id: 1,
        img: adv1,
        content: "Giảm ngay 10% các tour khi đặt lần đầu"
    },
    {
        id: 2,
        img: adv2,
        content: `Nhận hộp quà đặc biệt từ Love Travel`,
        icon: true
    },
    {
        id: 3,
        img: adv3,
        content: "Sự kiện của tháng - Event Love Travel"
    },
]


const apiTours = "http://localhost:8000/api/tour/get-all-tour"
function Suggest(){
    const [listTours, setListTours] = useState([])
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()
    const suggestTours = listTours.filter((tour) => tour.price <= 120000)

    useEffect(() => {
        // Call api
        const getTours = (page) => {
            axios.get(apiTours, {
                params: { page: page },
            })
            .then((res) => {
                setListTours(res.data.data)
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
          };
          getTours(1);

          
        }, [])
        
        

    return <div id="suggest" className={clsx("container grid wide ", styles.suggest)}>
        {/* Suggest tours */}
        <div className="row">
            <div className="col l-4">
                <h1>Đi cùng <span className="brand-name" style={{fontSize: 36}}>Love Travel</span></h1>
                <h2>Ứng dụng Web du lịch số 1 Việt Nam</h2>
                <p className={clsx(styles.text)}>Love Travel hiện là nền tảng đặt tour du lịch thịnh hành nhất tại Việt Nam. Đồng hành cùng chúng tôi, bạn có những chuyến đi mang đầy kỉ niệm tuyệt vời. Sứ mệnh của Love Travel là đem lại trải nghiệm hài lòng cho người dùng về tour du lịch, nghỉ dưỡng, khám phá đất nước Việt Nam.</p>

                <div className="row" >
                    <div className="col l-6 m-4">
                        <img className="qr-code" src={qrCode} />
                    </div>
                    <div className={clsx("row col l-6 m-8", styles.dowloadApps)}>
                        <img src={apple} />
                        <img src={googlePlay} />
                    </div>
                </div>
            </div>
            <div className={clsx("col l-8", styles.suggestTour)}>
                <h1 className="text-center">Tour gợi ý từ <span className="brand-name" style={{fontSize: 36}}>Love Travel</span> </h1>
                <ul className={clsx("row", styles.listTours)}>
                    {
                        suggestTours.map((tour, i) => 
                            <li className={clsx("l-5 m-5 c-5", styles.suggestTour)} 
                                style={{backgroundImage: 'url('+ tour.image +')'}}
                                key={i}
                                onClick={() => navigate('/listTour')}
                            >
                                <h2 className={clsx(styles.suggestPlace)}>{tour.tourName}
                                    <p>Chỉ với {tour.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>                      
                                </h2>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>

        <h1>Ưu đãi từ <span className="brand-name" style={{fontSize: 36}}>Love Travel</span></h1>
        <p className={clsx(styles.text)}>Nhanh tay <a href="#">Đăng ký</a> để nhận ngay ưu đãi độc quyền ngay hôm nay</p>
        
        {/* Adv */}
        <ul className={clsx(styles.listAdv)}>
            {listAdv.map((adv, i) => {
                return <li onClick={() => setShowModal(true)} className={clsx("l-4 m-12 c-12", styles.advImg)} style={{backgroundImage: 'url('+adv.img+')'}}  key={i}>
                    <h2 className={clsx(styles.advContent)}>{adv.content} {adv.icon && <i className="brand-name fa-solid fa-gift"></i>}</h2>
                </li>
            })}
        </ul>

        {/* Modal end event */}
        {showModal && (
            <div className={clsx(styles.containerModal)}>
                <div className={clsx(styles.modalAdv)}>
                    {/* Close button */}
                    <div className={clsx(styles.closeBtn)}>
                        <button onClick={() => setShowModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                        </button>
                    </div>
                    <h1>Sự kiện sắp diễn ra...</h1>
                <div>
                    <img src={imgEvent} alt="" />
                </div>
                </div>
            </div>
        )}
    </div>
}
 
export default Suggest