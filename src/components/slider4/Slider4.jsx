import React, { useEffect, useRef, useState } from 'react'
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
import { getData } from '../../config/apiCalls';
import Loader from '../loader/Loader';
import toast from 'react-hot-toast';

export default function Slider4() {
    let [categories, setCategories] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    function getCategories() {
        setIsLoading(true)

        getData('categories').then((response) => {
            console.log(response.categories)
            setCategories(response?.categories)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])
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
                    slidesToShow: 4,
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
                    {categories && categories.length > 0 &&
                        categories.map(e => (
                            <div className="home-card3">
                                <div className='home-card3-imgBox'
                                    style={{ backgroundImage: `url(${e?.image})` }}
                                >
                                </div>
                                <div className='home-card3-type'>
                                    {e?.name}
                                </div>
                                <div className="home-card3-description">{e?.description}</div>
                            </div>
                        )
                        )
                    }
                </Slider>

            </div>

            <Loader isLoading={isLoading} />
        </section>
    )
}