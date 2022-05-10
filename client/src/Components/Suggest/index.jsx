import clsx from 'clsx'
import styles from './Suggest.module.scss'

import adv1 from './img-1.jpg'
import adv2 from './img-2.jpg'
import adv3 from './img-3.jpg'

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

const suggestTours = [
    {
        id: 1,
        place: "Cầu Vàng Đà Nẵng",
        amount: 300,
        img: adv1
    },
    {
        id: 2,
        place: "Phố cổ Hội An",
        amount: 100,
        img: adv1
    },
    {
        id: 3,
        place: "Cù Lao Chàm",
        amount: 200,
        img: adv1
    },
    {
        id: 4,
        place: "Vịnh Hạ Long",
        amount: 310,
        img: adv1
    },
]

function Suggest(){

    return <div id="suggest" className="container grid wide">
         <div className="row container">
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
                        suggestTours.map((tour) => 
                            <li key={tour.id} className={clsx("l-5 m-5 c-5", styles.suggestTour)} style={{backgroundImage: 'url('+ tour.img +')'}}>
                                <h2 className={clsx(styles.suggestPlace)}>{tour.place}
                                    <p>Số lượng: {tour.amount} tours</p>                      
                                </h2>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
        <h1>Ưu đãi từ <span className="brand-name" style={{fontSize: 36}}>Love Travel</span></h1>
        <p className={clsx(styles.text)}>Nhanh tay <a href="#">Đăng ký</a> để nhận ngay ưu đãi độc quyền ngay hôm nay</p>
        <ul className={clsx(styles.listAdv)}>
            {listAdv.map((adv, i) => {
                return <li className={clsx("l-4 m-12 c-12", styles.advImg)} style={{backgroundImage: 'url('+adv.img+')'}}  key={i}>
                    <h2 className={clsx(styles.advContent)}>{adv.content} {adv.icon && <i className="brand-name fa-solid fa-gift"></i>}</h2>
                </li>
            })}
        </ul>

       
    </div>
}
 
export default Suggest