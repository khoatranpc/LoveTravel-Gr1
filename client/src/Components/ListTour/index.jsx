import clsx from 'clsx'
import {useState} from 'react'

import Tour from './Tour'
import Header from '../Header/Header'
import styles from "./LisTour.module.scss"
import img from './img_intro.jpg'

const tours = [
    {
        id: 1,
        tour: 'ha long',
        price: 2000,
        limit: 15
    },
    {
        id: 2,
        tour: 'ha noi',
        price: 5000,
        limit: 5
    },
    {
        id: 3,
        tour: 'da nang',
        price: 3000,
        limit: 15
    },
    {
        id: 4,
        tour: 'cam ranh',
        price: 5000,
        limit: 132
    },
    {
        id: 5,
        tour: 'ha noi',
        price: 5000,
        limit: 5
    },
    {
        id: 6,
        tour: 'da nang',
        price: 3000,
        limit: 15
    },
    {
        id: 7,
        tour: 'cam ranh',
        price: 5000,
        limit: 132
    },
]

export default function ListTour(){
    const [valueSearch, setValueSearch] = useState('')
    const [typeSearch, setTypeSearch] = useState('category')

    return <>
            <Header />
            <div className={clsx("grid wide row", styles.container)} style={{marginTop: 84}}>
            <div className="col l-3 m-12 c-12">
                <div className={clsx(styles.headingSearch)}>
                    <span>Tìm kiếm theo: </span>
                    <select name="typeSearch" id="typeSearch" onChange={(e) => setTypeSearch(e.target.options[e.target.selectedIndex].value)}>
                        <option value="category">Thể loại</option>
                        <option value="nameTour">Tên tour</option>
                        <option value="place" >Địa điểm</option>
                    </select>
                </div>
                <input type="search" placeholder="Tìm kiếm"
                    value = {valueSearch}
                    onChange={e => {
                        console.log("Tìm theo: ", typeSearch);
                        setValueSearch(e.target.value)
                    } }
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
    </>
}