import clsx from 'clsx'

import styles from "./LisTour.module.scss"
import img from './img_intro.jpg'

export default function ListTour(){

    return <div className={clsx("grid wide row", styles.container)} style={{marginTop: 80}}>
            <div className="col l-3 m-12 c-12">
                <div className={clsx(styles.headingSearch)}>
                    <span>Tìm kiếm theo: </span>
                    <select name="typeSearch" id="typeSearch">
                        <optgroup label="Tìm kiếm theo">
                            <option value="Thể loại">Thể loại</option>
                            <option value="Tên tour">Tên tour</option>
                            <option value="Địa điểm" >Địa điểm</option>
                        </optgroup>
                    </select>
                </div>
                <input type="search" placeholder="Tìm kiếm" />
            </div>

            <div className={clsx("col l-9 m-12 c-12",styles.listTour)}>
                <div className={clsx("col l-3 m-6 c-6", styles.tour)}>
                    <img src={img} alt="" />
                    <h3>Tên tour</h3>
                    <p>Địa điểm</p>
                    <p>Giá</p>
                    <p>Số lượng tour</p>
                    <p>Giới thiệu</p>
                    <button>Đặt tour</button>
                </div>
                <div className={clsx("col l-3 m-6 c-6", styles.tour)}>
                    <img src={img} alt="" />
                    <h3>Tên tour</h3>
                    <p>Địa điểm</p>
                    <p>Giá</p>
                    <p>Số lượng tour</p>
                    <p>Giới thiệu</p>
                    <button>Đặt tour</button>
                </div>
                <div className={clsx("col l-3 m-6 c-6", styles.tour)}>
                    <img src={img} alt="" />
                    <h3>Tên tour</h3>
                    <p>Địa điểm</p>
                    <p>Giá</p>
                    <p>Số lượng tour</p>
                    <p>Giới thiệu</p>
                    <button>Đặt tour</button>
                </div>
                <div className={clsx("col l-3 m-6 c-6", styles.tour)}>
                    <img src={img} alt="" />
                    <h3>Tên tour</h3>
                    <p>Địa điểm</p>
                    <p>Giá</p>
                    <p>Số lượng tour</p>
                    <p>Giới thiệu</p>
                    <button>Đặt tour</button>
                </div>
            </div>
    </div>
}