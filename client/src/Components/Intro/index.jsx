import {useState, useEffect} from 'react'
import clsx from 'clsx'
import {Routes, Route, Link} from 'react-router-dom'

import Register from '../Forms/Register'
import slide1 from './slide-1.jpg'
import slide2 from './slide-2.jpg'
import slide3 from './slide-3.jpg'

import styles from './Intro.module.scss'

const INTRO_TITLE = "Chào mừng bạn đến với Love Travel"
const INTRO_SUB_TITLE = "Website đặt tour du lịch số 1 Việt Nam"

const slides= [
  { id: 0,
    img: slide1,
    title: "Tràng An",
    quote: "Danh lam thắng cảnh vùng đất Ninh Bình"
  },
  { id: 1,
    img: slide2,
    title: "Hồ Gươm",
    quote: "Trái tim thủ đô"
  },
  { id: 2,
    img: slide3,
    title: "Nha Trang",
    quote: "Bãi cát trắng bên bờ biển xanh"
  }
]

const LENGTH = slides.length - 1 

export default function Intro() {
  const [slide, setSlide] = useState(0)

  const prevSlide = () => {
      setSlide((prev) => {
        return prev === 0 ? LENGTH : prev - 1
      })
  }

  const nextSlide = () => {
    setSlide((prev) => {
      return prev === LENGTH ? 0 : prev + 1
    })
  }

  useEffect(() => {
      const idTimer =  setInterval(() => {
        nextSlide()
      }, 3000)
      return () => clearInterval(idTimer)
  },[])


  return (
    <>
      <div className={clsx(styles.introContainer)}>
          <div className={clsx(styles.introContent)}>
              <h1>{INTRO_TITLE}</h1>
              <h2>{INTRO_SUB_TITLE}</h2>
          </div>
          <Link to="/auth/register" className={"btn"} > Đăng ký ngay</Link>
        
      </div>


      {/* Slides */}
      <div className={"grid wide container text-center"}>
            <h1>Địa điểm du lịch nổi bật</h1>
            <h2>Cùng <span className="brand-name">Love Travel</span> bắt đầu hành trình khám phá du lịch Việt Nam</h2>
            <div className={clsx(styles.introSlides)}>
              <img  src={slides[slide].img} alt="bg" />
              <div className={clsx(styles.introText)}>
              <h2>{slides[slide].title}</h2>
              <p>{slides[slide].quote}</p>
              </div>

              <button onClick={prevSlide} className={clsx(styles.btnLeft)}><i className="fa-solid fa-chevron-left"></i> </button>
              <button onClick={nextSlide}  className={clsx(styles.btnRight)}><i className="fa-solid fa-chevron-right"></i> </button>
            </div>
      </div>

       <Routes>
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
    
  )
}
