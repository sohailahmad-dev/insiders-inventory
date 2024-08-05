import React from 'react'
import './Home.css'
import NavBar from '../../components/navbar/Navbar'
import Btn from '../../components/btn/Btn'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'

let propertyTypes = [
    {
        id: 1,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn4A_RLzV0uivShsYShHz1WPSsRrEhZAwELQ&s',
        type: 'Buy & Hold Properties',
        description: 'Secure your future with our Buy & Hold properties, offering stability and long-term growth potential.'
    },
    {
        id: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgss8nTPgAGDE-_8TWth_F77xtxII3agtQVQ&s',
        type: 'Retail - Owner Occupant',
        description: 'Tailored Retail Spaces for Owner-Occupied Success in Prime Locations.'
    },
    {
        id: 3,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZFyb2akvS_EkACDpyNNre3CDOCThUovLmw&s',
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
                <div className="h-subHeading">Insiders Off-Market Inventory</div>
                <div className="h-heading">Your <span> Next Opportunity </span> <br className="desktop" /> Awaits</div>
                <div className="h-text">Unlock Exclusive Opportunities at Insider's Inventory, specializing in Buy & Hold, Owner-Occupied Retail, and Lucrative Flip Ventures. Discover your path to profitable real estate investments period.</div>
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
            </div>
            {/* sec 3  */}
            {/* <section className='h-sec3 padding'>
                <Grid container spacing={3}>
                    {propertyTypes && propertyTypes.length > 0 &&
                        propertyTypes.map(e => (
                            <Grid item sm={4} xs={12}>
                                <div className="home-card3">
                                    <img className='home-card3-img' src={e?.img} alt="img" />
                                    <div className='home-card3-type'>
                                        {e.type}
                                    </div>
                                    <div className="home-card3-description">{e?.description}</div>
                                </div>
                            </Grid>)
                        )
                    }
                </Grid>
            </section> */}
            <div style={{ height: 500 }} ></div>
            <Footer />
        </div>
    )
}
