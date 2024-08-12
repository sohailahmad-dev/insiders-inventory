import React, { useRef, useState } from 'react'
import './Slider3.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img3 from '../../assets/local/img3.png';
import img4 from '../../assets/local/img4.png';
import img5 from '../../assets/local/img5.png';
import prev from '../../assets/imgs/prev1.png';
import next from '../../assets/imgs/next1.png';


export default function Slider3() {
    let [currentSlide, setCurrentSlide] = useState(0);
    const sliderData = [img3, img4, img5, img3, img4, img5, img3, img4, img5]
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,

    };

    let sliderRef = useRef(null);

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            sliderRef.slickPrev();
        }
    }

    const nextSlide = () => {
        if (currentSlide < (sliderData.length - 1)) {
            setCurrentSlide(currentSlide + 1);
            sliderRef.slickNext();
        }
    }
    return (
        <section className='slider3' >
            {/* slider ruler  */}
            {/* navigation  */}
            <img onClick={prevSlide} src={prev} alt="prev"
                className='slider2-prev'
                style={{
                    opacity: currentSlide === 0 ? 0.5 : 1,
                    cursor: currentSlide === 0 ? 'default' : 'pointer'
                }}
            />

            <img onClick={nextSlide} src={next} alt="next"
                className='slider2-next'
                style={{
                    opacity: currentSlide === (sliderData.length - 1) ? 0.5 : 1,
                    cursor: currentSlide === (sliderData.length - 1) ? 'default' : 'pointer'
                }}
            />

            <div  >
                <Slider
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {sliderData.map((item, i) => (
                        <span
                            key={item}
                            className='slider3-item'
                        >

                            <img src={item} alt="img" className='slider3-img' />
                        </span>
                    ))}
                </Slider>




            </div>


        </section>
    )
}