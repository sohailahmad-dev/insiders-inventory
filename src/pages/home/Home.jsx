import React, { useEffect, useState } from 'react'
import './Home.css'
import NavBar from '../../components/navbar/Navbar'
import Btn from '../../components/btn/Btn'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
// local temp imgs 
import mls from '../../assets/imgs/mls.png'
import img2 from '../../assets/imgs/img2.png'
import Slider1 from '../../components/slider1/Slider1'
import Testimonial from '../../components/testimonial/Testimonial'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'
import Loader from '../../components/loader/Loader'
import { getData } from '../../config/apiCalls'
import Slider4 from '../../components/slider4/Slider4'
import useScrollToTop from '../../hooks/UseScrollToTop'

export const Home = () => {
    useScrollToTop();
    const navigate = useNavigate();
    const isLoggedIn = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [])


    return (
        <div>
            <NavBar active={'Home'} />
            {/* sec 1 hero  */}
            <div className="h-hero">
                <div className='h-hero-inner'>
                    <div className="h-subHeading">Insider's Off-Market Inventory</div>
                    <div className="h-heading">  Opening Doors <span> to Hidden Homes </span> </div>
                    <div className="h-text">Unlock Exclusive Opportunities at Insider's Inventory, specializing in Buy & Hold, Owner-Occupied Retail, and Lucrative Flip Ventures.
                        <br className="desktop" />
                        Discover your path to profitable real estate investments.</div>
                    <div className="h-btns">
                        <Btn
                            onClick={() => navigate('/Properties')}
                            label='View our Off-Market Inventory'

                        />
                        <Btn
                            onClick={() => navigate('/AddProperty')}
                            label='Submit an Off-Market Property'
                            style={{
                                backgroundColor: 'transparent',
                                color: '#4DAD49'
                            }}
                        />
                    </div>
                    <img src={mls} alt="mls" />

                </div>


            </div>
            {/* sec 2  */}
            <div className="h-sec4 padding" >
                <Slider1 />
            </div>
            {/* sec 3  */}
            <section className='h-sec3 padding'>
                <div className="heading1 mb-40" style={{ textAlign: 'center' }}>Off-Market<span>Property Types</span></div>
                <Slider4 />
            </section>
            {/* sec 4  */}
            <section className="h-sec4 padding">
                <Testimonial />
            </section>
            <Footer />
        </div>
    )
}
