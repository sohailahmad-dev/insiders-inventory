import React, { useEffect, useRef, useState } from 'react';
import './Slider1.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Skeleton } from '@mui/material';
import Btn from '../btn/Btn';
import Card from '../card/Card';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getData } from '../../config/apiCalls';
import toast from 'react-hot-toast';

export default function Slider1() {
    let [properties, setProperties] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [favorites, setFavorites] = useState([]);

    const isFavorite = (propertyId) => {
        let isFavorite = favorites.some(favorite => favorite._id?.toString() === propertyId?.toString());
        return isFavorite;
    };

    function getProperties() {
        setIsLoading(true);
        getData('properties').then((response) => {
            setProperties(response?.properties.slice(0, 8));
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    function getFavorites() {
        setIsLoading(true);
        getData('favorites').then((response) => {
            setFavorites(response?.properties);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    const updateFavorites = () => {
        getFavorites();
        getProperties();
    }

    useEffect(() => {
        getProperties();
        getFavorites();
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
        <section className="home-sec8-box slider1">
            {/* slider ruler  */}
            <div className='slider1-upper'>
                <div className="heading1">Off-Market<span>Properties</span></div>
            </div>

            <div className='slider1-prev' onClick={prevSlide}>
                <ArrowBackIosIcon
                    fontSize='large'
                    sx={{ cursor: 'pointer', color: '#4DAD49' }}
                />
            </div>
            <div className='slider1-next' onClick={nextSlide}>
                <ArrowForwardIosIcon
                    fontSize='large'
                    sx={{ cursor: 'pointer', color: '#4DAD49' }}
                />
            </div>
            <div className='home-slider1'>
                <Slider
                    ref={slider => { sliderRef = slider; }}
                    {...settings}>
                    {isLoading ? (
                        // Skeleton loader for better user experience
                        Array.from(new Array(4)).map((_, index) => (
                            <div key={index}>
                                <Skeleton variant="rectangular" width={300} height={200} />
                                <Skeleton variant="text" width={200} />
                                <Skeleton variant="text" width={150} />
                            </div>
                        ))
                    ) : (
                        properties.map(item => (
                            <Card
                                key={item?._id}
                                property={item}
                                images={item?.images}
                                title={item?.title}
                                status={item?.status}
                                country={item?.country}
                                propertyType={item?.propertyInformation?.propertyType}
                                price={item?.price}
                                ROI={item?.assignment?.portentialRoi}
                                initialInvestment={item?.assignment?.initialInvestment}
                                bedrooms={item?.propertyInformation?.bedrooms}
                                bathrooms={item?.propertyInformation?.bathrooms?.full}
                                bathroomsHalf={item?.propertyInformation?.bathrooms?.half}
                                sqft={item?.propertyInformation?.sqft}
                                isFavourite={isFavorite(item?._id)}
                                onFavorite={updateFavorites}
                            />
                        ))
                    )}
                </Slider>
            </div>
        </section>
    )
}
