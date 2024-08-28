import React, { useRef, useState } from 'react'
import './Slider1.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img3 from '../../assets/local/img3.png';
import img4 from '../../assets/local/img4.png';
import img5 from '../../assets/local/img5.png';

import { Grid } from '@mui/material';
import Btn from '../btn/Btn';
import Card from '../card/Card';
import prev from '../../assets/imgs/prev1.png';
import next from '../../assets/imgs/next1.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Slider1() {
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
        sliderRef.slickPrev();

    }

    const nextSlide = () => {

        sliderRef.slickNext();

    }
    return (
        <section className="home-sec8-box slider1"  >
            {/* slider ruler  */}
            <div className='slider1-upper' >
                <div className="heading1">Off-Market<span>Properties</span></div>
                {/* <div className='slider1-navigation'> */}

                {/* </div> */}
            </div>
            {/* <img onClick={prevSlide} src={prev} alt="prev"
                className='slider1-prev'
                style={{
                    opacity: 1,
                    cursor: 'pointer'
                }}
            />

            <img onClick={nextSlide} src={next} alt="next"
                className='slider1-next'
                style={{
                    opacity: 1,
                    cursor: 'pointer'
                }}
            /> */}

            <div className='slider1-prev' onClick={prevSlide}>
                <ArrowBackIosIcon
                    fontSize='large'
                    sx={{
                        cursor: 'pointer',
                        color: '#4DAD49'
                    }}
                />
            </div>
            <div className='slider1-next' onClick={nextSlide}>
                <ArrowForwardIosIcon
                    fontSize='large'
                    sx={{
                        cursor: 'pointer',
                        color: '#4DAD49'
                    }}
                />
            </div>
            <div className='home-slider1'  >
                <Slider
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {sliderData.map(item => (
                        <Card
                            key={item?.status}
                            status={item?.status}
                            img={item?.img}
                        />
                    ))}
                </Slider>





            </div>


        </section>
    )
}