import React, { useEffect } from 'react'
import './AboutUs.css'
import logo from '../../assets/img/logo.png'
import NavBar from '../../components/navbar/Navbar'
import Slider from '../../components/slider/Slider'
import hub from '../../assets/img/hub.jpeg'
import career from '../../assets/img/career.jpeg'
import jobPortal from '../../assets/img/jobPortal.jpeg'
import excellence from '../../assets/img/excellence.jpeg'
import excellence1 from '../../assets/img/excellence1.png'
import support from '../../assets/img/support.jpeg'
import resources from '../../assets/img/resources.jpeg'
import img9 from '../../assets/img/img9.jpeg'
import { Grid } from '@mui/material'
import Btn from '../../components/btn/Btn'
import Footer from '../../components/footer/Footer'




export default function AboutUs() {


    const aboutItems = [
        {
            icon: excellence,
            heading: 'Maritime Education Excellence',
            description: 'Top-tier courses blending theory and hands-on experience for a robust educational foundation.'
        },
        {
            icon: jobPortal,
            heading: 'Job Portal Precision',
            description: 'Navigate career waves seamlessly. Explore curated maritime job opportunities and connect with employers for a fulfilling career.'
        },
        {
            icon: career,
            heading: 'Personalized Career Counseling',
            description: 'Tailored career counseling to align your skills with rewarding maritime opportunities.'
        },
        {
            icon: hub,
            heading: 'Industry Networking Hub',
            description: 'Connect with professionals, attend events, and join forums for valuable maritime community connections.'
        },
    ]
    const aboutSection3Items = [
        {
            heading: 'Cutting-Edge Learning',
            description: "Experience excellence in maritime education with our state-of-the-art classrooms, simulation labs, and industry-relevant training equipment.",
            bgColor: '#bdffb3',
            borderColor: '#96FF44'
        },
        {
            heading: '24/7 Job Assistance',
            description: 'Receive round-the-clock support in your job search. Our dedicated team provides assistance with applications, resume building, and interview preparation.',
            bgColor: '#d0efff',
            borderColor: '#2A5DDE'
        },
        {
            heading: 'Career Resources',
            description: 'Access a wealth of career resources, from industry insights to resume templates, empowering you to make informed decisions about your maritime journey.',
            bgColor: ' #ccceff',
            borderColor: '#2B72C2'
        },
    ]

   

    return (
        <div>
            <NavBar />
            <section className='aboutUs-hero'>
                <img src={img9} alt="img"  />
            </section>
            <section>
                <div className='about-a'>
                    <div className='about-heading heading2' data-aos="fade-up">Welcome to Maritime Education System & Job Portal</div>
                    <div className='about-text' data-aos="fade-up">Your comprehensive platform for navigating the waters of maritime education and career opportunities. We're your anchor to a promising maritime career, providing a seamless connection between quality education and rewarding job prospects in the maritime industry. Set sail on a journey of knowledge and discovery with us.</div>
                </div>
            </section>
            <section >
                <div className="cus-div" id='about-skew2'>
                    <div className="skew-helper-up"></div>
                </div>
                <div className="cus-div" id='about-skew3'>
                    <div className="about-content">
                        <div className='heading about-heading-mobile' data-aos='fade-left'  >
                            Our Distinct Valuable Services
                        </div>
                        <Grid container className='skewed-content-alignment'>
                            <Grid item md={8}  >
                                <Grid container spacing={3}>
                                    {
                                        aboutItems.map((item, index) => {
                                            return (
                                                <Grid key={index} item md={6}>
                                                    <div className="about-item" data-aos="zoom-in">
                                                        <div className="about-item-icon">
                                                            <img src={item.icon} alt='trade' />
                                                        </div>
                                                        <div className="about-item-content">
                                                            <div className="about-item-content-heading">{item.heading}</div>
                                                            <div className="about-item-content-text">{item.description}</div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>

                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} >
                                <div className='heading about-heading-extra' data-aos='fade-left'>
                                    Our Distinct Valuable <br /> Services
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="skew-helper-down" ></div>
            </section>
            <section>
                <div className='about-section-3'>
                    <div className="heading1" data-aos="fade-up">Our Facilities</div>
                    <div className="about-sec3-mainContent">
                        {aboutSection3Items.map((item, index) => {
                            return (
                                <div key={index} className="about-sec3-item" data-aos="fade-left">
                                    <Grid container>
                                        <Grid item sm={4}>
                                            <div className="about-sec3-item-heading" style={{ backgroundColor: item.bgColor }}>
                                                <div className='about-sec3-item-heading-border' style={{ backgroundColor: item.borderColor, color: item.borderColor }}>.</div>
                                                <div className='about-sec3-item-heading-content' >{item.heading}</div>
                                            </div>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <div className="about-sec3-item-description">{item.description}</div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section>
                <div className="about-section-4">
                    <div className="heading1" data-aos="fade-up">Why Choose Us</div>
                    <div className="about-text about-sec4-text" data-aos="fade-up">At Maritime Education System and Job Portal, we offer unparalleled maritime education, ensuring you gain the skills and knowledge essential for a successful career at sea.</div>
                    <div className="about-sec4-mainContent">
                        <Grid container spacing={5}>
                            <Grid item sm={4}>
                                <div className="about-sec4-item">
                                    <div className="about-section4-iconBox" data-aos="zoom-in">
                                        <div className="about-section4-icon">
                                            <img src={excellence1} />
                                        </div>
                                        <div className="about-sec4-icon-text">01</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading" data-aos="fade-up">Excellence in Education</div>
                                        <div className="about-sec4-item-description" data-aos="fade-up">Choose us for top-tier maritime education, equipping you with the skills and knowledge needed for a successful career at sea.</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div className="about-sec4-item about-sec4-item2" >
                                    <div className="about-section4-iconBox" data-aos="zoom-in">
                                        <div className="about-section4-icon">
                                            <img src={support} />
                                        </div>
                                        <div className="about-sec4-icon-text">02</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading" data-aos="fade-up">Seamless Career Support</div>
                                        <div className="about-sec4-item-description" data-aos="fade-up">Opt for our platform for curated job opportunities, 24/7 assistance, and personalized counseling, ensuring a smooth transition into a fulfilling maritime career.</div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item sm={4}>
                                <div className="about-sec4-item">
                                    <div className="about-section4-iconBox" data-aos="zoom-in">
                                        <div className="about-section4-icon">
                                            <img src={resources} />
                                        </div>
                                        <div className="about-sec4-icon-text">03</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading" data-aos="fade-up">Cutting-Edge Resources</div>
                                        <div className="about-sec4-item-description" data-aos="fade-up">Select us for our state-of-the-art facilities and comprehensive career resources, providing a competitive edge in the maritime industry.</div>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>

                    </div>
                </div>
            </section>
            {/* <div style={{ height: '30px' }} /> */}
            <Footer/>
        </div >
    )
}


