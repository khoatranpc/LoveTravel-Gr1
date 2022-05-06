import clsx from 'clsx'
import {useState} from 'react'

import Tour from './Tour'
import styles from "./LisTour.module.scss"
import img from './img_intro.jpg'

const tours = [
    {
        id: 1,
        tour: 'ha long',
        price: 2000
    },
    {
        id: 2,
        tour: 'ha noi',
        price: 5000
    },
    {
        id: 3,
        tour: 'da nang',
        price: 3000
    },
]

export default function ListTour(){
    const [valueSearch, setValueSearch] = useState('')


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
                <input type="search" placeholder="Tìm kiếm"
                    value = {valueSearch}
                    onChange={e => setValueSearch(e.target.value) }
                />
            </div>

            <div className={clsx("col l-9 m-12 c-12",styles.listTour)}>
               {
                   tours.map((tour) => {
                       return (
                           <Tour key={tour.id} data={tour} />
                       )
                   })
               }
                
            </div>
    </div>
}