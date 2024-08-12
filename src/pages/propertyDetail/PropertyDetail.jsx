import React from 'react'
import './PropertyDetail.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import location from '../../assets/imgs/location.png';
import Btn from '../../components/btn/Btn';
import { Grid } from '@mui/material';
import Slider2 from '../../components/slider2/Slider2';


export default function PropertyDetail() {
    return (
        <div>
            <NavBar active='Off-Market Inventory' />
            {/* sec 1  */}
            <section className="pd-padding">
                <div className="pd-header">
                    <div>
                        <div className="heading1">Luxury Apartment</div>
                        <div className="card-item-lcation">
                            <img src={location} alt="location-icon" />
                            Australia</div>
                    </div>
                    <div className='pd-header-right' >
                        <Btn
                            label='Submit An Offer'
                        />
                        <Btn
                            label='Book A Call'
                        />
                    </div>
                </div>
            </section>
            {/* sec 2 */}
            <div className="pd-padding">
                <Grid container spacing={5}>
                    <Grid item sm={7} xs={12}>
                        <Slider2 />
                    </Grid>
                    <Grid item sm={5} xs={12}>
                        Right
                    </Grid>
                </Grid>
            </div>

            <Footer active='Off-Market Inventory' />
        </div>
    )
}
