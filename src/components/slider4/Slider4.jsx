import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getData } from '../../config/apiCalls';
import { useNavigate } from 'react-router-dom';

export default function Slider4() {
    let [categories, setCategories] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function getCategories() {
        setIsLoading(true);
        getData('categories').then((response) => {
            setCategories(response?.categories);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

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
    };

    const nextSlide = () => {
        sliderRef.slickNext();
    };

    return (
        <section className="home-sec8-box slider1">
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

            <div className='home-slider1'>
                <Slider
                    ref={slider => { sliderRef = slider; }}
                    {...settings}>
                    {isLoading ? (
                        // Circular skeleton loader during loading state
                        Array.from(new Array(4)).map((_, index) => (
                            <div key={index} className="home-card3">
                                <Skeleton
                                    variant="circular"
                                    width={200}
                                    height={200}
                                    sx={{ margin: 'auto', marginBottom: '16px' }}
                                />
                                <Skeleton variant="text" width={150} sx={{ margin: 'auto' }} />
                                <Skeleton variant="text" width={120} sx={{ margin: 'auto' }} />
                            </div>
                        ))
                    ) : (categories && categories?.length > 0 &&
                        categories.map((e, key) => (
                            <div className="home-card3" key={key}
                                onClick={() => navigate(`/Properties/${e?.name}`)}
                            >
                                <div className='home-card3-imgBox'
                                    style={{ backgroundImage: `url(${e?.image})`, borderRadius: '50%' }}
                                >
                                </div>
                                <div className='home-card3-type'>
                                    {e?.name}
                                </div>
                                <div className="home-card3-description">{e?.description}</div>
                            </div>
                        ))
                    )}
                </Slider>
            </div>
        </section>
    );
}
