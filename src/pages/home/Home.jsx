import React from 'react'
import './Home.css'
import NavBar from '../../components/navbar/Navbar'
import Btn from '../../components/btn/Btn'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
// local temp imgs 
import img1 from '../../assets/imgs/img1.png'
import img2 from '../../assets/imgs/img2.png'
import Slider1 from '../../components/slider1/Slider1'
import Testimonial from '../../components/testimonial/Testimonial'

let propertyTypes = [
    {
        id: 1,
        img: img1,
        type: 'Buy & Hold Properties',
        description: 'Secure your future with our Buy & Hold properties, offering stability and long-term growth potential.'
    },
    {
        id: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZFyb2akvS_EkACDpyNNre3CDOCThUovLmw&s',
        type: 'Retail - Owner Occupant',
        description: 'Tailored Retail Spaces for Owner-Occupied Success in Prime Locations.'
    },
    {
        id: 3,
        img: img2,
        type: 'Flip Opportunities',
        description: "Seize Profit Potential: Explore High-Yield Flip Opportunities with Insider's Inventory."
    },

]

export const Home = () => {
    return (
        <div>
            <NavBar active={'Home'} />
            {/* sec 1 hero  */}
            <div className="h-hero">
                <div className="h-subHeading">Insider's Off-Market Inventory</div>
                <div className="h-heading">Your <span> Next Opportunity </span> <br className="desktop" /> Awaits</div>
                <div className="h-text">Unlock Exclusive Opportunities at Insider's Inventory, specializing in Buy & Hold, Owner-Occupied Retail, and Lucrative Flip Ventures. Discover your path to profitable real estate investments.</div>
                <div className="h-btns">
                    <Btn
                        label='Submit an Off-Market Property'
                    />
                    <Btn
                        label='View our Off-Market Inventory'
                        style={{
                            backgroundColor: 'transparent',
                            color: '#4DAD49'
                        }}
                    />
                </div>
                <div className="h-btns">
                    <Btn
                        label='Sign up for the Latest Deals?'
                    />
                </div>
                <div className="h-text">Sign up to receive the newest off-market opportunities before everyone
                    else, straight to your inbox!</div>

            </div>
            {/* sec 2  */}
            <div className="h-sec4 padding" >
                <Slider1 />
            </div>
            {/* sec 3  */}
            <section className='h-sec3 padding'>
                <div className="heading1 mb-40" style={{ textAlign: 'center' }}>Off-Market<span>Property Types</span></div>
                <Grid container spacing={5}>
                    {propertyTypes && propertyTypes.length > 0 &&
                        propertyTypes.map(e => (
                            <Grid item sm={4} xs={12} key={e?.type} >
                                <div className="home-card3">
                                    <div className='home-card3-imgBox'
                                        style={{ backgroundImage: `url(${e?.img})` }}
                                    >

                                    </div>
                                    <div className='home-card3-type'>
                                        {e.type}
                                    </div>
                                    <div className="home-card3-description">{e?.description}</div>
                                </div>
                            </Grid>)
                        )
                    }
                </Grid>
            </section>
            {/* sec 4  */}
            <section className="h-sec4 padding">
                <Testimonial />
            </section>
            <Footer />
        </div>
    )
}
