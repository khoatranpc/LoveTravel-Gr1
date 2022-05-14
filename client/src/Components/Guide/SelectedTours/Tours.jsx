import clsx from 'clsx'
import {useState} from 'react'

import styles from "../Guide.module.scss"

export default function Tours(){
    const [listTours, setListTours] = useState([])
    const [page, setPage] = useState(1)
    const [showAddModal, setShowAddModal] = useState(false)


    return (
        <div className="grid wide">
            <ul ref={scrollRef}>
                <li className={clsx("row", styles.tourItem)}>
                    <div className="col l-1">STT</div>
                    <div className="col l-9">
                    <div>Thông tin</div>
                    </div>

                    <div className="col l-2">
                    <span>Tùy chọn</span>
                    </div>
                </li>
                {/* {
                    listTours.map((tour, index) => {
                        return (
                            <Tour key={tour._id} data={tour} order={index} />
                        )
                    })
                } */}
            </ul>
        </div>
    )
}