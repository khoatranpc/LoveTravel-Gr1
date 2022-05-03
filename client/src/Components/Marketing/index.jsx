import clsx from 'clsx'
import styles from './Marketing.module.scss'

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

function Marketing(){

    return <div className="container grid wide">
        <h1>Ưu đãi từ <span className="brand-name" style={{fontSize: 36}}>Love Travel</span></h1>
        <p className={clsx(styles.text)}>Nhanh tay <a href="#">Đăng ký</a> để nhận ngay ưu đãi độc quyền ngay hôm nay</p>
        <ul className={clsx("row", styles.listAdv)}>
            {listAdv.map((adv, i) => {
                return <li className={clsx("l-4", styles.advImg)} style={{backgroundImage: 'url('+adv.img+')'}}  key={i}>
                    <h2 className={clsx(styles.advContent)}>{adv.content} {adv.icon && <i className="brand-name fa-solid fa-gift"></i>}</h2>
                </li>
            })}
        </ul>
        <div className="row container">
            <div className="col l-4">
                <h1>Đi cùng <span className="brand-name" style={{fontSize: 36}}>Love Travel</span></h1>
                <h2>Ứng dụng web du lịch số 1 Việt Nam</h2>
                <p className={clsx(styles.text)}>Viet Tour hiện là nền tảng đặt tour du lịch thịnh hành nhất tại Việt Nam. Đồng hành cùng chúng tôi, bạn có những chuyến đi mang đầy kỉ niệm tuyệt vời. Sứ mệnh của Viet Tour là đem lại trải nghiệm hài lòng cho người dùng về tour du lịch, nghỉ dưỡng, khám phá đất nước Việt Nam.</p>

                <div className="row">
                    <div className="col l-6 qr-code">
                        <img src={qrCode} />
                    </div>
                    <div className={clsx("row col l-6", styles.dowloadApps)}>
                        <img src={apple} />
                        <img src={googlePlay} />
                    </div>
                </div>
            </div>
            <div className="col l-8">

            </div>
        </div>
    </div>
}
 
export default Marketing