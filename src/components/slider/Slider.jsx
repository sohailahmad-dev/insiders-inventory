import React, { useEffect, useState } from 'react';
import img9 from '../../assets/img/img9.jpeg'
import img8 from '../../assets/img/img8.jpeg'
import img21 from '../../assets/img/img21.jpeg'
import slider2 from '../../assets/img/slider2.png'
import slider3 from '../../assets/img/slider3.png'
import rectangle from '../../assets/img/rectangle.png'
import image1 from '../../assets/img/image1.png'
import Btn from '../btn/Btn'
import './Slider.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

export default function Slider() {

    let [currentSlide, setCurrentSlide] = useState(1);
    const slides = 3;
    const navigate = useNavigate();

    const changeSlide = () => {
        (currentSlide === slides) ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1);
    }

    useEffect(() => {
        let interval = setInterval(changeSlide, 5000);

        return () => clearInterval(interval);
    })

    const handlePreviousSlide = () => {
        if (currentSlide === 1) {
            setCurrentSlide(slides)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const handleNextSlide = () => {
        if (currentSlide === slides) {
            setCurrentSlide(1)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }


    return (
        <>
            <div className='sliderStyle'>
                {currentSlide === 1 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={img9} className='slide-rightImg' data-aos="fade-left" />
                    <div className='slide-content' data-aos="fade-right" >
                        <br />
                        <br />
                        <div className="slide-heading">
                            Welcome to <span>Maritime Education System & Job Portal</span>
                        </div>
                        <div className="slide-text">Your gateway to a promising maritime career. Explore quality education and rewarding job opportunities in the maritime industry.</div>
                        <div className="slide-btns">
                            <Btn label='Join Now' className='slide-btn' onClick={() => navigate('/SignUp')} />
                        </div>
                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                    {/* <div className="slider-bubbles-box">
                        <div className='slider-bubble'>We<div className='slider-bubble-active' /></div>
                        <div className='slider-bubble'><div className='slider-bubble-active' /></div>
                        <div className='slider-bubble'><div className='slider-bubble-active' /></div>
                    </div> */}


                </div>}
                {currentSlide === 2 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={img8} className='slide-rightImg' data-aos="fade-left" />
                    <div className='slide-content' data-aos="fade-right" >
                        <br /><br />
                        <div className="slide-heading" style={{ fontSize: '40px' }}>
                            Discover Our <span>Featured Maritime Courses</span>
                        </div>
                        <div className="slide-text">Designed to equip you with the skills needed for a successful career at sea. From navigation to marine engineering, we've got you covered.</div>
                        <div className="slide-btns">
                            <Btn label='Show Courses' onClick={() => navigate('/Courses')} className='slide-btn' />
                        </div>

                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                </div>}
                {currentSlide === 3 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={img21} className='slide-rightImg' data-aos="fade-left" />
                    <div className='slide-content' data-aos="fade-right" >
                        <br /><br />
                        <div className="slide-heading" style={{ fontSize: '40px' }}>
                            Explore  <span>Latest Job Openings</span>
                        </div>
                        <div className="slide-text">Explore the latest job openings in the maritime sector. Your next career adventure awaits – find the perfect job match on Maritime Education System & Job Portal</div>
                        <div className="slide-btns">
                            <Btn label='Show Jobs' onClick={() => navigate('/Jobs')} className='slide-btn' />
                        </div>
                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                </div>}
            </div>

        </>
    )
}

