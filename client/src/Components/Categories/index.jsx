import clsx from 'clsx'
import {Link} from 'react-router-dom'

import styles from './Categories.module.scss'


import category1 from './co-do-hue.jpg'
import category2 from './phong-nha-ke-bang.jpg'
import category3 from './phu-quoc.jpg'

const categories = [
    { 
        id: 1,
        title: 'Di tích lịch sử',
        quote: 'Nếu bạn là người yêu những giá trị văn hóa của nhiều vùng đất trong và ngoài nước, muốn được tham quan các di tích lịch sử nổi tiếng thì đây chính là hình thức du lịch tuyệt vời.',
        img: category1,
    },
    { 
        id: 2,
        title: 'Sinh thái khám phá',
        quote: 'Khi cuộc sống hiện đại trở nên quá áp lực, ngột ngạt thì du lịch sinh thái giờ đây nổi lên như một trào lưu mới. Phù hợp cho những du khách thích trải nghiệm, hòa mình vào thiên nhiên và sẵn sàng cho những thử thách không ngờ tới.',
        img: category2,
    },
    { 
        id: 3,
        title: 'Nghỉ dưỡng',
        quote: 'Giúp du khách lấy lại tinh thần, sức khỏe thông qua các hình thức trị liệu, dịch vụ chăm sóc cao cấp tại resort,....',
        img: category3,
    },
]

function Categories(){
    return (
        <div id="category" className={"container grid wide text-center"}>
            <h1>Thể loại tour phổ biến</h1>
            <h2>Việt Nam nằm trong những quốc gia có hệ sinh thái du lịch phong phú và đa dạng nhất trên thế giới</h2>
            <ul>
                {categories.map((category, i) => {
                    return <li className={clsx(styles.category)}  key={i}>
                        <h1>{category.title}</h1>
                        <h2>{category.quote}</h2>
                        <div className={clsx(styles.categoryItem)} style={{backgroundImage: 'url('+category.img+')'}}>
                            <button><Link to="/listTour" >Xem ngay</Link></button>
                        </div>
                    </li>
                })}
            </ul>
            <div >
            </div>
        </div>
    )
}

export default Categories