import clsx from 'clsx'
import styles from './Footer.module.scss'

function Footer(){

    return <footer id="contact" className="container">
        <div className="row grid wide">
            <div className={clsx("col l-4 m-12 c-12", styles.footerItem)}>
                <h1>Love Travel</h1>
                <p>
                    <i className="fa-solid fa-phone-volume"></i>
                    <span>Số điện thoại: 03933668123</span>
                </p>
                <p>
                    <i className="fa-solid fa-envelope"></i>
                    <span>Gmail: lovetravel@gmail.com</span>
                </p>
                <p>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Địa chỉ: 75 Tây Sơn, Đống Đa, Hà Nội</span>
                </p>
            </div>

            <div className={clsx("col l-4 m-12 c-12", styles.footerItem)}>
                <h1>Cộng đồng </h1>
                <p>
                    <i className="fa-brands fa-facebook"></i>
                    <span>Facebook: <a href="#">facebook.com/viettourofficial</a></span>
                </p>
                <p>
                    <i className="fa-brands fa-instagram"></i>
                    <span>Instatagram: <a href="#"> instagram.com/viettourofficial</a></span>
                </p>
                <p>
                    <i className="fa-brands fa-pinterest"></i>
                    <span>Pinterest: <a href="#"> pinterest.com/viettourofficial</a></span>
                </p>
            </div>
            <div className={clsx("col l-4 m-12 c-12", styles.footerItem)}>
                <h1>Đối tác truyền thông </h1>
                <p>
                    <span>Tuổi trẻ online: <a href="#"> https://dulich.tuoitre.vn</a></span>
                </p>
                <p>
                    <span>Vietnam Express: <a href="#">  https://vnexpress.tuoitre.vn</a></span>
                </p>
                <p>
                    <span>Báo thanh niên: <a href="#">  https://thanhnien.vn</a></span>
                </p>
            </div>
            
        </div>
    </footer>
}

export default Footer