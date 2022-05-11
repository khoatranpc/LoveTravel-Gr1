import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Manage.module.scss"
import img from "../img_intro.jpg"
export default function Tours(){
  
    return (<div className="grid wide">
        <div className={clsx(styles.wrapSearch)}>
            <input type="search" placeholder="Tìm kiếm"
             className={clsx(styles.inputSearch)}
             
             />
        </div>

        <div className={clsx(styles.container)}>
            <div className={clsx(styles.heading)}>
                <h1>Danh sách tour</h1>
                <button>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {/* Content */}
           <div>
                <ul>
                    <li className={clsx("row", styles.tourItem)}>
                        <div className="col l-1">STT</div>
                        <div className="col l-9">
                           <div>Thông tin</div>
                        </div>

                        <div className="col l-2">
                           <span>Tùy chọn</span>
                        </div>
                    </li>

                    <li className={clsx("row", styles.tourItem)}>
                        <div className="col l-1">1</div>

                        <div className="col l-3">
                            <img src={img} alt="img" />
                        </div>

                        <div className={clsx("col l-6", styles.tourInfo)}>
                            <p>Tên tour</p>
                            <b>Đơn giá</b>
                            <p>Số khách hiện tại</p>
                            <p>Ngày cập nhật</p>
                        </div>

                        <div className={clsx("l-2", styles.wrapBtns)}>
                               <button>Chi tiết</button>
                               <button>Xóa</button>
                        </div>
                    </li>

                    
                </ul>
           </div>
        </div>
    </div>)
   
}