import React, { useRef, useState } from 'react'
import './Slider1.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img3 from '../../assets/local/img3.png';
import img4 from '../../assets/local/img4.png';
import img5 from '../../assets/local/img5.png';
import prev from '../../assets/imgs/prev.png';
import next from '../../assets/imgs/next.png';
import location from '../../assets/imgs/location.png';
import { Grid } from '@mui/material';
import Btn from '../btn/Btn';

export default function Slider1() {
    let [currentSlide, setCurrentSlide] = useState(0);
    const sliderData = [
        {
            img: img3,
            status: 'Vacant'
        },
        {
            img: img4,
            status: 'Owner Occupied'
        },
        {
            img: img5,
            status: 'Tenant Occupied'
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZFyb2akvS_EkACDpyNNre3CDOCThUovLmw&s',
            status: 'Sold'
        },
        {
            img: img5,
            status: 'New'
        },
    ]
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
        <section className="home-sec8-box">
            {/* slider ruler  */}
            <div className='slider1-upper' >
                <div className="heading1">Off-Market<span>Properties</span></div>
                <div className='slider1-navigation'>
                    <img onClick={prevSlide} src={prev} alt="prev"
                        style={{
                            opacity: currentSlide === 0 ? 0.5 : 1,
                            cursor: currentSlide === 0 ? 'default' : 'pointer'
                        }}
                    />
                    <img onClick={nextSlide} src={next} alt="next"
                        style={{
                            opacity: currentSlide === (sliderData.length - 1) ? 0.5 : 1,
                            cursor: currentSlide === (sliderData.length - 1) ? 'default' : 'pointer'
                        }}
                    />
                </div>
            </div>
            <div className='home-slider1'  >
                <Slider
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {sliderData.map(item => (
                        <div className="slider1-Item" key={item?.status}>
                            <div className="slider1-img"
                                style={{ backgroundImage: `url(${item?.img})` }}
                            >
                                <span className="slider1-item-status">{item?.status}</span>
                                {/* stats  */}
                                <div className='slider1-item-statsBox'>
                                    <Grid container spacing={0} >
                                        <Grid item xs={6}>
                                            <div className="sldier1-stats-left">
                                                <div className="slider1-stats-label">Initial Investment</div>
                                                <div className="slider1-stats-figure">$45,120</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="sldier1-stats-right">
                                                <div className="slider1-stats-label">Potential ROI</div>
                                                <div className="slider1-stats-figure">37%</div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div className="sldier1-item-contents">
                                <div className="slider1-item1-heading">Luxury Apartment</div>
                                <div className="slider1-item-price">$450,000</div>
                                <div className="slider1-item-specs">3 bedroom | 1 bathroom | 971 sq. ft.</div>
                                <div className="slider1-item-lcation">
                                    <img src={location} alt="location-icon" />
                                    Australia</div>
                                <Btn
                                    label='Login to make an offer'
                                ></Btn>
                            </div>
                        </div>
                    ))}
                </Slider>





            </div>


        </section>
    )
}