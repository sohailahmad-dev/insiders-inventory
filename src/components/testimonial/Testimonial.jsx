import React, { useRef, useState } from 'react';
import './Testimonial.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prev from '../../assets/imgs/prev.png';
import next from '../../assets/imgs/next.png';

export default function Testimonial() {
    let [currentSlide, setCurrentSlide] = useState(0);
    const sliderData = [
        {
            id: 1,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHiGq5x0SqinC4KFPlAT-L5DEnn_5reux9sQ&s',
            name: 'John Doe',
            description: 'Web Designer, Biffco Enterprises Ltd.',
            review: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus ',
        },
        {
            id: 2,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOE2AaCGRhz7g3ribGzHaOxbRMzp1MCGTnDg&s',
            name: 'Mr. Thomas',
            description: 'Web Designer, Biffco Enterprises Ltd.',
            review: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus ',
        },
        {
            id: 3,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwJRsxUrb9hB9VR8myjuFSrP23y9WPURSFQ&s',
            name: 'Eldon Jack',
            description: 'Web Designer, Biffco Enterprises Ltd.',
            review: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus ',
        },
        {
            id: 4,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVisGkyp_w7pFpDd8inDuKQX12irab4SR1Q&s',
            name: 'Mr. Jack',
            description: 'Web Designer, Biffco Enterprises Ltd.',
            review: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus ',
        },
        {
            id: 5,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLP65qWrL27IKDzKLmVWZOl_6kzv1aKFB8g&s',
            name: 'Jenny',
            description: 'Web Designer, Biffco Enterprises Ltd.',
            review: 'Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus AVestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus ',
        },
    ]
    var settings = {
        className: "center",
        centerMode: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 2,
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
                    initialSlide: 2,
                    infinite: true,
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
            <div className="heading1 text-center">What Our<span>Clients Say</span></div>

            <div className='home-slider1'  >
                <Slider
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {sliderData.map(item => (
                        <div className="slider2-Item" key={item?.id}>
                            <p>{item?.review}</p>
                            <div className='testimonial-bottom' >
                                <div className="testimonial-bgImg"
                                    style={{ backgroundImage: `url(${item?.img})` }}
                                ></div>
                                {/* <img className='testimonial-img' src={item?.img} alt="client" /> */}
                                <div>
                                    <div className="testimonial-name">{item?.name}</div>
                                    <div className="testimonial-description">{item?.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>





            </div>
            <div className='slider1-navigation text-center'>
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

        </section>
    )
}